"use client";

import { ReactNode, useRef } from "react";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

interface BlogArticleWrapperProps {
  readingTimeMinutes: number;
  children: ReactNode;
}

export function BlogArticleWrapper({
  readingTimeMinutes,
  children,
}: BlogArticleWrapperProps): React.JSX.Element {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ReadingProgress
        articleRef={articleRef}
        readingTime={readingTimeMinutes}
      />
      <div ref={articleRef}>{children}</div>
    </>
  );
}
