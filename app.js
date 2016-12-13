;(function(){

	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

	// window.requestAnimationFrame = window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;
	// window.cancelAnimationFrame = window.cancelAnimationFrame||window.mozcancelAnimationFrame||window.webkitcancelAnimationFrame||window.mscancelAnimationFrame;

	var start = null;
	var barProgress = document.getElementById("bar-progress");
	var prograss = 0;
	var audio = document.getElementById("audio");
	var audioState = false;
	var duration = 0, currentTime = 0;
	var ratio = 0;
	var requestId;

	function playPause(audioState) {
		if (audio.paused) {
			audioState = true;
			audio.play();
			requestAnimationFrame(step);
		}else{
			audioState = false;
			audio.pause();
			window.cancelAnimationFrame(requestId);
			console.log(audioState,audio.duration,audio.currentTime);
		}
	}
	document.getElementById("switch").addEventListener("click", playPause, false);

	function step(timestamp) {
		// prograss += 1;
		duration = audio.duration;
		currentTime = audio.currentTime;
		ratio = currentTime/duration;
		prograss = Math.round(ratio*100);
		// console.log(currentTime);

		barProgress.style.width = ratio*100 + "%";
		barProgress.innerHTML = prograss + "%";
		if (prograss < 100) {
			requestId = requestAnimationFrame(step);
		}
	}
	// requestAnimationFrame(step);
}());
