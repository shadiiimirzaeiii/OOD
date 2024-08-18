import { Avatar, Flex, Text } from '@radix-ui/themes';
import styled from 'styled-components';
import { EllipsisText } from '@/libs/primitives/ellipsis-text/ElliipsisText';
import { typoVariant } from '@/theme/typo-variants';

const ChatCard = () => {
  return (
    <Flex gap={'1'} direction={'column'}>
      <Flex gap={'4'} align={'center'}>
        <Avatar src={``} fallback='a' radius='full' size={'1'} />
        <EllipsisText $lineNumber={1} {...typoVariant.body1} ml={'4'}>
          نام کاربر
        </EllipsisText>
      </Flex>

      <TextWrapper
        style={{ borderRadius: '4px', background: '#F9F9F9' }}
        gap={'2'}
        direction={'column'}
        p={'3'}
      >
        <Text {...typoVariant.paragraph2} style={{ color: '#646464' }}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها
          و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و
          آینده شناخت فراوان جامعه و متخصصان را می طلبد
        </Text>

        <Text {...typoVariant.description2} style={{ color: '#BBBBBB', alignSelf: 'flex-end' }}>
          3 ساعت پیش
        </Text>
      </TextWrapper>
    </Flex>
  );
};

export default ChatCard;

const TextWrapper = styled(Flex)`
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 61, 0.051), 0px 2px 1px -1px rgba(0, 0, 61, 0.051),
    0px 1px 3px 0px rgba(0, 0, 0, 0.055);
`;
