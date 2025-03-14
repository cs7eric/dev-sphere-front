import { useToast } from "@/registry/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import {Info, CheckCircle2, AlertTriangle, XCircle} from "lucide-react"
import { MdInfo } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { FiAlertTriangle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant: VariantProps<typeof toastVariants>["variant"]) => {
    switch (variant) {
      case "success":
        return <FaCheckCircle className="w-6 h-6 mt-0.5 fill-[#74dfa2]" />;
      case "warning":
        return <FiAlertTriangle className="w-6 h-6 mt-0.5 fill-[#f9c97c]" />;
      case "danger":
        return <CgDanger className="w-6 h-6 mt-0.5 fill-[#f871a0]" />;
      default:
        return <MdInfo className="w-6 h-6 mt-0.5 fill-[#ecedee]" />;
    }
  }

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          {/* 图标容器 */}
          <div className="flex-shrink-0">
            {getIcon(variant)}
          </div>

          {/* 内容容器 */}
          <div className="flex-1 space-y-1 ml-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>

          {/* 关闭按钮 */}
          {/*<ToastClose className="absolute" />*/}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
