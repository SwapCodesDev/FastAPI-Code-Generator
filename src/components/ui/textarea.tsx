import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, onFocus, onInput, ...props }, ref) => {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);

  const handleResize = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    handleResize(event.currentTarget);
    onFocus?.(event);
  };

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    handleResize(event.currentTarget);
    onInput?.(event);
  };

  React.useLayoutEffect(() => {
    handleResize(internalRef.current);
  }, [props.value]);

  return (
    <textarea
      className={cn(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-hidden resize-none',
        className
      )}
      ref={(el) => {
        internalRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      onInput={handleInput}
      onFocus={handleFocus}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
