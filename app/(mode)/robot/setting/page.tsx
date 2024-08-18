'use client';

import { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { ClockIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Text, TextField } from '@radix-ui/themes';
import { Content } from '@/components/robot/robot.styled';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { Remove } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';

export default function Edit() {
  const [website, setWebsite] = useState('');
  const [destWebsites, setDestWebsites] = useState(['www.fotros.ir', 'www.castbox.com']);

  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState(['کلمه کلیدی ۱', 'کلمه کلیدی ۲']);

  const [banWebsite, setBanWebsite] = useState('');
  const [bannedWebsites, setBannedWebsites] = useState(['https://www.spotify.com', 'https://soundcloud.com']);

  return (
    <>
      <PageTitle title='تنظیمات ربات' backPath='/robot' />

      <Flex gap='4' direction={'column'}>
        <Flex direction={'column'} gap='6'>
          <Text {...typoVariant.body1}>زمان بندی عملکرد ربات</Text>
          <Flex gap='4'>
            <Flex direction={'column'} gap={'2'} pb={'4'} style={{ width: '25%', position: 'relative' }}>
              <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                از ساعت
              </Text>
              <TextField.Root style={{ width: '100%' }}>
                <TextField.Input value={''} size={'3'} placeholder='مثال : ۳۰ : ۱۵' />
                <TextField.Slot>
                  <ClockIcon />
                </TextField.Slot>
              </TextField.Root>
              <DatePicker
                onChange={(dateObject: DateObject | DateObject[] | any) => {
                  console.log('start dateObject: ', dateObject);
                }}
                disableDayPicker
                format='HH:mm:ss'
                plugins={[<TimePicker key={1} />]}
              />
            </Flex>

            <Flex direction={'column'} gap={'2'} pb={'4'} style={{ width: '25%', position: 'relative' }}>
              <Text as='label' {...typoVariant.body2} style={{ paddingRight: 16, color: '#646464' }}>
                تا ساعت
              </Text>
              <TextField.Root style={{ width: '100%' }}>
                <TextField.Input defaultValue={''} value={''} size={'3'} placeholder='مثال : ۳۰ : ۱۵' />
                <TextField.Slot>
                  <ClockIcon />
                </TextField.Slot>
              </TextField.Root>
              <DatePicker
                onChange={(dateObject: DateObject | DateObject[] | any) => {
                  console.log('end dateObject: ', dateObject);
                }}
                disableDayPicker
                format='HH:mm:ss'
                plugins={[<TimePicker key={2} />]}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex gap={'4'} direction={'column'}>
          <Text {...typoVariant.title2}>سایت های مقصد</Text>
          <Content direction={'column'} gap='6'>
            <Flex align={'center'} gap={'3'}>
              <TextField.Root style={{ width: '40%' }}>
                <TextField.Input
                  value={website ?? ''}
                  onChange={e => setWebsite(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      if (website) {
                        setDestWebsites(prevDestWebsites => [...prevDestWebsites, website]);
                        setWebsite('');
                      }
                    }
                  }}
                  placeholder='آدرس سایت'
                  style={{ width: '100%' }}
                />
              </TextField.Root>

              <Button variant='ghost'>
                <PlusCircledIcon
                  onClick={() => {
                    if (website) {
                      setDestWebsites(prevDestWebsites => [...prevDestWebsites, website]);
                      setWebsite('');
                    }
                  }}
                />
              </Button>
            </Flex>

            <Flex gap={'2'} wrap={'wrap'}>
              {destWebsites.map((website, idx) => (
                <Card key={idx}>
                  <Flex align={'center'} gap='4'>
                    {website}
                    <Button
                      onClick={() =>
                        setDestWebsites(() => {
                          return destWebsites.filter(address => address !== website);
                        })
                      }
                      variant='ghost'
                    >
                      <Remove />
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Content>
        </Flex>

        <Flex gap={'4'} direction={'column'}>
          <Text {...typoVariant.title2}>لیست سیاه</Text>
          <Flex gap={'4'}>
            <Content direction={'column'} gap='6' style={{ width: '100%' }}>
              <Text>وب سایت ها</Text>
              <Flex align={'center'} gap={'3'} style={{ width: '100%' }}>
                <TextField.Root style={{ width: '80%' }}>
                  <TextField.Input
                    value={banWebsite ?? ''}
                    onChange={e => setBanWebsite(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (banWebsite) {
                          setBannedWebsites(prevBannedWebsites => [...prevBannedWebsites, banWebsite]);
                          setBanWebsite('');
                        }
                      }
                    }}
                    placeholder='آدرس سایت'
                  />
                </TextField.Root>
                <Button variant='ghost'>
                  <PlusCircledIcon
                    onClick={() => {
                      if (banWebsite) {
                        setBannedWebsites(prevBannedWebsites => [...prevBannedWebsites, banWebsite]);
                        setBanWebsite('');
                      }
                    }}
                  />
                </Button>
              </Flex>

              <Flex gap={'2'} wrap={'wrap'}>
                {bannedWebsites.map((banWebsite, idx) => (
                  <Card key={idx}>
                    <Flex align={'center'} gap='4'>
                      {banWebsite}
                      <Button
                        onClick={() =>
                          setBannedWebsites(() => {
                            return bannedWebsites.filter(address => address !== banWebsite);
                          })
                        }
                        variant='ghost'
                      >
                        <Remove />
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            </Content>

            <Content direction={'column'} gap='6' style={{ width: '100%' }}>
              <Text>کلمات کلیدی</Text>
              <Flex align={'center'} gap={'3'} style={{ width: '100%' }}>
                <TextField.Root style={{ width: '80%' }}>
                  <TextField.Input
                    style={{ width: '100%' }}
                    value={keyword ?? ''}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        if (keyword) {
                          setKeywords(prevKeywords => [...prevKeywords, keyword]);
                          setKeyword('');
                        }
                      }
                    }}
                    placeholder='کلمه کلیدی'
                  />
                </TextField.Root>
                <Button variant='ghost'>
                  <PlusCircledIcon
                    onClick={() => {
                      if (keyword) {
                        setKeywords(prevKeywords => [...prevKeywords, keyword]);
                        setKeyword('');
                      }
                    }}
                  />
                </Button>
              </Flex>

              <Flex gap={'2'} wrap={'wrap'}>
                {keywords.map((keyword, idx) => (
                  <Card key={idx}>
                    <Flex align={'center'} gap='4'>
                      {keyword}
                      <Button
                        onClick={() =>
                          setKeywords(() => {
                            return keywords.filter(kw => kw !== keyword);
                          })
                        }
                        variant='ghost'
                      >
                        <Remove />
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            </Content>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
