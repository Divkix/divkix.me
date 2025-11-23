"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({
  code,
}: CopyButtonProps): React.JSX.Element | null {
  const [copied, setCopied] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy code");
      console.error("Copy failed:", error);
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded-md bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-border"
      aria-label={copied ? "Copied!" : "Copy code"}
      type="button"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-foreground/60" />
      )}
    </button>
  );
}
