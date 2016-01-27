$(function () { // wait for document ready
	// init
	var controller = new ScrollMagic.Controller();


	function percentToPixel(_elem, _perc){
		var perc = (_elem.parent().outerWidth()/100)* parseFloat(_perc);
		console.log(perc)
	  return perc;
	}

	var vplayer0 = videojs("0_video");

	// define movement of panels
	var wipeAnimation = new TimelineMax()
		.fromTo("section.panel.o-first", 1, {display: "none", opacity: "0"}, {display: "block", opacity: "1", ease: Linear.easeNone,
						onStart: function () {},
						onReverseComplete: function () {}
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
						onComplete: function () {vplayer0.play()},
						onReverseComplete: function () {vplayer0.pause()}
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
		.addIndicators() // add indicators (requires plugin)
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



});