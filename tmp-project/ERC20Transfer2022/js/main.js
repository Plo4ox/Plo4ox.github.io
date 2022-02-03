// The view related function are in the view.js file
jQuery(document).ready(function() {

  const VERSION = "v0.0.0.1"

  // Set the version
  $("#version").html(VERSION);

  // Current connected account
  var account

  // Current loaded contract
  var currentContract

  // Current network identifier
  var currentNetworkId

  // Current usd price
  var currentUsdPrice

  // Interval used to animated dots
  var currentIntervalId

  // Last transaction hash register
  var currentTransactionHash

  // Update/Refresh the current the current view
  var updateCurrentView = function() {}

  // Verify that the user is using a web3 navigator, block the view otherwise
  loadWeb3()

  /** Load web3 */
  function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask and reloading this page ;)')
    }

    if (window.web3) {
      // check if user is already connected by retrieving the accounts
      web3.eth.getAccounts().then(async function(addr) {
          if (addr !== undefined && addr.length != 0) {
            console.log("An account is already connected")
            loadAccountData()
          }
      });
    }
  }


  /// Show the right view to the user based on what has been passed in the GET parameters
  //
  // data = {
  //   // Used to redirect the user to the right view
  //   // Must redirect to the selection view if none is provided
  //   <Required> type: Int (0: Create, 1: Transfer)
  //
  //   // Address of the receiver
  //   <Optional> receiver: String
  //
  //   // List of the supported contracts limited to 4 represented by a
  //   // contract address and an optional contract logo url
  //   // /!\ Only etherscan verified contracts will work /!\
  //   <Optional> contracts: ListOf({ title: String, addr: String, iconUrl: String? })
  //
  //   // Optional amount of token to transfer
  //   <Optional> amount: String // Must be a valid number
  // }
  //
  const Create = 0
  const Transfer = 1
  queryData = {}

  // Handle query data asynchronously and load view accordingly
  loadQueryData(loadTypedView, loadHomeView)

  /** Load the query data and call onDone with the type of view to display */
  async function loadQueryData(loadTypedView, loadHomeView) {
    console.log("Loading GET data...")
    try {
      getDataB64 = new URLSearchParams(location.search).get("d")
      if (getDataB64 == "me") {
        getDataB64 = "eyJ0eXBlIjogMSwgInJlY2VpdmVyIjogIjB4NGM1NTQwYjFjQTU1ZUZlNDg3ZjAyODU3NUI4YTg4MTZEYzM0ZDcwQSIsICJjb250cmFjdHMiOiBbeyJ0aXRsZSI6ICJLVU1BIiwgImFkZHIiOiAiMHg0OGMyNzZlOGQwMzgxMzIyNGJiMWU1NWY5NTNhZGI2ZDAyZmQzZTAyIiwgImljb25VcmwiOiAiaHR0cHM6Ly9hc3NldHMuY29pbmdlY2tvLmNvbS9jb2lucy9pbWFnZXMvMTU1MjYvbGFyZ2Uva3VtYV9pbnUuUE5HPzE2MjExMjg4MjQifSwgeyJ0aXRsZSI6ICJLQVdBIiwgImFkZHIiOiAiMHg1NDZBRUQzN2QyMDJkNjA3RjQ1Q2JkMmI4QzBDYUQwRDI1ZkJlMzM5IiwgImljb25VcmwiOiAiaHR0cHM6Ly9hc3NldHMuY29pbmdlY2tvLmNvbS9jb2lucy9pbWFnZXMvMTYzNjkvbGFyZ2Uva2F3YWludS5QTkc/MTYyMzgyMDgwNSJ9LCB7InRpdGxlIjogIklOQVJJIiwgImFkZHIiOiAiMHhjYTc1YzQzZjhjOWFmZDM1NmM1ODVjZTdhYTQ0OTBiNDhhOTVjNDY2IiwgImljb25VcmwiOiAiaHR0cHM6Ly9hc3NldHMuY29pbmdlY2tvLmNvbS9jb2lucy9pbWFnZXMvMTY3OTUvbGFyZ2UvdG9rZW5fbG9nb18lMjgxJTI5LnBuZz8xNjI1MDM2ODI4In0sIHsidGl0bGUiOiAiUExBWSIsICJhZGRyIjogIjB4OTViNGU0NzAyNTM3MkRlZDRCNzNGOWI1RjA2NzFCOTRhODE0NDViQyIsICJpY29uVXJsIjogImh0dHBzOi8vYXNzZXRzLmNvaW5nZWNrby5jb20vY29pbnMvaW1hZ2VzLzIxODA0L3NtYWxsL2lnLnBuZz8xNjQwMDY2MjE0In1dfQ=="
      }
      queryData = JSON.parse(atob(getDataB64))
      console.log("Loaded GET configuration: " + JSON.stringify(queryData))
      verifyGetDataAddresses()
      loadTypedView()
    } catch(error) {
      console.log("Unable to load any GET data with error: " + JSON.stringify(error))
      loadHomeView()
    }
  }

  /** Verify the data */
  function verifyGetDataAddresses() {
    if (queryData.type != Create && queryData.type != Transfer) {
      throw 'Invalid query data type: ' + queryData.type
    }

    if (queryData.receiver && !window.web3.utils.isAddress(queryData.receiver)) {
      throw 'The provided receiver has an invalid format: ' + queryData.receiver
    }

    if (queryData.contracts && queryData.contracts.length > 0) {
      queryData.contracts.forEach((contractAddr) => {
        if (!window.web3.utils.isAddress(contractAddr.addr)) {
          throw 'The following contract is invalid: ' + contractAddr.addr
        }
      })
    }
  }

  /** Clean the default content struct to load a new view */
  function cleanContentAndFooter() {
    $("#content").html("")
    $("#footer span").text("")
    $("#footer").css("display", "none")
  }

  /** Load the home view */
  function loadHomeView() {
    cleanContentAndFooter()
    $("#content").load('views/home-content.html');
  }

  /** Load view based on the data type */
  function loadTypedView() {
    if (queryData.type == Create) {
      console.log("Create is not supported in the v0.0.0.1")
      loadHomeView()
    }
    loadTransferView()
  }

  /** Load the transfer view based on the content of the data */
  function loadTransferView() {
    // update the content view
    if (queryData.contracts.length > 1) {
      $("#content").load('views/transfer-select-token-content.html');
      loadTokenListView();
    } else {
      loadEnterAmountTokenView(queryData.contracts.first());
    }
    // update the footer with the receiver data
    updateFooter()
  }

  /** Update footer */
  function updateFooter() {
    const footer = $("#footer")
    $("#footer").css("display", "flex");
    $("#footer").attr("href", "https://etherscan.io/address/" + queryData.receiver);
    $("#footer span").text(queryData.receiver);
  }

  /** Load the token list view */
  async function loadTokenListView() {
    const tokenItem = await fetch('views/token-item.html')
    const tokenItemTemplate = await tokenItem.text()
    queryData.contracts.forEach((contract) => {
      listItem = tokenItemTemplate
        .replace("{{ token_title }}", contract.title)
        .replaceAll("{{ token_address }}", contract.addr)
        .replace("{{ logo_src }}", contract.iconUrl)
      $("#token-list").append('<li id="' + contract.addr + '" class="row surface selectable">' + listItem + '</li>')
      if (contract.iconUrl) {
        $("#token-list #" + contract.addr + " svg").css("display", "none")
      } else {
        $("#token-list #" + contract.addr + " img").css("display", "none")
      }
      $("#token-list #" + contract.addr).click(function() { loadEnterAmountTokenView(contract) })
    })
  }

  /** Load and configure the amount view based on the given contract */
  async function loadEnterAmountTokenView(contract) {
    updateCurrentView = function() { loadEnterAmountTokenView(contract) }
    cleanContentAndFooter()
    updateFooter()
    $("#content").load('views/transfer-enter-amount-content.html');

    const accountAddress = await fetch('views/account-address.html')
    const accountAddressTemplate = await accountAddress.text()

    const accountBalance = await fetch('views/account-balance.html')
    const accountBalanceTemplate = await accountBalance.text()

    const tokenItem = await fetch('views/token-item.html')
    const tokenItemTemplate = await tokenItem.text()

    tokenItemData = tokenItemTemplate
      .replace("{{ token_title }}", contract.title)
      .replaceAll("{{ token_address }}", contract.addr)
      .replace("{{ logo_src }}", contract.iconUrl)
    if (contract.iconUrl) {
      $("#token-list #" + contract.addr + " svg").css("display", "none")
    } else {
      $("#token-list #" + contract.addr + " img").css("display", "none")
    }

    accountBalanceData = accountBalanceTemplate.replace("{{ token_info }}", tokenItemData)

    $("#account-address-container").html(accountAddressTemplate)
    $("#account-balance-container").html(accountBalanceData)

    console.log("Load transfer view for " + contract.title + "(" + contract.addr + ")")
    fillEnterAmountTokenViewFields(contract.addr)
  }

  /** Get a displayable version of the current account address */
  function getDisplayableAccount() {
    return (account ? account.substring(0, 6) + "..." + account.substring(account.length - 4, account.length) : '...');
  }

  /** Get the transfer button label */
  function getTransferBtnLabel() {
    return (account ? "TRANSFER" : 'CONNECT');
  }

  /** Whether or not the transfer button is available */
  function updateTransferButtonEnabled() {
    amount = parseInt($("#token-amount").val())
    availableAmount = parseInt($("#account-balance .amount").html())
    if (isNaN(availableAmount) || isNaN(amount) || amount <= 0 || amount > availableAmount) {
      $("#transfer-button").addClass("disabled")
      $("#transfer-button").removeClass("enabled")
    } else {
      $("#transfer-button").addClass("enabled")
      $("#transfer-button").removeClass("disabled")
    }
  }

  /** Setup and fill the fill of the transfer view */
  async function fillEnterAmountTokenViewFields(contractAddr) {
    if (account) {
      if (currentContract === undefined || currentContract.options.address.toLowerCase() != contractAddr.toLowerCase()) {
        await loadContract(contractAddr)
      }
      if (isLoadingContract) return
      contractAddr = currentContract.options.address
      displayableAccount = getDisplayableAccount()
      $("#account-addr span").html(displayableAccount)
      $("#transfer-button span").html(getTransferBtnLabel())
      $("#amount-input").css("display", "block")
      $("#account-addr img").attr("src", "https://api.multiavatar.com/" + displayableAccount + ".png")

      updateTransferButtonEnabled()
      if (isOnMainNet()) {
        $("#account-addr span").removeClass("wrong-network")
        loadBalance(contractAddr)
      } else {
        $("#account-addr span").addClass("wrong-network")
      }
    } else {
      $("#amount-input").css("display", "none")
      $("#account-addr span").html(getDisplayableAccount())
      $("#transfer-button span").html(getTransferBtnLabel())
      $("#account-addr img").attr("src", "/img/default_user.svg")
      $("#account-balance .amount").html("0")
      $("#account-balance .amount-fiat").html("$0")
      $("#transfer-button").addClass("enabled")
      $("#transfer-button").removeClass("disabled")
    }

    setUpTransferButtonClick()
    setUpOnTokenAmountInput()
  }

  /** Setup on transfer button click */
  function setUpTransferButtonClick() {
    $("#transfer-button").click(function() {
      if ($("#transfer-button").hasClass("disabled")) {
        return
      }
      $("#transfer-button span").hide()
      $("#transfer-button .stage").show()
      $("#transfer-button").addClass("disabled")
      $("#transfer-button").removeClass("enabled")
      onTransferClickButton()
    })
  }

  /** Setup on input text input */
  function setUpOnTokenAmountInput() {
    $("#token-amount").on('input', function() {
      updateTransferButtonEnabled()
      amountUsd = (amount * currentUsdPrice).toFixed(2)
      if (isNaN(amountUsd)) {
        $("#token-amount-fiat").html("(~ $0.00)")
      } else {
        $("#token-amount-fiat").html("(~ $" + amountUsd + ")")
        if (amount > availableAmount) {
          $("#token-amount-fiat").addClass("warning")
        } else {
          $("#token-amount-fiat").removeClass("warning")
        }
      }
    })
  }

  /** Called on transfer click button */
  async function onTransferClickButton() {
    if (account) {
      if (currentTransactionHash) {
        currentTransactionHash = null
        loadTransferView()
        return
      }
      try {
        $("#token-amount").prop("disabled", "true")
        await transferData($("#token-amount").val())
      } catch(error) {
        $("#transfer-button span").show()
        $("#transfer-button .stage").hide()
        $("#transfer-button").addClass("enabled")
        $("#transfer-button").removeClass("disabled")
        $("#token-amount").removeAttr("disabled")
      }
    } else {
      await loadAccountData()
      $("#token-amount").removeAttr("disabled")
      updateCurrentView()
    }
  }

  /** Load the contract abi from etherscan */
  var isLoadingContract = false
  async function loadContract(contractAddr) {
    if (isLoadingContract) return
    isLoadingContract = true

    console.log("Load contract abi from etherscan")
    response = await fetch('https://api.etherscan.io/api?module=contract&action=getabi&address=' + contractAddr)
    console.log(response)
    jsonData = await response.json()
    abi = JSON.parse(jsonData.result)
    console.log(abi)
    currentContract = new window.web3.eth.Contract(abi, contractAddr)

    isLoadingContract = false
  }

  /** Load the current account balance for the given contractAddr */
  async function loadBalance(contractAddr) {
    // compute balance
    const decimals = web3.utils.toBN(await currentContract.methods.decimals().call())
    const amount = await currentContract.methods.balanceOf(account).call()
    const amountBN = web3.utils.toBN(amount)
    const balance = amountBN / web3.utils.toBN(10).pow(decimals)

    // get current price from coingecko API
    response = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/contract/' + contractAddr)
    jsonData = await response.json()
    currentUsdPrice = jsonData.market_data.current_price.usd
    currentPrice = balance * currentUsdPrice

    $("#account-balance .amount").html(balance.toFixed(2))
    $("#account-balance .amount-fiat").html("~ $" + currentPrice.toFixed(4))
  }

  /** Load the account data and setup listeners */
  async function loadAccountData() {
    try {
      await loadAccount()
      // update the data everytime the current account changes
      window.ethereum.on('accountsChanged', function (accounts) {
        account = accounts[0]
        updateCurrentView()
      })
      window.ethereum.on('chainChanged', () => {
        loadAccount()
      })
    } catch(error) {
      account = null
      console.log("Unable to fetch account with error: " + JSON.stringify(error))
    }
  }

  /** Load the account data and update the view accordingly */
  async function loadAccount() {
    console.log("Fetch account data")
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    account = accounts[0]
    currentChainId = await window.web3.eth.net.getId()
    console.log("Loaded account: " + account + ", on network " + currentChainId)
    updateCurrentView()
  }

  /** Used to check the current network, only the main one allowed */
  function isOnMainNet() {
    return currentChainId == 1
  }

  /** Transfer tokens */
  async function transferData(amountToken) {
    contractSymbol = await currentContract.methods.symbol().call()
    console.log("[TRANSACTION PROGRESS] Transfer " + amountToken + " " + contractSymbol + " to " + queryData.receiver)

    const decimals = web3.utils.toBN(await currentContract.methods.decimals().call())
    let amount = web3.utils.toBN(amountToken)
    let price = amount.mul(web3.utils.toBN(10).pow(decimals))
    var currentHash
    await currentContract.methods.transfer(queryData.receiver, price).send({ from: account })
    .once('sent', function(payload) { console.log("[TRANSACTION PROGRESS] Request Sent") })
    .once('sending', function(payload) { console.log("[TRANSACTION PROGRESS] Sending") })
    .once('transactionHash', function(hash) {
      console.log("[TRANSACTION PROGRESS] Get transaction hash: " + hash)
      currentTransactionHash = hash
      updateTransactionProgressView(amountToken, contractSymbol)
    })
    .on('confirmation', function(confNumber, receipt, latestBlockHash) {
      console.log("[TRANSACTION PROGRESS] Confirmation number: " + confNumber)
      console.log("[TRANSACTION PROGRESS] Confirmation latestBlockHash: " + latestBlockHash)
      console.log("[TRANSACTION PROGRESS] Confirmation receipt: " + JSON.stringify(receipt))
      updateTransactionSuccessView()
    })
    .on('error', function(error) {
      console.log("[TRANSACTION PROGRESS] Failure with error: " + error.message)
      updateTransactionErrorView()
    });
  }

  /** Generate a displayable transaction hash */
  function getDisplayableTransaction(hash) {
    return hash.substring(0, 10) + "..." + hash.substring(hash.length - 8, hash.length)
  }

  /** Update the progress view to present the amount of data being transferred */
  function updateTransactionProgressView(amountToken, symbol) {
    hash = currentTransactionHash
    fromAddr = account
    toAddr = queryData.receiver
    amountTokenFiat = (amountToken * currentUsdPrice).toFixed(2)

    $("#account-balance-container").css("display", "none")
    $("#amount-input").css("display", "none")
    $("#transaction-amount-container").css("display", "block")
    $("#transaction-etherscan-container").css("display", "block")
    $("#fromAddr").html(fromAddr)
    $("#toAddr").html(toAddr)
    $("#transaction-amount-container .transfer-amount-token").html(amountToken + " " + symbol)
    $("#transaction-amount-container .transfer-amount-fiat").html("~ $" + amountTokenFiat)
    $("#transaction-etherscan-container .transfer-title").html('TRANSFERRING<span id="dots"></span>')
    currentIntervalId = setInterval(animateDots, 600)

    $("#transfer-etherscan-link").attr("href", "https://etherscan.io/tx/" + hash)
    $("#transaction-etherscan-container .transfer-hash").html(getDisplayableTransaction(hash))
  }

  /** Update the transaction view after a failure */
  function updateTransactionErrorView() {
    if (!currentTransactionHash) {
      return
    }

    clearInterval(currentIntervalId)
    $("#transaction-etherscan-container .transfer-title").html('TRANSFER FAILED!')
    $("#account-balance-container").css("display", "block")
    $("#transaction-amount-container").css("display", "none")
    loadBalance(currentContract.options.address)
    activateTransferButton("RETRY")
  }

  /** Update the transaction view after a success */
  function updateTransactionSuccessView() {
    clearInterval(currentIntervalId)
    $("#transaction-etherscan-container .transfer-title").html('TRANSFER SUCCESSFUL!')
    $("#account-balance-container").css("display", "block")
    $("#transaction-amount-container").css("display", "none")
    loadBalance(currentContract.options.address)
    activateTransferButton("CLOSE")
  }

  /** Activate the transfer button */
  function activateTransferButton(title) {
    $("#transfer-button span").html(title)
    $("#transfer-button span").show()
    $("#transfer-button .stage").hide()
    $("#transfer-button").addClass("enabled")
    $("#transfer-button").removeClass("disabled")
    $("#token-amount").removeAttr("disabled")
  }

  /** Code from http://jsfiddle.net/wdVh8/ */
  function animateDots() {
    if(dots < 3) {
        $('#dots').append('.');
        dots++;
    } else {
        $('#dots').html('');
        dots = 0;
    }
  }
});
