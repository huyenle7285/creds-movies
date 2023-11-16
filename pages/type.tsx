import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Movie } from '@/types/movie';
import { useDispatch } from '@/store';
import { fetchMovies, movie } from '@/store/movie';
import MovieItem from '@/components/Movie';
import Layout from '@/components/Layout';
import { getTypeLabel } from '@/utils/movies';

function Type() {
  const dispatch = useDispatch();
  const state = useSelector(movie);
  const [movies, setMovies] = useState<Movie[]>([]);
  const listInnerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '';

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        if (state.page + 1 < state.total) {
          dispatch(fetchMovies({ type, page: state.page + 1 }));
        }
      }
    }
  };

  useEffect(() => {
    if (state.movies?.length === 0 && type) {
      dispatch(fetchMovies({ type, page: 1 }));
    }
  }, [type]);

  useEffect(() => {
    if (state.movies?.length > 0) setMovies([...movies, ...state.movies]);
  }, [state.movies]);

  return (
    <div className="text-white m-auto max-w-[400px] w-full">
      <div>
        <h1 className="mb-10 text-white uppercase px-4">{getTypeLabel(type || '')}</h1>
        {state?.isLoading && <div>Loading...</div>}
        {movies?.length > 0 && (
          <div
            ref={listInnerRef}
            onScroll={onScroll}
            className="grid grid-cols-2 gap-5 bg-slate-600 rounded-sm p-5 max-h-[35rem] overflow-y-auto"
          >
            {movies?.map((item: Movie, index: number) => (
              <MovieItem key={`${item.title}${index}`} {...item}></MovieItem>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Type.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Type;
