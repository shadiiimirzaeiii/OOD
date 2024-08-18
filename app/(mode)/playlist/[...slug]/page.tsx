import { notFound } from 'next/navigation';
import { Flex } from '@radix-ui/themes';
import { getPlaylistInfo } from '@/apis/playlist';
import { getRequest } from '@/apis/request';
import { getPlaylistTracks } from '@/apis/shared/track';
import PlaylistForms from '@/components/playlist/actions/PlaylistForms';
import PageTitle from '@/components/shared/page-title/PageTitle';

const getPlaylistData = async (action: string, id: string, isRequest: boolean) => {
  let res;
  try {
    if (action === 'edit' && !isRequest) {
      res = await Promise.all([getPlaylistInfo({ id }), getPlaylistTracks({ id, limit: 10000, page: 1 })]);
    } else if (action === 'edit' && isRequest) {
      if (isRequest) {
        const data = await getRequest(id);
        res = [data.data.info, data.data.info.tracks];
      }
    }
    return res;
  } catch (error) {
    return notFound();
  }
};

export default async function PlaylistActions({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isRequest = searchParams?.type === 'request';
  const [action, id] = params.slug;

  const results = await getPlaylistData(action, id, isRequest);
  const [playlistInfo, playlistTracks] = results ?? [];

  return (
    <Flex direction={'column'}>
      <PageTitle title={action === 'create' ? 'ساخت لیست پخش' : 'ویرایش اطلاعات لیست پخش'} />
      {/* @ts-ignore */}
      <PlaylistForms {...{ playlistInfo, playlistTracks, isRequest, requestId: id }} />
    </Flex>
  );
}
