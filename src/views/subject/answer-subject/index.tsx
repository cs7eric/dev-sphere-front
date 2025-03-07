import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {Button} from "@/components/ui/button.tsx";

export default function AnswerSubject() {
  return (

    <div className="p-[20px] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-[5vm] m-10px rounded-lg border min-h-[92vh] min-w-[95vw]"
      >
        <ResizablePanel defaultSize={20} className="w-full min-w-30vw">
          <div className="flex  items-center justify-start p-3 ">
            <div className="subject-info">
              <h3 className="font-semibold text-3xl p-2">
                Java 中的List 接口
              </h3>
              <div className="label p-2">
                easy
              </div>
              <div className="subject-detail p-2">
                <p className="detail text-lg">
                  请解释Java中hashCode和equals方法的作用，以及它们与==运算符的区别。
                </p>
              </div>
              <div className="subject-tip p-2">
                <Accordion type="multiple" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className=" text-xl">Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className=" text-xl">Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other
                      components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem >
                  <AccordionItem value="item-3">
                    <AccordionTrigger className=" text-xl">Is it animated?</AccordionTrigger>
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
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel defaultSize={84}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={5}>
              <div className="flex h-full items-center justify-center p-6">
                <Button className="p-4 h-10 w-20 font-semibold">submit</Button>
                <Button variant="secondary" className="p-4 h-10 w-20 font-semibold">submit</Button>

              </div>
            </ResizablePanel>
            <ResizableHandle/>
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
