// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const gallery = document.querySelector('.gallery');
// const loader = document.querySelector('.loader');
// const loadMore = document.querySelector('.load-more');

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// export function createGallery(images) {
//   const markup = images.map(
//     ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
//       <li class="gallery-item">
//         <a href="${largeImageURL}">
//           <img src="${webformatURL}" alt="${tags}" />
//         </a>
//         <div class="info">
//           <p>Likes: ${likes}</p>
//           <p>Views: ${views}</p>
//           <p>Comments: ${comments}</p>
//           <p>Downloads: ${downloads}</p>
//         </div>
//       </li>
//     `
//   ).join('');

//   gallery.innerHTML = markup;
//   lightbox.refresh();
// }

// export function clearGallery() {
//   gallery.innerHTML = '';
// }

// export function showLoader() {
//   loader.classList.add('is-active');
// }

// export function hideLoader() {
//   loader.classList.remove('is-active');
// }

// export function showLoadMoreButton() {
//   loadMore.classList.add('load-more');
// }

// export function hideLoadMoreButton() {
//   loadMore.classList.remove('load-more-hidden');
// }



import 'simplelightbox/dist/simple-lightbox.min.css';




export function createGallery(images) {
    return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a href="${largeImageURL}" class="gallery-link">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b> ${likes}</p>
                <p class="info-item"><b>Views</b> ${views}</p>
                <p class="info-item"><b>Comments</b> ${comments}</p>
                <p class="info-item"><b>Downloads</b> ${downloads}</p>
            </div>
        </li>
    `).join('');
}


export function clearGallery() {
    const galleryElement = document.querySelector('.gallery');
    if (galleryElement) {
        galleryElement.innerHTML = "";
    }
}



export function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        console.log("loader on");
        loader.classList.add('visible');
    }
}



export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        console.log("loader off");
        loader.classList.remove('visible');
    }
}