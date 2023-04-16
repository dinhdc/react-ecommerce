import { ICommonResponse } from '../response-common.interface';

export interface IDiscount {
  id: number;
  name: string;
  desc: string;
  percent: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IDiscountRequest {
  name: string;
  desc: string;
  percent: number;
  active: boolean;
}

export interface IDiscountListResponse
  extends ICommonResponse<Array<IDiscount>> {}

export interface IDiscountSingleResponse extends ICommonResponse<IDiscount> {}
