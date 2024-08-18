'use client';

import { startTransition, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Loading from 'react-loading';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPlaylist,
  editPlaylist,
  PlaylistActionParams,
  PlaylistForm,
  PlaylistInfoResponse,
} from '@/apis/playlist';
import SearchTrack from '@/components/artist-management/search-track/SearchTrack';
import CustomDialog from '@/components/shared/dialog/CustomDialog';
import DndTable from '@/components/shared/table/DndTable';
import { getTrackListColumns } from '@/components/shared/track-table/Columns';
import { TrackItem } from '@/components/shared/track-table/track-table.type';
import { useTrackList } from '@/libs/hooks/useTrackList';
import useUpload from '@/libs/hooks/useUpload';
import { ToastError, ToastSuccess } from '@/libs/primitives';
import PlaylistAdd from '@/public/icon/PlaylistAdd';
import { typoVariant } from '@/theme/typo-variants';
import TopSection from './TopSection';

type Props = {
  playlistInfo?: PlaylistInfoResponse;
  playlistTracks?: TrackItem[];
  isRequest: boolean;
  requestId?: string;
};

const PlaylistForms = ({ playlistInfo, playlistTracks, isRequest }: Props) => {
  const searchParams = useSearchParams();
  const isDraft = !!searchParams.get('type'),
    draftId = searchParams.get('id');

  const { currentTracks } = useTrackList({
    initialData: playlistTracks,
    searchParams: { id: playlistInfo?.id, page: 1, limit: 10000 },
  });

  const { mutate: upload, isLoading: uploadLoading } = useUpload();

  const params = useParams();
  const action = params.slug[0];
  const id = params.slug[1];

  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPremium, name, latinName, subCategory, category } = playlistInfo ?? {};

  const defaultValues = {
    name,
    latinName,
    isPremium: !!isPremium,
    ...(subCategory?.id && { subCategory: { label: subCategory?.name, value: subCategory?.id } }),
    ...(category?.id && { category: { label: category?.name, value: category?.id } }),
  };

  const formMethods = useForm<PlaylistForm>({
    defaultValues: {
      ...defaultValues,
      tracks: currentTracks ?? [],
    },
    mode: 'onChange',
  });
  const { setValue, watch, handleSubmit, setError } = formMethods;

  const { mutate: submitPlaylist, isLoading } = useMutation({
    mutationFn: async (data: PlaylistActionParams) => {
      if (action === 'create') {
        return await createPlaylist(data);
      }
      return await editPlaylist({
        ...data,
        ...(isDraft && {
          isDraft: true,
          draftId,
        }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: action === 'create' ? ['artist-playlists'] : ['playlist-info'],
      });
      ToastSuccess('عملیات با موفقیت ثبت شد');

      startTransition(() => {
        action === 'edit'
          ? isDraft
            ? router.push(`/requests/playlist/${id}`)
            : router.push(`/playlist/info/${id}`)
          : router.push(`/artist/info/${id}`);
        router.refresh();
      });
    },
    onError: (err: any) => ToastError(err.response.data.data),
  });

  const onSubmit = (data: PlaylistForm) => {
    if (!data.tracks.length) return ToastError('لیست آثار خالی است');
    if (!data.image) return setError('image', { message: 'عکس پلی لیست را انتخاب کنید' });
    const { category, ...rest } = data;
    return upload(
      { image: data.image as File, path: 'playlist' },
      {
        onSuccess: image =>
          submitPlaylist({
            ...rest,
            image,
            subCategory: data.subCategory.value,
            id,
            tracks: data.tracks.map(track => track.id),
          }),
      }
    );
  };

  const handleDragEnd = (event: DragEndEvent, dataIds: UniqueIdentifier[]) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      const movedData = arrayMove(watch('tracks'), oldIndex, newIndex);

      setValue('tracks', movedData);
    }
  };

  const listColumns = useMemo(() => {
    return getTrackListColumns();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction='column' gap={'5'}>
        <FormProvider {...formMethods}>
          <TopSection {...playlistInfo} />
        </FormProvider>

        <Flex direction={'column'} gap={'4'}>
          <Text {...typoVariant.title1}>لیست آثار</Text>

          <CustomDialog
            trigger={
              <Button size={'3'} variant='outline' style={{ width: 'fit-content', cursor: 'pointer' }}>
                <PlaylistAdd />
                <Text {...typoVariant.body2}>اضافه کردن اثر</Text>
              </Button>
            }
            content={dismiss => (
              <SearchTrack
                dismiss={dismiss}
                selectedTracks={watch('tracks')}
                onSave={tracks => setValue('tracks', tracks)}
              />
            )}
            maxWidth={960}
          />
          <Flex direction={'column'} style={{ maxHeight: 'calc(100vh - 775px)', minHeight: '300px' }}>
            {!watch('tracks').length ? (
              <Text {...typoVariant.body1} style={{ margin: 'auto' }}>
                برای اضافه کردن اثر بر روی “ اضافه کردن اثر “ کلیک کنید.
              </Text>
            ) : (
              <DndTable
                {...{ handleDragEnd }}
                data={watch('tracks')}
                columns={listColumns}
                cellStyles={{
                  cursor: 'pointer',
                }}
                isEvenRowsColored
              />
            )}
          </Flex>
        </Flex>
        {!!watch('tracks').length && (
          <Flex gap={'5'} justify={'center'}>
            <Button type='submit' size={'3'} style={{ background: '#3E63DD', width: 100, cursor: 'pointer' }}>
              {isLoading ||
                (uploadLoading && (
                  <Box position={'absolute'}>
                    <Loading type='spin' color='var(--gray-1)' width={20} height={20} />
                  </Box>
                ))}
              <Text
                {...typoVariant.body2}
                style={{ color: isLoading || uploadLoading ? 'transparent' : '#fff' }}
              >
                ثبت
              </Text>
            </Button>
            <Button
              size={'3'}
              variant='outline'
              onClick={e => {
                e.preventDefault();
                router.back();
              }}
            >
              <Text {...typoVariant.body2}>انصراف و بازگشت</Text>
            </Button>
          </Flex>
        )}
      </Flex>
    </form>
  );
};

export default PlaylistForms;
