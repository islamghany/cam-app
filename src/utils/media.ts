import path from "path";

export const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"];
export const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];

export type MediaType = "video" | "image";

export function getMediaType(uri: string): MediaType | undefined {
  const ext = path.extname(uri?.toLowerCase());
  if (videoExtensions.includes(ext)) {
    return "video";
  }
  if (imageExtensions.includes(ext)) {
    return "image";
  }
}
