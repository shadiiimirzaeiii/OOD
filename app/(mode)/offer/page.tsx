import Link from 'next/link';
import { Button, Flex, Text } from '@radix-ui/themes';
import { getOfferList, OfferListParams } from '@/apis/offer';
import OfferList from '@/components/offers/OfferList';
import StatisticsItem from '@/components/offers/statistics-item/StatisticsItem';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { routesList } from '@/constants/routes';
import { PlusCircled } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';

export default async function OfferCodes({ searchParams }: { searchParams: OfferListParams }) {
  const allOffers = await getOfferList({ page: Number(searchParams.page) || 1, limit: 10 });

  // TODO: remove hard code
  const offers = [
    {
      title: 'کد تخفیف ساخته شده',
      value: '1200',
    },
    {
      title: 'کد تخفیف استفاده شده',
      value: '450',
    },
    {
      title: 'تخفیف داده شده',
      value: '52.214.116 ریال',
    },
  ];

  return (
    <Flex direction={'column'}>
      <PageTitle title='کد های تخفیف' />
      <Flex direction='column' gap='5'>
        <Flex wrap='nowrap' gap='7'>
          {offers.map((offer, i) => (
            <StatisticsItem label={offer.title} value={offer.value} key={i} />
          ))}
        </Flex>
        <Flex gap='4'>
          <Link href={routesList.createOffer.url} style={{ textDecoration: 'none' }}>
            <Button size={'3'} style={{ cursor: 'pointer' }} color='blue'>
              <Flex align={'center'} gap={'2'}>
                <PlusCircled />
                <Text {...typoVariant.description1} style={{ color: '#fff' }}>
                  کد تخفیف جدید
                </Text>
              </Flex>
            </Button>
          </Link>
        </Flex>

        <OfferList initialData={allOffers} {...{ searchParams }} />
      </Flex>
    </Flex>
  );
}
