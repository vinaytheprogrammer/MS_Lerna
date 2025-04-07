import {Entity, model, property} from '@loopback/repository';

@model()
export class Author extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  author_name: string;

  @property({
    type: 'number',
    required: true,
  })
  isbn: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  author_id?: number;


  constructor(data?: Partial<Author>) {
    super(data);
  }
}

export interface AuthorRelations {
  // describe navigational properties here
}

export type AuthorWithRelations = Author & AuthorRelations;
