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
        AOS.init({
            duration: 800,
            once: true,

        });
        const stringEl = getElement('[data-typing-string]');
        stringEl.style.minHeight = stringEl.offsetHeight / 100 + 'rem';
        const string = stringEl.innerText;
        stringEl.innerText = '';
        stringEl.style.opacity = 1;
        let str = string.split("");
        (function animate() {
            str.length > 0 ? stringEl.innerHTML += str.shift() : clearTimeout(running);
            let running = setTimeout(animate, 50);
        })();
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
        if (getElement('.audit-form')) {
            new Form('.audit-form').init();
        }


    } catch (e) {
        console.log(e);
    }
});

//

function calculateMaxHeight(element, clazz = '[data-lot-name]') {
    let maxHeight = 0;
    element.querySelectorAll(clazz).forEach(item => {
        const slideHeight = item.offsetHeight;
        if (slideHeight > maxHeight) {
            maxHeight = slideHeight;
        }
    });
    return maxHeight

}


//
function changeMainScreenDecorHeight(element) {
    let maxHeight = window.innerWidth < 480 ? calculateMaxHeight(element) + 75 : calculateMaxHeight(element);
    document.body.style.setProperty('--main-screen-decor-height', `${element.offsetHeight + element.offsetTop - maxHeight}px`);

}

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
