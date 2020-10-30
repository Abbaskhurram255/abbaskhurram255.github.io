$(document).ready(function() {
	// $('#demo1').stopwatch().stopwatch('start');
	// $('#demo2').stopwatch().click(function(){ 
	// 	$(this).stopwatch('toggle');
	// });
	// $('#demo3').stopwatch().click(function(){ 
	// 	$(this).stopwatch('reset');
	// }).stopwatch('start');
	// $('#demo4').stopwatch({startTime: 10000000}).stopwatch('start');
	// $('#demo5').stopwatch({updateInterval: 2000}).stopwatch('start');
	// $('#demo6').stopwatch({format: '{Minutes} and {s.}'}).stopwatch('start');
//////////////////////


	$("#stopwatchBtn").click(function(e){
		$("#countdown").hide();
		$("#stopwatch").show();
		$("#countdownBtn").removeClass("active");
		$(this).addClass("active");
		$("#pauseCD").trigger("click");
	});

	$("#countdownBtn").click(function(e){
		$("#stopwatch").hide();
		$("#countdown").show();
		$("#resetSW").trigger("click");
		$("#stopwatchBtn").removeClass("active");
		$(this).addClass("active");
	});

	$('#startSW').click(function(){
		$('#stopwatchTimer').stopwatch().stopwatch('start');
	});

	$('#stopSW').click(function(){
		$('#stopwatchTimer').stopwatch().stopwatch('stop');
	});

	$('#resetSW').click(function(){
		$('#stopwatchTimer').stopwatch().stopwatch('reset', function(){
			$('#stopwatchTimer').stopwatch().stopwatch('stop');
			$('#stopwatchTimer').stopwatch()[0].innerHTML = "00:00:00";
		});
	});

	$("#startCD").click(function(){
		// $("#countdownTimer").html("");
		var mins = parseInt($("input[name='minutes']").val());
		var secs = parseInt($("input[name='seconds']").val());
		if(isNaN(mins) || isNaN(secs)){
			alert("Enter valid minutes and seconds.");
			return;
		}
		var seconds = (mins * 60) + secs;
		// alert(seconds);
		$("#countdownTimer").backward_timer({
			seconds: seconds,
			on_exhausted: function(timer) {
    			// timer.target.text('I am exhausted. Reset me!')
    			countdownTimeUp();
  			}
		});
		$("#countdownTimer").backward_timer('start');
	});

	$("#pauseCD").click(function(){
		// $("#countdownTimer").html("");
		$("#countdownTimer").backward_timer('cancel');
	});

	$("#stopCD").click(function(){
		// $("#countdownTimer").html("");
		$("#countdownTimer").backward_timer('reset');
	});

	function countdownTimeUp(){
		alert("Time Up!");
	}

	$("input[name='minutes']").change(function(){
		var val = $(this).val();
		if(isNaN(val)){
			alert("Please enter valid number.");
		}
		if(val > 10){
			alert("Max allowed minutes are 10");
			$(this).val("");
		}
	});

	$("input[name='seconds']").change(function(){
		var val = $(this).val();
		if(isNaN(val)){
			alert("Please enter valid number.");
		}
		if(val > 59){
			alert("Max allowed seconds are 59");
			$(this).val("");
		}
	});
});