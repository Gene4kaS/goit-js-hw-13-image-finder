import './css/common.css';
import apiServise from './js/apiService';
import cardsGallery from './templates/gallery-card.hbs';
import * as PNotify from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/BrightTheme.css";
import largeImgModal from './js/largeImgModal';

const myStack = new PNotify.Stack({
    dir1: "up",
  });
  
function onError() {
    return PNotify.notice({
            text: "Please, enter a correct request!",
            stack: myStack,
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
  apiServise.searchQuerry = element.currentTarget.elements.query.value;

  clearListItems();
  apiServise.resetPage();
//   numberWithSpaces();

  if (!apiServise.searchQuerry.trim()) {
    return alert('ENTRY ERROR');
  }
}

function fetchGallery() {
    apiServise.fetchArticles().then(hits => {
        refs.gallery.insertAdjacentHTML('beforeend', cardsGallery(hits));
  })
  .then(largeImgModal()) 
  .catch(onError());
}

function scroll() {
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
}

document.addEventListener('scroll', () => {
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 200) {
        loadMore();
    }
})

function loadMore() {
    fetchGallery()
    scroll();
  };

