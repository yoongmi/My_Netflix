import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
// 가져오는 data
import { ImgMakeSrc } from "../utils";
import { Imovie, ImovieDetail } from "../interface/userInterface";
import { movieDetail } from "../api/userApi";

interface IlistProps {
  content: Imovie[];
}

const PopupDetail = ({ content }: IlistProps) => {
  //팝업
  const history = useNavigate();
  const popupMatch = useMatch(`/movie/:movieId`);
  const { data: movieDetails } = useQuery<ImovieDetail | undefined>(
    ["movieDetail"],
    () => movieDetail(popupMatch?.params.movieId),
    { enabled: !!popupMatch?.params.movieId }
  );

  const popupClose = () => {
    history(`/movie`);
  };
  const popupMovie =
    popupMatch?.params.movieId &&
    content.find((movie) => String(movie.id) === popupMatch.params.movieId);

  return (
    <>
      <AnimatePresence>
        {popupMatch && (
          <>
            <Overlay
              onClick={popupClose}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
            />
            <Popup layoutId={popupMatch.params.movieId + ""}>
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
  background-color: #000;
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
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 1)
      );
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
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
`;
const PopupInfo = styled.div`
  position: relative;
  z-index: 3;
  padding: 10px 25px;
  box-sizing: border-box;
  h3 {
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
export default PopupDetail;
