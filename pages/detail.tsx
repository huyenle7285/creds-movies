import { useSelector } from 'react-redux';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { IMAGE_HEIGHT } from '@/utils/constant';
import { getDetailMovie, movie } from '@/store/movie';
import Layout from '@/components/Layout';
import { useDispatch } from '@/store';

const PageItem = () => {
  const state = useSelector(movie);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) dispatch(getDetailMovie(id));
  }, [id]);

  const imageURL = `https://image.tmdb.org/t/p/w500${state?.currentMovie?.poster_path}`;
  return (
    <div className="flex flex-col m-auto h-full w-full p-4">
      <div className="flex flex-col justify-center items-center text-white">
        <Image
          src={imageURL}
          alt={state?.currentMovie?.title || ''}
          width={200}
          height={IMAGE_HEIGHT}
        ></Image>
        <h1 className="uppercase">{state?.currentMovie?.title}</h1>
        <label>{state?.currentMovie?.release_date}</label>
        <label className="text-gray-100">{state?.currentMovie?.overview}</label>
      </div>
    </div>
  );
};

PageItem.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default PageItem;
