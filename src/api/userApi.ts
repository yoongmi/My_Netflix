const API_URL = "https://api.themoviedb.org/3";

export const movieData = async () => {
  const data = await fetch(
    `${API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return await data.json();
};

export const movieDetail = async (movieId: string | undefined) => {
  const data = await fetch(
    `${API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
  );
  return await data.json();
};
