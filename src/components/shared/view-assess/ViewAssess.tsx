'use client';

import { Flex, Text } from '@radix-ui/themes';
import { css, styled } from 'styled-components';
import { ViewAssessProps } from './view-assess.type';

const ViewAssess = (props: ViewAssessProps) => {
  const { isExponential, count } = props;
  return (
    <Root width={'max-content'} gap={'1'} align={'center'} isExponential={isExponential}>
      <Text>{count}</Text>
      {/* TODO: add arrow down and arrow up */}
    </Root>
  );
};

export default ViewAssess;

const Root = styled(Flex)<{ isExponential: boolean }>`
  margin-inline: auto;
  color: ${({ isExponential }) => (isExponential ? css`var(--teal-10)` : css`var(--tomato-10)`)};
  & svg {
    & > path {
      fill: ${({ isExponential }) => (isExponential ? css`var(--teal-10)` : css`var(--tomato-10)`)};
    }
    transform: rotate(${({ isExponential }) => !isExponential && '180deg'});
  }
`;
