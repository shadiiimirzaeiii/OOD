'use client';

import { Flex, Text } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';
import { TitleDescriptionProps } from './title-description.type';

const TitleDescription = (props: TitleDescriptionProps) => {
  const { title, gap, description, titleColor, titleVariant, descriptionVariant, descriptionColor } = props;
  return (
    <Flex align={'center'} gap={gap || '2'}>
      <Text style={{ color: titleColor || 'var(--gray-8)' }} {...typoVariant[titleVariant || 'body2']}>
        {title}
      </Text>
      <Text
        style={{ color: descriptionColor || 'var(--gray-12)' }}
        {...typoVariant[descriptionVariant || 'paragraph2']}
      >
        {description}
      </Text>
    </Flex>
  );
};

export default TitleDescription;
