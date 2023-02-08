import axios from 'axios';

export default class Api {
  constructor() {
    this.queryPage = 1;
    this.searchQuery = '';
    this.perPage = 40;
    this.lastSearchQuery = '';
  }

  async fetchQuery() {
    const URL = 'https://pixabay.com/api/';
    const KEY = '33416863-96243ffb58b5be25ce0deadef';
    this.lastSearchQuery  = this.searchQuery;
    if (this.searchQuery === '') {
      return ;
    }

    const response = await axios.get(
      `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.queryPage}`
    );

    this.queryPage += 1;

    const info = {
      arrayOfhits: response.data.hits,
      numberOfTotalHits: response.data.totalHits,
    };
    return info;
  }

  resetQueryPage() {
    this.queryPage = 1;
  }
}
