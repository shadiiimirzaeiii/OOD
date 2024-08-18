import { Flex } from '@radix-ui/themes';
import { getOffer } from '@/apis/offer';
import OfferCodeForms from '@/components/offers/offers-actions/OfferCodeForms';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { routesList } from '@/constants/routes';

export default async function EditOfferCodes({ params: { offerId } }: { params: { offerId: string } }) {
  const { remain, taken, ...offer } = await getOffer(offerId);

  return (
    <Flex direction={'column'}>
      <PageTitle title='ویرایش کد تخفیف' backPath={routesList.offerCodes.url} />
      <Flex direction='column' gap='5'>
        <OfferCodeForms
          action='edit'
          offerCodeInfo={{ ...offer, percent: `${offer.percent}`, quantity: `${offer.quantity}` }}
        />
      </Flex>
    </Flex>
  );
}
