import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import HomeRouter from "./components/router";
import { useRecoilValue } from "recoil";
import { ThemeAtom } from "./atom";
import { useEffect, useState } from "react";

function App() {
  const isTheme = useRecoilValue(ThemeAtom);
  const [windowWidth, setwindowWidth] = useState(window.outerWidth);
  const windowSize = () => {
    setwindowWidth(window.outerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", windowSize);
    return () => {
      window.removeEventListener("resize", windowSize);
    };
  }, [window.outerWidth]);
  return (
    <ThemeProvider theme={isTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <HomeRouter />
      {windowWidth < 768 && (
        <Sizeblack>
          <p>
            이 페이지는 모바일에서 지원하지 않습니다.
            <br />
            PC 화면을 확인해주세요.
          </p>
        </Sizeblack>
      )}
    </ThemeProvider>
  );
}
const Sizeblack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgDark};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    font-size: 20px;
    color: ${(props) => props.theme.txtColor};
    line-height: 1.4;
  }
`;

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
*{
  box-sizing:border-box;
}
body {
	line-height: 1.2;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.txtColor}
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

export default App;
