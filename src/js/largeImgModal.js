  
export default function largeImgModal() {
  const dataSource = [];

    const refs = {
        galleryCards: document.querySelector('.gallery'),
        galleryModal: document.querySelector('.js-lightbox'),
        backdropOverlay: document.querySelector('.lightbox__overlay'),
        imageLightBox: document.querySelector('.lightbox__image'),
        closeLightBox: document.querySelector('[data-action="close-lightbox"]'),
    }

  refs.galleryCards.addEventListener('click', onPictureClick);
  refs.galleryModal.addEventListener('click', onModalClick);
  refs.closeLightBox.addEventListener('click', onCloseLightBoxClick);

  function onPictureClick(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains('gallery__image')) {
      return;
    }
    refs.galleryModal.classList.add('is-open');
    refs.imageLightBox.src = evt.target.dataset.source;
}

function onCloseLightBoxClick() {
    refs.galleryModal.classList.remove('is-open');
    refs.imageLightBox.src = '';
  };
  
function onModalClick(evt) {
    if (refs.backdropOverlay === evt.target) {
        onCloseLightBoxClick();
    }
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        onCloseLightBoxClick();
      }
    })
  }
