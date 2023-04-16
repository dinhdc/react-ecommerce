import { ICommonResponse } from '../response-common.interface';
import { IUserDto } from '../user';

export interface IProfile extends ICommonResponse<IUserDto> {}
