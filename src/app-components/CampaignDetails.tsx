import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAccount, useContractReads, useContractWrite } from "wagmi";
import {
  CHARITY_FUNDRAISER_CONTRACT_ADDRESS,
  CONTRACT_OWNER,
  TOKEN_CONTRACT_ADDRESS,
} from "./contracts";
import { charityTokenABI } from "../ABIs/CharityTokenContractABI";
import "./components.css";
import { charityFundRaiserContractABI } from "../ABIs/CharityFundRaiserContractABI";
import { useState } from "react";

const CampaignDetailsContainer = styled.div`
  display: inline-grid;
  padding-top: 30px;
  width: 100%;
  font-family: fantasy;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  max-width: 200px;
  font-family: fantasy;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  &:focus-visible {
    outline: none;
    background: #ff914d;
    color: #fff;
  }
`;

const Disclaimer = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: flex-end;
  padding-top: 300px;
`;

const HighlightedMessage = styled.div`
  font-family: fantasy;
  font-size: 18px;
  background-color: #1a1a1a;
  color: #ff914d;
  padding-right: 10px;
  text-align: left;
`;

const CampaignDetailsHeading = styled.div`
  display: flex;
`;

const CampaignDetailsTitle = styled.div`
  min-width: 300px;
`;

const Input = styled.input`
  background: #404040;
  padding: 10px;
  min-width: 230px;
  margin-right: 50px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-family: fantasy;
  font-size: 20px;
  &:focus-within {
    border-bottom: 3px solid #ff914d;
  }
  &:focus-visible {
    outline: none;
  }
`;

const DonationBox = styled.div`
  display: flex;
  margin-top: 20px;
`;

const CampaignDetailsAndActionForViwers = styled.div``;

const CampaignDetailsAndActionForOwner = styled.div``;

export function CampaignDetails() {
  const [donationAmount, setDonationAmount] = useState(0);
  const campaignId = useLocation().pathname.replace("/campaign/", "");

  const { address } = useAccount();

  const { data: result, isLoading } = useContractReads({
    contracts: [
      {
        address: TOKEN_CONTRACT_ADDRESS,
        functionName: "allowance",
        abi: charityTokenABI as any,
        args: [address as string, CHARITY_FUNDRAISER_CONTRACT_ADDRESS],
      },
      {
        address: CHARITY_FUNDRAISER_CONTRACT_ADDRESS,
        functionName: "getCampaignDetails",
        abi: charityFundRaiserContractABI as any,
        args: [campaignId],
      },
    ],
    watch: true,
    onError(error) {
      console.log("Error getCampaignDetails", error);
    },
  });

  const { write: donateInCampaign } = useContractWrite({
    address: CHARITY_FUNDRAISER_CONTRACT_ADDRESS,
    abi: charityFundRaiserContractABI,
    functionName: "donate",
    onError(error) {
      console.log("Error in donate", error);
      setDonationAmount(0);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const { write: markCampaignComplete } = useContractWrite({
    address: CHARITY_FUNDRAISER_CONTRACT_ADDRESS,
    abi: charityFundRaiserContractABI,
    functionName: "completeCampaign",
    onError(error) {
      console.log("Error markCampaignComplete", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const notAllowedToTransfer =
    Number(result?.[0]?.result?.toString()) / 10 ** 18 == 0;

  const campaignDetails = result?.[1]?.result as any;
  const goalAmount = Number(campaignDetails?.goalAmount?.toString()) / 10 ** 18;
  const raisedAmount =
    Number(campaignDetails?.raisedAmount?.toString()) / 10 ** 18;
  const campaignOrganizer = campaignDetails?.organizer;

  const amITheOrganizer = campaignOrganizer === address;
  const notAllowedToCloseCampaign = address !== CONTRACT_OWNER;

  const donate = () => {
    donateInCampaign({
      args: [campaignId, donationAmount],
    });
  };

  const closeCampaign = () => {
    markCampaignComplete({
      args: [campaignId],
    });
  };

  return (
    <>
      <CampaignDetailsContainer>
        <CampaignDetailsAndActionForViwers>
          <CampaignDetailsHeading>
            <CampaignDetailsTitle>Campaign Name:</CampaignDetailsTitle>
            <HighlightedMessage>{campaignDetails?.name}</HighlightedMessage>
          </CampaignDetailsHeading>
          <CampaignDetailsHeading>
            <CampaignDetailsTitle>Campaign Funds Goal:</CampaignDetailsTitle>
            <HighlightedMessage>{goalAmount}</HighlightedMessage>
          </CampaignDetailsHeading>
          <CampaignDetailsHeading>
            <CampaignDetailsTitle>Campaign Raised Funds:</CampaignDetailsTitle>
            <HighlightedMessage>{raisedAmount}</HighlightedMessage>
          </CampaignDetailsHeading>
          <CampaignDetailsHeading>
            <CampaignDetailsTitle>Campaign Organizer:</CampaignDetailsTitle>
            <HighlightedMessage>{campaignOrganizer}</HighlightedMessage>
            {amITheOrganizer ? "(Myself)" : ""}
          </CampaignDetailsHeading>

          <DonationBox>
            <Input
              placeholder="Enter amount to donate"
              type="number"
              value={donationAmount}
              onChange={(event) =>
                setDonationAmount(Number(event.target.value))
              }
            />
            <Button
              disabled={notAllowedToTransfer || donationAmount <= 0}
              onClick={donate}
              className={
                notAllowedToTransfer || donationAmount <= 0
                  ? "btn-disabled"
                  : "btn-enabled"
              }
            >
              Donate
            </Button>
          </DonationBox>
        </CampaignDetailsAndActionForViwers>

        <CampaignDetailsAndActionForOwner>
          <Button
            disabled={notAllowedToCloseCampaign}
            onClick={closeCampaign}
            className={
              notAllowedToCloseCampaign ? "btn-disabled" : "btn-enabled"
            }
          >
            Close Campaign
          </Button>
        </CampaignDetailsAndActionForOwner>
      </CampaignDetailsContainer>
      {notAllowedToTransfer && (
        <Disclaimer>
          <HighlightedMessage>DISCLAIMER : </HighlightedMessage>In order to
          donate in any campaign we'd need your allowance to transfer funds from
          your wallet to campaign. And we noticed you haven't allowed us. Please
          allow transfers from
          <NavLink className={"my-funds-link"} to="/funds">
            My Funds
          </NavLink>
          section
        </Disclaimer>
      )}
    </>
  );
}
