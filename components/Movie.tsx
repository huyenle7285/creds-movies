import Image from 'next/image';
import Link from 'next/link';

import { useDispatch } from '@/store';
import { setCurrentMovie } from '@/store/movie';
import { Movie as MovieModel } from '@/types/movie';
import { IMAGE_HEIGHT } from '@/utils/constant';

export default function MovieItem(props: MovieModel) {
  const imageURL = `https://image.tmdb.org/t/p/w500${props.poster_path}`;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentMovie(props));
  };

  return (
    <Link href={`/detail?id=${props.id}`} onClick={handleClick}>
      <div className="flex flex-col">
        <Image src={imageURL} alt={props.title} width={200} height={IMAGE_HEIGHT}></Image>
        <label className="text-white">{props.title}</label>
      </div>
    </Link>
  );
}
