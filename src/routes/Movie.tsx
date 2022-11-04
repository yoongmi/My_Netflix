import { useQuery } from "react-query";
import styled from "styled-components";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// 가져오는 data
import { ImgMakeSrc } from "../utils";
import { movieData } from "../api/userApi";
import { Imovies } from "../interface/userInterface";

const Movie = () => {
  const { data, isLoading } = useQuery<Imovies>(["movie"], () => movieData());
  console.log(data);
  return (
    <>
      {isLoading ? (
        <>
          <h1>loading..</h1>
        </>
      ) : (
        <>
          <Banner
            bgImg={ImgMakeSrc(data?.results[0].backdrop_path || "", "original")}
          >
            <h3>{data?.results[0].title}</h3>
            <p>{data?.results[0].overview}</p>
            <button>
              <FontAwesomeIcon icon={faPlay} />
              Play
            </button>
            <button>
              <FontAwesomeIcon icon={faCircleInfo} />
              Detail
            </button>
          </Banner>
          <ListBox>
            {data?.results.map((movie) => (
              <List
                bgImg={ImgMakeSrc(movie.poster_path, "w500")}
                key={movie.id}
              >
                <h4>{movie.title}</h4>
                <p>{movie.overview}</p>
                <p>{movie.release_date}</p>
                <p>{movie.original_language}</p>
                <p>{movie.vote_average}</p>
              </List>
            ))}
          </ListBox>
        </>
      )}
    </>
  );
};
const Banner = styled.div<{ bgImg: string }>`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
`;
const ListBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const List = styled.li<{ bgImg: string }>`
  width: 400px;
  height: 400px;
  background-image: url(${(props) => props.bgImg});
`;
export default Movie;
