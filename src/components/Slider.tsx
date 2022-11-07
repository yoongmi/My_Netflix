import styled from "styled-components";
import { ImgMakeSrc } from "../utils";
import { Imovie } from "../interface/userInterface";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface IlistProps {
  content: Imovie[];
  title: string;
}

const Slider = ({ content, title }: IlistProps) => {
  //슬라이드 구현
  const slideOffset = 5;
  const slidePage = content.length / slideOffset - 1;
  const [slideIndex, setSlideIndex] = useState(0);
  const slideIncrease = () => {
    if (slideIndex >= slidePage) {
      setSlideIndex(0);
    } else {
      setSlideIndex((prev) => prev + 1);
    }
  };
  const slidedecrease = () => {
    if (slideIndex === 0) {
      setSlideIndex(slidePage);
    } else {
      setSlideIndex((prev) => prev - 1);
    }
  };
  const slideVariants = {
    hidden: {
      x: window.outerWidth,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth,
    },
  };

  return (
    <Container>
      <h4>{title}</h4>
      <SlideBox>
        <AnimatePresence initial={false}>
          <ListBox
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={slideIndex}
            transition={{ type: "tween", duration: 1 }}
          >
            {content
              .slice(
                slideOffset * slideIndex,
                slideOffset * slideIndex + slideOffset
              )
              .map((movie) => (
                <List
                  bgImg={ImgMakeSrc(movie.backdrop_path, "w500")}
                  key={movie.id}
                >
                  <h4>{movie.title}</h4>
                  {/* <p>{movie.overview}</p>
                  <p>{movie.release_date}</p>
                  <p>{movie.original_language}</p>
                  <p>{movie.vote_average}</p> */}
                </List>
              ))}
          </ListBox>
        </AnimatePresence>
      </SlideBox>
      <button onClick={slidedecrease}>이전</button>
      <button onClick={slideIncrease}>다음</button>
    </Container>
  );
};
const Container = styled.div`
  overflow: hidden;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
const SlideBox = styled.div`
  position: relative;
  left: 0;
  top: 0;
  height: 150px;
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
const List = styled(motion.li)<{ bgImg: string }>`
  position: relative;
  height: 150px;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
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

export default Slider;
