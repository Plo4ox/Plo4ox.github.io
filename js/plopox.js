$(document).ready(function() {

  /** Function used to handle Type Something */
  function typeSomething() {
  		var letmsg = ":: <b>Enter something</b></br ><div contenteditable='true' class='textarea'></div>";
  		$('.typed-cursor').hide();
  		$("#type-something-res").html(letmsg);
  		$("#type-something-res .textarea").keypress(showEndMsg);
  		$("#type-something-res .textarea").focus();
  		$("#type-something-res .textarea").click(function () {
  		    $("#type-something-res .textarea").focus();
  		});
  }

  /**
   * Handle the message shown after the Type Something execution
   * @param {event} Event key used to know which input has been pressed
   * @return False if the user press enter or has entered more than 256 characters, True otherwise
   */
  function showEndMsg(event) {
    if (event.which == 13) {
      var msg_fake_succeed = ":: <b>You seem interested by what I'm doing!</b>";
      var end_msg = "<div>:: Don't forget to check my <a href='https://medium.com/@plo4ox/list/projects-5fd0d8ca5e21'>Projects</a> ;)<br />" + prompt() + " exit";
      $("#type-something-res").html(msg_fake_succeed);
      $(".code").append(end_msg);
    }
    return ((e.which != 13) && (this.innerText.length <= 256));
  }

  /** Function used to provide a prompt to simulate a shell :D */
  function prompt() {
    var date = new Date($.now());
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return "[" + time + "] - <b>plo4ox</b>@Github <b>~</b> $";
  }

  /** Prepare the code that will be typed */
  $("#typed-init-code").html(
    "<p><br />" + prompt() + " ./write-something</p>"
  );

  /** Setup the auto typed text */
  $("#typed-init").typed({
      stringsElement	: $('#typed-init-code'),
      typeSpeed	: 1,
      backDelay	: 500,
      loop		: false,
      contentType	: 'html',
      loopCount	: false,
      callback	: function() { typeSomething(); },
      resetCallback	: function() { /**/ }
  });
});
