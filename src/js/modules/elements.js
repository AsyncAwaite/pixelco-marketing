
import {getElement} from "./helpers.js";


const header = document.querySelector("header");
const footer = document.querySelector('footer');
const headerNav = header.querySelector(".header__menu");
const modal = getElement('.modal');
const modalBody = modal.querySelector('.modal__body');
export {

  header, modal, modalBody, footer, headerNav

};
