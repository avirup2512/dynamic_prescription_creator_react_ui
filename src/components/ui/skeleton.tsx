import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    role="status"
    className={cn(
      "animate-pulse rounded-md bg-slate-200/80 dark:bg-slate-700/60",
      className,
    )}
    {...props}
  />
);

export default Skeleton;
