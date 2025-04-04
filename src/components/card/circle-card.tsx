import React from 'react';
import styled from 'styled-components';
import CircleProfileDialog from "@/views/circle/components/circle-profile-dialog.tsx";

interface Props {
  circle
}

const CircleCard: React.FC<Props> = ({circle}) => {
  return (
    <>
      <StyledWrapper className={'mt-5'}>
        <div className="card">
          <div className="icon">
            <img src={circle.icon}
                 alt=""
                 className={'max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] rounded-md'}
            />

          </div>
          <strong> {circle.name} </strong>
          <div className="card__body ">
          </div>
          <CircleProfileDialog circle={circle}></CircleProfileDialog>
        </div>
      </StyledWrapper>
    </>
  );
}
const StyledWrapper = styled.div`
  .card {
    --bg: #262626;
    --hover-bg: #464646;
    --hover-text: #fff;
    max-width: 23ch;
    text-align: center;
    background: var(--bg);
    padding: 1.5em;
    padding-block: 1.8em;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    transition:
      0.3s cubic-bezier(0.6, 0.4, 0, 1),
      transform 0.15s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    color: black;
  }

  .card__body {
    color: #464853;
    line-height: 1.5em;
    font-size: 1em;
  }

  .card > :not(span) {
    transition: 0.3s cubic-bezier(0.6, 0.4, 0, 1);
  }

  .card > strong {
    color: #fff;
    display: block;
    font-size: 1.4rem;
    letter-spacing: -0.035em;
  }

  .card span {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--hover-text);
    border-radius: 5px;
    font-weight: bold;
    top: 100%;
    transition: all 0.3s cubic-bezier(0.6, 0.4, 0, 1);
  }

  .card:hover span {
    top: 0;
    font-size: 1.2em;
  }

  .card:hover {
    background: var(--hover-bg);
  }

  .card:hover > div,
  .card:hover > strong {
    opacity: 0;
  }`;
export default CircleCard;