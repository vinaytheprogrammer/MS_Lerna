import { IAuthor } from './author';
import { ICategory } from './category';

export interface IBook {
    title: string;
    isbn: number;
    price: number;
    author_id: number;
    category_id: number;
    pubDate: string;
    author?: IAuthor;       // Optional, if populated with relations
    category?: ICategory;   // Optional, if populated with relations
  }
  