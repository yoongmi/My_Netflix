import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <P>Copyright © yomflix All right reserved.</P>
    </>
  );
};
const P = styled.p`
  margin-top: 50px;
  font-size: 16px;
  text-align: center;
  padding: 15px 0;
  background-color: ${(props) => props.theme.bgDark};
`;

export default Footer;
