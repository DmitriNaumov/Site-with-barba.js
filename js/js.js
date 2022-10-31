
$(function () {

    'use strict';



    function setBarba() {

        function delay(n) {
            n = n || 2000;
            return new Promise((done) => {
                setTimeout(() => {
                    done();
                }, n);
            });
        }

        function loadSite() {

            $('.load-site').addClass("active");

            var tl = gsap.timeline();

            tl.to(".loading", .7, {
                opacity: 0,
                ease: "expo.out"
            })
            tl.to(".loading-completed", .7, {
                opacity: 1,
                translateY: "0px",
                ease: "expo.out"
            }, ".5")
            tl.to(".load-site__img img:nth-child(1), .load-site__img img:nth-child(3)", .7, {
                translateY: "0px",
                opacity: 1,
                ease: "expo.out"
            }, "-=.4")
            tl.to(".loading-completed", .7, {
                opacity: 0,
                ease: "expo.out"
            })
            tl.to(".loading-txt", .7, {
                opacity: 1,
                translateY: "0px",
                ease: "expo.out"
            }, "-=.6")
            tl.to(".load-site__bg", .7, {
                translateY: "100%",
                ease: "expo.out",
                delay: .5
            })
            tl.to(".load-site", .7, {
                translateY: "100%",
                ease: "expo.out"
            }, "-=.4")
        }

        function pageTransition() {
            var tl = gsap.timeline();
            tl.to(".preloader", .7, {
                translateY: "0%",
                ease: "expo.out"
            })
            tl.to(".preloader__bg", .7, {
                translateY: "0%",
                ease: "expo.out"
            }, "-=.4")

            tl.to(".preloader__bg", .7, {
                translateY: "100%",
                ease: "expo.out",
                delay: .2
            })
            tl.to(".preloader", .7, {
                translateY: "100%",
                ease: "expo.out",
                delay: .8
            }, "-=1.2")
            tl.set(".preloader, .preloader__bg", {
                translateY: "-100%"
            })
        }

        function contentAnimation() {
            var tl = gsap.timeline();
            tl.from(".title", 1.5, {
                translateY: 20,
                opacity: 0,
                ease: "expo.out",
                delay: .7
            })
            tl.from(".descript", 1.5, {
                translateY: 20,
                ease: "expo.out",
                opacity: 0
            }, "-=1.3")
            tl.to(".btn-link", {
                translateY: 0,
                opacity: 1
            }, "-=1.9")
            tl.to(".section__img", {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            }, "-=1.4")
        }

        barba.init({
            sync: true,
            transitions: [{
                async leave() {
                    const done = this.async();
                    pageTransition();
                    await delay(1000);
                    done();
                },
                async enter() {
                    contentAnimation();
                },
                async once() {
                    $(document).ready(function () {
                        setTimeout(() => {
                            loadSite();
                            setTimeout(() => {
                                contentAnimation();
                                setTimeout(() => {
                                    $(".load-site").remove();
                                }, 3000);
                            }, 2500);
                        }, 2000);
                    });
                }
            }]
        });
    }

    function mouse() {
        $(window).on('mousemove', function (e) {
            let x = e.clientX / 7;
            let y = e.clientY / 14;
            console.log(x);
            $('.title__img').css('transform', 'translate(' + x + 'px,-' + y + 'px)');
        });
    }

    function gallery() {
        Fancybox.bind('[data-fancybox="gallery"]', {
            dragToClose: false,

            closeButton: "top",

            Image: {
                zoom: false,
            },

            on: {
                initCarousel: (fancybox) => {
                    const slide = fancybox.Carousel.slides[fancybox.Carousel.page];

                    fancybox.$container.style.setProperty(
                        "--bg-image",
                        `url("${slide.$thumb.src}")`
                    );
                },
                "Carousel.change": (fancybox, carousel, to, from) => {
                    const slide = carousel.slides[to];

                    fancybox.$container.style.setProperty(
                        "--bg-image",
                        `url("${slide.$thumb.src}")`
                    );
                },
            },
        });
    }

    setBarba();
    mouse();
    gallery();
});