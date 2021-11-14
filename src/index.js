import './css/common.css';
import apiServise from './js/apiService';
import cardsGallery from './templates/gallery-card.hbs';
import * as PNotify from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/BrightTheme.css";
import largeImgModal from './js/largeImgModal';
import { throttle } from 'lodash';

const myStack = new PNotify.Stack({
    dir1: "up",
  });
  
function onError() {
    return PNotify.notice({
            text: "Please, enter a correct request!",
            title: 'ERROR!',
            stack: myStack,
            closer: false,
            sticker: false,
            hide: true,
            delay: 500,
            remove: true,
            modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
          });
  }

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};    

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', loadMore);


function clearListItems() {
    refs.gallery.innerHTML = '';
    myStack.close(true);
  }

function onSearch(element) {
  element.preventDefault();
  apiServise.searchQuerry = element.currentTarget.elements.query.value.trim();
  if (!apiServise.query) return onError();
  clearListItems();
  apiServise.resetPage();
  fetchGallery();
}

function fetchGallery() {
    apiServise.fetchArticles().then(hits => {
    refs.gallery.insertAdjacentHTML('beforeend', cardsGallery(hits));

    if (data.length <= 0) return onError();
    if (data.length <= 12) return;
  })
  .then(largeImgModal()) 
  .catch(onError);
}

function scroll() {
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
}

window.addEventListener('scroll', throttle(() => {
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 200) {
        loadMore();
    }
}, 500))

function loadMore() {
    fetchGallery()
    scroll();
  };