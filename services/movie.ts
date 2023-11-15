const api_url = 'https://api.themoviedb.org/3/movie';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTdkY2UzMzNmMTVjMDc4MzAxMzNiNTA0ODI1ZjhmZCIsInN1YiI6IjY1NTRhODIzNTM4NjZlMDBhYmFhYjZjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dEF5VwyBfwfgx7dYOLlxlW4wCDhNbs5CHVu-BrfIM1Y',
  },
};

export const getMovies = async (type: string, page: number = 1) => {
  const url = `${api_url}/${type}?language=en-US&page=${page}`;

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error('error:' + err));
};

export const searchMovies = async (title: string, page: number = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=en-US&page=${page}`;

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error('error:' + err));
};

export const getDetailMovies = async (id: string) => {
  const url = `${api_url}/${id}?language=en-US`;

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error('error:' + err));
};
