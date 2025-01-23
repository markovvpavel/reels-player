import { VideoItem } from "types";

export const videos: VideoItem[] = Array.from({ length: 26 }).map((_, i) => ({
  thumbnail: `/content/thumbnails/${i + 1}.jpg`,
  video: `/content/videos/${i + 1}.mp4`,
}));
