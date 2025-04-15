// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { getImagesByQuery } from './js/pixabay-api.js';
// import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-function.js';

// const form = document.querySelector('.form');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const query = event.target.elements['search-text'].value.trim();

//   if (!query) {
//     iziToast.warning({
//       title: 'Warning',
//       message: 'Please enter a search query.',
//       position: 'topRight',
//     });
//     return;
//   }

//   clearGallery();
//   showLoader();

//   try {
//     const images = await getImagesByQuery(query);
//     hideLoader();

//     if (images.length === 0) {
//       iziToast.error({
//         title: 'Error',
//         message: 'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//       });
//       return;
//     }

//     createGallery(images);
//   } catch (error) {
//     hideLoader();
//     iziToast.error({
//       title: 'Error',
//       message: 'Failed to fetch images. Please try again later.',
//       position: 'topRight',
//     });
//   }
// });



import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-function.js";
import { getImagesByQuery } from "./js/pixabay-api.js";





const form = document.querySelector(".form");
const userInput = document.querySelector("input[name='search-text']");
const gallery = document.querySelector(".gallery");
document.querySelector('.loader').style.display = 'none';
const loadMore = document.querySelector('.load-more')
form.addEventListener("submit", handleSubmit);

loadMore.addEventListener('click', onLoadMore);


let page = 1;
let lightbox = null;

function handleSubmit(event) {
    event.preventDefault();
    const query = userInput.value.trim();
    if (!query) return;

    page = 1;
    clearGallery();
    showLoader();

    getImagesByQuery(query, page)
        .then(response => {
            hideLoader();

            if (!response.data.hits || response.data.hits.length === 0) {
                iziToast.warning({
                    title: "No Results",
                    message: "No images found for your query. Try something else!",
                    position: "topRight"
                });
                return;
            }
            
            gallery.innerHTML = createGallery(response.data.hits);
            loadMore.style.display = 'block';

            const maxPages = Math.ceil(response.data.totalHits / 15);
            if (page < maxPages) {  
                loadMore.classList.remove("load-more-hidden");
                loadMore.classList.add("load-more");
            } else {  
                loadMore.classList.remove("load-more");
                loadMore.classList.add("load-more-hidden");

                iziToast.info({
                    title: "End of Results",
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight"
                });
            }

            if (lightbox) {
                 lightbox.refresh();
            } else {
                 lightbox = new SimpleLightbox('.gallery a', { captions: true, captionDelay: 250, close: true });
            }
        })
        .catch(error => {
            hideLoader();
            console.error(error);
            iziToast.error({
                title: "Error",
                message: "Sorry, something went wrong. Please try again!",
                position: "topRight"
            });
        });
}




function onLoadMore() {
    page++;
    loadMore.disabled = true;
    showLoader();
    
    getImagesByQuery(userInput.value.trim(), page)
        .then(response => {
            hideLoader();
            gallery.insertAdjacentHTML('beforeend', createGallery(response.data.hits));
            loadMore.disabled = false;

            const maxPages = Math.ceil(response.data.totalHits / 15);

            if (!response.data.hits || response.data.hits.length === 0 || page >= maxPages) {
                loadMore.classList.remove("load-more");
                loadMore.classList.add("load-more-hidden");
                iziToast.info({
                    title: "End of Results",
                    message: "You've reached the end of search results.",
                    position: "topRight"
                });
            }
            const cards = document.querySelectorAll(".gallery-item");
            if (cards.length === 0) return;
            const cardsHeight = cards[cards.length - 1].getBoundingClientRect().height;
            window.scrollBy({
                left: 0,
                top: cardsHeight * 2,
                behavior: "smooth",
            });

            if (lightbox) {
                lightbox.refresh();
            }
        })
        .catch(error => {
            hideLoader();
            loadMore.classList.remove("load-more");
            loadMore.classList.add("load-more-hidden");
            loadMore.style.display = 'none';
            iziToast.error({
                title: "Error",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
        });
}