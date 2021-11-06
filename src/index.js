// import сardsGallery from './templates/gallery-card.hbs';
// import ApiService from './js/apiService'; 
// import LoadMoreBtn from './js/load-more-btn';
// // import './css/common.css';

// const refs = {
//     searchForm: document.querySelector('.search-form'),
//     articlesContainer: document.querySelector('.gallery'),
//   };
//   const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
//   });
//   const apiService = new ApiService();
  
//   refs.searchForm.addEventListener('submit', onSearch);
//   loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
  
//   function onSearch(e) {
//     e.preventDefault();
  
//     apiService.query = e.currentTarget.elements.query.value;
  
//     if (apiService.query === '') {
//       return alert('Введи что-то нормальное');
//     }
  
//     loadMoreBtn.show();
//     apiService.resetPage();
//     clearArticlesContainer();
//     fetchArticles();
//   }
  
//   function fetchArticles() {
//     loadMoreBtn.disable();
//     apiService.fetchArticles().then(articles => {
//       appendArticlesMarkup(articles);
//       loadMoreBtn.enable();
//     });
//   }
  
//   function appendArticlesMarkup(articles) {
//     refs.articlesContainer.insertAdjacentHTML('beforeend', сardsGallery(articles));
//   }
  
//   function clearArticlesContainer() {
//     refs.articlesContainer.innerHTML = '';
//   }



import apiServise from './js/apiService';
import cardsGallery from './templates/gallery-card.hbs';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};    

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function onSearch(element) {

  element.preventDefault();

  const form = element.currentTarget;
  const input = form.elements.query;

  clearListItems();

  apiServise.resetPage();
  apiServise.searchQuerry = input.value;

  apiServise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
  });
  input.value = '';
}

function loadMoreBtnHandler() {
    apiServise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);

    window.scrollTo(0, 1000);

    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
    // const element = document.getElementById('.my-element-selector');
    // element.scrollIntoView(0, 1000);

    // element.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    //   });
  });
}

function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function buildListItemsTemplate(items) {
  return cardsGallery(items);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}




// key: 563492ad6f91700001000001346204d6cc5d4973a3d0c717f03cff8
// https://api.pexels.com/v1/search?query=people

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=24210737-3b0bc435d65d70e1c06573fda
