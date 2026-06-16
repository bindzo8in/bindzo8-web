"use server";

import { Resend } from "resend";
import { AdminNotification } from "@/email/career/admin-notification";
import { ApplicantConfirmation } from "@/email/career/applicant-confirmation";
import { resend } from "./email";

export async function sendCareerAdminMail(data: {
  to: string;
  subject: string;
  name: string;
  email: string;
  mobileNumber: string;
  location: string;
  position: string;
  description: string;
  resumeUrl: string;
  resumeFileName: string;
}) {
  const fileRes = await fetch(data.resumeUrl);
  const arrayBuffer = await fileRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data: result, error } = await resend.emails.send({
    from: `${process.env.NEXT_PUBLIC_COMPANY_NAME} <${process.env.NEXT_PUBLIC_EMAIL_2}>`,
    to: data.to,
    subject: data.subject,
    react: AdminNotification({
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      location: data.location,
      position: data.position,
      description: data.description,
      resumeFileName: data.resumeFileName,
      resume: data.resumeUrl,
      submittedAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    }),
    attachments: [
      {
        filename: "resume.pdf",
        content: buffer,
        contentType: "application/pdf",
      },
    ],
  });

  if (error) {
    console.error(error);
    return { error };
  }

  return { data: result };
}

export async function sendApplicantConfirmationMail(data: {
  to: string;
  name: string;
  email: string;
  position: string;
  mobileNumber: string;
}) {
  try {
    const res = await resend.emails.send({
       from: `${process.env.NEXT_PUBLIC_COMPANY_NAME} <${process.env.NEXT_PUBLIC_EMAIL_2}>`,
      to: data.to,
      subject: `Application Received - ${data.position}`,
      react: ApplicantConfirmation({ name: data.name, email: data.email, position: data.position, mobileNumber: data.mobileNumber })
    });

    return res;
  } catch (error) {
    console.error("Applicant confirmation email failed:", error);
    throw new Error("Applicant confirmation email failed");
  }
}