import { cn } from "@/lib/utils"
interface SkeletonProps {
  rows?: number
  width?: (number | string)[]
  avatar?: boolean
  image?: boolean
  animate?: boolean
  className?: string
}

const Skeleton = ({
                    rows = 3,
                    width = [100, 90, 95],
                    avatar = false,
                    image = false,
                    animate = true,
                    className
                  }: SkeletonProps) => {
  const getWidth = (index: number) => {
    const w = width[index % width.length]
    return typeof w === 'number' ? `${w}%` : w
  }

  return (
    <div
      className={cn(
        "w-full space-y-3",
        animate && "animate-pulse",
        className
      )}
      role="status"
      aria-busy="true"
      aria-label="加载中"
    >
      {/* 头像区域 */}
      {avatar && (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-neutral-800  rounded-full" />
        </div>
      )}

      {/* 图片区域 */}
      {image && (
        <div className="w-full h-32 bg-neutral-800 rounded-lg" />
      )}

      {/* 文本行 */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-neutral-800 rounded"
          style={{ width: getWidth(i) }}
        />
      ))}

      {/* 底部附加行 */}
      {rows > 1 && (
        <div className="h-3 bg-neutral-800  rounded w-1/3" />
      )}
    </div>
  )
}

// 导出带样式的复合组件
export const SkeletonCard = () => (
  <div className="p-4 border rounded-lg">
    <Skeleton avatar rows={2} width={[80, 60]} />
  </div>
)

export const SkeletonForm = () => (
  <div className="space-y-6">
    <Skeleton rows={1} width={[100]} className="h-8" />
    <Skeleton rows={3} />
    <Skeleton rows={1} width={[30]} className="h-10" />
  </div>
)

export default Skeleton