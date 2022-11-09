import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
// 가져오는 data
import { ImgMakeSrc } from "../utils";
import { Imovie, ImovieDetail } from "../interface/userInterface";
import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { movieDetail } from "../api/userApi";

interface IlistProps {
  content: Imovie[];
  title: string;
}

const slideVariants = {
  hidden: (slideDirection: number) => ({
    x: slideDirection > 0 ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (slideDirection: number) => ({
    x: slideDirection > 0 ? -window.outerWidth : window.outerWidth,
  }),
};

const listVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    zIndex: 1,
    transition: { delay: 0.3, type: "tween", duration: 0.5 },
  },
};

const Slider = ({ content, title }: IlistProps) => {
  //슬라이드 구현
  const slideOffset = 5;
  const slidePage = Math.floor(content.length / slideOffset) - 1;
  const [slideActive, setSlideActie] = useState(false);
  const slideToggle = () => setSlideActie((prev) => !prev);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const slideIncrease = () => {
    if (slideActive) return;
    setSlideDirection(1);
    setSlideIndex((prev) => (slideIndex === slidePage ? 0 : prev + 1));
    slideToggle();
  };
  const slidedecrease = () => {
    if (slideActive) return;
    setSlideDirection(-1);
    setSlideIndex((prev) => (slideIndex === 0 ? slidePage : prev - 1));
    slideToggle();
  };

  let pagination: number[] = [];
  const pager = () => {
    for (let i = 0; i < slidePage + 1; i++) {
      pagination.push(i);
    }
    return pagination;
  };
  pager();

  //팝업
  const history = useNavigate();
  const popupMatch = useMatch(`/movie/:movieId`);
  const popuphandle = (movieId: number) => {
    history(`/movie/${movieId}`);
  };
  const popupClose = () => {
    history(`/movie`);
  };

  const popupMovie =
    popupMatch?.params.movieId &&
    content.find((movie) => String(movie.id) === popupMatch.params.movieId);
  console.log(content.find((movie) => String(movie.id) === "436270"));
  return (
    <Container>
      <Title>
        <h4>{title}</h4>
        <p>
          {pagination.map((item) => (
            <span key={item} className={item === slideIndex ? "active" : ""}>
              {item}
            </span>
          ))}
        </p>
      </Title>
      <SlideBox>
        <AnimatePresence
          onExitComplete={slideToggle}
          initial={false}
          custom={slideDirection}
        >
          <ListBox
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={slideIndex}
            custom={slideDirection}
            transition={{ type: "tween", duration: 1 }}
          >
            {content
              .slice(
                slideOffset * slideIndex,
                slideOffset * slideIndex + slideOffset
              )
              .map((movie) => (
                <List
                  bgimg={ImgMakeSrc(movie.backdrop_path, "w500")}
                  key={movie.id}
                  variants={listVariants}
                  initial="normal"
                  whileHover="hover"
                  onClick={() => popuphandle(movie.id)}
                  layoutId={movie.id + ""}
                >
                  <h4>{movie.title}</h4>
                </List>
              ))}
          </ListBox>
        </AnimatePresence>
        <BtnLeft onClick={slidedecrease}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BtnLeft>
        <BtnRight onClick={slideIncrease}>
          <FontAwesomeIcon icon={faChevronRight} />
        </BtnRight>
      </SlideBox>
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
                <PopupInner
                  bgimg={ImgMakeSrc(popupMovie.backdrop_path, "original")}
                >
                  <img
                    src={ImgMakeSrc(popupMovie.poster_path, "w500")}
                    alt={popupMovie.title}
                  />
                  <h3>{popupMovie.title}</h3>
                </PopupInner>
              )}
            </Popup>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 50px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  h4 {
    font-size: 20px;
    font-weight: bold;
  }
  p {
    display: flex;
    span {
      width: 20px;
      height: 3px;
      margin: 0 1px;
      font-size: 0;
      background-color: ${(props) => props.theme.txtColor};
      opacity: 0.3;
      &.active {
        background-color: ${(props) => props.theme.point};
        opacity: 1;
      }
    }
  }
`;
const SlideBox = styled.div`
  position: relative;
  left: 0;
  top: 0;
  height: 150px;
  &:hover button {
    opacity: 1;
  }
`;
const ListBox = styled(motion.ul)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
`;
const List = styled(motion.li)<{ bgimg: string }>`
  position: relative;
  overflow: hidden;
  height: 150px;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  border-radius: 3px;
  cursor: pointer;
  &:first-of-type {
    transform-origin: left center;
  }
  &:last-of-type {
    transform-origin: right center;
  }

  h4 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    font-size: 13px;
  }
`;
const Btn = styled.button`
  position: absolute;
  top: 0px;
  border: 0 none;
  background: transparent;
  font-size: 30px;
  width: 50px;
  height: 100%;
  color: ${(props) => props.theme.txtColor};
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s;
`;
const BtnLeft = styled(Btn)`
  left: -50px;
`;
const BtnRight = styled(Btn)`
  right: -50px;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
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
  margin: auto;
  width: 700px;
  height: calc(100vh - 200px);
  background-color: #333;
  border-radius: 5px;
`;
const PopupInner = styled.div<{ bgimg: string }>`
  padding-top: 200px;
  background-image: url(${(props) => props.bgimg});
  background-position: center top;
  background-size: cover;
  img {
    display: block;
    max-width: 25%;
  }
  h3 {
    font-size: 20px;
    color: #333;
  }
`;
export default Slider;
