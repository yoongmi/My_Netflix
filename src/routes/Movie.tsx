import { useQuery } from "react-query";
import styled from "styled-components";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// 가져오는 data
import { ImgMakeSrc } from "../utils";
import { movieData } from "../api/userApi";
import { Imovies } from "../interface/userInterface";
import Slider from "../components/Slider";

const Movie = () => {
  const { data: popularData, isLoading } = useQuery<Imovies>(
    ["movie", "popular"],
    () => movieData()
  );
  console.log(popularData);
  return (
    <>
      {isLoading ? (
        <>
          <h1>loading..</h1>
        </>
      ) : (
        <>
          <Banner
            bgImg={ImgMakeSrc(
              popularData?.results[0].backdrop_path || "",
              "original"
            )}
          >
            <h3>{popularData?.results[0].title}</h3>
            <p>{popularData?.results[0].overview}</p>
            <button>
              <FontAwesomeIcon icon={faPlay} />
              Play
            </button>
            <button>
              <FontAwesomeIcon icon={faCircleInfo} />
              Detail
            </button>
          </Banner>
          <Slider
            title="가장 인기있는 영화"
            content={popularData ? popularData.results : []}
          />
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
export default Movie;
