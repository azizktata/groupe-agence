"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ExpandableTextProps = {
  text: string;
  maxLines?: number;
  className?: string;
};

/**
 * Formats raw text from Sabre API into readable paragraphs
 */
function formatText(raw: string): string {
  if (!raw) return "";

  let text = raw;

  // Normalize whitespace - replace multiple spaces with single space
  text = text.replace(/\s{2,}/g, " ");

  // Add line breaks before common section headers
  const sectionHeaders = [
    "On-Site",
    "Off-Site",
    "General Facilities",
    "Chargeable Facilities",
    "Parking Facilities",
    "Public Area",
    "Meeting and Convention",
    "Restaurants Nearby",
    "On-siteRestaurant",
    "Complimentary Meal",
    "Meal Plans",
    "Transportation from",
    "Nearest Metro",
    "Free Shuttle",
    "ROOM SAFETY",
    "PROPERTY SAFETY",
    "CANCEL",
    "PETS ALLOWED",
    "CHILDREN",
    "GOVERNMENT",
    "Primary City",
  ];

  sectionHeaders.forEach((header) => {
    const regex = new RegExp(`(?<!^)\\s*(${header})`, "gi");
    text = text.replace(regex, "\n\n$1");
  });

  // Add line breaks after common patterns
  text = text.replace(/(\d+\s*MI\s*[NSEW]?\s*)/gi, "$1\n");
  text = text.replace(/(Description\s*-)/gi, "$1\n");
  text = text.replace(/(\s+-\s+)/g, "\n• ");

  // Clean up bullet points and dashes at start of lines
  text = text.replace(/^\s*-\s*/gm, "• ");

  // Add breaks after sentences that end with period followed by capital letter
  text = text.replace(/\.(\s*)([A-Z])/g, ".\n$2");

  // Clean up multiple line breaks
  text = text.replace(/\n{3,}/g, "\n\n");

  // Trim each line
  text = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  return text.trim();
}

export function ExpandableText({
  text,
  maxLines = 4,
  className,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const formattedText = useMemo(() => formatText(text), [text]);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      // Check if text overflows
      const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 20;
      const maxHeight = lineHeight * maxLines;
      setNeedsTruncation(el.scrollHeight > maxHeight + 10);
    }
  }, [formattedText, maxLines]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={textRef}
        className={cn(
          "text-slate-600 text-sm leading-relaxed transition-all duration-300",
          !isExpanded && needsTruncation && "line-clamp-4"
        )}
        style={
          !isExpanded && needsTruncation
            ? { WebkitLineClamp: maxLines }
            : undefined
        }
      >
        {formattedText.split("\n\n").map((paragraph, pIndex) => (
          <p key={pIndex} className={pIndex > 0 ? "mt-3" : ""}>
            {paragraph.split("\n").map((line, lIndex) => (
              <span key={lIndex}>
                {lIndex > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        ))}
      </div>

      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 inline-flex items-center gap-1.5 text-[var(--brand-primary)] text-sm font-semibold hover:underline transition-colors"
        >
          {isExpanded ? (
            <>
              Voir moins
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Voir plus
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
