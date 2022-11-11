import { useQuery } from "react-query";
import styled from "styled-components";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// 가져오는 data
import { ImgMakeSrc } from "../utils";
import {
  movieData,
  nowMovieData,
  topMovieData,
  comeMovieData,
} from "../api/userApi";
import { Imovies } from "../interface/userInterface";
import Slider from "../components/Slider";

const Movie = () => {
  const { data: popularData, isLoading } = useQuery<Imovies>(
    ["movie", "popular"],
    () => movieData()
  );
  const { data: nowplayData } = useQuery<Imovies>(["movie", "nowplay"], () =>
    nowMovieData()
  );
  const { data: topratedData } = useQuery<Imovies>(["movie", "toprated"], () =>
    topMovieData()
  );
  const { data: commingData } = useQuery<Imovies>(["movie", "coming"], () =>
    comeMovieData()
  );

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
            <BannerInfo>
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
            </BannerInfo>
          </Banner>
          <Slider
            title="가장 인기있는 영화"
            content={popularData ? popularData.results : []}
            cate="popular"
          />
          <Slider
            title="지금 상영중인 영화"
            content={nowplayData ? nowplayData?.results : []}
            cate="nowplay"
          />
          <Slider
            title="평점이 높은 영화"
            content={topratedData ? topratedData?.results : []}
            cate="toprated"
          />
          <Slider
            title="개봉 예정 영화"
            content={commingData ? commingData?.results : []}
            cate="comming"
          />
        </>
      )}
    </>
  );
};
const Banner = styled.div<{ bgImg: string }>`
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: 30px;
  background: ${(props) => props.theme.bgGradient2},
    url(${(props) => props.bgImg}) no-repeat center center / cover;
`;
const BannerInfo = styled.div`
  position: absolute;
  left: 50px;
  top: 40%;
  max-width: 50%;
  h3 {
    font-size: 40px;
    font-weight: bold;
  }
  p {
    margin: 10px 0 30px;
    font-size: 20px;
  }
  button {
    padding: 10px 25px;
    border: 0 none;
    border-radius: 3px;
    background-color: ${(props) => props.theme.txtColor};
    color: ${(props) => props.theme.bgColor};
    font-size: 16px;
    svg {
      margin-right: 5px;
    }
  }
  button + button {
    background-color: ${(props) => props.theme.bgDark};
    color: ${(props) => props.theme.txtColor};
    margin-left: 10px;
  }
`;
export default Movie;
