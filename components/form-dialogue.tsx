"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FieldConfig = {
  name: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "textarea";
};

interface FormDialogProps<TSchema extends z.ZodTypeAny> {
  title: string;
  schema: TSchema;
  fields: FieldConfig[];
  defaultValues: DefaultValues<z.infer<TSchema>>;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  submitText?: string;
  onSubmit: (values: z.infer<TSchema>) => Promise<void>;
}

export function FormDialog<TSchema extends z.ZodTypeAny>({
  title,
  schema,
  fields,
  defaultValues,
  trigger,
  submitText = "Submit",
  onSubmit,
  open,
  onOpenChange,
}: FormDialogProps<TSchema>) {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<TSchema>) => {
    try {
      await onSubmit(values);

      toast.success("Submitted successfully");

      form.reset(defaultValues);

      onOpenChange?.(false);
    } catch (error) {
      console.error(error);

      toast.error("Submission failed");

      form.setError("root", {
        message: "Something went wrong.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as any}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.placeholder}
                          {...inputField}
                        />
                      ) : (
                        <Input
                          type={field.type ?? "text"}
                          placeholder={field.placeholder}
                          {...inputField}
                        />
                      )}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {form.formState.errors.root?.message && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                submitText
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}