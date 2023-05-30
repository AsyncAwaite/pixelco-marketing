import {header, headerNav} from "./elements.js";

const burgerItem = header.querySelector(".burger");
const burger = () => {
    // if (header) {
    //
    //
    //     if (screen.availWidth <= 1024) {
    //         header.classList.add('--hide')
    //     }
    burgerItem.addEventListener("click", toggleMenu);
    // }
};

function toggleMenu() {
    burgerItem.classList.toggle("active");
    header.classList.toggle('--hide');
    header.classList.toggle('--show');
    headerNav.classList.toggle("active");
    document.body.classList.toggle("active");



}

export default burger;
export {toggleMenu}
