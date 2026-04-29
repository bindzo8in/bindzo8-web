'use client'

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
        console.log(values)
        await sendContactMails(values);
        alert('Form submitted! Check console for details.')
    }

    return (
        <div className="min-h-fit">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-1 relative">
                        <div className='absolute'>
                            <Image
                                alt=""
                                src={"/contact/logo.png"}
                                width={390}
                                height={475}
                                className='opacity-5'
                            />
                        </div>
                        <div className="rounded-lg p-8 sticky top-16">
                            <h2 className="text-3xl font-bold mb-12 text-gray-900">Get In Touch</h2>

                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-gray-700 mt-1" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">#197 & 198, 2nd Street, Gandhipuram, Coimbatore - 641 012</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <Phone className="w-6 h-6 text-gray-700 mt-1" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Sales:</p>
                                        <p className="text-sm text-gray-700">+91 90033 28262</p>
                                        <p className="text-sm font-semibold text-gray-900 mt-3">Marketing:</p>
                                        <p className="text-sm text-gray-700">+91 90033 28262</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <Mail className="w-6 h-6 text-gray-700 mt-1" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-700">bindzo8technosolutions@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name and Email Row */}
                            <FieldGroup>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <InputGroup>
                                            <Input
                                                placeholder="Name"
                                                {...form.register('name')}
                                                className='bg-white'
                                            />
                                        </InputGroup>
                                        {form.formState.errors.name && (
                                            <FieldError>{form.formState.errors.name.message}</FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <InputGroup>
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                {...form.register('email')}
                                                className='bg-white'
                                            />
                                        </InputGroup>
                                        {form.formState.errors.email && (
                                            <FieldError>{form.formState.errors.email.message}</FieldError>
                                        )}
                                    </Field>
                                </div>
                            </FieldGroup>

                            {/* Phone and Message Row */}
                            <FieldGroup>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <InputGroup>
                                            <Input
                                                placeholder="Mobile Number"
                                                {...form.register('phone')}
                                                className='bg-white'
                                            />
                                        </InputGroup>
                                        {form.formState.errors.phone && (
                                            <FieldError>{form.formState.errors.phone.message}</FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <InputGroup>
                                            <Input
                                                placeholder="How can we help you?"
                                                {...form.register('message')}
                                                className='bg-white'
                                            />
                                        </InputGroup>
                                        {form.formState.errors.message && (
                                            <FieldError>{form.formState.errors.message.message}</FieldError>
                                        )}
                                    </Field>
                                </div>
                            </FieldGroup>

                            {/* Services Section */}
                            <FieldGroup>
                                <FieldLabel>Services You Are Interested In</FieldLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                    {SERVICES.map((service) => (
                                        <div key={service} className="flex items-center gap-2">
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
                                                className='bg-white'
                                            />
                                            <label htmlFor={service} className="text-sm font-normal cursor-pointer">
                                                {service}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {form.formState.errors.services && (
                                    <FieldError>{form.formState.errors.services.message}</FieldError>
                                )}
                            </FieldGroup>

                            {/* Description */}
                            <Field>
                                <InputGroup>
                                    <InputGroupTextarea
                                        placeholder="Description:"
                                        {...form.register('description')}
                                        className="min-h-24 bg-white"
                                    />
                                </InputGroup>
                                {form.formState.errors.description && (
                                    <FieldError>{form.formState.errors.description.message}</FieldError>
                                )}
                            </Field>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    className="bg-black hover:bg-gray-900 text-white rounded-full px-8 py-2 h-auto"
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
