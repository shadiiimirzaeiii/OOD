import { notFound } from 'next/navigation';
import { Flex } from '@radix-ui/themes';
import { getArtistInfo } from '@/apis/artist';
import { getRequest } from '@/apis/request';
import ManageArtistForm from '@/components/artist-management/manage-artist-form/ManageArtistForm';
import PageTitle from '@/components/shared/page-title/PageTitle';

const getArtistFormData = async (action: string, artistId: string, isRequest: boolean) => {
  let artistFormInfo: any;
  try {
    if (action === 'edit' && !isRequest) {
      const res = await getArtistInfo({
        id: artistId,
      });
      artistFormInfo = res;
    } else if (action === 'edit' && isRequest) {
      // artistId is id of the request
      if (isRequest) {
        const res = await getRequest(artistId);
        artistFormInfo = { ...res.data.info };

        return artistFormInfo;
      }
    }
    return artistFormInfo;
  } catch (e) {
    return notFound();
  }
};

export default async function ManageArtistInfo({
  params,
  searchParams,
}: {
  params: { slug: string[]; id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isRequest = searchParams?.type === 'request';
  const [action, artistId] = params.slug;
  const response = await getArtistFormData(action, artistId, isRequest);

  return (
    <Flex direction={'column'}>
      <PageTitle
        title={
          action === 'create'
            ? 'ساخت هنرمند جدید'
            : isRequest
            ? 'ویرایش اطلاعات هنرمند درخواستی'
            : 'ویرایش اطلاعات هنرمند'
        }
        backPath={
          action === 'create'
            ? '/artist'
            : isRequest
            ? `/requests/artist/${artistId}`
            : `/artist/info/${artistId}`
        }
      />
      <ManageArtistForm
        action={action}
        artistFormInfo={response}
        id={isRequest ? (searchParams.id as string) : artistId}
        requestId={artistId}
        isRequest={isRequest}
      />
    </Flex>
  );
}
