import { useState } from "react";
import styled from "styled-components";
import "./components.css";
import { useContractWrite } from "wagmi";
import { charityFundRaiserContractABI } from "../ABIs/CharityFundRaiserContractABI";
import { CHARITY_FUNDRAISER_CONTRACT_ADDRESS } from "./contracts";
import { useNavigate } from "react-router-dom";

const CreateContainer = styled.div`
  display: inline-grid;
  padding-top: 70px;
  justify-content: center;
  width: 100%;
}
`;

const Input = styled.input`
  background: #404040;
  padding: 20px;
  width: 500px;
  margin-bottom: 20px;
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

const Button = styled.button`
  padding: 20px;
  border-radius: 5px;
  font-family: fantasy;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  &:focus-visible {
    outline: none;
    background: #ff914d;
    color: #fff;
  }
`;

function CreateCampaign() {
  const [name, setName] = useState("");
  const [fundsGoal, setFundsGoal] = useState(0);
  const navigate = useNavigate();

  const { write: createCampaign } = useContractWrite({
    address: CHARITY_FUNDRAISER_CONTRACT_ADDRESS,
    abi: charityFundRaiserContractABI,
    functionName: "createCampaign",
    onError(error) {
      console.log("Error createCampaign", error);
    },
    onSuccess(data) {
      console.log("Success", data);
      navigate("/");
    },
  });

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };

  const onFundsGoalChange = (event: any) => {
    setFundsGoal(event.target.value);
  };

  const onCreateCampaign = () => {
    createCampaign({
      args: [name, fundsGoal],
    });
  };

  const buttonDisabled = !name || fundsGoal <= 0;

  return (
    <CreateContainer>
      <Input
        type="text"
        placeholder="Enter Campaign Name"
        onChange={onNameChange}
      ></Input>
      <Input
        type="number"
        placeholder="Enter Funds Goal"
        onChange={onFundsGoalChange}
      ></Input>
      <Button
        disabled={buttonDisabled}
        className={buttonDisabled ? "btn-disabled" : "btn-enabled"}
        onClick={onCreateCampaign}
      >
        Create
      </Button>
    </CreateContainer>
  );
}

export default CreateCampaign;
