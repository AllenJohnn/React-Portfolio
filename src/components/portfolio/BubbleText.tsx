import styles from "./bubble-text.module.css";
import { cn } from "@/lib/utils";

interface BubbleTextProps {
  text: string;
  className?: string;
}

export const BubbleText = ({ text, className }: BubbleTextProps) => {
  return (
    <p className={cn("text-sm sm:text-base text-muted-foreground", className)}>
      {text.split("").map((char, idx) => (
        <span className={styles.hoverText} key={`${char}-${idx}`}>
          {char}
        </span>
      ))}
    </p>
  );
};
