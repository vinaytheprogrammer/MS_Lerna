import { IBook } from './book';

export interface ICategory {
    category_id?: number;
    category: string;
    books?: IBook[];
  }