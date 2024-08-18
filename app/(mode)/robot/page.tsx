'use client';

import { useRouter } from 'next/navigation';
import { Button, Card, Flex, Switch, Text } from '@radix-ui/themes';
import styled from 'styled-components';
import { Content } from '@/components/robot/robot.styled';
import { MainBox } from '@/components/shared/main-box';
import PageTitle from '@/components/shared/page-title/PageTitle';
import TitleDescription from '@/components/shared/title-description/TitleDescription';
import { typoVariant } from '@/theme/typo-variants';

export default function Robot() {
  const router = useRouter();

  return (
    <>
      <PageTitle title='ربات' />
      <MainBox direction={'column'} gap='4'>
        <Flex width='100%' justify={'between'} align={'center'}>
          <Flex gap='4'>
            <Text {...typoVariant.title1}>تنظیمات ربات</Text>
            <TitleDescription title={'زمانبندی فعالیت'} description={'۱۲ تا ۵ صبح'} />
            <Flex gap={'2'} align={'center'}>
              <StyledSwitch
                size={'3'}
                defaultChecked={true}
                //   onCheckedChange={(checked: boolean) => setValue('active', checked)}
              />
              <Text color='gray'>ربات روشن است</Text>
            </Flex>
          </Flex>
          <Flex gap='2'>
            {/* <Button variant='outline' color='indigo'>
              آپلود فایل
            </Button> */}
            <Button color='indigo' onClick={() => router.push('/robot/setting')}>
              تنظیمات ربات
            </Button>
          </Flex>
        </Flex>

        <Flex gap='4'>
          <Content style={{ width: '30%' }} direction='column' gap='4'>
            <Text {...typoVariant.title1}>سایت های مقصد</Text>
            <TitleDescription
              title={'www.fotros.ir'}
              description={'30000 فایل'}
              titleColor='#202020'
              descriptionColor='#BBBBBB'
            />
            <TitleDescription
              title={'www.castbox.com'}
              description={'10200 فایل'}
              titleColor='#202020'
              descriptionColor='#BBBBBB'
            />
          </Content>

          <Content style={{ width: '70%' }} direction={'column'} gap='4'>
            <Flex direction={'column'} gap='4'>
              <Text {...typoVariant.title3}>لیست سیاه</Text>

              <Flex gap='4'>
                <Card>
                  <Text {...typoVariant.body2}>www.spotify.com</Text>
                </Card>
                <Card>
                  <Text {...typoVariant.body2}>www.soundcloud.com</Text>
                </Card>
              </Flex>
            </Flex>

            <Text {...typoVariant.title3}>کلمات کلیدی</Text>

            <Flex gap='4'>
              <Card>
                <Text {...typoVariant.body2}>پاپ</Text>
              </Card>
              <Card>
                <Text {...typoVariant.body2}>کوچه بازاری</Text>
              </Card>
            </Flex>
          </Content>
        </Flex>
      </MainBox>
    </>
  );
}

const StyledSwitch = styled(Switch)`
  .rt-SwitchThumb {
    position: absolute;
    left: 1px;
  }
`;
