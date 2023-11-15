import { MOVIE_TYPES } from './constant';

export const getTypeLabel = (type: string): string => {
  switch (type) {
    case MOVIE_TYPES.NOW_PLAYING:
      return 'Now Playing';
    case MOVIE_TYPES.POPULAR:
      return 'Popular Movies';
    case MOVIE_TYPES.UPCOMING:
      return 'Coming soon';
    default:
      return '';
  }
};
