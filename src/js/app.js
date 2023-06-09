"use strict";
import * as flsFunctions from "./modules/functions.js";
import Form from "./modules/Form.js";
import AOS from "aos";
import {header, footer} from "./modules/elements.js";
import burger from "./modules/burger.js";
import {scrollToAnchor} from "./modules/scrollToAnchor.js";
import Modal from "./modules/modal.js";
import sliders from "./modules/sliders.js";
import renderSpeakers from "./modules/speakers.js";
import handleMarquee from "./modules/handleMarquee.js";
import pages from "./modules/pages.js";
import {getElement, getElements} from "./modules/helpers.js";
import dropdown from "./modules/dropdown.js";
import modalsEvents from "./modules/modalsEvents.js";
import userPage from "./modules/userPage.js";
import smoothHeight from "./modules/smoothHeight.js";
import {Datepicker} from 'vanillajs-datepicker';
import flatpickr from "flatpickr";

flsFunctions.isWebp();
document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
window.addEventListener('resize', function () {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
});
window.addEventListener('scroll', function () {
    scrollBar();
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
});
window.addEventListener("DOMContentLoaded", () => {
    try {
        // const currentDate = new Date();
        // const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        //
        function debounce(func, delay) {
            let timeoutId;

            return function () {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(func, delay);
            };
        }

        function stickyElement(element, parent = null) {
            let stickyParent = element.parentElement;
            if (parent) {
                stickyParent = parent;
            }
            const offsetHeight = stickyParent.offsetHeight - element.offsetHeight;
            const headerOffsetHeight = getElement('header').offsetHeight;
            const sectionOffsetTop = element.closest('section').offsetTop;
            const handleScroll = debounce(() => {
                const progress = scrollY - sectionOffsetTop + headerOffsetHeight;

                if (progress > 0) {
                    const parentOffsetTop = stickyParent.offsetTop;

                    if (parentOffsetTop <= progress ) {
                        const topValue = progress - parentOffsetTop;
                        if (topValue  <= offsetHeight) {
                            let value = topValue + 60
                            if (topValue >= 60) {
                                element.style.transform = `translateY(${value}px)`;
                            }
                            if (value <= 70) {
                                element.style.transform = `translateY(0px)`;
                            }

                        }

                    }
                }
            }, 0);
            window.addEventListener('scroll', handleScroll);
        }

        if (screen.width >= 993) {
            if (getElement('.sticky')) {

                getElements('.sticky').forEach(element => {
                    if (element.classList.contains('sticky-website')) {

                        stickyElement(element, element.closest('.container'))
                        return
                    }
                    stickyElement(element)
                })

            }

            if (getElement('.submenu')) {
                let scrollPosition = null;
                getElement('.submenu').querySelector('[data-submenu]').addEventListener('click', () => {
                    if (!scrollPosition) {
                        scrollPosition = scrollY || document.documentElement.scrollTop;
                    }
                    if (header.querySelector('.menu').classList.contains('active')) {
                        document.body.style.position = 'relative';
                        document.body.style.top = '0';
                        window.scrollTo(0, scrollPosition);
                        scrollPosition = null;
                        header.querySelector('.menu').classList.remove('active')
                    } else {
                        header.querySelector('.menu').classList.add('active')
                        document.body.style.position = 'fixed';
                        document.body.style.top = `-${scrollPosition}px`;

                    }

                })
            }
        } else {
            if (getElement('.submenu')){
                smoothHeight('.submenu', '[data-submenu]', '.submenu__menu > .row')
            }
        }


        AOS.init({
            duration: 800,
            once: true,
        });
        const stringEl = getElement('[data-typing-string]');
        if (stringEl) {
            stringEl.style.minHeight = stringEl.offsetHeight + 'px';
            const string = stringEl.innerText;
            stringEl.innerText = '';
            stringEl.style.opacity = 1;
            let str = string.split("");
            (function animate() {
                str.length > 0 ? stringEl.innerHTML += str.shift() : clearTimeout(running);
                let running = setTimeout(animate, 60);
            })();
        }

        scrollToAnchor();

        burger();
        headerFixed();
        sliders();
        smoothHeight('.services-item', '.services-item__btn', '.services-item__content')
        getElements('[data-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                modalsEvents(btn);
                new Modal(".modal").openModal();
            })
        })
        if (getElement('.form-section')) {
            new Form('.form-section').init();
        }
        if (getElement('.audit-form')) {
            new Form('.audit-form').init();
        }


    } catch (e) {
        console.log(e);
    }
});


function headerFixed() {
    if (header) {
        let lastScrollPosition = 0;

        if (scrollY >= header.clientHeight - 30) {
            header.classList.add("--fixed");
        }
        window.addEventListener("scroll", () => {
            let currentScrollPosition = scrollY || document.documentElement.scrollTop;

            try {
                if (scrollY >= header.clientHeight - 30) {
                    header.classList.add("--fixed");
                    if (currentScrollPosition > lastScrollPosition) {
                        header.classList.remove("header-visible");
                        header.classList.add("header-hidden");
                    } else {
                        header.classList.remove("header-hidden");
                        header.classList.add("header-visible");
                    }
                    lastScrollPosition = currentScrollPosition;
                } else {
                    header.classList.remove("--fixed");
                }
            } catch (e) {
                console.log(e);
            }
        });

    }
}

//
function scrollBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    getElement('#progress-bar').style.width = scrolled + "%";
}
