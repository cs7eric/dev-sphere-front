import { Circle } from "@/models/circle.types";
import CircleCard from "@/components/card/circle-card.tsx";

const circleList: Circle[] = [
  {
    id: '1',
    name: "Tech Circle",
    category: 'Java',
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "编程圈子是技术爱好者的聚集地，旨在分享编程知识、交流经验和解决问题。成员们通过讨论最新技术、参与开源项目和组织线下活动，促进技术成长与合作。",
    icon: 'http://124.220.92.21:9000/dev-sphere/b1157a7f64d6415989d7725d32815793.png'
  },
  {
    id: '2',
    name: "Tech Circle",
    category: 'Java',
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "编程圈子是技术爱好者的聚集地，旨在分享编程知识、交流经验和解决问题。成员们通过讨论最新技术、参与开源项目和组织线下活动，促进技术成长与合作。",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '22222',
    name: "Tech Circle",
    category: 'Java',
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "编程圈子是技术爱好者的聚集地，旨在分享编程知识、交流经验和解决问题。成员们通过讨论最新技术、参与开源项目和组织线下活动，促进技术成长与合作。",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '232',
    name: "Tech Circle",
    category: 'Java',
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "编程圈子是技术爱好者的聚集地，旨在分享编程知识、交流经验和解决问题。成员们通过讨论最新技术、参与开源项目和组织线下活动，促进技术成长与合作。",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  },
  {
    id: '2232',
    name: "Tech Circle",
    category: 'Java',
    memberCount: 10,
    memberIdList: ["user1", "user2"],
    intro: "编程圈子是技术爱好者的聚集地，旨在分享编程知识、交流经验和解决问题。成员们通过讨论最新技术、参与开源项目和组织线下活动，促进技术成长与合作。",
    icon: 'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250310225238113.png'
  }
];

export default function CircleList() {
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