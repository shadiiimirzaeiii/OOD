import { getAllRequests } from '@/apis/request';
import RequestList from '@/components/request/list/request-list/RequestList';
import PageTitle from '@/components/shared/page-title/PageTitle';

const getRequests = async () => {
  const res = await getAllRequests({
    page: 1,
    limit: 5,
  });

  return res;
};

export default async function RequestlistPage() {
  const requests = await getRequests();
  return (
    <>
      <PageTitle title='درخواست ها' />
      <RequestList initialData={requests.data.data} />
    </>
  );
}
