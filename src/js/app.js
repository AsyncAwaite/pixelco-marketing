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
        if (getElement('[data-date]')) {
            flatpickr(getElement('[data-date]'), {
                inline: true,
                altFormat: "j F Y",
                dateFormat: "Y-m-d",
                locale: {
                    firstDayOfWeek: 1 // 1 represents Monday
                },
                // defaultDate: 'today',
                // minDate: firstDayOfMonth,
                // maxDate: lastDayOfMonth,
                onReady: function (selectedDates, dateStr, instance) {
                    // Get all the calendar days
                    const days = instance.calendarContainer.querySelectorAll('.flatpickr-day');

                    // Remove the "today" class from the current date
                    for (let i = 0; i < days.length; i++) {
                        if (days[i].classList.contains('today')) {
                            days[i].classList.remove('today');
                            days[i].classList.add('selected');
                        }
                    }

                },
                onChange: function (selectedDates, dateStr, instance) {

                    this._input.offsetParent.querySelector('.form-section').querySelector('[name="date"]').value = instance.calendarContainer.querySelector('.selected').ariaLabel;
                    const days = instance.calendarContainer.querySelectorAll('.flatpickr-day');
                    days.forEach(day => {
                        if (day.classList.contains('today')) {
                            day.classList.remove('today');
                        }
                    })
                }
            });

        }

        AOS.init({
            duration: 800,
            once: true,

        });
        const stringEl = getElement('[data-typing-string]');
        stringEl.style.minHeight = stringEl.offsetHeight  + 'px';
        const string = stringEl.innerText;
        stringEl.innerText = '';
        stringEl.style.opacity = 1;
        let str = string.split("");
        (function animate() {
            str.length > 0 ? stringEl.innerHTML += str.shift() : clearTimeout(running);
            let running = setTimeout(animate, 60);
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
        if (getElement('[data-date]')) {
            new Form('.form-section').init();
        }
        // getElement('[data-date]').querySelector('.selected')
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
