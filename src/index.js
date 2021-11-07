import './css/common.css';
import apiServise from './js/apiService';
import cardsGallery from './templates/gallery-card.hbs';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};    

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function clearListItems() {
    refs.gallery.innerHTML = '';
  }

function onSearch(element) {
  element.preventDefault();
  const form = element.currentTarget;
  const input = form.elements.query;
  clearListItems();

  apiServise.resetPage();
  apiServise.searchQuerry = input.value;

  if (!apiServise.searchQuerry.trim() || apiServise.searchQuerry === '') {
    return alert('ENTRY ERROR');
  }

  apiServise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    useListItems(markup);
  });
  input.value = '';

}

function useListItems(items) {
    refs.gallery.insertAdjacentHTML('beforeend', items);
   scrollInto(); 
  }

  function buildListItemsTemplate(items) {
    return cardsGallery(items);
  }

function loadMoreBtnHandler() {
    apiServise.fetcArticles()
    .then(hits => {
    const markup = buildListItemsTemplate(hits);
    useListItems(markup);
  })
  .catch(hits => alert(`Error: ${hits}`));
}

function scrollInto() {
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
}


// window.addEventListener('scroll', () => {
//     const documentRect = document.documentElement.getBoundingClientRect();
//     if (documentRect.bottom < document.documentElement.clientHeight + 200) {
//         apiServise.page++;
//         cardsGallery(items);
//     }
    
// })

// [].forEach.call(document.getElementsByClassName('number'), e => 
// e.textContent = e.textContent.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));


// key: 563492ad6f91700001000001346204d6cc5d4973a3d0c717f03cff8
// https://api.pexels.com/v1/search?query=people
