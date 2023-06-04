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
        if (screen.width >= 577) {
            window.addEventListener('scroll', () => {
                if (getElement('.sticky')) {
                    let offset = scrollY - getElement('.sticky').offsetParent.offsetTop;
                    if (offset > 0 && offset < getElement('.sticky').parentElement.offsetHeight - getElement('.sticky').offsetHeight) {
                        offset = scrollY - getElement('.sticky').offsetParent.offsetTop;
                        getElement('.sticky').style.top = `calc(${offset}px + var(--section-padding))`;
                    }
                }

            })
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
        if (scrollY >= header.clientHeight) {
            header.classList.add("--fixed");
        }
        window.addEventListener("scroll", () => {
            try {
                if (scrollY >= header.clientHeight) {
                    header.classList.add("--fixed");
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
