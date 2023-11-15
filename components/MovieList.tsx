import { Movie as MovieModel } from '@/types/movie';
import Link from 'next/link';
import { getTypeLabel } from '@/utils/movies';
import MovieItem from './Movie';

interface MovieListProps {
  type: string;
  movies: MovieModel[];
}

export default function MovieList(props: MovieListProps) {
  return (
    <div className="flex flex-col mb-10 bg-slate-600">
      <div className="flex justify-between mb-5">
        <h2>
          <b className="text-white">{getTypeLabel(props?.type)}</b>
        </h2>
        <Link className="text-blue-400" href={`/type?type=${props.type}`} onClick={() => {}}>
          See All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-10">
        {props?.movies?.map((item, index) => (
          <MovieItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
}
