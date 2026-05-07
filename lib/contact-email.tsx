"use server";

import { Resend } from "resend";
import { AdminContactMail } from "@/email/contact/admin-contact-mail";
import { ClientContactMail } from "@/email/contact/client-contact-mail";
import { resend } from "./email";
import AdminQuoteEmail from "@/email/quota/admin";
import ClientQuoteEmail from "@/email/quota/client";
import { QuoteEmailData } from "@/email/quota/type";


export async function sendContactMails(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
  description?: string;
}) {
  try {
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const adminMail = await resend.emails.send({
       from: `${process.env.NEXT_PUBLIC_COMPANY_NAME} <${process.env.NEXT_PUBLIC_EMAIL_2}>`,
      to: "bindzo8in@gmail.com",
      subject: `New Contact Request - ${data.name}`,
      replyTo: data.email,
      react: (
        <AdminContactMail
          name={data.name}
          email={data.email}
          phone={data.phone}
          message={data.message}
          services={data.services}
          description={data.description}
          submittedAt={submittedAt}
        />
      ),
    });

    const clientMail = await resend.emails.send({
       from: `${process.env.NEXT_PUBLIC_COMPANY_NAME} <${process.env.NEXT_PUBLIC_EMAIL_2}>`,
      to: data.email,
      subject: "We received your request - Bindzo8",
      react: (
        <ClientContactMail
          name={data.name}
          message={data.message}
          services={data.services}
        />
      ),
    });

    return {
      success: true,
      adminMail,
      clientMail,
    };
  } catch (error) {
    console.error("Contact mail error:", error);
    throw new Error("Failed to send contact emails");
  }
}

export async function sendQuoteMails(data: QuoteEmailData) {
  try {
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const adminMail = await resend.emails.send({
       from: `${process.env.NEXT_PUBLIC_COMPANY_NAME} <${process.env.NEXT_PUBLIC_EMAIL_2}>`,
      to: "bindzo8in@gmail.com",
      subject: `New Quote Request - ${data.name}`,
      replyTo: data.email,
      react:
        AdminQuoteEmail({ data })

    });

    const clientMail = await resend.emails.send({
       from: `${process.env.NEXT_PUBLIC_COMPANY_NAME} <${process.env.NEXT_PUBLIC_EMAIL_2}>`,
      to: data.email,
      subject: "We received your request - Bindzo8",
      react:
        ClientQuoteEmail({ data })


    });

    return {
      success: true,
      adminMail,
      clientMail,
    };
  } catch (error) {
    console.error("Quote mail error:", error);
    throw new Error("Failed to send quote emails");
  }
} 