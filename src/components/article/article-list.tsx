import ArticleItem from "@/components/article/article-item.tsx";
import React from "react";
import EmptyState from "@/components/null/empty-state.tsx";


interface Props {
  articleList

}
const  ArticleList:React.FC<Props> =  ({articleList}) => {

  return (

    <>
      <div className="w-full flex flex-wrap justify-center space-y-2">

        {
          Array.isArray(articleList) && articleList.length > 0 ?
            (articleList).map((article) => (

              <ArticleItem
                key={article.id}
                article={article}
              ></ArticleItem>
            )) : (
                <EmptyState></EmptyState>
            )
        }
      </div>
    </>
  )
}

export default ArticleList