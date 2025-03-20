import React from "react";
import {Article} from "@/models/article.types.ts";
import {Button} from "@/components/ui/button.tsx";



interface Props {
  article: Article
}

const ArticleAbbreviate: React.FC<Props> = ({article}) => {

  return (
    <>
      <div
        className="article-abbreviate flex justify-between dark:bg-neutral-900 p-3 rounded-lg transition-transform hover:scale-98 duration-150 cursor-pointer"
        onClick={() => {
          console.log(article.id)
        }}
      >
        <section className="left flex flex-col w-full space-y-0.5">
          <h3 className="article-title text-xs">{article.articleTitle}</h3>
          <div className="article-data space-x-1.5 text-neutral-400 text-[10px]">
            <span className="like">{article.likeCount} likes</span>
            <span className="collect">{article.collectCount} collections</span>
            <span className="collect">{article.viewCount} views</span>
          </div>
        </section>
        {/*<section className="right">*/}
        {/*  <Button*/}
        {/*    variant='outline'*/}
        {/*    size='sm'*/}
        {/*    onClick={() => {console.log(article.id)}}*/}
        {/*  >brush</Button>*/}
        {/*</section>*/}
      </div>
    </>

  )

}


export default ArticleAbbreviate