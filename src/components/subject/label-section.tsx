import {useState, useRef, useEffect} from "react";
import {
  queryLabelByCategoryIdUsingPost,
  SubjectLabelDTO
} from "@/apis/subject";
import LabelDialog from "@/components/dialog/label-dialog.tsx";

export function LabelSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 检测是否需要显示展开按钮
  const checkOverflow = () => {
    if (contentRef.current && containerRef.current) {
      const hasHorizontalOverflow =
        contentRef.current.scrollWidth > containerRef.current.clientWidth;
      const hasVerticalOverflow =
        contentRef.current.scrollHeight > containerRef.current.clientHeight;
      setShowExpand(hasHorizontalOverflow || hasVerticalOverflow);
    }
  };

  const body: SubjectLabelDTO = {
    categoryId: 14
  }

  const [labelList, setLabelList] = useState<SubjectLabelDTO[]>([])

  useEffect(() => {
    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await queryLabelByCategoryIdUsingPost({body})
      console.log(res)
      setLabelList(res.data)
    }
    fetchData()
  }, [])

  return (
    <div className="label-list mt-6 mb-6 flex px-7">
      {/* 外层容器 */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[1000px]" : "max-h-10"
        }`}
      >
        {/* 内容区域 */}
        <div
          ref={contentRef}
          className="flex flex-wrap gap-4 "
          style={{
            maskImage: !isExpanded
              ? "linear-gradient(to right, black 80%, transparent 95%)"
              : "none"
          }}
        >
          {Array.isArray(labelList) && labelList.length > 0 ? (
            labelList.map((label) => (
              <LabelDialog
                label={label}
                key={label.id}
              ></LabelDialog>
            ))
          ) : (
            <div className="empty w-full"></div>
          )}

        </div>


        {!isExpanded && (
          <div className="absolute inset-y-0 right-0  from-white to-transparent pointer-events-none"/>

        )}


      </div>

      {/* 展开/收起按钮 */}
      <div>
        <button
          className="right-0 w-10 text-base text-[#5e5e5e] cursor-pointer hover:text-white transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "收起" : "展开"}
        </button>
      </div>


    </div>
  );
}