const API_URL = "https://api.themoviedb.org/3";

export const movieData = async () => {
  const data = await fetch(
    `${API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return await data.json();
};

export const nowMovieData = async () => {
  const data = await fetch(
    `${API_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return await data.json();
};

export const topMovieData = async () => {
  const data = await fetch(
    `${API_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return await data.json();
};

export const comeMovieData = async () => {
  const data = await fetch(
    `${API_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&region=KR&language=ko-KR`
  );
  return await data.json();
};

export const movieDetail = async (movieId: string | undefined) => {
  const data = await fetch(
    `${API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};

export const movieSimilar = async (movieId: string | undefined) => {
  const data = await fetch(
    `${API_URL}/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};

export const movieVideo = async (movieId: string | undefined) => {
  const data = await fetch(
    `${API_URL}/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};

// tv
export const tvData = async () => {
  const data = await fetch(
    `${API_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return await data.json();
};

export const onairData = async () => {
  const data = await fetch(
    `${API_URL}/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};

export const toptvData = async () => {
  const data = await fetch(
    `${API_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};

export const airingData = async () => {
  const data = await fetch(
    `${API_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};

export const tvDetail = async (movieId: string | undefined) => {
  const data = await fetch(
    `${API_URL}/tv/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};

//search
export const searchMovie = async (keyword: string | null) => {
  const data = await fetch(
    `${API_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR&query=${keyword}`
  );
  return await data.json();
};
export const searchtv = async (keyword: string | null) => {
  const data = await fetch(
    `${API_URL}/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR&query=${keyword}`
  );
  return await data.json();
};
export const searchpeople = async (keyword: string | null) => {
  const data = await fetch(
    `${API_URL}/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR&query=${keyword}`
  );
  return await data.json();
};
