import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import type { QuoteEmailData } from "./type";

type AdminQuoteEmailProps = {
  data: QuoteEmailData;
};

const brand = {
  primary: "#d3325c",
  orange: "#d3325c",
  dark: "#161616",
  muted: "#666666",
  bg: "#fff4f4",
  border: "#f2c7d2",
};

export default function AdminQuoteEmail({ data }: AdminQuoteEmailProps) {
  const submittedAt =
    data.submittedAt ||
    new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <Html>
      <Tailwind>
      <Head />
      <Preview>New quote request from {data.name}</Preview>

        <Body className="m-0 bg-[#f6f6f6] p-0 font-sans">
          <Container className="mx-auto my-0 w-full max-w-[640px] px-4 py-8">
            <Section className="overflow-hidden rounded-[24px] bg-white shadow-sm">
              {/* Header */}
              <Section className="bg-[#d3325c] px-6 py-7 text-center">
                <Img
                  src="https://your-domain.com/home/ourProducts/Bindzo_logo.png"
                  width="72"
                  height="72"
                  alt="Bindzo 8"
                  className="mx-auto mb-3 rounded-full"
                />

                <Heading className="m-0 text-[26px] font-bold leading-[1.2] text-white">
                  New Quote Request
                </Heading>

                <Text className="m-0 mt-2 text-[14px] leading-[22px] text-white/90">
                  A new enquiry has been submitted from the website.
                </Text>
              </Section>

              {/* Main Content */}
              <Section className="px-5 py-6 sm:px-8">
                <Text className="m-0 text-[16px] leading-[26px] text-[#161616]">
                  Hi Admin,
                </Text>

                <Text className="m-0 mt-2 text-[15px] leading-[25px] text-[#555555]">
                  You received a new quote request. Please review the details
                  below and contact the client as soon as possible.
                </Text>

                <Section className="mt-6 rounded-[18px] border border-[#f2c7d2] bg-[#fff4f4] p-5">
                  <InfoRow label="Name" value={data.name} />
                  <InfoRow label="Email" value={data.email} />
                  <InfoRow label="Phone" value={data.phone} />
                  <InfoRow label="Service" value={data.service || "Not specified"} />
                  <InfoRow label="Submitted At" value={submittedAt} />
                </Section>

                <Section className="mt-5 rounded-[18px] border border-[#eeeeee] bg-white p-5">
                  <Text className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-[#d3325c]">
                    Client Message
                  </Text>

                  <Text className="m-0 mt-3 whitespace-pre-line text-[15px] leading-[25px] text-[#333333]">
                    {data.message || "No message provided."}
                  </Text>
                </Section>

                <Hr className="my-7 border-[#eeeeee]" />

                <Text className="m-0 text-[13px] leading-[22px] text-[#777777]">
                  This email was generated automatically from your website quote
                  form.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Section className="border-b border-[#f3d7df] py-3 last:border-b-0">
      <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.08em] text-[#d3325c]">
        {label}
      </Text>

      <Text className="m-0 mt-1 break-words text-[15px] leading-[24px] text-[#161616]">
        {value}
      </Text>
    </Section>
  );
}