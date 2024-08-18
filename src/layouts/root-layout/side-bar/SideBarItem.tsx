import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import { Flex, Text } from '@radix-ui/themes';
import {
  StyledAccordionChevron,
  StyledAccordionItem,
  StyledContent,
  StyledHeader,
  StyledLink,
  StyledTrigger,
} from './sidebar.styled';

interface Props {
  title: string;
  path: string;
  icon: ReactElement;
  child?: { title: string; path: string }[];
  value: number;
  $isCurrent: boolean;
}

const SideBarItem = ({ title, path, icon: Icon, child, value, $isCurrent }: Props) => {
  const pathname = usePathname();

  return (
    <StyledAccordionItem value={`item-${value}`}>
      {child ? (
        <>
          <StyledHeader>
            <StyledTrigger
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                marginBottom: '4px',
                color: $isCurrent ? '#fff3d0' : '#646464',
                display: 'flex',
              }}
            >
              <Text as='span' size={'1'}>
                <Flex align={'center'} gap={'2'} width={'100%'}>
                  {Icon}
                  {title}
                </Flex>
              </Text>
              <StyledAccordionChevron className='AccordionChevron' />
            </StyledTrigger>
          </StyledHeader>
          <StyledContent>
            <Flex direction={'column'} gap={'1'} mr={'2'}>
              {child.map(item => (
                <StyledLink
                  $isCurrent={$isCurrent || item.path === pathname}
                  href={item.path}
                  key={item.title}
                >
                  <Text as='span' size={'1'}>
                    {item.title}
                  </Text>
                </StyledLink>
              ))}
            </Flex>
          </StyledContent>
        </>
      ) : (
        <Flex width={'100%'} align={'center'}>
          <StyledLink $isCurrent={$isCurrent} href={path} style={{ width: '100%' }}>
            <Text as='span' size={'1'} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {Icon}
              {title}
            </Text>
          </StyledLink>
        </Flex>
      )}
    </StyledAccordionItem>
  );
};

export default SideBarItem;
