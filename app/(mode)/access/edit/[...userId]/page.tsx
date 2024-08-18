import { Flex } from '@radix-ui/themes';
import { getUser } from '@/apis/user';
import { roles } from '@/components/access-management/access-management.constant';
import ManageUserForm from '@/components/access-management/manage-user-form/ManageUserForm';

export default async function ManageUser({ params: { userId } }: { params: { userId: string } }) {
  const userData = await getUser(userId);

  return (
    <Flex direction={'column'} gap={'6'}>
      <ManageUserForm roles={roles} UserInfo={userData} action={'update'} />
    </Flex>
  );
}
