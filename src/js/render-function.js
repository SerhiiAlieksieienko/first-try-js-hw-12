import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const gallery = document.querySelector('.gallery');

export function createGallery(images) {
  const galleryMarkup = images
    .map(img => {
      return `
      <li class="gallery-item">
            <a class="gallery-link" href = '${img.largeImageURL}'> 
                <img class="gallery-image" src = '${img.webformatURL}' alt = '${img.tags}' width = '360'>
            </a>
            <div class = 'info'>
                <div class='descr'><h3>Likes</h3><p>${img.likes}</p></div>
                <div class='descr'><h3>Views</h3><p>${img.views}</p></div>
                <div class='descr'><h3>Comments</h3><p> ${img.comments}</p></div>
                <div class='descr'><h3>Downloads</h3><p>${img.downloads}</p></div>
            </div>
       </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

const loader = document.querySelector('.loader');

export function showLoader() {
  loader.classList.add('is-active');
}

export function hideLoader() {
  loader.classList.remove('is-active');
}

export const loadMore = document.querySelector('.load-more');

export function showLoadMoreButton() {
  loadMore.classList.add('is-active');
}

export function hideLoadMoreButton() {
  loadMore.classList.remove('is-active');
}






// import 'simplelightbox/dist/simple-lightbox.min.css';


// export function createGallery(images) {
//     return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
//         <li class="gallery-item">
//             <a href="${largeImageURL}" class="gallery-link">
//                 <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//             </a>
//             <div class="info">
//                 <p class="info-item"><b>Likes:</b> ${likes}</p>
//                 <p class="info-item"><b>Views:</b> ${views}</p>
//                 <p class="info-item"><b>Comments:</b> ${comments}</p>
//                 <p class="info-item"><b>Downloads:</b> ${downloads}</p>
//             </div>
//         </li>
//     `).join('');
// }


// export function clearGallery() {
//     const galleryElement = document.querySelector('.gallery');
//     if (galleryElement) {
//         galleryElement.innerHTML = "";
//     }
// }



// export function showLoader() {
//     const loader = document.querySelector('.loader');
//     if (loader) {
//         console.log("loader on");
//         loader.classList.add('visible');
//     }
// }



// export function hideLoader() {
//     const loader = document.querySelector('.loader');
//     if (loader) {
//         console.log("loader off");
//         loader.classList.remove('visible');
//     }
// }