'use client'

import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { sendContactMails } from '@/lib/contact-email'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    phone: z.string().min(10, {
        message: 'Phone number must be at least 10 characters.',
    }),
    message: z.string().min(5, {
        message: 'Message must be at least 5 characters.',
    }),
    services: z.array(z.string()).min(1, {
        message: 'Please select at least one service.',
    }),
    description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const SERVICES = [
    'Android App Development',
    'iOS App Development',
    'Hybrid App Development',
    'E-Commerce Website',
    'Dynamic Website',
    'Static Website',
    'Web App Development',
    'Instagram Marketing',
    'Facebook Marketing',
    'SEO Marketing',
    'Logo Design',
    'Brochure Design',
]

export default function ContactForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
            services: [],
            description: '',
        },
    })

    async function onSubmit(values: FormValues) {
        try {
            await sendContactMails(values);
            toast.success('Message sent successfully!', {
                description: 'We will get back to you soon.',
            })
            form.reset()
        } catch (error) {
            console.error('Contact form submission error:', error)
            toast.error('Failed to send message.', {
                description: 'Please try again later.',
            })
        }
    }

    const phone = process.env.NEXT_PUBLIC_PHONE ?? "";
    const phoneLabel = process.env.NEXT_PUBLIC_PHONE_LABEL ?? phone;

    return (
        <div className="min-h-fit">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-1 relative">
                        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                            <Image
                                alt=""
                                src={"/contact/logo.png"}
                                width={390}
                                height={475}
                                className='opacity-5'
                            />
                        </div>
                        <div className="relative z-10 p-4 md:p-8 sticky top-24">
                            <h2 className="text-3xl font-bold mb-8 md:mb-12 text-gray-900">Get In Touch</h2>

                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-gray-700 mt-1" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                                            #197 & 198, 2nd Street, Gandhipuram, Coimbatore - 641 012
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <Phone className="w-6 h-6 text-gray-700 mt-1" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Sales:</p>
                                        <a
                                            href={`tel:${phone.replace(/\s+/g, "")}`}
                                            className="text-sm text-gray-700 hover:text-[#E7325C] transition-colors"
                                        >
                                            {phoneLabel}
                                        </a>

                                        <p className="text-sm font-semibold text-gray-900 mt-3">Marketing:</p>
                                        <a
                                            href={`tel:${phone.replace(/\s+/g, "")}`}
                                            className="text-sm text-gray-700 hover:text-[#E7325C] transition-colors"
                                        >
                                            {phoneLabel}
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <Mail className="w-6 h-6 text-gray-700 mt-1" />
                                    </div>
                                    <div className='flex flex-col justify-center items-start'>
                                        <a className={`text-sm text-gray-700 hover:text-[#E7325C] transition-colors`} href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_1}`}>
                                            {process.env.NEXT_PUBLIC_EMAIL_1}
                                        </a>

                                        <a className={`text-sm text-gray-700 hover:text-[#E7325C] transition-colors`} href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_2}`}>
                                            {process.env.NEXT_PUBLIC_EMAIL_2}
                                        </a>

                                        <a className={`text-sm text-gray-700 hover:text-[#E7325C] transition-colors`} href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_3}`}>
                                            {process.env.NEXT_PUBLIC_EMAIL_3}
                                        </a>
                                        {/* <p className="text-sm text-gray-700 break-all">
                                            bindzo8in@gmail.com
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Name and Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field>
                                    <Input
                                        placeholder="Name"
                                        {...form.register('name')}
                                        className="h-12 bg-white rounded-lg border-gray-200 focus:border-black focus:ring-black/5"
                                    />
                                    {form.formState.errors.name && (
                                        <FieldError className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        {...form.register('email')}
                                        className="h-12 bg-white rounded-lg border-gray-200 focus:border-black focus:ring-black/5"
                                    />
                                    {form.formState.errors.email && (
                                        <FieldError className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</FieldError>
                                    )}
                                </Field>
                            </div>

                            {/* Phone and Message Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field>
                                    <Input
                                        placeholder="Mobile Number"
                                        {...form.register('phone')}
                                        className="h-12 bg-white rounded-lg border-gray-200 focus:border-black focus:ring-black/5"
                                    />
                                    {form.formState.errors.phone && (
                                        <FieldError className="text-xs text-red-500 mt-1">{form.formState.errors.phone.message}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <Input
                                        placeholder="How can we help you?"
                                        {...form.register('message')}
                                        className="h-12 bg-white rounded-lg border-gray-200 focus:border-black focus:ring-black/5"
                                    />
                                    {form.formState.errors.message && (
                                        <FieldError className="text-xs text-red-500 mt-1">{form.formState.errors.message.message}</FieldError>
                                    )}
                                </Field>
                            </div>

                            {/* Services Section */}
                            <div className="space-y-4">
                                <FieldLabel className="text-base font-semibold">Services You Are Interested In</FieldLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    {SERVICES.map((service) => (
                                        <div key={service} className="flex items-center gap-3">
                                            <Checkbox
                                                id={service}
                                                checked={form.watch('services')?.includes(service) || false}
                                                onCheckedChange={(checked) => {
                                                    const value = form.getValues('services') || []
                                                    if (checked) {
                                                        form.setValue('services', [...value, service])
                                                    } else {
                                                        form.setValue('services', value.filter((item) => item !== service))
                                                    }
                                                }}
                                                className="bg-white border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                                            />
                                            <label htmlFor={service} className="text-sm font-medium cursor-pointer text-gray-700">
                                                {service}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {form.formState.errors.services && (
                                    <FieldError className="text-xs text-red-500">{form.formState.errors.services.message}</FieldError>
                                )}
                            </div>

                            {/* Description */}
                            <Field>
                                <InputGroupTextarea
                                    placeholder="Description:"
                                    {...form.register('description')}
                                    className="min-h-32 bg-white rounded-lg border-gray-200 focus:border-black focus:ring-black/5 p-4"
                                />
                                {form.formState.errors.description && (
                                    <FieldError className="text-xs text-red-500 mt-1">{form.formState.errors.description.message}</FieldError>
                                )}
                            </Field>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <Button
                                    type="submit"
                                    className="bg-black hover:bg-gray-800 text-white rounded-full px-10 py-6 h-auto text-base font-bold shadow-lg transition-transform active:scale-95"
                                >
                                    Send Your Request
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
