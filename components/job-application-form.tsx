'use client';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v3';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { sendApplicantConfirmationMail, sendCareerAdminMail } from '@/lib/career-email';
import { AdminNotification } from '@/email/career/admin-notification';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().regex(/^\d{10,}$/, 'Mobile number must be at least 10 digits'),
  location: z.string().min(2, 'Location is required'),
  position: z.string().min(1, 'Please select a position'),
  resume: z.custom<File>((file) => file instanceof File, {
    message: "Resume is required",
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const positions = [
  { id: 'ui-ux', label: 'UI & UX Designer' },
  { id: 'web-dev', label: 'Web Developer' },
  { id: 'mobile-ios', label: 'Mobile App Developer - iOS' },
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'react', label: 'React Developer' },
  { id: 'graphic', label: 'Graphic Designer' },
];

export function JobApplicationForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      location: "",
      position: "",
      description: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function uploadResume(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-resume", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Resume upload failed");
    }

    return res.json() as Promise<{
      url: string;
      publicId: string;
    }>;
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const uploadToastId = toast.loading("Uploading resume...");
      const uploadedResume = await uploadResume(values.resume);
      toast.success("Resume uploaded successfully", { id: uploadToastId });

      const payload = {
        name: values.name,
        email: values.email,
        mobileNumber: values.mobileNumber,
        location: values.location,
        position: values.position,
        description: values.description,
        resumeUrl: uploadedResume.url,
        resumePublicId: uploadedResume.publicId,
      };

      const mailToastId = toast.loading("Submitting application...");
      
      await sendCareerAdminMail({ 
        ...payload, 
        resumeFileName: uploadedResume.publicId, 
        to: "bindzo8in@gmail.com", 
        subject: "New Application" 
      });
      
      await sendApplicantConfirmationMail({ 
        ...payload, 
        to: values.email 
      });

      toast.success("Application submitted successfully!", { 
        id: mailToastId,
        description: "We'll review your profile and get back to you soon." 
      });
      
      form.reset();
    } catch (error) {
      console.error("Job application submission error:", error);
      toast.error("Failed to submit application", {
        description: "Please check your details and try again."
      });
    }
  };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" className="bg-white/5 border-white/10 text-white placeholder:text-white/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" type="email" className="bg-white/5 border-white/10 text-white placeholder:text-white/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile Number Field */}
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Mobile Number" className="bg-white/5 border-white/10 text-white placeholder:text-white/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Location" className="bg-white/5 border-white/10 text-white placeholder:text-white/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position Dropdown */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Position apply for" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#151515] border-white/10 text-white">
                        {positions.map((pos) => (
                          <SelectItem key={pos.id} value={pos.id} className="hover:bg-white/10 focus:bg-white/10 focus:text-white">
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resume Upload */}
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        className="hidden"
                        id="resume-upload"
                      />

                      <label
                        htmlFor="resume-upload"
                        className="flex items-center justify-between px-3 py-2 border border-white/10 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer"
                      >
                        <span className="text-sm text-white/50">
                          {value?.name || "Resume"}
                        </span>

                        <span className="text-xs bg-white text-black px-2 py-1 rounded">
                          Choose file
                        </span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Description:"
                    className="min-h-48 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#EF8030] hover:bg-[#d87126] text-white px-8 rounded-full disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  Applying...
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Apply Now"
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
  }
