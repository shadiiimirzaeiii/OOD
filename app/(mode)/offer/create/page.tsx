import { Flex } from '@radix-ui/themes';
import OfferCodeForms from '@/components/offers/offers-actions/OfferCodeForms';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { routesList } from '@/constants/routes';

export default async function CreateOfferCodes() {
  return (
    <Flex direction={'column'}>
      <PageTitle title='ساخت کد تخفیف' backPath={routesList.offerCodes.url} />
      <Flex direction='column' gap='5'>
        <OfferCodeForms action='create' />
      </Flex>
    </Flex>
  );
}
