
const BASE_URL = 'https://pixabay.com/api/';

export default {
    page: 1,
    query: '',
    async fetcArticles(query) {
        console.log(this);
      const API_KEY = '24210737-3b0bc435d65d70e1c06573fda';
      const requestparams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${API_KEY}`;
      const res = await fetch(BASE_URL + requestparams);
      const parseRes = await res.json();
      this.incrementPage();
      return parseRes.hits;
    },
    
      incrementPage() {
        this.page += 1;
        console.log(this);

      },
    
      resetPage() {
        this.page = 1;
      },
    
      get searchQuery() {
        return this.query;
        
      },
    
      set searchQuery(newQuery) {
        this.query = newQuery;

          }
    }
    