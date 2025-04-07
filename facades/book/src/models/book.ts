export interface IBook {
    title: string;
    isbn: number;
    price: number;
    pubDate: string;
    author_name: string;
    genre: string;
  }
  


export interface IBookDetails {
  title: string;
  isbn: string;
  price: number;
  pubDate: string;
  author: {
    author_id: string;
    author_name: string;
  };
  category: {
    category_id: string;
    genre: string;
  };
}