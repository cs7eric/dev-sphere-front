import React from 'react';
import styled from 'styled-components';

interface Props {
  logoTitle: String
}

const LogoLoader:React.FC<Props> = ({logoTitle="devspere"}) => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span>&lt;</span>
        <span>{logoTitle}</span>
        <span>/&gt;</span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    font-size: 1em;
    font-weight: 700;
  }
  .loader > * {
    color: black;
  }
  .loader span {
    display: inline-flex;
  }
  .loader span:nth-child(2) {
    letter-spacing: -1em;
    overflow: hidden;
    animation: reveal 1500ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite
      alternate;
  }
  @keyframes reveal {
    0%,
    100% {
      opacity: 0.5;
      letter-spacing: -1em;
    }
    50% {
      opacity: 1;
      letter-spacing: 0em;
    }
  }`;

export default LogoLoader;
