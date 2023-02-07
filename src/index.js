import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let queryPage = 1;
let inputValue = '';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;

  inputValue = form.elements.searchQuery.value;

  clearHtml();

  getQuery(inputValue)
    .then(({ hits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      return hits.reduce((markUp, hit) => createPhotoCard(hit) + markUp, '');
    })
    .then(markUp => gallery.insertAdjacentHTML('beforeend', markUp))
    .catch(err => console.log(err));

  form.reset();
}

function onLoadMore() {
  getQuery(inputValue)
    .then(({ hits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      return hits.reduce((markUp, hit) => createPhotoCard(hit) + markUp, '');
    })
    .then(markUp => gallery.insertAdjacentHTML('beforeend', markUp))
    .catch(err => console.log(err));
}

function clearHtml() {
  gallery.innerHTML = '';
}

function getQuery(query) {
  const URL = 'https://pixabay.com/api/';
  const KEY = '33416863-96243ffb58b5be25ce0deadef';

  if (inputValue === '') {
    return;
  }

  return fetch(
    `${URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${queryPage}`
  )
    .then(res => res.json())
    .then(data => {
      queryPage += 1;
      return data;
    });
}

function createPhotoCard({
  webformatURL,
  largeImageURL,
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
