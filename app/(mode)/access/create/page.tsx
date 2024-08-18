import { Flex } from '@radix-ui/themes';
import { roles } from '@/components/access-management/access-management.constant';
import ManageUserForm from '@/components/access-management/manage-user-form/ManageUserForm';

export default async function ManageUser() {
  return (
    <Flex direction={'column'} gap={'6'}>
      <ManageUserForm roles={roles} action={'create'} />
    </Flex>
  );
}
