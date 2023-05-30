import {getElement, getElements} from "./helpers.js";
import smoothHeight from "./smoothHeight.js";

export default function userPage() {
    if (!getElement('.user-page')) return;
    const userPage = getElement('.usser-page');
    smoothHeight('.statistic__item', '.icon-arrow-down', '.statistic__content')
    // getElements('.statistic__item').forEach(item => {
    //     if (item.querySelector('.icon-arrow-down')){
    //
    //     }
    // })
}