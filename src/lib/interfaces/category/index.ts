import { ICommonResponse } from '../response-common.interface';

export interface ICreateCategory {
  name: string;
  desc: string;
}

export interface ICategory {
  id: number;
  name: string;
  desc: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
}

export interface ICategoryResponse extends ICommonResponse<Array<ICategory>> {}
