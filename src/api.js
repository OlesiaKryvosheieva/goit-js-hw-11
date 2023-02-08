// import axios from 'axios';

export default class Api {
  constructor() {
    this.queryPage = 1;
    this.searchQuery = '';
  }

  async fetchQuery() {
    const URL = 'https://pixabay.com/api/';
    const KEY = '33416863-96243ffb58b5be25ce0deadef';

    if (this.searchQuery === '') {
      return;
    }

    const response = await fetch(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.queryPage}`
    );

    const pictures = await response.json();

    this.queryPage += 1;
    return pictures.hits;

    // return axios.get(`${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.queryPage}`
    // )
    //   .then(data => {
    //     this.queryPage += 1;
    //     return data;
    //   });
  }

  resetQueryPage() {
    this.queryPage = 1;
  }
}
