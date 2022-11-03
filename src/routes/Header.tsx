import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ThemeAtom } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const themeState = useRecoilValue(ThemeAtom);
  const themeSetState = useSetRecoilState(ThemeAtom);
  const themeChange = () => themeSetState((prev) => !prev);
  return (
    <Navigator>
      <Nav>
        <h1>
          <img src="/logo.png" alt="logo" />
        </h1>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/movie">Movie</Link>
          </li>
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
  padding: 10px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.point};
  color: ${(props) => props.theme.pointtxt};
`;
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    li {
      padding: 10px;
    }
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
  .bright {
    color: ${(props) => props.theme.point};
  }
`;
export default Header;
