import { IBook } from './book';

export interface ICategory {
    category_id?: number;
    genre: string;
    books?: IBook[];
  }