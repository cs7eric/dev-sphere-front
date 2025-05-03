import { Circle } from "@/models/circle.types";
import CircleCard from "@/components/card/circle-card.tsx";
import React from "react";


interface Props {
  circleList
}

const CircleList:React.FC<Props> = ({circleList}) => {
  return (
    <div className="circle-list grid grid-cols-5 w-full  gap-2">
      {circleList.map((circle) => (
          <CircleCard
            circle={circle}
            key={circle.id}
          ></CircleCard>

      ))}
    </div>
  );
}
export default CircleList