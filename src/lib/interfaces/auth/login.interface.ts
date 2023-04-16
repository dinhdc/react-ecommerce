import { ICommonResponse } from '../response-common.interface';

export interface ILoginResponse
  extends ICommonResponse<{ accessToken: string }> {}
