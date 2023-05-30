import {header} from "./elements.js";
import {getElement} from "./helpers.js";

let loc = location.origin;
const headerHeight = header.offsetHeight;
const scrollToAnchor = function () {
    if (header) {
        const links = document.querySelectorAll(".scroll-to");
        links.forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();

                const blockID = link.getAttribute("href");

                if (
                    getElement(".burger") &&
                    getElement(".burger").classList.contains("active")
                ) {
                    getElement(".burger").classList.toggle("active");
                    getElement('.header__menu').classList.toggle("active");
                    header.classList.toggle('--show');
                    header.classList.toggle('--hide');
                    document.body.classList.toggle("active");

                }
                if (location.pathname.length > 1) {
                    scrollToAnotherPage(blockID, "#about");
                }
                // scrollToAnotherPage(blockID, "#about");
                window.scrollTo({
                    top: document.querySelector(`${blockID}`).offsetTop - headerHeight,
                    behavior: "smooth",
                });
            });
        });
    }
};

function scrollToAnotherPage(el, target) {
    console.log(el, target)
    if (target) {
        if (el === target) {
            location.href = `${loc}${target}`;
            window.scrollTo({
                top: document.querySelector(`${el}`).offsetTop - headerHeight,
                behavior: "smooth",
            });
        }
    } else {
        return;
    }
}

export {scrollToAnchor};
