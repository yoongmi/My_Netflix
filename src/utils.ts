export function ImgMakeSrc(url: string, size: string) {
  if (url !== null) {
    return `https://image.tmdb.org/t/p/${size}/${url}`;
  } else {
    return `/no_image.jpeg`;
  }
}
