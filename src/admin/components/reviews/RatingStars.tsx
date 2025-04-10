
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Define ReviewRating as number type
export type ReviewRating = number;

interface RatingStarsProps {
  rating: ReviewRating;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  readOnly?: boolean;
  onChange?: (rating: ReviewRating) => void;
  className?: string;
  interactive?: boolean;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  color = "text-amber-500",
  readOnly = true,
  interactive = false,
  onChange,
  className
}: RatingStarsProps) {
  const handleClick = (index: number) => {
    if (readOnly && !interactive) return;
    onChange?.(index + 1);
  };
  
  const getStarSize = () => {
    switch(size) {
      case "sm": return "w-4 h-4";
      case "lg": return "w-6 h-6";
      default: return "w-5 h-5";
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-center gap-0.5", 
        (!readOnly || interactive) && "cursor-pointer",
        className
      )}
    >
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            getStarSize(),
            index < rating ? `${color} fill-current` : "text-gray-300",
            (!readOnly || interactive) && "transition-transform hover:scale-110"
          )}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
