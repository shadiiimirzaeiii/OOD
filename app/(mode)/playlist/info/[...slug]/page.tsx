import Link from 'next/link';
import { TriangleLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import { getPlaylistInfo } from '@/apis/playlist';
import { getPlaylistTracks } from '@/apis/shared/track';
import InfoSection from '@/components/playlist/playlist-management/InfoSection';
import TrackSection from '@/components/playlist/playlist-management/TrackSection';
import PageTitle from '@/components/shared/page-title/PageTitle';

export default async function ArtistPlayLsitInfo({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { search: string | undefined; sort: string | undefined; page: number };
}) {
  const id = params.slug[0];

  const [playlistInfo, playlistTracks] = await Promise.all([
    getPlaylistInfo({ id }),
    getPlaylistTracks({ id, limit: 1000, page: 1 }),
  ]);

  return (
    <Flex direction={'column'} gap={'5'}>
      <Flex width={'100%'} justify={'between'}>
        <PageTitle title='لیست پخش' />
        <Button size={'3'} variant='ghost' style={{ cursor: 'pointer' }}>
          <Link href={`/artist`}>
            <TriangleLeftIcon />
          </Link>
        </Button>
      </Flex>
      <Flex direction={'column'} gap={'6'}>
        <InfoSection data={playlistInfo} />
        <TrackSection data={playlistTracks} />
      </Flex>
    </Flex>
  );
}
