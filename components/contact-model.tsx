"use client";

import * as React from "react";
import { toast } from "sonner";
import Image from "next/image";
import { ArrowRight, Loader2, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { sendQuoteMails } from "@/lib/contact-email";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export type QuoteModalProps = {
  triggerLabel?: string;
  className?: string;
  service?: string;
};

const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(10, "Mobile number must be at least 10 digits.")
    .max(15, "Mobile number is too long.")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid mobile number."),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message is too long."),

  service: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export default function QuoteModal({
  triggerLabel = "Get Quote",
  className,
  service = "General Enquiry",
}: QuoteModalProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      service,
    },
    mode: "onSubmit",
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: QuoteFormValues) {
    try {
      await sendQuoteMails({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        service: values.service || service,
      });

      toast.success("Quote request sent successfully!", {
        description: "We'll get back to you shortly.",
      });

      form.reset({
        name: "",
        email: "",
        phone: "",
        message: "",
        service,
      });

      setOpen(false);
    } catch (error) {
      console.error("Quote mail sending failed:", error);
      toast.error("Failed to send quote request.", {
        description: "Please try again later.",
      });

      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  }

  React.useEffect(() => {
    if (open) {
      form.setValue("service", service);
    }
  }, [open, service, form]);

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
          <div className="pointer-events-none absolute -left-3 top-16 hidden h-[210px] w-[210px] opacity-10 sm:block">
            <Image
              src="/home/ourProducts/Bindzo_logo.png"
              alt=""
              fill
              aria-hidden="true"
              className="object-contain"
              sizes="210px"
            />
          </div>

          <DialogHeader className="relative z-10 mb-6 pr-8 text-center">
            <DialogTitle className="text-center font-kumbh text-[30px] font-normal leading-none tracking-wide text-[#E7325C] sm:text-[38px]">
              Get in Touch
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              className="relative z-10 space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Name:"
                        autoComplete="name"
                        className={inputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-2 text-xs text-[#E7325C]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email:"
                        type="email"
                        autoComplete="email"
                        className={inputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-2 text-xs text-[#E7325C]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Mobile Number:"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={inputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-2 text-xs text-[#E7325C]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message:"
                        className="min-h-[120px] resize-none rounded-[18px] border border-[#8f9698] bg-white px-5 py-4 font-kumbh text-[16px] text-gray-800 shadow-none outline-none placeholder:text-[#9c9c9c] focus-visible:ring-2 focus-visible:ring-[#E7325C]/25 sm:min-h-[135px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-2 text-xs text-[#E7325C]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <input type="hidden" {...field} value={field.value || service} />
                )}
              />

              {form.formState.errors.root?.message ? (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {form.formState.errors.root.message}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 w-full rounded-full bg-[#F47C2A] px-6 font-kumbh text-[16px] font-normal text-white shadow-[0_7px_8px_rgba(0,0,0,0.20)] transition hover:-translate-y-0.5 hover:bg-[#e86f1f] disabled:pointer-events-none disabled:opacity-70 sm:h-13 sm:text-[18px]"
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <Loader2 className="ml-3 size-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Your Request
                    <ArrowRight className="ml-3 size-6" strokeWidth={1.8} />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const inputClassName =
  "h-12 rounded-full border border-[#8f9698] bg-white px-5 font-kumbh text-[16px] text-gray-800 shadow-none outline-none placeholder:text-[#9c9c9c] focus-visible:ring-2 focus-visible:ring-[#E7325C]/25 sm:h-14 sm:px-6 sm:text-[18px] lg:h-[56px]";