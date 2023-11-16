import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { getMovies } from '@/services/movie';
import { MOVIE_TYPES } from '@/utils/constant';
import { Movie } from '@/types/movie';
import MovieList from '@/components/MovieList';
import { useDispatch } from '@/store';
import { movie, resetMovies } from '@/store/movie';
import { searchMovies as searchMoviesFunction } from '@/store/movie';
import MovieItem from '@/components/Movie';

interface Props {
  nowPlaying: Movie[];
  popular: Movie[];
  upcoming: Movie[];
}

function Home(props: Props) {
  const dispatch = useDispatch();
  const state = useSelector(movie);
  const listInnerRef = useRef<HTMLDivElement>(null);

  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleSearch = (e: any) => {
    const key = e.keyCode || e.which;

    if (key == 13) {
      dispatch(searchMoviesFunction({ title: search, page: 1 }));
    }
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        if (state.page + 1 < state.total) {
          dispatch(searchMoviesFunction({ title: search, page: state.page + 1 }));
        }
      }
    }
  };

  const handleOnSearchChange = (e: any) => {
    setSearch(e.target.value);
    dispatch(resetMovies());
  };

  useEffect(() => {
    if (state?.movies?.length > 0) setSearchMovies(state.movies);
  }, [state.movies]);

  return (
    <div className="m-auto max-w-[400px] w-full bg-slate-600 px-4">
      <div className="mb-10 flex justify-between pt-5">
        <label className="text-white">Search</label>
        <input
          className="flex flex-1 ml-5 px-3"
          onChange={handleOnSearchChange}
          onKeyDown={handleSearch}
        />
      </div>
      {search && searchMovies?.length > 0 && (
        <div className="mb-10">
          <label className="mb-10 text-white">Search results:</label>
          {state?.isLoading && <div>Loading...</div>}
          {searchMovies?.length > 0 && (
            <div
              ref={listInnerRef}
              onScroll={onScroll}
              className="grid grid-cols-2 gap-5 bg-slate-600 rounded-sm p-5 max-h-[20rem] overflow-y-auto"
            >
              {searchMovies?.map((item: Movie, index: number) => (
                <MovieItem key={`${item.title}${index}`} {...item}></MovieItem>
              ))}
            </div>
          )}
        </div>
      )}
      <div>
        <MovieList type={MOVIE_TYPES.NOW_PLAYING} movies={props?.nowPlaying || []} />
        <MovieList type={MOVIE_TYPES.POPULAR} movies={props?.popular || []} />
        <MovieList type={MOVIE_TYPES.UPCOMING} movies={props?.upcoming || []} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const [nowPlaying, popular, upcoming] = await Promise.all([
      getMovies(MOVIE_TYPES.NOW_PLAYING),
      getMovies(MOVIE_TYPES.POPULAR),
      getMovies(MOVIE_TYPES.UPCOMING),
    ]);
    return {
      props: {
        nowPlaying: nowPlaying?.results?.slice(0, 2),
        popular: popular?.results?.slice(0, 2),
        upcoming: upcoming?.results?.slice(0, 2),
      },
    };
  } catch (err) {
    console.log(err);
    return { props: { nowPlaying: [], popular: [], upcoming: [] } };
  }
}

export default Home;
