export interface ICommonResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
