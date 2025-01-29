export const getClosestMovies = (movies, count = 3) => {
  const currentDate = new Date();
  return movies
    .filter((movie) => new Date(movie.releaseDate) >= currentDate)
    .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
    .slice(0, count);
};
