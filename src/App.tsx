import { useAccount } from "wagmi";
import { Header } from "./app-components/Header";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ViewAllCampaigns from "./app-components/ViewAllCampaigns";
import CreateCampaign from "./app-components/CreateCampaign";
import { MyFunds } from "./app-components/MyFunds";
import { ConnectMessage } from "./app-components/ConnectMessage";
import "./app.css";
import { Nav } from "./app-components/Nav";
import { CampaignDetails } from "./app-components/CampaignDetails";

const AppContainer = styled.div`
  font-family: fantasy;
  color: #fff;
  height: 100%;
  display: block;
  padding: 30px 100px;
`;

export function App() {
  const { isConnected } = useAccount();

  return (
    <>
      <Header />
      <AppContainer>
        {isConnected ? (
          <Router>
            <Nav />
            <Routes>
              <Route path="/" Component={ViewAllCampaigns} />
              <Route path="/create" Component={CreateCampaign} />
              <Route path="/funds" Component={MyFunds} />
              <Route path="/campaign/:id" Component={CampaignDetails} />
            </Routes>
          </Router>
        ) : (
          <ConnectMessage />
        )}
      </AppContainer>
    </>
  );
}
