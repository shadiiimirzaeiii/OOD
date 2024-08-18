import { Flex } from '@radix-ui/themes';
import { ArtistListPageSearchParams } from '@/apis/artist';
import SearchContent from '@/components/content/search-page/SearchContent';
import PageTitle from '@/components/shared/page-title/PageTitle';

export default async function SearchContentPage({
  searchParams,
}: {
  searchParams: ArtistListPageSearchParams;
}) {
  return (
    <Flex direction={'column'}>
      <PageTitle title='محتوای صفحه جستجو' />
      <SearchContent />
    </Flex>
  );
}
