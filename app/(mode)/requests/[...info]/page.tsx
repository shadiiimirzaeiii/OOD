import { getRequest } from '@/apis/request';
import RequestInfo from '@/components/request/info/RequestInfo';
import PageTitle from '@/components/shared/page-title/PageTitle';

export default async function Request({ params }: { params: { info: ['artist' | 'playlist', string] } }) {
  const [requestType, id] = params.info;

  const data = await getRequest(id);

  return (
    <>
      <PageTitle backPath='/requests' title={`درخواست ${data.data.action}`} />
      <RequestInfo data={data.data} type={requestType} />
    </>
  );
}
