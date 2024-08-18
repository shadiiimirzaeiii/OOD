import Link from 'next/link';
import { TriangleLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import { getArtistInfo, getArtistPlaylist } from '@/apis/artist';
import InfoSection from '@/components/artist-management/info-section/InfoSection';
import ArtistPlayList from '@/components/artist-management/list/ArtistPlayList';
import PageTitle from '@/components/shared/page-title/PageTitle';

const getArtist = async (
  searchParams: {
    search?: string;
    sort?: string;
    page: number;
    limit?: number;
  },
  artistId: string
) => {
  try {
    const res = await Promise.all([
      getArtistInfo({
        id: artistId,
      }),
      getArtistPlaylist({
        id: artistId,
        page: searchParams.page || 1,
        limit: searchParams.limit || 7,
        ...(searchParams.sort && { sort: searchParams.sort }),
        ...(searchParams.search && { search: searchParams.search }),
      }),
    ]);

    return res;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

export default async function ArtistInfo({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { search: string | undefined; sort: string | undefined; page: number; limit: number };
}) {
  const artistId = params.slug;

  const [artistInfo, artistPlaylist] = await getArtist(searchParams, artistId);

  return (
    <Flex direction={'column'} gap={'5'}>
      <Flex width={'100%'} justify={'between'}>
        <PageTitle title='اطلاعات هنرمند' />
        <Button size={'3'} variant='ghost' style={{ cursor: 'pointer' }}>
          <Link href={`/artist`}>
            <TriangleLeftIcon />
          </Link>
        </Button>
      </Flex>
      <Flex direction={'column'} gap={'6'}>
        <InfoSection {...artistInfo} />
      </Flex>
      <ArtistPlayList
        rowLinkNavigation='/playlist/info'
        artistId={artistId}
        searchParams={searchParams}
        initialData={artistPlaylist}
      />
    </Flex>
  );
}
