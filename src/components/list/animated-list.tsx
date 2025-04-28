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
  theme?: 'dark' | 'light';
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
                                                     theme = 'dark',
                                                   }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  // Theme-based styles
  const themeStyles = {
    dark: {
      bg: '#060606',
      itemBg: '#111',
      itemBgSelected: '#222',
      scrollbarTrack: '#060606',
      scrollbarThumb: '#222',
      text: 'text-white',
      gradientFrom: 'from-[#060606]',
    },
    light: {
      bg: '#f5f5f5',
      itemBg: '#fff',
      itemBgSelected: '#e5e5e5',
      scrollbarTrack: '#f5f5f5',
      scrollbarThumb: '#d4d4d4',
      text: 'text-gray-800',
      gradientFrom: 'from-[#f5f5f5]',
    }
  };

  const currentTheme = themeStyles[theme];

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

  // Render item based on type
  const renderItem = (item: ItemData, index: number) => {
    switch (itemType) {
      case "user":
        return (
          <UserAbbreviate
            user={item as AuthUserDTO}
            isFollowed={isFollowed}
            requiredFollow={requiredFollow}
            theme={theme}
          />
        );
      case "article":
        return <ArticleAbbreviate article={item as Article} theme={theme} />;
      case "subject":
        return <SubjectAbbreviate subject={item as Subject} theme={theme} />;
      default:
        return (
          <div
            className={`p-4 rounded-lg ${selectedIndex === index ? currentTheme.itemBgSelected : currentTheme.itemBg} ${currentTheme.text} ${itemClassName}`}
          >
            <p className={`m-0 ${currentTheme.text}`}>{item as string}</p>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-[330px] ${className}`}>
      <div
        ref={listRef}
        className={`max-h-[500px] overflow-y-auto p-4 ${
          displayScrollbar
            ? `[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:${currentTheme.scrollbarTrack} [&::-webkit-scrollbar-thumb]:${currentTheme.scrollbarThumb} [&::-webkit-scrollbar-thumb]:rounded-[4px]`
            : "scrollbar-hide"
        }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: `${currentTheme.scrollbarThumb} ${currentTheme.scrollbarTrack}`,
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
            className={`absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b ${currentTheme.gradientFrom} to-transparent pointer-events-none transition-opacity duration-300 ease`}
            style={{opacity: topGradientOpacity}}
          ></div>
          <div
            className={`absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t ${currentTheme.gradientFrom} to-transparent pointer-events-none transition-opacity duration-300 ease`}
            style={{opacity: bottomGradientOpacity}}
          ></div>
        </>
      )}
    </div>
  );
};

export default AnimatedList;