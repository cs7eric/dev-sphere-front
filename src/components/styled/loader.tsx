import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <li className="ball" />
        <li className="ball" />
        <li className="ball" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 60px;
    display: flex;
    justify-content: space-evenly;
  }

  .ball {
    list-style: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
  }

  .ball:nth-child(1) {
    animation: bounce-1 2.1s ease-in-out infinite;
  }

  @keyframes bounce-1 {
    50% {
      transform: translateY(-18px);
    }
  }

  .ball:nth-child(2) {
    animation: bounce-3 2.1s ease-in-out 0.3s infinite;
  }

  @keyframes bounce-2 {
    50% {
      transform: translateY(-18px);
    }
  }

  .ball:nth-child(3) {
    animation: bounce-3 2.1s ease-in-out 0.6s infinite;
  }

  @keyframes bounce-3 {
    50% {
      transform: translateY(-18px);
    }
  }`;

export default Loader;
