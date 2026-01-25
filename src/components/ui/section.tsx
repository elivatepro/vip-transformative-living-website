import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate' | 'dark';
  containerSize?: 'default' | 'narrow' | 'wide';
}

export function Section({ 
  children, 
  className, 
  variant = 'default',
  containerSize = 'default',
  ...props 
}: SectionProps) {
  const bgColors = {
    default: 'bg-transparent', // Allow global background to show through
    alternate: 'bg-surface/90 backdrop-blur-sm', // Semi-transparent surface
    dark: 'bg-black/90 backdrop-blur-sm',
  };

  const maxW = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[1440px]',
  };

  return (
    <section 
      className={cn(
        "py-16 md:py-24 lg:py-32",
        bgColors[variant],
        className
      )} 
      {...props}
    >
      <div className={cn("container mx-auto px-4 md:px-6", maxW[containerSize])}>
        {children}
      </div>
    </section>
  );
}
