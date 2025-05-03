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
          <strong> {circle.circleName} </strong>
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
    --bg: #ffffff;
    --hover-bg: #f0f2f5;
    --hover-text: #1890ff;
    --text-color: #333;
    --secondary-text: #666;

    max-width: 23ch;
    text-align: center;
    background: var(--bg);
    padding: 1.5em;
    padding-block: 1.8em;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    transition:
      background 0.3s cubic-bezier(0.6, 0.4, 0, 1),
      transform 0.15s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid #e8e8e8;
  }

  .card__body {
    color: var(--secondary-text);
    line-height: 1.6em;
    font-size: 0.95em;
  }

  .card > :not(span) {
    transition: 0.3s cubic-bezier(0.6, 0.4, 0, 1);
  }

  .card > strong {
    color: var(--text-color);
    display: block;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
    font-weight: 500;
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
    border-radius: 8px;
    font-weight: 500;
    top: 100%;
    transition: all 0.3s cubic-bezier(0.6, 0.4, 0, 1);
    background: rgba(255, 255, 255, 0.9);
  }

  .card:hover span {
    top: 0;
    font-size: 1.1em;
  }

  .card:hover {
    background: var(--hover-bg);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .card:hover > div,
  .card:hover > strong {
    opacity: 0;
  }
`;

export default CircleCard;