import { ConnectKitButton } from "connectkit";
import logo from "./../logo.png";
import styled from "styled-components";

const HeaderContainer = styled.div`
  color: #fff;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 50px 100px;
`;

const Logo = styled.div`
  display: flex;
`;

const TitleAndSubTitle = styled.div`
  color: #fff;
  display: block;
  justify-content: left;
  padding: 0px 9px;
`;

const Title = styled.div`
  font-family: cursive;
  font-size: 33px;
  color: #fff;
  display: flex;
`;

const SubTitle = styled.div`
  font-family: fantasy;
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Connector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HighlightedMessage = styled.div`
  font-family: fantasy;
  font-size: 22px;
  background-color: #1a1a1a;
  color: #ff914d;
  padding-right: 10px;
  padding-left: 10px;
`;

export const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Logo>
          <img
            src={logo}
            alt="logo"
            style={{ height: "76px", width: "76px" }}
          />
          <TitleAndSubTitle>
            <Title>Noble Chain</Title>
            <SubTitle>
              Empowering Hopes with Charity
              <HighlightedMessage>OnChain</HighlightedMessage>
            </SubTitle>
          </TitleAndSubTitle>
        </Logo>
        <Connector>
          <ConnectKitButton />
        </Connector>
      </HeaderContainer>
    </>
  );
};
