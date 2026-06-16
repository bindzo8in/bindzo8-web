"use client";

import * as React from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { sendQuoteMails } from "@/lib/contact-email";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/form-dialogue";

export type QuoteModalProps = {
  triggerLabel?: string;
  className?: string;
  service?: string;
  customTrigger?: React.ReactNode;
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

export default function QuoteModal({
  triggerLabel = "Get Quote",
  className,
  service = "General Enquiry",
  customTrigger,
}: QuoteModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormDialog
      title="Get Quote"
      schema={quoteFormSchema}
      fields={[
        { name: "name", placeholder: "Name:" },
        { name: "email", placeholder: "Email:", type: "email" },
        { name: "phone", placeholder: "Mobile Number:", type: "tel" },
        { name: "message", placeholder: "Message:", type: "textarea" },
      ]}
      defaultValues={{
        name: "",
        email: "",
        phone: "",
        message: "",
        service,
      }}
      open={open}
      onOpenChange={setOpen}
      submitText="Send Your Request"
      onSubmit={async (values) => {
        await sendQuoteMails({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          service: values.service || service,
        });
      }}
      trigger={
        customTrigger || (
          <Button
            className={cn(
              "fixed right-0 top-1/2 z-[9999] hidden h-[42px] w-[120px] -translate-y-1/2 translate-x-[39px] -rotate-90 items-center justify-center rounded-b-[0px] bg-[#c42b47] font-kumbh text-[14px] font-semibold text-white shadow-lg transition hover:bg-[#c42b47]/90 sm:flex",
              className
            )}
          >
            {triggerLabel}
          </Button>
        )
      }
    />
  );
}