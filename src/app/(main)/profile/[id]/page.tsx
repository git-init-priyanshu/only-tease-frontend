import { Metadata } from 'next';

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
  return <div className='max-w-[1100px] mx-auto'>
    <CreatorProfile params={params} />
  </div>;
};

export default Page;
