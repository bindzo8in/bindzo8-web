"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email address."),
  mobileNumber: z
    .string()
    .min(10, "Mobile number is required.")
    .max(15, "Mobile number is too long."),
  message: z.string().min(5, "Message is required."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type ContactModalProps = {
  children?: React.ReactNode;
};

export default function ContactModal({ children }: ContactModalProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? <Button>Get in Touch</Button>}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="
          max-h-[92vh] w-[94vw] max-w-[1280px] overflow-hidden
          rounded-[32px] border-0 bg-[#FFF4F3] p-0
          shadow-2xl sm:rounded-[38px] lg:rounded-[44px]
        "
      >
        <DialogTitle className="sr-only">Get in Touch</DialogTitle>

        <div className="h-[34px] w-full bg-[#E7325C] sm:h-[42px]" />

        <DialogClose asChild>
          <button
            type="button"
            className="
              absolute right-5 top-12 z-20 flex h-9 w-9 items-center
              justify-center rounded-full bg-[#E7325C] text-white
              transition hover:scale-105 sm:right-7 sm:top-14
            "
            aria-label="Close contact modal"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogClose>

        <div className="relative px-5 pb-8 pt-8 sm:px-8 sm:pb-10 lg:px-20 lg:pb-20 lg:pt-14">
          <div
            className="
              pointer-events-none absolute left-8 top-[85px] z-0
              hidden text-[360px] font-black leading-none text-[#C9C1C1]
              opacity-80 lg:block
            "
          >
            B
          </div>

          <h2 className="relative z-10 text-center text-[38px] font-normal leading-none text-[#E7325C] sm:text-[52px] lg:text-[64px]">
            Get in Touch
          </h2>

          <form
            id="contact-modal-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="
              relative z-10 mt-10 grid gap-6
              lg:mt-20 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0
            "
          >
            <FieldGroup className="space-y-6 sm:space-y-8 lg:space-y-16">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Name:"
                      aria-invalid={fieldState.invalid}
                      autoComplete="name"
                      className="
                        h-[58px] rounded-full border border-[#9B9B9B]
                        bg-white px-7 text-[20px] text-black
                        shadow-none outline-none placeholder:text-[#9B9B9B]
                        focus-visible:ring-0 focus-visible:ring-offset-0
                        sm:h-[66px] sm:text-[24px]
                      "
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="pl-6 text-sm text-[#E7325C]"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="Email:"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      className="
                        h-[58px] rounded-full border border-[#9B9B9B]
                        bg-white px-7 text-[20px] text-black
                        shadow-none outline-none placeholder:text-[#9B9B9B]
                        focus-visible:ring-0 focus-visible:ring-offset-0
                        sm:h-[66px] sm:text-[24px]
                      "
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="pl-6 text-sm text-[#E7325C]"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="mobileNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      type="tel"
                      placeholder="Mobile Number:"
                      aria-invalid={fieldState.invalid}
                      autoComplete="tel"
                      className="
                        h-[58px] rounded-full border border-[#9B9B9B]
                        bg-white px-7 text-[20px] text-black
                        shadow-none outline-none placeholder:text-[#9B9B9B]
                        focus-visible:ring-0 focus-visible:ring-offset-0
                        sm:h-[66px] sm:text-[24px]
                      "
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="pl-6 text-sm text-[#E7325C]"
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex flex-col gap-8 lg:gap-14">
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Message:"
                      aria-invalid={fieldState.invalid}
                      className="
                        min-h-[190px] resize-none rounded-[28px]
                        border border-[#9B9B9B] bg-white px-7 py-5
                        text-[20px] text-black shadow-none
                        outline-none placeholder:text-[#9B9B9B]
                        focus-visible:ring-0 focus-visible:ring-offset-0
                        sm:min-h-[235px] sm:text-[24px]
                        lg:min-h-[250px]
                      "
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="pl-6 text-sm text-[#E7325C]"
                      />
                    )}
                  </Field>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  form="contact-modal-form"
                  disabled={form.formState.isSubmitting}
                  className="
                    h-[58px] w-full max-w-[430px] rounded-full
                    bg-[#F47C2A] text-[20px] font-normal text-white
                    shadow-[0_8px_10px_rgba(0,0,0,0.28)]
                    transition hover:bg-[#F47C2A]/90
                    sm:h-[66px] sm:max-w-[500px] sm:text-[26px]
                  "
                >
                  Send Your Request
                  <ArrowRight className="ml-4 h-7 w-7" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}