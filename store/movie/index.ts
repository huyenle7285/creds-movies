import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '..';
import { Movie } from '@/types/movie';
import { getDetailMovies, getMovies, searchMovies as searchMoviesService } from '@/services/movie';

const initialState: {
  total: number;
  page: number;
  isLoading: boolean;
  movies: Movie[];
  currentMovie?: Movie;
} = {
  total: 0,
  page: 1,
  isLoading: false,
  movies: [],
};
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

export const fetchMovies = createAppAsyncThunk(
  'movie/getMovies',
  async (option: { type: string; page: number }) => {
    const res = await getMovies(option.type, option.page);
    return res;
  }
);

export const searchMovies = createAppAsyncThunk(
  'movie/searchMovies',
  async (option: { title: string; page: number }) => {
    const res = await searchMoviesService(option.title, option.page);
    return res;
  }
);

export const getDetailMovie = createAppAsyncThunk('movie/getDetailMovies', async (id: string) => {
  const res = await getDetailMovies(id);
  return res;
});

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setCurrentMovie: (state, action) => {
      state.currentMovie = action.payload;
    },
    resetMovies: (state) => {
      state.page = 1;
      state.movies = [];
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.total = action.payload?.total_pages;
      state.movies = action.payload?.results;
      state.page = action.payload?.page;
      state.isLoading = false;
    });
    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.total = action.payload?.total_pages;
      state.movies = action.payload?.results;
      state.page = action.payload?.page;
      state.isLoading = false;
    });
    builder.addCase(searchMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchMovies.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDetailMovie.fulfilled, (state, action) => {
      state.currentMovie = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDetailMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDetailMovie.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { setCurrentMovie, resetMovies } = movieSlice.actions;

export const movie = (state: AppState) => state.movie;

export default movieSlice.reducer;
