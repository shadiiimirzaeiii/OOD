import { Flex } from '@radix-ui/themes';
import { ArtistListPageSearchParams, getArtistList } from '@/apis/artist';
import List from '@/components/artist-management/list/List';
import PageTitle from '@/components/shared/page-title/PageTitle';

const getArtistlist = async (searchParams: ArtistListPageSearchParams) => {
  const response = await getArtistList({
    limit: 5,
    page: searchParams.page || 1,
    ...(searchParams.sort && { sort: searchParams.sort }),
    ...(searchParams.search && { search: searchParams.search }),
  });

  return response;
};

export default async function ArtistManagement({
  searchParams,
}: {
  searchParams: { search: string | undefined; sort: string | undefined; page: number };
}) {
  const artistList = await getArtistlist(searchParams);

  return (
    <Flex direction={'column'} gap={'5'}>
      <PageTitle title='هنرمندان' />
      <List searchParams={searchParams} initialData={artistList} />
    </Flex>
  );
}
