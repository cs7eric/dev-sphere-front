import {Card} from "@/components/ui/card.tsx";
import {Image} from '@unpic/react'
import CompanyImage from '@/assets/image/kuaishou.png'
export default function CompanyItem() {

  return (

    <>


      <div className="p-2 border dark:bg-[#111111] rounded-sm">
        <div className="image-section">
          <Image
            src={CompanyImage}
            className="rounded-lg"
          ></Image>
        </div>
        <div className="function-section space-y-2 mt-3">
          <p className="text-xs">快手-2025春季招聘</p>
          <p className="underline text-xs">点击投递</p>
        </div>

      </div>
    </>
  )
}