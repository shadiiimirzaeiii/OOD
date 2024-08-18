'use client';

import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import Image from 'next/image';
import { Text } from '@radix-ui/themes';
import { urlToObject } from '@/libs/methods/UrlToObject';
import { Edit } from '@/public/icon';
import { typoVariant } from '@/theme/typo-variants';
import { DropBox, StyledIconButton } from './image-picker.styled';
import { ImagePickerProps } from './image-picker.types';

const ImagePicker = (props: ImagePickerProps) => {
  const { title, onChange, icon, defaultImage = '', error, ...rest } = props;

  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    if (defaultImage) {
      (async function () {
        const fileFromUrl = await urlToObject(defaultImage);
        onChange(fileFromUrl);
      })();
    }
  }, [defaultImage]);

  const onDrop = (files: File[]) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
      onChange(files[0]);
    }
  };

  return (
    <Dropzone
      onDrop={onDrop}
      accept={{
        'image/*': ['.jpeg', '.png'],
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropBox
            $hasError={!!error}
            $hasImage={!!image}
            gap={'2'}
            justify={'center'}
            direction={'column'}
            align={'center'}
            {...rest}
          >
            {!image && (
              <>
                {icon}
                <Text {...typoVariant.body2} color={'teal'}>
                  {error || title}
                </Text>
              </>
            )}

            {image && (
              <>
                <Image
                  style={{ objectFit: 'cover', zIndex: 2 }}
                  src={image}
                  alt={'title-submission-request image'}
                  fill
                />
                <StyledIconButton size={'3'} style={{ zIndex: 3, pointerEvents: 'none' }} radius={'full'}>
                  <Edit />
                </StyledIconButton>
              </>
            )}
          </DropBox>
        </div>
      )}
    </Dropzone>
  );
};

export default ImagePicker;
