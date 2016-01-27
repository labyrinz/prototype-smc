$(function () { // wait for document ready
	// init
	var controller = new ScrollMagic.Controller();


	function percentToPixel(_elem, _perc){
		var perc = (_elem.parent().outerWidth()/100)* parseFloat(_perc);
		console.log(perc)
	  return perc;
	}

	var vplayer0 = videojs("0_video");
	var vplayerIntro = videojs("intro_video");

	vplayerIntro.ready(function(){

		var vid = this;
		vid.on("ended", function(){
			vid.currentTime(0);
			vid.bigPlayButton.show();
			vid.posterImage.show();

			var pos = $("#pinContainer").offset().top;
			
			controller.scrollTo(function (newScrollPos) {
			    $("html, body").animate({scrollTop: newScrollPos});
			});
			controller.scrollTo(pos);

			
		});

	});

	// define movement of panels
	var wipeAnimation = new TimelineMax()
		.fromTo("section.panel.o-first", 1, {display: "none", opacity: "0"}, {display: "block", opacity: "1", ease: Linear.easeNone,
						onStart: function () {
							vplayerIntro.pause();
							playSound()
						},
						onReverseComplete: function () {
							stopSound()
						}
				})  // in from left
		.fromTo("section.panel .cita", 1, {display: "none", opacity: "0", x: "0%"}, {display: "block", opacity: "1", x: "30%", ease: Linear.easeNone,
						onStart: function () {$(".maintitle").hide()},
						onReverseComplete: function () {$(".maintitle").show()}
				})
		.fromTo("section.panel .imgs", 1, {display: "none", opacity: "0", x: "300%"}, {display: "block", opacity: "1", x: "200%", ease: Linear.easeNone,
						onStart: function () {},
						onReverseComplete: function () {}
				})
		.fromTo("section.panel.green", 1, {display: "none", opacity: "0", y:  "100%"}, {display: "block", opacity: "1", y: "0%", ease: Linear.easeNone,
						onStart: function () {},
						onReverseComplete: function () {}
				})
		.fromTo("section.panel.green .img-wrapper", 1, {display: "none", opacity: "0"}, {display: "block", opacity: "0.5", ease: Linear.easeNone,
						onStart: function () {},
						onReverseComplete: function () {}
				})  // in from right
		.fromTo("section.panel.bordeaux", 1, {y: "100%"}, {y: "0%", ease: Linear.easeNone,
						onStart: function () {},
						onComplete: function () {
							vplayer0.play();
							muteSound();
						},
						onReverseComplete: function () {
							vplayer0.pause()
							muteSound();
						}
				}); // in from top

	var $timeline = $(".flexTimeline");

	var wipeAnimation2 = new TimelineMax()
		//.fromTo("section.panel.turqoise", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
		.to(".rolls", 1, {x: percentToPixel($timeline, 10) + "px",
						onStart: function () {console.log("rolls starts")},
						onReverseComplete: function () {}
					}
				)
		.to(".rolls", 1, {x: percentToPixel($timeline, 13) + "px",
						onStart: function () {console.log("rolls starts")},
						onReverseComplete: function () {}
					}
				)
		.to(".rolls", 1, {x: percentToPixel($timeline, 18) + "px",
						onStart: function () {console.log("rolls starts")},
						onReverseComplete: function () {}
					}
				)

	// create scene to pin and link animation
	new ScrollMagic.Scene({
			triggerElement: "#pinContainer",
			triggerHook: "onLeave",
			duration: "300%"
		})
		.setPin("#pinContainer")
		.setTween(wipeAnimation)
		//.addIndicators() // add indicators (requires plugin)
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: "#pinContainer",
			triggerHook: "onLeave",
			duration: "300%"
		})
		//.setPin(".flexTimeline")
		.setTween(wipeAnimation2)
		//.addIndicators() // add indicators (requires plugin)
		.addTo(controller);

	//videojs('vid1').Background();



	/* SOUND */


	var preload;
	var playing = false;

	function init() {
		if (!createjs.Sound.initializeDefaultPlugins()) {
			document.getElementById("error").style.display = "block";
			document.getElementById("content").style.display = "none";
			return;
		}

		//examples.showDistractor("content");
		var assetsPath = "audio/";
		var sounds = [
			{src: "vals-viuda-alegre.mp3", id: 1},
			/*{src: "mambo-n5.mp3", id: 2}*/
		];

		createjs.Sound.alternateExtensions = ["ogg"];	// add other extensions to try loading if the src file extension is not supported
		createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
		createjs.Sound.registerSounds(sounds, assetsPath);
	}

	function soundLoaded(event) {
		//examples.hideDistractor();
		var div = document.getElementById(event.id);
		div.style.backgroundImage = "url('img/loading.png')";
	}

	function stopSound() {
		if (preload != null) {
			preload.close();
		}
		createjs.Sound.stop();
		playing = false;
	}



	function playSound(target) {
		//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
		//var instance = createjs.Sound.play(target.id);
		target = 1;
		console.log("sound "+target)
		if (!playing) {
			var instance = createjs.Sound.play(target);
			createjs.Sound.setVolume(0.5)

			if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
				return;
			} else {
				playing = true
			}
		}

		/*target.className = "gridBox active";
		instance.addEventListener("complete", function (instance) {
			target.className = "gridBox";
		});*/
	}

	init()


});

/* Mute sound function */
function muteSound(){
	var muted = createjs.Sound.muted
	createjs.Sound.setMute(!muted)
	$(".volume .icon").toggle()
	return false;
}
