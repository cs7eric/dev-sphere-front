import {number} from "zod";
import CompanyItem from "@/views/job/components/company-item.tsx";

export default function CompanyList() {

  return (

    <>

      <div className="company-list-section grid grid-cols-5 gap-2">
        {
          Array.from(
            {length: 12}, (_, index: number) => (index + 1))
            .map((_, index) => (
              <CompanyItem key={index}></CompanyItem>
            ))
        }

      </div>


    </>
  )
}