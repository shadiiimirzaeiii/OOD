'use client';

import { FormProvider } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { useSearchParams } from 'next/navigation';
import { Box } from '@radix-ui/themes';
import { useMode } from '@/libs/hooks/useMode';
import { useRequestList } from '@/libs/hooks/useRequestList';
import { Pagination } from '@/libs/primitives/pagination/Pagination';
import RequestFilter from '../request-filter/RequestFilter';
import { MainBox, RequestCardsWrapper, ScrollWrapper } from './request-list.styled';
import { RequestListProps } from './request-list.type';
import RequestCard from './RequestCard';

const RequestList = (props: RequestListProps) => {
  const { initialData } = props;

  const searchParams = useSearchParams();
  const { query, formMethods, currentPage, setCurrentPage } = useRequestList(initialData, searchParams);
  const { changeModeLoading } = useMode();
  const { data, isLoading } = query;

  return (
    <MainBox direction={'column'} gap={'4'} p={'4'}>
      <FormProvider {...formMethods}>
        <ScrollWrapper direction={'column'} gap={'6'}>
          <RequestFilter />
          <RequestCardsWrapper
            gap={'6'}
            p={'3'}
            style={{ height: '100%', overflow: 'auto' }}
            direction={'column'}
          >
            {changeModeLoading || query.isLoading ? (
              <Skeleton count={3} height={144} />
            ) : data?.items.length ? (
              data?.items?.map(request => <RequestCard {...request} key={request.id} />)
            ) : (
              <p>درخواستی یافت نشد</p>
            )}
            <Box mx={'auto'}>
              <Pagination
                isLoading={isLoading}
                current={currentPage}
                total={data ? data.pages.total : 0}
                onPageChange={p => {
                  setCurrentPage(p);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              />
            </Box>
          </RequestCardsWrapper>
        </ScrollWrapper>
      </FormProvider>
    </MainBox>
  );
};

export default RequestList;
