import ImagesService from './images-service';

const refs = {
  searchForm: document.querySelector('#js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('.js-load-more'),
};
const imageService = new ImagesService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imageService.query = e.currentTarget.elements.searchQuery.value;
  imageService.resetPage();
  imageService.fetchArticles().then(appendArticlesMarkup);
}

function onLoadMore() {
  imageService.fetchArticles();
}

function appendArticlesMarkup(arrayOfObjects) {
  const markup = arrayOfObjects
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <div class="photo-card">
      <a href="${webformatURL}">
      <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
      </a>
  <div class="info">
    <p class="info-item">
      <b>Likes<span>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views<span>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments<span>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads<span>${downloads}</span></b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
}
