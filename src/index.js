import Notiflix from 'notiflix';
import Api from './api.js';
import LoadMoreButton from './loadMoreBtn.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreButton('.load-more');
const api = new Api();

form.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  api.searchQuery = form.elements.searchQuery.value.trim();

  clearHtml();
  api.resetQueryPage();
  loadMoreBtn.hide();
  getQuery();

  form.reset();
}

function onLoadMore() {
  getQuery();
  // if( api.searchQuery.hits.length = api.searchQuery.total){
  //   Notiflix.Notify.info(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   )
  // }
}

async function getQuery() {
  try {
    const hits = await api.fetchQuery();

    if (hits === undefined || hits.length === 0) {
      loadMoreBtn.hide();
      throw new Error();
    }

    const markUp = await hits.reduce(
      (markUp, hit) => createPhotoCard(hit) + markUp,
      ''
    );
    loadMoreBtn.show();
    gallery.insertAdjacentHTML('beforeend', markUp);
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function clearHtml() {
  gallery.innerHTML = '';
}

function createPhotoCard({
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250px" heigth="200px" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
    `;
}
