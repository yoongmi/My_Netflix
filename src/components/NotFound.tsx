import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <div>
        <Bigtitle>4☹︎4</Bigtitle>
        <Title>페이지를 찾을수 없습니다.</Title>
        <Link to="/movie">홈으로 돌아가기</Link>
      </div>
    </Container>
  );
};
const Container = styled.div`
  min-height: calc(100vh - 159px);
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  a {
    color: ${(props) => props.theme.point};
    text-decoration: underline;
  }
`;
const Bigtitle = styled.h1`
  font-size: 150px;
  font-weight: bold;
`;
const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;
export default NotFound;
