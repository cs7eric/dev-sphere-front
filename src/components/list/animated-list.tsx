import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEventHandler,
  UIEvent,
} from "react";
import {motion, useInView} from "framer-motion";
import UserAbbreviate from "@/components/user/user-abbreviate";
import ArticleAbbreviate from "@/components/article/article-abbreviate";
import SubjectAbbreviate from "@/views/subject/components/subject-abbreviate";
import { User } from "@/models/user.types";
import { Article } from "@/models/article.types";
import { Subject } from "@/models/subject.types";
import { AuthUserDTO } from "@/apis/auth";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
                                                     children,
                                                     delay = 0,
                                                     index,
                                                     onMouseEnter,
                                                     onClick,
                                                   }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {amount: 0.5, once: false});
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{scale: 0.7, opacity: 0}}
      animate={inView ? {scale: 1, opacity: 1} : {scale: 0.7, opacity: 0}}
      transition={{duration: 0.2, delay}}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

type ItemType = "string" | "user" | "article" | "subject";
type ItemData = string | AuthUserDTO | Article | Subject;

interface AnimatedListProps {
  items?: ItemData[];
  itemType?: ItemType;
  onItemSelect?: (item: ItemData, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  isFollowed?: boolean;
  requiredFollow?: boolean;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
                                                     items,
                                                     itemType,
                                                     onItemSelect,
                                                     showGradients = true,
                                                     enableArrowNavigation = true,
                                                     className = "",
                                                     itemClassName = "",
                                                     displayScrollbar = true,
                                                     initialSelectedIndex = -1,
                                                     isFollowed = false,
                                                     requiredFollow = false,
                                                   }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const {scrollTop, scrollHeight, clientHeight} =
      e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  // Keyboard navigation: arrow keys, tab, and enter selection
  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  // Scroll the selected item into view if needed
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    ) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({top: itemTop - extraMargin, behavior: "smooth"});
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  // 根据不同的itemType渲染不同的组件
  const renderItem = (item: ItemData, index: number) => {
    switch (itemType) {
      case "user":
        return (
          <UserAbbreviate 
            user={item as AuthUserDTO} 
            isFollowed={isFollowed} 
            requiredFollow={requiredFollow} 
          />
        );
      case "article":
        return <ArticleAbbreviate article={item as Article} />;
      case "subject":
        return <SubjectAbbreviate subject={item as Subject} />;
      default:
        return (
          <div
            className={`p-4 bg-[#111] rounded-lg ${selectedIndex === index ? "bg-[#222]" : ""} ${itemClassName}`}
          >
            <p className="text-white m-0">{item as string}</p>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-[400px] ${className}`}>
      <div
        ref={listRef}
        className={`max-h-[560px] overflow-y-auto p-4 ${
          displayScrollbar
            ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060606] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]"
            : "scrollbar-hide"
        }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#222 #060606",
        }}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              if (onItemSelect) {
                onItemSelect(item, index);
              }
            }}
          >
            {renderItem(item, index)}
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#060606] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{opacity: topGradientOpacity}}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#060606] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{opacity: bottomGradientOpacity}}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;
