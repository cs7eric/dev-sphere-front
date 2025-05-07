import React, {useEffect, useState} from "react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog.tsx";
import {getSubjectListByCategoryUsingPost, getSubjectListByLabelUsingPost} from "@/apis/subject";
import EmptyState from "@/components/null/empty-state.tsx";
import SubjectAbbreviateList from "@/views/subject/components/subject-abbreviate-list.tsx";
import DataLoader from "@/components/render/data-loader.tsx";
import CustomSpinner from "@/components/loader/custom-spinner.tsx";
import CustomSkeleton from "@/components/loader/custom-skeleton.tsx";
import DogLoader from "@/components/loader/dog-loader.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

interface Props {
  label
}

const LabelDialog: React.FC<Props> = ({label}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  const body = {
    labelId: label.id
  };

  const fetchSubjectListByLabel = async () => {
    setLoading(true);
    const res = await getSubjectListByLabelUsingPost({body});
    if (res.success && Array.isArray(res.data)) {
      setSubjectList(res.data);
    }
    setLoading(false);
  };

  // 将数据请求移动到 onClick 事件中
  const handleLabelClick = () => {
    setIsOpen(true);
    fetchSubjectListByLabel();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <h3
            className='p-1 hover:rounded-md hover:bg-neutral-800/10 hover:text-neutral-900 dark:hover:bg-[#262626] cursor-pointer'
            key={label.id}
            onClick={handleLabelClick}
          >{label.labelName}</h3>
        </DialogTrigger>
        <DialogContent>
          {label.labelName}

          <ScrollArea className='max-w-[680px]  min-h-[550px]'>
            <DataLoader
              data={subjectList}
              loading={loading}
              emptyComponent={<EmptyState/>}
              loaderComponent={<DogLoader size={20}/>} // 传入自定义的加载组件
            >
              {(data) => <SubjectAbbreviateList subjectList={data}/>}
            </DataLoader>
          </ScrollArea>

          <DialogFooter className="sm:justify-start mt-auto">
            <Button variant='default' size={'sm'}> 录题 </Button>
            <DialogClose asChild>
              <Button type="button" size={'sm'} variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>

        </DialogContent>
      </Dialog>

    </>
  )
}

export default LabelDialog;