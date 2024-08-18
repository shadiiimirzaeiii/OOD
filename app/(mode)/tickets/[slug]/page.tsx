import { Box, Flex } from '@radix-ui/themes';
import PageTitle from '@/components/shared/page-title/PageTitle';
import ChatBox from '@/components/tickets/ChatBox';
import TicketCard from '@/components/tickets/TicketCard';

export default async function Ticket({ params }: { params: { slug: string } }) {
  return (
    <Flex direction={'column'} grow={'1'}>
      <PageTitle title='پیام پشتیبانی' />
      <Flex
        direction={'column'}
        style={{ border: '1px solid #E8E8E8', height: 'calc(100vh - 163px)', borderRadius: 8 }}
      >
        <TicketCard hasLink={false} />
        <ChatBox />
      </Flex>
    </Flex>
  );
}
