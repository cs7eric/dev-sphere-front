import ArticleItem from "@/components/article/article-item.tsx";
import React from "react";


interface Props {
  articleList

}
const  ArticleList:React.FC<Props> =  ({articleList}) => {

  return (

    <>
      <div className="w-full flex flex-wrap space-y-5">

        {
          Array.isArray(articleList) && articleList.length > 0 ?
            (articleList).map((article) => (

              <ArticleItem
                key={article.id}
                article={article}
              ></ArticleItem>
            )) : (
              <div>null</div>
            )
        }
      </div>
    </>
  )
}

export default ArticleList