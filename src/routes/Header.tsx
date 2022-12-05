import { Link, useMatch } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ThemeAtom } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Header = () => {
  const themeState = useRecoilValue(ThemeAtom);
  const themeSetState = useSetRecoilState(ThemeAtom);
  const themeChange = () => themeSetState((prev) => !prev);
  const movieMatch = useMatch("/movie");
  const tvMatch = useMatch("/tv");
  const searchMatch = useMatch("/search");
  return (
    <Navigator>
      <Nav>
        <h1>
          <img src={"/My_Netflix/logo.png"} alt="logo" />
        </h1>
        <ul>
          <Li isActive={movieMatch !== null}>
            <Link to="/movie">
              Movie{movieMatch && <Circle layoutId="circle" />}
            </Link>
          </Li>
          <Li isActive={tvMatch !== null}>
            <Link to="/tv">
              Tv program{tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Li>
          <Li isActive={searchMatch !== null}>
            <Link to="/search">
              Search{searchMatch && <Circle layoutId="circle" />}
            </Link>
          </Li>
        </ul>
      </Nav>
      <ThemeBtn onClick={themeChange}>
        {themeState ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon className="bright" icon={faLightbulb} />
        )}
      </ThemeBtn>
    </Navigator>
  );
};

const Navigator = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.point};
  color: ${(props) => props.theme.pointtxt};
`;
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 img {
    width: 100px;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
`;
const Li = styled.li<{ isActive: boolean }>`
  position: relative;
  font-weight: bold;
  transition: all 0.3s;
  a {
    color: ${(props) => (props.isActive ? "#009688" : "#fff")};
    padding: 10px;
  }
`;
const ThemeBtn = styled.span`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.txtColor};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  .bright {
    color: ${(props) => props.theme.point};
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  left: 10px;
  top: -10px;
  width: 5px;
  height: 5px;
  background-color: #009688;
  border-radius: 50%;
`;
export default Header;
