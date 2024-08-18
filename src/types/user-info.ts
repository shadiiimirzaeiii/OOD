export type UserInfoProps = {
  image: File;
  fullName: string;
  phoneNumber: number;
  nationalCode: number;
  accessLevel: {
    id: string;
    lable: string;
  };
};
