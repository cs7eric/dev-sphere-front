import {useState, useRef, useEffect} from "react";

export function LabelList() {
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

  useEffect(() => {
    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="label-list mt-6 flex px-7">
      {/* 外层容器 */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[1000px]" : "max-h-12"
        }`}
      >
        {/* 内容区域 */}
        <div
          ref={contentRef}
          className="flex flex-wrap gap-2"
          style={{
            maskImage: !isExpanded
              ? "linear-gradient(to right, black 70%, transparent 95%)"
              : "none"
          }}
        >
          {[...Array(70)].map((_, i) => (
            <span
              key={i}
              className="label-item px-2 py-1  rounded-full"
            >
              Java #{i + 1}
            </span>
          ))}

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