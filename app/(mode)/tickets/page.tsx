import { Flex } from '@radix-ui/themes';
import { PlaylistTracksParams } from '@/apis/shared/track';
import PageTitle from '@/components/shared/page-title/PageTitle';
import TicketList from '@/components/tickets/TicketList';

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Omit<PlaylistTracksParams, 'id' | 'limit'>;
}) {
  return (
    <Flex direction={'column'}>
      <PageTitle title='پیام ها' />
      <TicketList />
    </Flex>
  );
}
