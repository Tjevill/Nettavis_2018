// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Article {
  id: number;
  headline: string;
  content: string;
  published: any;
  url: string;
  category: string;
  importancy: string;
}

class ArticleService {
  getAll(): Promise<Article[]> {
    return axios.get('/getNews');
  }

  getOne(id: number): Promise<Article> {
    return axios.get('/getOneNews/' + id);
  }

  getPriOne(): Promise<Article[]> {
    return axios.get('/getPriorityOne');
  }

  getHeadlines(): Promise<Article[]> {
    return axios.get('/getHeadlines');
  }

  getCategories(): Promise<Article[]> {
    return axios.get('/getCategories');
  }

  getOneCategory(category: string): Promise<Article[]> {
    return axios.get('/getCategory/' + category);
  }
}

export let articleService = new ArticleService();
