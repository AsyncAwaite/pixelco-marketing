// import Swiper from "swiper";
import Swiper from "swiper";
import SwiperCore, {Navigation, Autoplay, Lazy} from "swiper/core";

SwiperCore.use([Navigation, Autoplay, Lazy]);
import {getElement} from "./helpers.js";


export default function sliders() {
    let caseSwiper;
    casesSlider();
    howWorkYoutubeSlider();
    blogPageSlider()
    window.addEventListener('resize', () => {
        casesSlider();
    })

    function lastNewsSlider() {
        if (!getElement('.last-news__wrapper')) return;
        let lastNewsSwiper = new Swiper(
            getElement('.last-news__wrapper'),
            {
                slidesPerView: 2,
                spaceBetween: 20,
                preloadImages: false,
                centeredSlides: true,
                lazy: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: ".last-news-swiper-next",
                    prevEl: ".last-news-swiper-prev",
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        centeredSlides: false
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        centeredSlides: true
                    },
                },
            }
        );
    }

    function howWorkYoutubeSlider() {
        if (!getElement('[data-swiper="how-work-youtube"]')) return;
        let howWorkYoutubeSwiper = new Swiper(
            getElement('[data-swiper="how-work-youtube"]'),
            {
                slidesPerView: 1.15,
                spaceBetween: 30,
                breakpoints: {

                    600: {
                        slidesPerView: 2.1,
                        centeredSlides: false
                    },
                    993: {
                        slidesPerView: 3,
                        centeredSlides: false
                    },

                },
            }
        );
    }
    function blogPageSlider() {
        if (!getElement('[data-swiper="blog-page"]')) return;
        let howWorkYoutubeSwiper = new Swiper(
            getElement('[data-swiper="blog-page"]'),
            {
                slidesPerView: 1.15,
                spaceBetween: 30,
                breakpoints: {

                    600: {
                        slidesPerView: 2.1,
                        centeredSlides: false
                    },
                    993: {
                        slidesPerView: 4,
                        centeredSlides: false
                    },

                },
            }
        );
    }

    function lotGallerySlider() {
        if (!getElement('.single-lot__slider')) return;
        let moreLotsSwiper = new Swiper(
            getElement('.single-lot__slider'),
            {
                slidesPerView: 4,
                spaceBetween: 20,
                preloadImages: false,
                lazy: true,
                // loop: true,
                // autoplay: {
                //     delay: 5000,
                // },
                navigation: {
                    nextEl: ".single-lot__slider-next",
                    prevEl: ".single-lot__slider-prev",
                },
                watchSlidesProgress: true,
                breakpoints: {
                    1025: {
                        slidesPerView: 4,
                    },
                    800: {
                        slidesPerView: 3,
                    },

                    576: {
                        slidesPerView: 2,

                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        centeredSlides: true
                    },
                },
            }
        );
    }

    function casesSlider() {
        if (!getElement('[data-swiper="cases"]')) return;
        if (screen.width <= 992) {

            caseSwiper = new Swiper(
                getElement('[data-swiper="cases"]'),
                {
                    slidesPerView: 1.1,
                    spaceBetween: 16,
                    preloadImages: false,
                    lazy: true,
                    watchSlidesProgress: true,
                    breakpoints: {
                        576: {
                            slidesPerView: 1.5,
                            centeredSlides: false
                        },

                    },
                }
            );


        } else {
            if (caseSwiper) {
                caseSwiper.destroy();
            }
            return;
        }
    }

    function mainScreenSwiper() {
        if (!getElement('[data-main-screen-lots-swiper]')) return;


        let mainScreenSlider = new Swiper(
            getElement('[data-main-screen-lots-swiper]'),
            {
                slidesPerView: 2.8,

                spaceBetween: 20,
                preloadImages: false,
                loop: true,
                lazy: true,
                watchSlidesProgress: true,
                // allowTouchMove: false,
                navigation: {
                    nextEl: ".main-screen-lots-swiper-next",
                    prevEl: ".main-screen-lots-swiper-prev",
                },
                breakpoints: {
                    1920: {
                        slidesPerView: 4.3,
                    },
                    1600: {
                        slidesPerView: 3.1,
                    },
                    1024: {
                        slidesPerView: 2.8,
                    },
                    768: {
                        slidesPerView: 1.9,
                        spaceBetween: 15,
                    },
                    500: {
                        slidesPerView: 1.9,
                        spaceBetween: 10,
                    },

                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 5,
                    },

                },

            }
        );

    }
}

