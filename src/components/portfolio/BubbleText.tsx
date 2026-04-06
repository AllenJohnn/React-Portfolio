import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface BubbleTextProps {
  text: string;
  className?: string;
}

export const BubbleText = ({ text, className }: BubbleTextProps) => {
  const isMobile = useIsMobile();

  return (
    <p
      className={cn(
        "text-sm sm:text-base text-muted-foreground transition-colors duration-300",
        !isMobile && "hover:text-foreground/90",
        className,
      )}
    >
      {text}
    </p>
  );
};
