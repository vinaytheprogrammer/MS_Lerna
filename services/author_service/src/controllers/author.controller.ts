import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Author} from '../models';
import {AuthorRepository} from '../repositories';

export class AuthorController {
  constructor(
    @repository(AuthorRepository)
    public authorRepository : AuthorRepository,
  ) {}

  @post('/authors')
  @response(200, {
    description: 'Author model instance',
    content: {'application/json': {schema: getModelSchemaRef(Author)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author), // no exclude here
        },
      },
    })
    author: Author, // accept full Author object, including `author_id`
  ): Promise<Author> {
    return this.authorRepository.create(author);
  }
  

  @get('/authors/count')
  @response(200, {
    description: 'Author model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Author) where?: Where<Author>,
  ): Promise<Count> {
    return this.authorRepository.count(where);
  }

  @get('/authors')
  @response(200, {
    description: 'Array of Author model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Author, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Author) filter?: Filter<Author>,
  ): Promise<Author[]> {
    return this.authorRepository.find(filter);
  }

  @get('/authors/{id}')
  @response(200, {
    description: 'Author model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Author, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Author, {exclude: 'where'}) filter?: FilterExcludingWhere<Author>
  ): Promise<Author> {
    return this.authorRepository.findById(id, filter);
  }

  @del('/authors/{id}')
  @response(204, {
    description: 'Author DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.authorRepository.deleteById(id);
  }
}
