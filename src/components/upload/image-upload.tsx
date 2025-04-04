import { useState, useRef, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { toast } from "@/registry/hooks/use-toast";
import { Button } from "@/components/ui/button";
import request from "@/utils/request";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

export function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 生成32位UUID（无连字符）
  const generateUUID = () => {
    return crypto.randomUUID().replace(/-/g, '');
  };

  const uploadImage = async (uploadFile: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("uploadFile", uploadFile);
      formData.append("bucket", "dev-sphere");

      // 生成UUID并保留文件后缀
      const fileExtension = uploadFile.name.split('.').pop(); // 获取后缀名
      const objectName = `${generateUUID()}.${fileExtension}`; // 组合成新文件名

      formData.append("objectName", objectName);

      // 使用 axios 风格的请求配置
      const result = await request("/oss/upload", {
        method: "POST",
        data: formData, // axios 用 data 而不是 body
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        },
      });

      if (!result.success) {
        throw new Error(result.message || "Upload failed");
      }

      return result.data; // 假设返回的 URL 在 result.data 中
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    // 生成预览
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      const imageUrl = await uploadImage(file);
      onUploadComplete(imageUrl);
    } catch {
      setPreviewUrl(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
    onUploadComplete("");
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Upload Image</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={inputRef}
          disabled={isUploading}
          className="cursor-pointer"
        />
      </div>

      {previewUrl && (
        <div className="relative mt-2">
          <div className="border rounded-md overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-40 object-cover"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleClear}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isUploading && <Progress value={uploadProgress} className="h-2" />}
    </div>
  );
}