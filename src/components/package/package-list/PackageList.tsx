'use client';

import AddPackageBox from '@/components/package/add-package-box/AddPackageBox';
import PackageCard from '@/components/package/package-card/PackageCard';
import { MainBox } from './package-list.styled';
import { PackageListProps } from './package-list.type';

const PackageList = ({ packages }: PackageListProps) => {
  return (
    <MainBox columns={'3'} gap={'4'} p={'4'}>
      {packages?.map(pkg => (
        <PackageCard key={pkg.id} {...pkg} />
      ))}
      <AddPackageBox />
    </MainBox>
  );
};

export default PackageList;
