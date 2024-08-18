'use client';

import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { useSearchParams } from 'next/navigation';
import { Button, Flex, Text } from '@radix-ui/themes';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { translateTrackKey } from '@/constants/track';
import { useTrack } from '@/libs/hooks/useTrack';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';
import { Track as TrackType } from '@/types/tracks';

export default function Track({ params }: { params: { track: string } }) {
  const { data, isLoading } = useTrack(params.track);
  const searchParams = useSearchParams();

  const { register, formState } = useForm({
    defaultValues: {
      ...data,
    },
  });

  if (isLoading) {
    return (
      <>
        <Skeleton height={30} count={1} />
        <Skeleton count={4} height={50} />
      </>
    );
  }

  const editableFields = ['name', 'originalTitle', 'latinName'];

  return (
    <>
      <PageTitle
        title={data?.name as string}
        backPath={searchParams.get('backPath') ? (searchParams.get('backPath') as string) : '/tracks'}
      />
      <Flex direction={'column'} gap={'6'}>
        <Flex wrap={'wrap'} gap={'4'}>
          {Object.keys(data as TrackType).map(field => (
            <Flex key={field} shrink='0' direction='column' gap={'2'} style={{ flex: '1 1 30%' }}>
              <Text {...typoVariant.title2} htmlFor={field}>
                {translateTrackKey(field)}
              </Text>
              {editableFields.includes(field) ? (
                <Input
                  id={field}
                  {...register(field as keyof TrackType)}
                  defaultValue={(data as TrackType)[field as keyof TrackType] || ''}
                  style={{ width: '100%' }}
                />
              ) : (
                <>
                  <Text {...typoVariant.body2}>{(data as TrackType)[field as keyof TrackType] || '-'}</Text>
                </>
              )}
            </Flex>
          ))}
        </Flex>
        {formState.isDirty && (
          <Flex justify={'center'} align={'center'} gap={'4'}>
            <Button>ویرایش</Button>
            <Button color='gray'>انصراف</Button>
          </Flex>
        )}
      </Flex>
    </>
  );
}
