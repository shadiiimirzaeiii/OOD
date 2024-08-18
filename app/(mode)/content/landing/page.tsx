import { Flex } from '@radix-ui/themes';
import BannerSection from '@/components/content/landing-page/banners/BannerSection';
import PageTitle from '@/components/shared/page-title/PageTitle';

export default async function LandingContentPage() {
  return (
    <Flex direction={'column'}>
      <PageTitle title='محتوای صفحه اصلی' />
      <BannerSection />
    </Flex>
  );
}
