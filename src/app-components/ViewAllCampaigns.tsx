import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./components.css";
import { useAccount, useContractReads } from "wagmi";
import { CHARITY_FUNDRAISER_CONTRACT_ADDRESS } from "./contracts";
import { charityFundRaiserContractABI } from "../ABIs/CharityFundRaiserContractABI";

const ViewAllContainer = styled.div`
  display: inline-grid;
  padding-top: 30px;
  width: 100%;
  font-family: fantasy;
  font-size: 20px;
`;

const CampaignsHeader = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bold;
  justify-content: space-between;
`;

const CampaignsHeaderItem = styled.div`
  display: inline-grid;
  padding-top: 50px;
`;

const CampaignsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CampaignsRowItem = styled.div`
  display: inline-grid;
  padding-top: 50px;
`;

function ViewAllCampaigns() {
  const { address } = useAccount();
  const { data: result, isLoading } = useContractReads({
    contracts: [
      {
        address: CHARITY_FUNDRAISER_CONTRACT_ADDRESS,
        functionName: "getAllCampaigns",
        abi: charityFundRaiserContractABI as any,
        args: [address as any],
      },
    ],
    watch: true,
  });

  const allCampaigns = (result?.[0]?.result as any[]) || [];
  console.log({ allCampaigns });
  return (
    <ViewAllContainer>
      <CampaignsHeader>
        <CampaignsHeaderItem>Campaign Name</CampaignsHeaderItem>
        <CampaignsHeaderItem>Funds Goal</CampaignsHeaderItem>
        <CampaignsHeaderItem>Funds Raised</CampaignsHeaderItem>
        <CampaignsHeaderItem>Is Completed</CampaignsHeaderItem>
        <CampaignsHeaderItem>Funds Contributed</CampaignsHeaderItem>
        <CampaignsHeaderItem>Details</CampaignsHeaderItem>
      </CampaignsHeader>
      {allCampaigns.map((campaign) => {
        const goalAmount = Number(campaign.goalAmount.toString()) / 10 ** 18;
        const raisedAmount =
          Number(campaign.raisedAmount.toString()) / 10 ** 18;
        return (
          <CampaignsRow>
            <CampaignsRowItem>{campaign.name}</CampaignsRowItem>
            <CampaignsRowItem>{goalAmount} CHT</CampaignsRowItem>
            <CampaignsRowItem>{raisedAmount} CHT</CampaignsRowItem>
            <CampaignsRowItem>
              {campaign.completed ? "Yes" : "No"}
            </CampaignsRowItem>
            <CampaignsRowItem>
              {campaign.isContributedByViewer ? "Yes" : "No"}
            </CampaignsRowItem>
            <CampaignsRowItem>
              <NavLink
                to={`/campaign/${campaign.id.toString()}`}
                className="donate-link"
              >
                Explore &gt;
              </NavLink>
            </CampaignsRowItem>
          </CampaignsRow>
        );
      })}
    </ViewAllContainer>
  );
}

export default ViewAllCampaigns;
