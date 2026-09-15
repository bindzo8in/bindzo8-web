"use client";

import { Link as LinkIcon, Check } from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function SocialShare({ title, url }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (url) {
      setShareUrl(url);
    } else {
      setShareUrl(window.location.href);
    }
  }, [url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

  if (!shareUrl) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share this article:</span>
      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors" asChild>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <FaTwitter className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors" asChild>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <FaLinkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors" asChild>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <FaFacebook className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 hover:bg-accent transition-colors" onClick={handleCopy} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
