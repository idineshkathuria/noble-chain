import styled from "styled-components";

const MessageContainer = styled.div`
  width: 100%;
  padding-top: 200px;
  text-align: center;
`;

const Message = styled.div`
  font-family: fantasy;
  font-size: 22px;
  background-color: #1a1a1a;
  color: #fff;
  padding: 10px;
`;

const HighlightedMessage = styled.span`
  font-family: fantasy;
  font-size: 22px;
  background-color: #1a1a1a;
  color: #ff914d;
  padding: 10px;
`;

export const ConnectMessage = () => {
  return (
    <MessageContainer>
      <Message>
        To <HighlightedMessage>embark on your journey</HighlightedMessage> of
        making a difference,
        <HighlightedMessage>connect your wallet</HighlightedMessage>
        and enter the world of
        <HighlightedMessage>Web3 Charity</HighlightedMessage>
      </Message>
      <Message>
        By connecting your wallet, you'll gain the
        <HighlightedMessage>
          power to contribute to meaningful causes
        </HighlightedMessage>
        and be a part of positive change.
      </Message>
    </MessageContainer>
  );
};
