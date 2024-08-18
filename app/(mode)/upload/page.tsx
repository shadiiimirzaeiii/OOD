'use client';

import { useState } from 'react';
import Loading from 'react-loading';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Tabs, Text } from '@radix-ui/themes';
import moment from 'moment-jalaali';
import styled from 'styled-components';
import { mapUploadStatus } from '@/apis/utils';
import CustomDialog from '@/components/shared/dialog/CustomDialog';
import PageTitle from '@/components/shared/page-title/PageTitle';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { useCSVUpload, useCSVUploadHistory } from '@/libs/hooks/useCSVUpload';
import { useMode } from '@/libs/hooks/useMode';
import { useRole } from '@/libs/hooks/useRole';
import { fromNow } from '@/libs/methods/format-date';
import { typoVariant } from '@/theme/typo-variants';

export default function Upload() {
  const [type, setType] = useState<'all' | 'users' | 'me'>('all');
  const { modeName } = useMode();
  const role = useRole();
  const router = useRouter();
  const upload = useCSVUpload();
  const uploadHistoryList = useCSVUploadHistory({ type });

  const handleFileChange = (event: any, dismiss: () => void) => {
    if (event?.target?.files?.length !== 0 && event.target.files) {
      upload.mutate(
        { csv: event.target.files[0] },
        {
          onSettled: () => {
            event.target.value = null;
            dismiss();
          },
        }
      );
    }
  };

  return (
    <>
      <PageTitle title='آپلود' />
      <Flex direction={'column'} gap='8'>
        <Flex direction={'column'} gap='4'>
          {role === 'SUPER_ADMIN' && <Text>شما کاربر ادمین هستید</Text>}
          <Flex gap={'2'} align={'center'}>
            <InfoCircledIcon />
            شما در مود <Text color='amber'>{modeName}</Text> هستید و در صورت آپلود فایل ،‌اطلاعات آپلودی در
            این مود ذخیره خواهند شد
          </Flex>
          <Button onClick={() => router.push('/upload/quality')} style={{ width: 'max-content' }}>
            لیست کیفیت
          </Button>
          <CustomDialog
            trigger={<Button style={{ width: 'max-content' }}>آپلود فایل</Button>}
            content={dismiss => (
              <Flex direction={'column'} gap={'4'}>
                <Text {...typoVariant.h3}>آپلود فایل</Text>
                <Text {...typoVariant.title1}>فایل آثار را در جهت انتقال به پایگاه داده انتخاب کنید.</Text>
                <Text {...typoVariant.titl2}>
                  توضیحات: در صورت آپلود فایل آثار،‌ تمامی رکوردها به صورت خودکار به پایگاه داده انتقال داده
                  میشوند. توجه داشته باشید که پردازش اطلاعات فایل وارد صف انتقال می شوند و با توجه به تعداد
                  ردیف های فایل و آپلود های همزمان از سوی دیگر کاربران، ممکن است این پروسه طولانی شود. شما می
                  توانید از طریق لیست آپلود ها، وضعیت پردازش فایل خود را مشاهده کنید.
                </Text>
                <Text color='indigo' {...typoVariant.body1}>
                  توجه: فایل انتخابی باید فرمت csv باشد.
                </Text>
                <Flex justify={'center'} gap={'4'}>
                  <Flex style={{ cursor: 'pointer' }}>
                    <input
                      disabled={upload.isLoading}
                      type='file'
                      id='file-upload'
                      style={{ display: 'none' }}
                      onChange={e => handleFileChange(e, dismiss)}
                    />
                    <Button
                      disabled={upload.isLoading}
                      onClick={e => handleFileChange(e, dismiss)}
                      style={{ padding: '0', width: '110px' }}
                    >
                      {upload.isLoading ? (
                        <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
                      ) : (
                        <Label htmlFor='file-upload'>آپلود فایل آثار</Label>
                      )}
                    </Button>
                  </Flex>
                  <Button color='gray' onClick={dismiss}>
                    انصراف
                  </Button>
                </Flex>
              </Flex>
            )}
          />
        </Flex>
        <Flex direction={'column'} gap={'4'}>
          <Tabs.Root defaultValue={type} onValueChange={e => setType(e as 'all' | 'users' | 'me')}>
            <Tabs.List>
              <Tabs.Trigger value='all'>همه</Tabs.Trigger>
              <Tabs.Trigger value='users'>کاربران</Tabs.Trigger>
              <Tabs.Trigger value='me'>آپلود های من</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
          {uploadHistoryList.isLoading ? (
            <Skeleton count={3} height={30} />
          ) : !!uploadHistoryList?.data?.length ? (
            uploadHistoryList.data?.map(record => (
              <Card key={record.id}>
                <Flex justify={'between'} align={'center'}>
                  <Flex gap={'4'}>
                    <TitleDescription title={'نام فایل'} description={record.fileName} />
                    <TitleDescription
                      title={'تعداد رکورد ها'}
                      description={
                        record.status === 'PROCESSING' && record.fileTotalRecords === 0
                          ? 'در حال پردازش'
                          : record.fileTotalRecords
                      }
                    />
                    <TitleDescription title={'رکورد های موفق'} description={record.successRecords} />
                    <TitleDescription title={'رکوردهای تکراری'} description={record.duplicateRecords} />
                    <TitleDescription
                      title={'در تاریخ'}
                      description={moment(record.createdAt).format('HH:mm - jYYYY/jMM/jDD')}
                    />
                    <TitleDescription
                      title={'وضعیت'}
                      description={mapUploadStatus(record.status)}
                      descriptionColor={record.status === 'PROCESSING' ? 'sky' : 'teal'}
                    />
                  </Flex>

                  <Flex>
                    <Button onClick={() => router.push(`/upload/${record.id}`)}>
                      <Text>بیشتر</Text>
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))
          ) : (
            <Text>آپلودی یافت نشد</Text>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export const Label = styled.label`
  padding-inline: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
