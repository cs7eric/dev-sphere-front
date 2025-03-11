import {Subject} from "@/models/subject.types.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import React from "react";

interface Props {

  subject: Subject
}

const SubjectItem: React.FC<Props> = ({subject}) => {

  return (

    <>
      <div className="flex  items-center justify-start p-3 ">
        <div className="subject-info">
          <h3 className="font-semibold text-xl p-2">
            {subject.subjectName}
          </h3>
          <div className="label text-sm p-2">
            easy
          </div>
          <div className="subject-detail p-2">
            <p className="detail text-md">
              {subject.subjectName}。
            </p>
          </div>
          <div className="subject-tip p-2">
            <Accordion type="multiple" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className=" text-base">Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className=" text-base">Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-base">Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
              <div className="w-full"></div>
            </Accordion>
          </div>
        </div>
      </div>
    </>

  )

}

export default SubjectItem