import axios from 'axios';
const API_KEY = '29796536-5ed99ce8effe96d6d69c656a8';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 10,
    });

    const url = `${BASE_URL}?${params}`;

    try {
      const response = axios.get(url);
      const arrayOfObjects = response.data.hits;
      //   const totalHits = response.data.totalHits;
      this.incrementPage();
      this.totalHits = totalHits;

      console.log(arrayOfObjects);

      return arrayOfObjects;
    } catch (error) {
      console.log('ERROR: ', console.log(error));
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
