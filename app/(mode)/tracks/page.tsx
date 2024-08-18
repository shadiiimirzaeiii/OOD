import { Flex } from '@radix-ui/themes';
import { getAllTracks, PlaylistTracksParams } from '@/apis/shared/track';
import PageTitle from '@/components/shared/page-title/PageTitle';
import TrackTable from '@/components/shared/track-table/TrackTable';

export default async function TracksPage({
  searchParams,
}: {
  searchParams: Omit<PlaylistTracksParams, 'id' | 'limit'>;
}) {
  const tracksData = await getAllTracks({
    page: searchParams?.page || 1,
    limit: 10,
    ...(searchParams.search && { search: searchParams.search.trim() }),
    ...(searchParams.sort && { sort: searchParams.sort }),
  });

  return (
    <Flex direction={'column'}>
      <PageTitle title='آثار' />
      <TrackTable initialData={tracksData} {...{ searchParams }} />
    </Flex>
  );
}
