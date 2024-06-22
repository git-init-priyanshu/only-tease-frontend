import { Metadata } from 'next';
import React from 'react';

import CreatorProfile from '@/components/creator-profile';

import { allModelData } from '@/utils/modelData';

export type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params

  const modelData = allModelData.filter((item) => item.slug === params.id)[0];
  // fetch data

  return {
    // description: product.data.description,
    openGraph: {
      title: `${modelData.name} | OnlyTease`,
      images: modelData.image.src,
      description: modelData.AboutMe,
    },
    twitter: {
      title: `${modelData.name} | OnlyTease`,
      images: modelData.image.src,
      description: modelData.AboutMe,
    },
  };
}
const Page = ({ params }: Props) => {
  return <CreatorProfile params={params} />;
};

export default Page;
