import { notFound } from 'next/navigation';
import { Flex } from '@radix-ui/themes';
import { getSubCategoryPlaylists } from '@/apis/category';
import ArtistPlayList from '@/components/artist-management/list/ArtistPlayList';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { SubCategoriesParams } from '@/types/categories';

const getPlaylists = async (id: string, params: Omit<SubCategoriesParams, 'category' | 'limit'>) => {
  try {
    return await getSubCategoryPlaylists({ ...params, id, limit: 7, page: params.page || 1 });
  } catch (error) {
    return notFound();
  }
};

const PlaylistsPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Omit<SubCategoriesParams, 'category' | 'limit'>;
}) => {
  const playlists = await getPlaylists(params.slug, searchParams);

  return (
    <Flex direction={'column'}>
      <PageTitle title={`لیست های پخش زیر دسته بندی " ${playlists.items[0]?.subCategory.name} "`} />
      <ArtistPlayList
        rowLinkNavigation='/playlist/info'
        artistId={params.slug}
        searchParams={searchParams}
        initialData={playlists}
      />
    </Flex>
  );
};

export default PlaylistsPage;
