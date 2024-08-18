'use client';

import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from 'next/image';
import Link from 'next/link';
import { ClipboardIcon } from '@radix-ui/react-icons';
import { Button, Flex, Grid, Text, Tooltip } from '@radix-ui/themes';
import { ArtistInfo } from '@/apis/artist';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { ToastSuccess } from '@/libs/primitives';
import { Edit } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';

const InfoSection = (props: ArtistInfo) => {
  const { id, likes, daily_views, followers, genre, image, playlists, latinName, name, recent_views, views } =
    props;

  const getValueOrDash = (value: null | string | number | undefined | []) => {
    if (value) {
      return value;
    } else if (value === null) {
      return '-';
    } else if (Boolean(value) === false) {
      return '_';
    }
  };

  return (
    <Flex direction={'column'} gap={'5'}>
      <Flex width={'100%'} justify={'between'} align={'start'} p={'4'}>
        <Flex gap={'5'} align={'center'}>
          <Flex position={'relative'} style={{ width: 80, height: 80 }}>
            <Image
              src={`${IMAGE_BASE_URL}${image}`}
              alt={`تصویر ${name}`}
              fill
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </Flex>
          <Flex direction={'column'} gap={'2'}>
            <Text {...typoVariant.title1} style={{ color: '#202020' }}>
              {name}
            </Text>
            <Text {...typoVariant.description1} style={{ color: '#8D8D8D' }}>
              {genre}
            </Text>
            <>
              <CopyToClipboard text={props.id} onCopy={() => ToastSuccess('شناسه کپی شد')}>
                <Flex style={{ cursor: 'pointer' }} gap={'2'}>
                  <ClipboardIcon />
                  <Tooltip
                    content={
                      <Text {...typoVariant.body1}>
                        شما می توانید از شناسه صاحب اثر در فایل های آپلودی، جهت اختصاص دادن هر اثر به صاحب اثر
                        استفاده کنید
                      </Text>
                    }
                  >
                    <Text {...typoVariant.description1}>کپی شناسه صاحب اثر</Text>
                  </Tooltip>
                </Flex>
              </CopyToClipboard>
            </>
          </Flex>
        </Flex>
        <Button size={'3'} style={{ cursor: 'pointer', backgroundColor: '#3E63DD' }}>
          <Flex align={'center'} gap={'2'}>
            <Edit />
            <Link href={`/artist/edit/${id}`} style={{ textDecoration: 'none', color: '#FCFCFC' }}>
              <Text {...typoVariant.body2}>ویرایش اطلاعات</Text>
            </Link>
          </Flex>
        </Button>
      </Flex>

      <Grid width={'100%'} columns={'3'} rows={'2'} gapY={'6'} gapX={'8'} style={{ paddingInline: 80 }}>
        <Flex direction={'column'} gap={'2'}>
          <Text {...typoVariant.title1} style={{ color: '#646464' }}>
            {getValueOrDash(views)}
          </Text>
          <Text {...typoVariant.description1} style={{ color: '#838383' }}>
            تعداد کل بازدید ها
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'2'}>
          <Text {...typoVariant.title1} style={{ color: '#646464' }}>
            {getValueOrDash(recent_views)}
          </Text>
          <Text {...typoVariant.description1} style={{ color: '#838383' }}>
            تعداد بازدید های ماه اخیر
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'2'}>
          <Text {...typoVariant.title1} style={{ color: '#646464' }}>
            {getValueOrDash(daily_views)}
          </Text>
          <Text {...typoVariant.description1} style={{ color: '#838383' }}>
            تعداد بازدید های روزانه
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'2'}>
          <Text {...typoVariant.title1} style={{ color: '#646464' }}>
            {getValueOrDash(followers)}
          </Text>
          <Text {...typoVariant.description1} style={{ color: '#838383' }}>
            تعداد دنبال کنندگان
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'2'}>
          <Text {...typoVariant.title1} style={{ color: '#646464' }}>
            {getValueOrDash(likes)}
          </Text>
          <Text {...typoVariant.description1} style={{ color: '#838383' }}>
            تعداد لایک ها
          </Text>
        </Flex>

        <Flex direction={'column'} gap={'2'}>
          <Text {...typoVariant.title1} style={{ color: '#646464' }}>
            {getValueOrDash(recent_views)}
          </Text>
          <Text {...typoVariant.description1} style={{ color: '#838383' }}>
            تعداد پخش در ماه اخیر
          </Text>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default InfoSection;
