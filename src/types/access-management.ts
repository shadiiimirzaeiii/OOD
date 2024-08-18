export type User = {
  id: string;
  name: string;
  username: string;
  role: string;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
};

export interface UserInfo {
  id: string;
  name: string;
  username: string;
  role: string;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  nationalCode: string;
  activityHistory: ActivityHistory[];
}

export interface UpdateUserBodyType {
  name: string;
  username: string;
  image: string;
  nationalCode: string;
  role: string;
}

export interface ActivityHistory {
  id: number;
  action: string;
  date: string;
  actionType: string;
  status_code: string;
  status: string;
}

export type InsertUser = {
  userId: string;
  userName: string;

  fullName: string;
  roleId: number;
  isActive: number;
};

export type TUserRoles = {
  roleId: number;
  latinName: string;
  roleName: string;
  isActive: number;
};

// export type UserInfoList = {
//   userId: number;
//   fullName: string;
//   phoneNumber: number;
//   accessLevel: TUserRoles;
// };

// export type UserInfoForm = {
//   image: File;
//   fullName: string;
//   phoneNumber: number;
//   nationalityCode: number;
//   accessLevel: TUserRoles;
// };
