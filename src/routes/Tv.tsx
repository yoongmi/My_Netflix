import { useQuery } from "react-query";
import styled from "styled-components";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// 가져오는 data
import { ImgMakeSrc } from "../utils";
import { onairData, toptvData, tvData, airingData } from "../api/userApi";
import { Imovies } from "../interface/userInterface";
import Slider from "../components/Slider";

const Tv = () => {
  const { data: popularData, isLoading } = useQuery<Imovies>(
    ["movie", "popular"],
    () => tvData()
  );
  const { data: ontvData } = useQuery<Imovies>(["movie", "onair"], () =>
    onairData()
  );
  const { data: topData } = useQuery<Imovies>(["movie", "toprated"], () =>
    toptvData()
  );
  const { data: airingtvData } = useQuery<Imovies>(["movie", "airing"], () =>
    airingData()
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
            <BannerInfo>
              <h3>{popularData?.results[0].name}</h3>
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
            title="가장 인기있는 프로그램"
            content={popularData ? popularData.results : []}
            cate="tvpopular"
            video="tv"
          />
          <Slider
            title="지금 방송되는 프로그램"
            content={ontvData ? ontvData.results : []}
            cate="onairtv"
            video="tv"
          />
          <Slider
            title="평점이 높은 프로그램"
            content={topData ? topData.results : []}
            cate="toprate"
            video="tv"
          />
          <Slider
            title="오늘 방송되는 프로그램"
            content={airingtvData ? airingtvData.results : []}
            cate="airing"
            video="tv"
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
export default Tv;
