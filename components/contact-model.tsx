"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type QuoteModalProps = {
  triggerLabel?: string;
  className?: string;
};

export default function QuoteModal({
  triggerLabel = "Get Quote",
  className,
}: QuoteModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "fixed right-0 top-1/2 z-[9999] hidden h-[42px] w-[120px] -translate-y-1/2 translate-x-[39px] -rotate-90 bg-[#F47C2A] text-[14px] font-semibold text-white shadow-lg transition hover:bg-[#e86f1f] sm:flex font-kumbh",
            className
          )}
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-h-[90dvh] w-[calc(100%-1.25rem)] overflow-hidden rounded-[22px] border-0 bg-[#fff4f4] p-0 shadow-2xl sm:max-w-[560px]",
          "data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out-0"
        )}
      >
        <div className="h-4 w-full bg-[#E7325C]" />

        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close modal"
            className="absolute right-3 top-7 z-20 grid size-8 place-items-center bg-[#E7325C] text-white shadow-sm transition hover:scale-105 hover:bg-[#cf244b] focus:outline-none focus:ring-2 focus:ring-[#E7325C]/30"
          >
            <X className="size-4" strokeWidth={3} />
          </button>
        </DialogClose>

        <div className="relative max-h-[calc(90dvh-1rem)] overflow-y-auto px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
          <div className="pointer-events-none absolute -left-3 top-16 hidden text-[210px] font-black leading-none text-black/[0.10] sm:block">
            8
          </div>

          <DialogHeader className="relative z-10 mb-6 pr-8 text-center">
            <DialogTitle className="text-center font-kumbh text-[30px] font-normal leading-none tracking-wide text-[#E7325C] sm:text-[38px]">
              Get in Touch
            </DialogTitle>
          </DialogHeader>

          <form
            className="relative z-10 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <FieldInput id="name" label="Name" placeholder="Name:" />
            <FieldInput id="email" label="Email" placeholder="Email:" type="email" />
            <FieldInput
              id="phone"
              label="Mobile Number"
              placeholder="Mobile Number:"
              type="tel"
            />

            <div className="space-y-2">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Message:"
                className="min-h-[120px] resize-none rounded-[18px] border border-[#8f9698] bg-white px-5 py-4 font-kumbh text-[16px] text-gray-800 shadow-none outline-none placeholder:text-[#9c9c9c] focus-visible:ring-2 focus-visible:ring-[#E7325C]/25 sm:min-h-[135px]"
              />
            </div>

            <Button
              type="submit"
              className="mt-2 h-12 w-full rounded-full bg-[#F47C2A] px-6 font-kumbh text-[16px] font-normal text-white shadow-[0_7px_8px_rgba(0,0,0,0.20)] transition hover:-translate-y-0.5 hover:bg-[#e86f1f] sm:h-13 sm:text-[18px]"
            >
              Send Your Request
              <ArrowRight className="ml-3 size-6" strokeWidth={1.8} />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

function FieldInput({ id, label, className, ...props }: FieldInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      <Input
        id={id}
        className={cn(
          "h-12 rounded-full border border-[#8f9698] bg-white px-5 font-kumbh text-[16px] text-gray-800 shadow-none outline-none placeholder:text-[#9c9c9c] focus-visible:ring-2 focus-visible:ring-[#E7325C]/25 sm:h-14 sm:px-6 sm:text-[18px] lg:h-[56px]",
          className
        )}
        {...props}
      />
    </div>
  );
}
