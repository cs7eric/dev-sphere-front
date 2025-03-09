import ArticleItem from "@/components/article/article-item.tsx";

export default function ArticleList() {


  return (

    <>
      <div className="w-full flex flex-wrap space-y-5">

        {
          Array.from(
            {length: 10}, (_, index) => index + 1)
            .map((_, index) => (
              <ArticleItem key={index} className="w-full"></ArticleItem>
            ))
        }
      </div>
    </>
  )
}