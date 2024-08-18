'use client';

import { useState } from 'react';
import Loading from 'react-loading';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Card, Checkbox, Flex, Table, Text } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment-jalaali';
import { UploadStatus } from '@/apis/csv-upload';
import { mapUploadStatus } from '@/apis/utils';
import CustomDialog from '@/components/shared/dialog/CustomDialog';
import PageTitle from '@/components/shared/page-title/PageTitle';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { ROLE } from '@/constants/routes';
import {
  QUERY_HISTORY_DETAIL,
  QUERY_UPLOAD_HISTORY_LIST,
  useDeleteUploadRecord,
  useUploadHistoryDetail,
} from '@/libs/hooks/useCSVUpload';
import { useDeleteTrack, useUnmarkTrack } from '@/libs/hooks/useTrack';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import AccessGate from '@/libs/providers/AccessGate';
import { typoVariant } from '@/theme/typo-variants';

export default function UploadDetail({ params: { uploadId } }: { params: { uploadId: string } }) {
  const [bulkDelete, setBulkDelete] = useState(false);
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const uploadHistoryDetail = useUploadHistoryDetail(uploadId);
  const upload = uploadHistoryDetail.data;
  const deleteTracks = useDeleteTrack();
  const deleteUpload = useDeleteUploadRecord();
  const unmarkDuplicate = useUnmarkTrack();

  return (
    <>
      <PageTitle title='جزئیات آپلود' backPath='/upload' />
      {uploadHistoryDetail.isLoading ? (
        <>
          <Flex direction={'column'} gap='4'>
            <Card>
              <Skeleton count={2} height={'40px'} />
            </Card>
            <Card>
              <Skeleton count={1} height={'42px'} />
            </Card>
            <Card>
              <Skeleton count={4} height={'60px'} />
            </Card>
          </Flex>
        </>
      ) : (
        <>
          <Flex direction={'column'} gap='4'>
            <Card>
              <Flex direction={'column'} gap={'4'}>
                <Flex justify={'between'}>
                  <TitleDescription title={'آپلود شده توسط'} description={upload?.author.name as string} />
                  <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN]}>
                    <Button onClick={() => router.push(`/access/info/${upload?.author.id}`)}>
                      مشاهده پروفایل
                    </Button>
                  </AccessGate>
                </Flex>
                <Flex gap='4'>
                  <TitleDescription
                    title={'تاریخ آپلود'}
                    description={moment(upload?.createdAt).format('jYYYY/jMM/jDD - ساعت HH:mm:ss') as string}
                  />
                  <TitleDescription
                    title={'تکمیل شده در تاریخ'}
                    description={moment(upload?.updatedAt).format('jYYYY/jMM/jDD - ساعت HH:mm:ss') as string}
                  />
                </Flex>
              </Flex>
            </Card>
            <Card>
              <Flex justify={'between'} align={'center'}>
                <Flex gap='4'>
                  <TitleDescription title={'نام فایل'} description={upload?.fileName as string} />
                  <TitleDescription
                    title={'تعداد رکورد ها'}
                    description={upload?.fileTotalRecords as number}
                  />
                  <TitleDescription title={'رکورد های موفق'} description={upload?.successRecords as number} />
                  <TitleDescription
                    title={'رکورد های ناموفق'}
                    description={upload?.failedRecords as number}
                  />
                  <TitleDescription
                    title={'رکوردهای تکراری'}
                    description={upload?.duplicateRecords as number}
                  />
                  <TitleDescription
                    title={'وضعیت'}
                    descriptionColor={upload?.status === 'PROCESSING' ? 'amber' : 'teal'}
                    description={mapUploadStatus(upload?.status as UploadStatus)}
                  />
                </Flex>
                <AccessGate confirmedRoles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
                  <Flex>
                    <CustomDialog
                      trigger={<Button color='tomato'>حذف آپلود</Button>}
                      content={dismiss => (
                        <Flex direction={'column'} justify={'center'} align={'center'} gap='2'>
                          <Text color='tomato' {...typoVariant.h1}>
                            توجه
                          </Text>
                          <Text align={'center'} {...typoVariant.title2}>
                            با حذف رکورد آپلود،‌ اطلاعات آپلود به همراه تمامی آثار و فایل های مربوط به آثار از
                            پایگاه داده حذف خواهند شد. همچنین در صورتی که در آپلود فایل، اطلاعات لیست پخش و
                            صاحبین اثر وجود داشته اند، از لیست های پخش و صاحبین اثر نیز حذف می گردد.
                          </Text>
                          <Text color='tomato' {...typoVariant.title1}>
                            آیا از حذف‌ آپلود اطمینان دارید؟
                          </Text>
                          <Flex gap={'4'}>
                            <Button
                              color='tomato'
                              disabled={deleteUpload.isLoading}
                              onClick={() => {
                                deleteUpload.mutate(
                                  { id: upload?.id as string },
                                  {
                                    onSuccess: () => {
                                      queryClient.invalidateQueries([QUERY_UPLOAD_HISTORY_LIST]);
                                      ToastSuccess('آپلود با موفقیت حذف شد.');
                                      dismiss();
                                      router.back();
                                    },
                                    onError: () => ToastError('خطایی رخ داده است.'),
                                  }
                                );
                              }}
                            >
                              تایید
                            </Button>
                            <Button disabled={deleteUpload.isLoading} color='gray' onClick={dismiss}>
                              انصراف
                            </Button>
                          </Flex>
                        </Flex>
                      )}
                    />
                  </Flex>
                </AccessGate>
              </Flex>
            </Card>
            {upload?.tracks && upload.tracks.length > 0 ? (
              <Card>
                <Flex justify={'between'} align={'center'}>
                  <Text as={'p'}>آثار تکراری</Text>

                  <Flex gap={'4'}>
                    {bulkDelete && (
                      <CustomDialog
                        trigger={
                          <Button color='blue' disabled={trackIds.length === 0}>
                            بازنشانی آثار تکراری
                          </Button>
                        }
                        content={dismiss => (
                          <Flex direction={'column'} gap={'4'}>
                            <Text {...typoVariant.h3} align={'center'}>
                              بازنشانی آثار تکراری
                            </Text>
                            <Text align={'center'}>
                              با تایید بازنشانی، آثاری که انتخاب کرده اید، از حالت تکراری بازنشانی می شوند و
                              به عنوان اثر غیر تکراری در سیستم ثبت می شوند
                            </Text>
                            <Text align={'center'}>آیا از بانشانی آثار انتخابی اطمینان دارید؟‌</Text>
                            <Flex gap={'4'} justify={'center'}>
                              <Button
                                onClick={() => {
                                  unmarkDuplicate.mutate(
                                    { ids: trackIds, uploadId },
                                    {
                                      onSuccess: () => {
                                        queryClient.invalidateQueries([QUERY_HISTORY_DETAIL]);
                                        ToastSuccess('آثار انتخابی با موفقیت بازنشانی شدند');
                                      },
                                      onError: () => ToastError('مشکلی پیش آمده.'),
                                      onSettled: () => {
                                        dismiss();
                                        setBulkDelete(false);
                                      },
                                    }
                                  );
                                }}
                                disabled={unmarkDuplicate.isLoading}
                              >
                                تایید
                              </Button>
                              <Button color='gray' disabled={unmarkDuplicate.isLoading} onClick={dismiss}>
                                انصراف
                              </Button>
                            </Flex>
                          </Flex>
                        )}
                      />
                    )}
                    {bulkDelete && (
                      <CustomDialog
                        trigger={
                          <Button disabled={trackIds.length === 0} color='tomato'>
                            حذف
                          </Button>
                        }
                        content={dismiss => (
                          <Flex justify={'center'} direction={'column'} gap={'4'}>
                            <Text {...typoVariant.h3} align={'center'}>
                              حذف آثار تکراری
                            </Text>

                            <Text align={'center'}>آیا از حذف آثار اطمینان دارید؟</Text>
                            <Text align={'center'} color='tomato'>
                              {`
                              با تایید شما تمامی آثار تکراری انتخاب شده که مربوط به فایل آپلودی ${upload.fileName} می باشد حذف
                              خواهند شد.
                            `}
                            </Text>

                            <Flex justify={'center'} align={'center'} gap={'4'}>
                              <Button
                                disabled={deleteTracks.isLoading}
                                color='tomato'
                                onClick={() => {
                                  deleteTracks.mutate(trackIds, {
                                    onSuccess: () => {
                                      queryClient.invalidateQueries([QUERY_HISTORY_DETAIL]);
                                      ToastError('آثار با موفقیت حذف شدند');
                                    },
                                    onError: () => ToastError('مشکلی پیش آمده.'),
                                    onSettled: () => {
                                      dismiss();
                                      setBulkDelete(false);
                                    },
                                  });
                                }}
                              >
                                {deleteTracks.isLoading ? <Loading type='bubbles' /> : 'حذف'}
                              </Button>
                              <Button disabled={deleteTracks.isLoading} color='gray' onClick={dismiss}>
                                انصراف
                              </Button>
                            </Flex>
                          </Flex>
                        )}
                      />
                    )}
                    <Button onClick={() => setBulkDelete(!bulkDelete)} color={bulkDelete ? 'gray' : 'amber'}>
                      {bulkDelete ? 'انصراف' : 'ویرایش گروهی'}
                    </Button>
                  </Flex>
                </Flex>
                <Table.Root>
                  <Table.Header style={{ textAlign: 'right' }}>
                    <Table.Row>
                      <Table.ColumnHeaderCell>
                        {bulkDelete && (
                          <Text as='label' size='2'>
                            <Flex gap='2'>
                              <Checkbox
                                checked={trackIds.length === upload.tracks.length}
                                onClick={() => {
                                  if (upload.tracks) {
                                    if (trackIds.length === upload.tracks.length) {
                                      setTrackIds([]);
                                    } else {
                                      setTrackIds(upload.tracks.map(track => track.id));
                                    }
                                  }
                                }}
                              />
                              <Text>انتخاب همه</Text>
                            </Flex>
                          </Text>
                        )}
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>عنوان اصلی(مرجع)</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>وبسایت (مرجع)</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>نام اثر</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>دسته بندی اثر</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>شناسه یکتای اثر</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>ردیف اثر در فایل آپلودی</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body style={{ textAlign: 'right' }}>
                    {upload.tracks.map((track, idx) => (
                      <>
                        <Table.Row>
                          <Table.RowHeaderCell>{idx + 1}</Table.RowHeaderCell>
                          <Table.RowHeaderCell>
                            <Text {...typoVariant.body1}>اثر اصلی</Text>
                          </Table.RowHeaderCell>
                          <Table.Cell>{track.originalTrack.originalTitle}</Table.Cell>
                          <Table.Cell>{track.originalTrack.originUrl}</Table.Cell>
                          <Table.Cell>{track.originalTrack.name}</Table.Cell>
                          <Table.Cell>{track.originalTrack.originalCategory}</Table.Cell>
                          <Table.Cell>{track.originalTrack.id}</Table.Cell>
                          <Table.Cell>{track.originalTrack.rowNumber}</Table.Cell>
                          <Table.Cell>
                            <Link href={`/tracks/${track.originalTrack.id}?backPath=${pathname}`}>
                              مشاهده و ویرایش
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row style={{ borderBottom: '1px solid #00749e' }}>
                          <Table.RowHeaderCell>
                            {bulkDelete && (
                              <Checkbox
                                checked={trackIds.includes(track.id)}
                                onClick={() => {
                                  if (trackIds.includes(track.id)) {
                                    setTrackIds(trackIds.filter(id => id !== track.id));
                                  } else {
                                    setTrackIds([...trackIds, track.id]);
                                  }
                                }}
                              />
                            )}
                          </Table.RowHeaderCell>
                          <Table.RowHeaderCell>
                            <Text {...typoVariant.body1}>اثر تکراری</Text>
                          </Table.RowHeaderCell>
                          <Table.Cell>{track.originalTitle}</Table.Cell>
                          <Table.Cell>{track.originUrl}</Table.Cell>
                          <Table.Cell>{track.name}</Table.Cell>
                          <Table.Cell>{track.originalCategory}</Table.Cell>
                          <Table.Cell>{track.id}</Table.Cell>
                          <Table.Cell>{track.rowNumber}</Table.Cell>
                          <Table.Cell>
                            <Link href={`/tracks/${track.id}?backPath=${pathname}`}>مشاهده و ویرایش</Link>
                          </Table.Cell>
                        </Table.Row>
                      </>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Card>
            ) : (
              <Flex>
                <Text>آثار تکراری برای این فایل آپلودی یافت نشد.</Text>
              </Flex>
            )}
          </Flex>
        </>
      )}
    </>
  );
}
