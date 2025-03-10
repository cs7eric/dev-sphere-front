import CircleItem from "@/views/circle/components/circle-item";
import { Circle } from "@/models/circle.types";

const circleList: Circle[] = [
  {
    id: '1',
    name: "Tech Circle",
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "Tech enthusiasts group",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '1',
    name: "Tech Circle",
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "Tech enthusiasts group",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '12',
    name: "Tech Circle",
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "Tech enthusiasts group",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '31',
    name: "Tech Circle",
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "Tech enthusiasts group",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '14',
    name: "Tech Circle",
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "Tech enthusiasts group",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '124',
    name: "Tech Circle",
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "Tech enthusiasts group",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  }
];

export default function CircleList() {
  return (
    <div className="circle-list grid grid-cols-6 justify-items-center gap-8">
      {circleList.map((circle) => (
        <CircleItem
          key={circle.id}
          circle={circle}
        />
      ))}
    </div>
  );
}