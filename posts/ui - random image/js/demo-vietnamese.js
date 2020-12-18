import VIETNAMESE_GIRLS from '../data/vietnamese-girls.js';

document.querySelector('#theVietnameseImage').src = VIETNAMESE_GIRLS[CommonUtils.getRandomIndex(VIETNAMESE_GIRLS.length)];
