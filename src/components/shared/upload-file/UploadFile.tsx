'use client';

import { CameraIcon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';
import styled from 'styled-components';

const StyledUpload = styled.label`
  width: 120px;
  height: 120px;
  border: 2px dashed #3e63dd;
  border-radius: 16px;
  display: grid;
  place-content: center;
  color: #3e63dd;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
    background-color: rgba(194, 243, 255, 0.2);
  }
`;

interface Props {
  title: string;
  name: string;
}

const UploadFile = ({ title, name }: Props) => {
  return (
    <StyledUpload htmlFor={name}>
      <Flex direction={'column'} gap='2' align={'center'}>
        <CameraIcon />
        <Text as='span' style={{ fontSize: '12px', fontWeight: '500' }}>
          {title}
        </Text>
      </Flex>
      <input
        type='file'
        id={name}
        name={name}
        accept='image/png, image/jpg, image/jpeg'
        style={{ display: 'none' }}
      />
    </StyledUpload>
  );
};

export default UploadFile;
