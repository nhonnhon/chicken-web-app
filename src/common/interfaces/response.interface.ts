import { ClassConstructor } from 'class-transformer';
import { PaginationDto } from '../dto/pagination.dto';

export interface IResponse {
  [key: string]: any;
}

export interface IResponseOptions<T> {
  classSerialization?: ClassConstructor<T>;
}

export type IResponsePagingOptions<T> = IResponseOptions<T>;

export interface IResponsePaging<T = Record<string, any>> {
  itemCount: number;
  paginationDto: PaginationDto;
  data: T[];
}
