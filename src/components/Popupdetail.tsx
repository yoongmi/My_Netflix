import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
// 가져오는 data
import { ImgMakeSrc } from "../utils";
import {
  Imovie,
  ImovieDetail,
  ImovieSimilar,
  ImovieVideo,
  ItvDetail,
} from "../interface/userInterface";
import {
  movieDetail,
  movieSimilar,
  tvDetail,
  movieVideo,
} from "../api/userApi";

interface IlistProps {
  content: Imovie[];
  cate: string;
  video: string;
}

const PopupDetail = ({ content, cate, video }: IlistProps) => {
  //팝업
  const history = useNavigate();
  const popupMatch = useMatch(`/movie/${cate}/:movieId`);
  const { data: movieDetails } = useQuery<ImovieDetail | undefined>(
    ["movieDetail"],
    () => movieDetail(popupMatch?.params.movieId),
    { enabled: !!popupMatch?.params.movieId }
  );
  const { data: movieSimilars } = useQuery<ImovieSimilar | undefined>(
    ["movieSimilar"],
    () => movieSimilar(popupMatch?.params.movieId),
    { enabled: !!popupMatch?.params.movieId }
  );
  const { data: movieVideos } = useQuery<ImovieVideo | undefined>(
    ["movieVideos"],
    () => movieVideo(popupMatch?.params.movieId),
    { enabled: !!popupMatch?.params.movieId }
  );
  console.log(movieVideos);

  const popupMatchtv = useMatch(`/tv/${cate}/:movieId`);
  const { data: tvDetails } = useQuery<ItvDetail | undefined>(
    ["tvDetails"],
    () => tvDetail(popupMatchtv?.params.movieId),
    { enabled: !!popupMatchtv?.params.movieId }
  );

  const popupClose = () => {
    if (video === "movie") {
      history(`/movie`);
    } else {
      history(`/tv`);
    }
  };
  const popupMovie =
    popupMatch?.params.movieId &&
    content.find((movie) => String(movie.id) === popupMatch.params.movieId);
  const popupTv =
    popupMatchtv?.params.movieId &&
    content.find((movie) => String(movie.id) === popupMatchtv.params.movieId);

  return (
    <>
      <AnimatePresence>
        {popupMatchtv && (
          <>
            <Overlay
              onClick={popupClose}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
            />
            <Popup layoutId={cate + popupMatchtv.params.movieId + ""}>
              {popupTv && (
                <PopupInner>
                  <i className="exit_btn" onClick={popupClose}>
                    <FontAwesomeIcon icon={faXmarkCircle} />
                  </i>
                  <div className="back">
                    <img
                      src={ImgMakeSrc(popupTv.backdrop_path, "original")}
                      alt={popupTv.name}
                      className="back_img"
                    />
                  </div>
                  <img
                    src={ImgMakeSrc(popupTv.poster_path, "w500")}
                    alt={popupTv.name}
                    className="poster"
                  />
                  <PopupInfo>
                    <h3>{popupTv.name}</h3>
                    <div className="infoArea">
                      <div className="left">
                        <p>
                          <span>{popupTv.original_language.toUpperCase()}</span>
                          <b>{tvDetails?.last_air_date.slice(0, 4)}</b> {" ∙ "}
                          ⭐️ {popupTv.vote_average} {" ∙ "}
                          시즌 {tvDetails?.number_of_seasons}
                          {" ∙ "}
                          에피소드 {tvDetails?.seasons.at(-1)?.episode_count} 개
                        </p>
                        <p>{tvDetails?.overview}</p>
                      </div>
                      <div className="right">
                        {tvDetails?.production_companies.length !== 0 && (
                          <p>
                            <span>제작사 : </span>
                            {tvDetails?.production_companies.map((item) => {
                              const size: number =
                                tvDetails?.production_companies.length - 1;
                              return tvDetails?.production_companies[size]
                                .name === item.name
                                ? item.name
                                : item.name + ",";
                            })}
                          </p>
                        )}
                        <p>
                          <span>장르 : </span>
                          {tvDetails?.genres.map((item) => {
                            const size: number = tvDetails?.genres.length - 1;
                            return tvDetails?.genres[size].name === item.name
                              ? item.name
                              : item.name + "∙";
                          })}
                        </p>
                      </div>
                    </div>
                  </PopupInfo>
                  <SimilarList>
                    {tvDetails?.seasons && (
                      <>
                        <h3>시즌 </h3>
                        <ListBox>
                          {tvDetails.seasons.map((item) => (
                            <List key={item.id}>
                              <img
                                src={ImgMakeSrc(item.poster_path, "w500")}
                                alt={item.name}
                              />
                              <h4>{item.name}</h4>
                              <div className="desc">{item.overview}</div>
                            </List>
                          ))}
                        </ListBox>
                      </>
                    )}
                  </SimilarList>
                </PopupInner>
              )}
            </Popup>
          </>
        )}
        {popupMatch && (
          <>
            <Overlay
              onClick={popupClose}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
            />
            <Popup layoutId={cate + popupMatch.params.movieId + ""}>
              {popupMovie && (
                <PopupInner>
                  <i className="exit_btn" onClick={popupClose}>
                    <FontAwesomeIcon icon={faXmarkCircle} />
                  </i>
                  <div className="back">
                    <img
                      src={ImgMakeSrc(popupMovie.backdrop_path, "original")}
                      alt={popupMovie.title}
                      className="back_img"
                    />
                  </div>
                  <img
                    src={ImgMakeSrc(popupMovie.poster_path, "w500")}
                    alt={popupMovie.title}
                    className="poster"
                  />

                  <PopupInfo>
                    <h3>{popupMovie.title}</h3>
                    <div className="infoArea">
                      <div className="left">
                        <p>
                          <span>
                            {popupMovie.original_language.toUpperCase()}
                          </span>
                          <b>{popupMovie.release_date.slice(0, 4)}</b> {" ∙ "}
                          ⭐️ {popupMovie.vote_average} {" ∙ "}
                          {movieDetails?.runtime !== undefined
                            ? movieDetails.runtime > 60
                              ? Math.floor(movieDetails.runtime / 60) +
                                "시간 " +
                                (movieDetails.runtime % 60) +
                                "분"
                              : (movieDetails.runtime % 60) + "분"
                            : ""}
                        </p>
                        <p>
                          <em>{movieDetails?.tagline}</em>
                          {popupMovie.overview}
                        </p>
                      </div>
                      <div className="right">
                        {movieDetails?.production_companies.length !== 0 && (
                          <p>
                            <span>제작사 : </span>
                            {movieDetails?.production_companies.map((item) => {
                              const size: number =
                                movieDetails?.production_companies.length - 1;
                              return movieDetails?.production_companies[size]
                                .name === item.name
                                ? item.name
                                : item.name + ",";
                            })}
                          </p>
                        )}

                        <p>
                          <span>장르 : </span>
                          {movieDetails?.genres.map((item) => {
                            const size: number =
                              movieDetails?.genres.length - 1;
                            return movieDetails?.genres[size].name === item.name
                              ? item.name
                              : item.name + "∙";
                          })}
                        </p>
                      </div>
                    </div>
                  </PopupInfo>
                  <SimilarList>
                    {movieVideos?.results.length !== 0 && (
                      <>
                        <h3>Video</h3>
                        <ListBox>
                          {movieVideos?.results.map((item) => (
                            <List className="grid2" key={item.id}>
                              <iframe
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title={item.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              ></iframe>
                              <h4>{item.name}</h4>
                            </List>
                          ))}
                        </ListBox>
                      </>
                    )}
                  </SimilarList>
                  <SimilarList>
                    {movieSimilars && (
                      <>
                        <h3>비슷한 영화</h3>
                        <ListBox>
                          {movieSimilars.results.map((item, i) => {
                            if (i > 10) {
                              return (
                                <List key={i}>
                                  <img
                                    src={ImgMakeSrc(item.poster_path, "w500")}
                                    alt={item.title}
                                  />
                                  <h4>
                                    {item.title} (
                                    {item.release_date.slice(0, 4)})
                                  </h4>
                                  <div className="desc">{item.overview}</div>
                                </List>
                              );
                            }
                          })}
                        </ListBox>
                      </>
                    )}
                  </SimilarList>
                </PopupInner>
              )}
            </Popup>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.4;
  z-index: 101;
  cursor: pointer;
`;
const Popup = styled(motion.div)`
  z-index: 102;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  margin: auto;
  width: 800px;
  max-width: 90%;
  max-height: calc(100vh - 100px);
  background-color: ${(props) => props.theme.bgDark};
  border-radius: 5px;
`;
const PopupInner = styled.div`
  position: relative;
  .exit_btn {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 5;
    font-size: 30px;
    color: #ddd;
    cursor: pointer;
  }
  .back {
    position: relative;
    width: 100%;
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: ${(props) => props.theme.bgGradient};
    }
    img {
      width: 100%;
    }
  }

  img.poster {
    position: relative;
    z-index: 2;
    display: block;
    max-width: 25%;
    margin: -40% auto 10px;
    border-radius: 5px;
    box-shadow: 0 0 25px ${(props) => props.theme.bgOpacityback};
  }
`;
const PopupInfo = styled.div`
  position: relative;
  z-index: 3;
  padding: 10px 25px;
  box-sizing: border-box;
  h3 {
    display: block;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
  }
  .infoArea {
    display: flex;
    justify-content: space-between;
    .left {
      width: 70%;
      p {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 1.4;
        span {
          margin-right: 8px;
          border: 1px solid #ababab;
          color: #ababab;
          font-size: 14px;
          line-height: 0.9;
          padding: 3px;
        }
        b {
          margin-right: 8px;
          font-size: 26px;
          font-weight: bold;
        }
        em {
          margin: 10px 0;
          font-size: 18px;
          color: #ababab;
          font-style: italic;
        }
      }
    }
    .right {
      width: 30%;
      padding-left: 10px;
      box-sizing: border-box;
      p {
        margin-bottom: 15px;
        font-size: 14px;
        line-height: 1.3;
        span {
          color: #ababab;
        }
      }
    }
  }
`;
const SimilarList = styled.div`
  padding: 30px 25px 10px;
  box-sizing: border-box;
  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }
`;
const ListBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const List = styled.li`
  overflow: hidden;
  width: calc(33% - 20px);
  margin: 10px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  padding: 5px 5px 8px;
  &.grid2 {
    width: calc(50% - 20px);
  }
  iframe {
    width: 100%;
    height: 200px;
  }
  img {
    border-radius: 5px;
    width: 100%;
  }
  h4 {
    padding: 5px 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .desc {
    line-height: 1.1;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
export default PopupDetail;
