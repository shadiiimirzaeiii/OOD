import { ApiManager } from '@/libs/http/axios.config';
import { UpdateUserBodyType, User, UserInfo } from '@/types/access-management';
import { GetUserById, UpdateUser, UserList, UserRoles } from './routes';
import { ApiData } from './utils';

export const getUsers = async (role: string | undefined) => {
  const res = await ApiManager.get<ApiData<User[]>>(role ? UserList + `/?role=${role}` : UserList);

  return res.data.data;
};

export const getUser = async (id: string) => {
  const res = await ApiManager.get<ApiData<UserInfo>>(UserList + `/${id}`);

  return res.data.data;
};

export const getRoles = async () => {
  const res = await ApiManager.get<ApiData<TUserRoles[]>>(UserRoles);
  return res.data;
};

export const createUser = async (data: UpdateUserBodyType) => {
  // TODO: fix Api Data type
  return await ApiManager.post<ApiData<any>>(UserList, data);
};

export const updateUser = async (id: string, data: UpdateUserBodyType) => {
  // TODO: fix Api Data type
  return await ApiManager.patch<ApiData<any>>(UserList + '/' + id, data);
};

export type TUserRoles = {
  roleId: number;
  latinName: string;
  roleName: string;
  isActive: number;
};
