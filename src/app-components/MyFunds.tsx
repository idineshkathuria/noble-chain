import { useAccount, useContractReads, useContractWrite } from "wagmi";
import { charityTokenABI } from "../ABIs/CharityTokenContractABI";
import styled from "styled-components";
import {
  CHARITY_FUNDRAISER_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from "./contracts";
import "./components.css";
import { ethers } from "ethers";

const MyFundsContainer = styled.div`
  display: inline-grid;
  padding-top: 30px;
  width: 100%;
  font-family: fantasy;
  font-size: 20px;
`;

const MyFundsHeader = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bold;
  justify-content: space-between;
`;

const MyFundsHeaderItem = styled.div`
  display: inline-grid;
  min-width: 25%;
  text-align: center;
  padding-top: 50px;
`;

const MyFundsRow = styled.div`
  display: flex;
`;

const MyFundsRowItem = styled.div`
  display: inline-grid;
  min-width: 25%;
  text-align: center;
  justify-content: center;
  padding-top: 50px;
`;

const Disclaimer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 300px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
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

const HighlightedMessage = styled.div`
  font-family: fantasy;
  font-size: 22px;
  background-color: #1a1a1a;
  color: #ff914d;
  padding-right: 10px;
  padding-left: 10px;
`;

export const MyFunds = () => {
  const { address } = useAccount();

  const { data: result, isLoading } = useContractReads({
    contracts: [
      {
        address: TOKEN_CONTRACT_ADDRESS,
        functionName: "balanceOf",
        abi: charityTokenABI as any,
        args: [address as string],
      },
      {
        address: TOKEN_CONTRACT_ADDRESS,
        functionName: "allowance",
        abi: charityTokenABI as any,
        args: [address as string, CHARITY_FUNDRAISER_CONTRACT_ADDRESS],
      },
    ],
    watch: true,
  });

  const { write: claimCharityToken } = useContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    functionName: "claim",
    abi: charityTokenABI,
  });

  const { write: allowCharityTokenTransfers } = useContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    functionName: "increaseAllowance",
    abi: charityTokenABI,
    args: [CHARITY_FUNDRAISER_CONTRACT_ADDRESS, 100 * 10 ** 18],
  });

  const balanceRetrieved = Number(result?.[0]?.result?.toString()) / 10 ** 18;
  const allowedToTransfer =
    Number(result?.[1]?.result?.toString()) / 10 ** 18 > 0;

  const claimToken = () => {
    claimCharityToken();
  };

  const allowTransfers = () => {
    allowCharityTokenTransfers();
  };

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <MyFundsContainer>
          <MyFundsHeader>
            <MyFundsHeaderItem>Token</MyFundsHeaderItem>
            <MyFundsHeaderItem>Balance</MyFundsHeaderItem>
            <MyFundsHeaderItem>Allowed Transfers</MyFundsHeaderItem>
            <MyFundsHeaderItem>Actions</MyFundsHeaderItem>
          </MyFundsHeader>
          <MyFundsRow>
            <MyFundsRowItem>Charitable Token (CHT)</MyFundsRowItem>
            <MyFundsRowItem>{balanceRetrieved}</MyFundsRowItem>
            <MyFundsRowItem>{allowedToTransfer ? "Yes" : "No"}</MyFundsRowItem>
            <MyFundsRowItem>
              <Button
                disabled={!!balanceRetrieved}
                onClick={claimToken}
                className={
                  balanceRetrieved > 0 ? "btn-disabled" : "btn-enabled"
                }
              >
                Mint Tokens
              </Button>
              <Button
                disabled={allowedToTransfer}
                onClick={allowTransfers}
                className={allowedToTransfer ? "btn-disabled" : "btn-enabled"}
              >
                Allow Transfers
              </Button>
            </MyFundsRowItem>
          </MyFundsRow>
          <Disclaimer>
            <HighlightedMessage>DISCLAIMER : </HighlightedMessage>In order to
            donate in any campaign we'd need your consent to transfer funds from
            your wallet to campaign. And we'll take allowance of upto
            <HighlightedMessage>100 CHT</HighlightedMessage>tokens
          </Disclaimer>
        </MyFundsContainer>
      )}
    </>
  );
};
