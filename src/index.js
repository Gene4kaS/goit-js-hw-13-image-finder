import './css/common.css';
import apiServise from './js/apiService';
import cardsGallery from './templates/gallery-card.hbs';
import * as PNotify from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/BrightTheme.css";

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
    modal: document.getElementById('modal-js'),
    largeImg: document.querySelector('.image-large'),
};    

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', showLargeImg);
refs.modal.addEventListener('click', () => {
  refs.modal.style.display = 'none';
  setAttrImg('', '', 'hidden');
});
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
  fetchGallery();

  if (!apiServise.searchQuerry.trim()) {
    return alert('ENTRY ERROR');
  }
}

function fetchGallery() {
    apiServise.fetchArticles().then(hits => {
        refs.gallery.insertAdjacentHTML('beforeend', cardsGallery(hits));
  })
  .catch(console.log(onError()));
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

// [].forEach.call(document.getElementsByClassName('number'), e => 
// e.textContent = e.textContent.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

function showLargeImg(element) {
    if (!element.target.dataset.src) return;
    refs.modal.style.display = 'flex';
    setAttrImg(element.target.dataset.src, element.target.alt, 'show');
  }
  
  function setAttrImg(src, alt, status) {
    refs.largeImg.src = src;
    refs.largeImg.alt = alt;
    if (status === 'show') 
         refs.largeImg.classList.add('js-show');
    else refs.largeImg.classList.remove('js-show');
    return;
  }
  
