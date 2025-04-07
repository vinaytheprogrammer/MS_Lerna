import { IBook } from './book';

export interface IAuthor {
    author_id?: number;
    author_name: string;
    books?: IBook[]; // Assuming you have a corresponding IBook interface
  }
  