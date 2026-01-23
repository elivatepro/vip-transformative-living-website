'use client';

import { useBooking } from "@/components/booking-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface BookCallButtonProps extends React.ComponentProps<typeof Button> {
  children?: React.ReactNode;
  className?: string;
}

export function BookCallButton({ 
  children = "Book Discovery Call", 
  className, 
  variant = "secondary",
  ...props 
}: BookCallButtonProps) {
  const { openBooking } = useBooking();

  return (
    <Button 
      variant={variant} 
      className={cn("cursor-pointer", className)}
      onClick={openBooking}
      {...props}
    >
      {children}
    </Button>
  );
}

export function BookCallLink({ 
  children = "Book a Discovery Call", 
  className 
}: { 
  children?: React.ReactNode; 
  className?: string; 
}) {
  const { openBooking } = useBooking();

  return (
    <button 
      className={cn("text-left hover:underline cursor-pointer", className)}
      onClick={openBooking}
    >
      {children}
    </button>
  );
}
