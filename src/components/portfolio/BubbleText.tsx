import styles from "./bubble-text.module.css";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface BubbleTextProps {
  text: string;
  className?: string;
}

export const BubbleText = ({ text, className }: BubbleTextProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <p className={cn("text-sm sm:text-base text-muted-foreground", className)}>{text}</p>;
  }

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
