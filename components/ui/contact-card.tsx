"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, PlusIcon } from "lucide-react";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  leftContent?: React.ReactNode;
  formSectionClassName?: string;
};

export function ContactCard({
  leftContent,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div className={cn("relative w-full h-full", className)} {...props}>
      <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-primary animate-pulse z-20" />
      <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-primary animate-pulse z-20" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-primary animate-pulse z-20" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-primary animate-pulse z-20" />
      
      <div
        className={cn(
          "bg-white/5 border border-white/10 backdrop-blur-md rounded-[25px] relative grid h-full w-full shadow-2xl md:grid-cols-2 lg:grid-cols-3 overflow-hidden"
        )}
      >
      
      <div className="flex flex-col lg:col-span-2 relative h-full p-6 md:p-10 md:pr-16">
        {leftContent}
      </div>
      
      <div
        className={cn(
          "bg-[#1f1f23]/30 backdrop-blur-md flex h-full w-full items-center border-t border-white/5 p-6 md:p-10 md:col-span-1 md:border-t-0 md:border-l",
          formSectionClassName
        )}
      >
        {children}
      </div>
    </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn("flex items-center gap-3.5 p-4 rounded-[12px] bg-white/5 border border-white/10 backdrop-blur-md", className)} {...props}>
      <div className="bg-primary/10 border border-primary/20 rounded-[8px] p-2.5 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[13px] uppercase tracking-wider text-neutral-300">{label}</p>
        {label.toLowerCase() === "email" ? (
          <a href={`mailto:${value}`} className="text-white text-sm font-medium mt-1 hover:text-primary transition-colors block break-all">
            {value}
          </a>
        ) : (
          <p className="text-white text-sm font-medium mt-1 break-words">{value}</p>
        )}
      </div>
    </div>
  );
}
