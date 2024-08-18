'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useMode } from '@/libs/hooks/useMode';
import { typoVariant } from '@/theme/typo-variants';
import { setModeCookie } from '../../../../app/actions';
import { StyledContainer } from '../layout.styled';
import { modes } from './header.constant';
import { Select } from './header.styled';

const Header = () => {
  const { mode, changeMode, setChangeModeLoading } = useMode();
  const queryClient = useQueryClient();

  const handleChangeMode = async (item: { title: string; mode: number }) => {
    setChangeModeLoading(true);
    changeMode(item.mode);
    await setModeCookie(item.mode);
    await queryClient.invalidateQueries();
    setChangeModeLoading(false);
  };

  return (
    <Box
      width={'100%'}
      py={'2'}
      px={'6'}
      style={{
        backgroundColor: '#FCFCFC',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
      }}
    >
      <StyledContainer
        display={'block'}
        size={'4'}
        style={{ marginInline: 'auto', overflow: 'auto', flexShrink: 1 }}
      >
        <Flex gap={'6'}>
          {modes.map(item => (
            <Select key={item.mode} onClick={() => handleChangeMode(item)} $isCurrent={item.mode === mode}>
              <Text {...typoVariant.body2}>{item.title}</Text>
            </Select>
          ))}
        </Flex>
      </StyledContainer>
    </Box>
  );
};

export default Header;
