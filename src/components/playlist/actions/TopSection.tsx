import { Controller, useFormContext } from 'react-hook-form';
import Loading from 'react-loading';
import { CameraIcon } from '@radix-ui/react-icons';
import { Flex, Switch, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getCategories, getSubCategories } from '@/apis/category';
import { PlaylistForm, PlaylistInfoResponse } from '@/apis/playlist';
import { AsyncSelect } from '@/components/shared/async-select';
import ImagePicker from '@/components/shared/image-picker/ImagePicker';
import { IMAGE_BASE_URL } from '@/constants/image-base-url';
import { Input } from '@/libs/primitives/input/Input';
import { typoVariant } from '@/theme/typo-variants';

const TopSection = (props?: Partial<PlaylistInfoResponse>) => {
  const { image } = props ?? {};
  const {
    setValue,
    clearErrors,
    formState: { errors },
    register,
    watch,
    control,
    resetField,
  } = useFormContext<PlaylistForm>();

  const clearErrorOnChange = (field: keyof PlaylistForm) => {
    if (errors[field]) return clearErrors(field);
  };

  const loadCategories = async () => {
    const res = await getCategories();
    return res.map(item => ({
      label: item.name,
      value: item.id,
    }));
  };

  const loadSubCategories = async () => {
    try {
      const res = await getSubCategories({ category: watch('category').value, page: 1, limit: 10000 });
      return res.items.map(item => ({
        label: item.name,
        value: item.id,
      }));
    } catch (error) {
      return [];
    }
  };

  const { data, isFetching } = useQuery({
    queryKey: ['subCategories', watch('category')],
    queryFn: loadSubCategories,
    enabled: !!watch('category'),
  });

  return (
    <Flex direction={'column'} gap={'5'}>
      <Flex style={{ alignSelf: 'center' }}>
        <ImagePicker
          defaultImage={image ? IMAGE_BASE_URL + image : ''}
          title={'تصویر لیست پخش'}
          icon={<CameraIcon />}
          onChange={image => {
            setValue('image', image as File);
            clearErrorOnChange('image');
          }}
          error={errors.image?.message}
        />
      </Flex>

      <Text as='label' {...typoVariant.body2} style={{ width: 'fit-content' }}>
        <Flex gap='2' align={'center'}>
          رایگان
          <StyledSwitch
            size={'3'}
            defaultChecked={!watch('isPremium')}
            onCheckedChange={(checked: boolean) => setValue('isPremium', !checked)}
          />
        </Flex>
      </Text>

      <Flex wrap={'wrap'} gap={'5'}>
        <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
          <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
            نام پلی لیست
          </Text>
          <Input
            size={'3'}
            radius='medium'
            placeholder='مثال : علی اصغری'
            {...register('name', {
              required: { message: 'نام پلی لیست را وارد کنید', value: true },
            })}
            error={errors.name?.message}
          />
        </Flex>

        <Flex direction={'column'} gap={'1'} pb={'4'} style={{ flex: '1 1 48%' }}>
          <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
            نام لاتین پلی لیست
          </Text>
          <Input
            size={'3'}
            radius='medium'
            placeholder='مثال : ali asghari'
            {...register('latinName', {
              required: { message: 'نام لاتین پلی لیست را وارد کنید', value: true },
            })}
            error={errors.latinName?.message}
          />
        </Flex>

        <Flex direction={'column'} gap={'1'} style={{ flex: '1 1 30%' }}>
          <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
            دسته بندی
          </Text>
          <Controller
            control={control}
            rules={{
              required: { message: 'دسته بندی پلی لیست را انتخاب کنید', value: true },
            }}
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <AsyncSelect
                  onChange={(val: any) => {
                    onChange(val);
                    resetField('subCategory', { defaultValue: null });
                  }}
                  placeholder={'جستجوی دسته بندی...'}
                  loadOptionsImmediately
                  loadOptions={loadCategories}
                  {...rest}
                />
              );
            }}
            name={'category'}
          />
          {errors.category && (
            <Text as='span' mr={'1'} style={{ color: '#D93D42', fontSize: '10px' }}>
              {errors.category?.message}
            </Text>
          )}
        </Flex>

        <Flex direction={'column'} gap={'1'} style={{ flex: '1 1 30%' }}>
          <Text as='label' style={{ color: '--var(gray-gray-11)', paddingRight: '16px' }}>
            زیر دسته بندی
          </Text>
          {isFetching ? (
            <Flex grow={'1'} justify={'center'} align={'center'}>
              <Loading width={20} height={20} type='bars' color='var(--amber-8)' />
            </Flex>
          ) : (
            <Controller
              control={control}
              rules={{
                required: { message: ' زیر دسته بندی پلی لیست را انتخاب کنید', value: true },
              }}
              render={({ field }) => (
                <AsyncSelect
                  placeholder={'جستجوی زیر دسته بندی...'}
                  loadOptionsImmediately
                  loadOptions={loadSubCategories}
                  options={data}
                  {...field}
                />
              )}
              name={'subCategory'}
            />
          )}
          {errors.subCategory && (
            <Text as='span' mr={'1'} style={{ color: '#D93D42', fontSize: '10px' }}>
              {errors.subCategory?.message}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TopSection;

const StyledSwitch = styled(Switch)`
  .rt-SwitchThumb {
    position: absolute;
    left: 1px;
  }
`;
