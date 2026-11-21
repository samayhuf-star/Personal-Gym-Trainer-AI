import { cn } from '@/lib/utils';

export const BRAND = 'Momentum by Samay';

export const Logo = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => {
  const box = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';
  const name = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-xl';
  const by = size === 'lg' ? 'text-sm' : 'text-[10px]';
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <img src="/logo.svg" alt="" className={cn(box, 'rounded-xl')} />
      <span className="flex flex-col leading-none text-left">
        <span className={cn(name, 'font-bold gradient-text')}>Momentum</span>
        <span className={cn(by, 'font-medium tracking-[0.2em] uppercase text-muted-foreground mt-1')}>by Samay</span>
      </span>
    </span>
  );
};
