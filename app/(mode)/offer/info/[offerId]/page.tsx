import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button, Flex, Grid, Text } from '@radix-ui/themes';
import { format } from 'date-fns-jalali/format';
import { getOffer } from '@/apis/offer';
import CodeStatisticsItem from '@/components/offers/code-statistics-item/CodeStatisticsItem';
import StatisticsItem from '@/components/offers/statistics-item/StatisticsItem';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { routesList } from '@/constants/routes';
import { typoVariant } from '@/theme/typo-variants';

export default async function OfferCode({ params: { offerId } }: { params: { offerId: string } }) {
  const singleOffer = await getOffer(offerId);

  const { active, code, percent, startDate, endDate, quantity, remain, taken, name } = singleOffer;

  const offers = [
    {
      title: 'کد باقی مانده',
      value: `${remain}`,
    },
    {
      title: 'کد تخفیف استفاده شده',
      value: `${taken}`,
    },
    {
      title: 'تخفیف داده شده',
      value: '52.214.116 ریال',
    },
  ];

  const offerDetail = [
    {
      title: 'وضعیت',
      value: active ? 'فعال' : 'غیر فعال',
    },
    {
      title: 'کد تخفیف',
      value: code,
    },
    {
      title: 'میزان تخفیف',
      value: `${percent}%`,
    },
    {
      title: 'تاریخ شروع',
      value: format(new Date(startDate), 'd MMMM yyyy'),
    },
    {
      title: 'تاریخ انقضاء',
      value: format(new Date(endDate), 'd MMMM yyyy'),
    },
    {
      title: 'تعداد کد ها',
      value: `${quantity}`,
    },
  ];

  return (
    <Flex direction={'column'}>
      <PageTitle title='مشخصات کد تخفیف' backPath={routesList.offerCodes.url} />
      <Flex direction='column' gap='5' p={'4'} style={{ border: '1px solid #E8E8E8', borderRadius: '16px' }}>
        <Flex align={'center'} gap={'4'}>
          <Text {...typoVariant.h3} style={{ color: '#646464' }}>
            {name}
          </Text>
          <Link href={routesList.editOffer.url(offerId)}>
            <Button variant='ghost' color='sky' style={{ cursor: 'pointer' }}>
              <Pencil1Icon style={{ width: 16, height: 16, color: '#646464', marginTop: 4 }} />
            </Button>
          </Link>
        </Flex>
        <Grid columns={'3'} rows={'2'} gapX={'8'} gapY={'5'} py={'5'} flow={'row'}>
          {offerDetail.map((detail, i) => (
            <CodeStatisticsItem label={detail.title} value={detail.value} key={i} />
          ))}
        </Grid>
        <Flex direction='column' position='relative' gap='6'>
          <span style={{ width: '100%', height: '1px', backgroundColor: '#838383' }}></span>
          <Text {...typoVariant.title1} style={{ color: '#646464' }}>
            آمار کد
          </Text>
        </Flex>
        <Flex wrap='nowrap' gap='8'>
          {offers.map((offer, i) => (
            <StatisticsItem label={offer.title} value={offer.value} key={i} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
