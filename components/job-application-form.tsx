'use client';

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

  async function uploadResume(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-resume", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.log(res)
      throw new Error("Resume upload failed");
    }

    return res.json() as Promise<{
      url: string;
      publicId: string;
    }>;
  }

  const onSubmit = async (values: FormValues) => {
    const uploadedResume = await uploadResume(values.resume);
    console.log(uploadedResume);


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

    console.log(payload);
    
    const admin_mail = await sendCareerAdminMail({ ...payload, resumeFileName: uploadedResume.publicId, to: "bindzo8in@gmail.com", subject: "New Application" })
    
    const client_mail = await sendApplicantConfirmationMail({ ...payload, to: "bindzo8in@gmail.com" })
  }

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
                    <Input placeholder="Name" {...field} />
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
                    <Input placeholder="Email" type="email" {...field} />
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
                    <Input placeholder="Mobile Number" {...field} />
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
                    <Input placeholder="Location" {...field} />
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
                      <SelectTrigger>
                        <SelectValue placeholder="Position apply for" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos.id} value={pos.id}>
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
                        className="flex items-center justify-between px-3 py-2 border border-input rounded-md bg-background hover:bg-accent cursor-pointer"
                      >
                        <span className="text-sm text-muted-foreground">
                          {value?.name || "Resume"}
                        </span>

                        <span className="text-xs bg-foreground text-background px-2 py-1 rounded">
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
                    className="min-h-48"
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
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-full"
            >
              Apply Now
            </Button>
          </div>
        </form>
      </Form>
    );
  }
