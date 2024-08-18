import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPackages } from '@/apis/package';
import { PackageList } from '@/components/package';
import PageTitle from '@/components/shared/page-title/PageTitle';
import { metadataInfo } from '@/constants/metadata';

export const metadata: Metadata = {
  title: metadataInfo.packages.title,
  description: metadataInfo.description,
};

const getPackageList = async () => {
  try {
    return await getAllPackages();
  } catch (error) {
    return notFound();
  }
};

export default async function Page() {
  const packages = await getPackageList();

  return (
    <>
      <PageTitle title={'مدیریت پکیج ها'} />
      <PackageList {...{ packages }} />
    </>
  );
}
