import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={`relative flex w-full touch-none select-none items-center ${className}`}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-neutral-600">
      <SliderPrimitive.Range className="absolute h-full bg-green-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-gray-500 bg-black transition-all focus:outline-none" />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";
