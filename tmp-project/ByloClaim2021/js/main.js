jQuery(document).ready(function() {

  // Current connected account
  var account

  // BYLO contract loaded locally (created the 31/12/2021)
  var contract

  $("#claim-btn").click(function() {
    claimDividend()
  });

  $("#connect-btn").click(async function() {
    loadAccountData()
  });

  async function loadAccountData() {
    try {
      showLoadingView()

      console.log("Fetch account")
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      account = accounts[0]
      console.log("Loaded account: " + account)

      // Data used to configure the claim view
      const claimDivModel = {};

      // compute account address
      claimDivModel.accountAddress = account
      claimDivModel.accountAddressShort = account.substring(0, 6) + "..." + account.substring(account.length - 4, account.length)

      // compute bylo balance
      const decimals = await contract.methods.decimals().call()
      let amount = await contract.methods.balanceOf(account).call()
      claimDivModel.byloBalance = amount / 1000000000

      // compute eth earned
      let ethPriceUsd = await getEthPriceInUsd()
      let byloPriceUsd = await getByloPriceInUsd(ethPriceUsd)
      let weiEarned = await contract.methods.getUnpaidEarnings(account).call()
      claimDivModel.ethEarned = web3.utils.fromWei(weiEarned, 'ether')
      claimDivModel.ethEarnedUsd = claimDivModel.ethEarned * ethPriceUsd
      claimDivModel.byloBalanceUsd = claimDivModel.byloBalance * byloPriceUsd

      console.log("Account Data: " + JSON.stringify(claimDivModel))

      updateClaimView(claimDivModel)

      // update the data everytime the current account changes
      window.ethereum.on('accountsChanged', function (accounts) {
        if (accounts === undefined || accounts.length == 0) {
           resetClaimView()
        } else {
           loadAccountData()
        }
      })
    } catch(error) {
      console.log("Unable to load data with error: " + JSON.stringify(error))
      resetClaimView()
    }
  }

  /** Load web3 */
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask and reloading this page ;)')
      showErrorView()
    }

    if (window.web3) {
      contract = await getContractABI()

      // check if User is already connected by retrieving the accounts
      web3.eth.getAccounts().then(async function(addr) {
        if (addr === undefined || addr.length == 0) {
          resetClaimView()
        } else {
          loadAccountData()
        }
      });
    }
  }

  /** Get contract ABI from Etherscan */
  async function getContractABI() {
    console.log("Fetch BYLO contract abi locally.")
    response = await fetch('ByloABI.json')
    jsonData = await response.json()
    return new window.web3.eth.Contract(jsonData, '0xd1D348FE85c65De21B367abc71Ede822751348fB')
  }

  /** Get current eth price in usd */
  async function getEthPriceInUsd() {
    response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    jsonData = await response.json()
    return jsonData.ethereum.usd
  }

  /** Get current Bylo price in usd */
  async function getByloPriceInUsd(ethPriceUsd) {
    response = await fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: `{
        "query":"query tokens($tokenAddress: Bytes\u0021) {\\n  tokens(where: {id: $tokenAddress}) {\\n    derivedETH\\n    totalLiquidity\\n  }\\n}",
        "variables":{
          "tokenAddress":"0xd1d348fe85c65de21b367abc71ede822751348fb"
        },
        "extensions":{
          "headers":null
        }
      }`,
    });
    jsonData = await response.json()
    oneByloPriceEth = parseFloat(jsonData.data.tokens[0].derivedETH)
    console.log("BYLO price " + oneByloPriceEth.toFixed(10) + "Ξ")
    unitPrice = oneByloPriceEth * ethPriceUsd
    return unitPrice
  }

  /** Start to claim the dividends */
  async function claimDividend() {
    await contract.methods.claimDividend().send({ from: account })
    await loadAccountData()
  }

  /** Update claim div */
  function updateClaimView(claimDivModel) {
    $("#connect-wallet-container").css("display", "none");
    $("#loading").css("display", "none");
    $("#claim-dividend-container").css("display", "block");
    $("#account-address").html(claimDivModel.accountAddressShort);
    $("#bylo-balance").html(Number(claimDivModel.byloBalance).toFixed(4));
    $("#bylo-balance-dollars").html("≈ $" + Number(claimDivModel.byloBalanceUsd).toFixed(2));
    $("#eth-earned").html(Number(claimDivModel.ethEarned).toFixed(4));
    $("#eth-earned-dollars").html("≈ $" + Number(claimDivModel.ethEarnedUsd).toFixed(2));
    jdenticon.update("#account-icon", claimDivModel.accountAddress);
    $("#etherscan-btn").attr('href', "https://etherscan.io/token/0xd1D348FE85c65De21B367abc71Ede822751348fB?a=" + claimDivModel.accountAddress);
  }

  /** Reset claim div */
  function resetClaimView() {
    $("#connect-wallet-container").css("display", "block");
    $("#claim-dividend-container").css("display", "none");
    $("#loading").css("display", "none");
    $("#account-address").html("");
    $("#bylo-balance").html("");
    $("#bylo-balance-dollars").html("");
    $("#eth-earned").html("");
    $("#eth-earned-dollars").html("");
  }

  /** Show loading view */
  function showLoadingView() {
    $("#loading").css("display", "block");
    $("#error").css("display", "none");
    $("#connect-wallet-container").css("display", "none");
    $("#claim-dividend-container").css("display", "none");
  }

  /** Show loading view */
  function showErrorView() {
    $("#error").css("display", "block");
    $("#loading").css("display", "none");
    $("#connect-wallet-container").css("display", "none");
    $("#claim-dividend-container").css("display", "none");
  }


  // Setup the default view
  showLoadingView()

  // Start by loading Web3
  loadWeb3()
});
