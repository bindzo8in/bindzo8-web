import {
  Body,
  Button,
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

type ClientQuoteEmailProps = {
  data: QuoteEmailData;
};

export default function ClientQuoteEmail({ data }: ClientQuoteEmailProps) {
  return (
    <Html>
      <Tailwind>
      <Head />
      <Preview>Thanks for contacting Bindzo 8 Techno Solutions</Preview>

        <Body className="m-0 bg-[#f6f6f6] p-0 font-sans">
          <Container className="mx-auto my-0 w-full max-w-[640px] px-4 py-8">
            <Section className="overflow-hidden rounded-[24px] bg-white shadow-sm">
              {/* Hero */}
              <Section className="bg-[#fff4f4] px-6 py-8 text-center">
                <Img
                  src="https://your-domain.com/home/ourProducts/Bindzo_logo.png"
                  width="76"
                  height="76"
                  alt="Bindzo 8"
                  className="mx-auto mb-4 rounded-full"
                />

                <Text className="m-0 text-[13px] font-bold uppercase tracking-[0.18em] text-[#d3325c]">
                  Request Received
                </Text>

                <Heading className="m-0 mt-3 text-[28px] font-bold leading-[1.2] text-[#161616]">
                  Thank you, {data.name}!
                </Heading>

                <Text className="mx-auto mt-3 max-w-[480px] text-[15px] leading-[25px] text-[#555555]">
                  We have received your enquiry. Our team will review your
                  requirement and get back to you shortly.
                </Text>
              </Section>

              {/* Body */}
              <Section className="px-5 py-6 sm:px-8">
                <Text className="m-0 text-[16px] leading-[26px] text-[#161616]">
                  Hi {data.name},
                </Text>

                <Text className="m-0 mt-3 text-[15px] leading-[25px] text-[#555555]">
                  Thanks for reaching out to Bindzo 8 Techno Solutions. We are
                  excited to understand your business needs and help you with the
                  right digital solution.
                </Text>

                <Section className="mt-6 rounded-[18px] border border-[#f2c7d2] bg-[#fff4f4] p-5">
                  <Text className="m-0 text-[14px] font-bold text-[#d3325c]">
                    Your submitted details
                  </Text>

                  <SummaryRow label="Name" value={data.name} />
                  <SummaryRow label="Email" value={data.email} />
                  <SummaryRow label="Phone" value={data.phone} />
                  <SummaryRow label="Service" value={data.service || "Not specified"} />
                </Section>

                <Section className="mt-6 rounded-[18px] bg-[#161616] px-5 py-6 text-center">
                  <Heading className="m-0 text-[22px] font-bold leading-[1.3] text-white">
                    What happens next?
                  </Heading>

                  <Text className="m-0 mt-3 text-[14px] leading-[24px] text-white/80">
                    Our team will check your request, understand your goals, and
                    contact you with the next steps.
                  </Text>

                  <Button
                    href="https://your-domain.com"
                    className="mt-5 rounded-full bg-[#F47C2A] px-6 py-3 text-[14px] font-bold text-white no-underline"
                  >
                    Visit Our Website
                  </Button>
                </Section>

                <Hr className="my-7 border-[#eeeeee]" />

                <Text className="m-0 text-[13px] leading-[22px] text-[#777777]">
                  If you did not submit this request, you can safely ignore this
                  email.
                </Text>

                <Text className="m-0 mt-4 text-[13px] leading-[22px] text-[#777777]">
                  Regards,
                  <br />
                  <strong>Bindzo 8 Techno Solutions</strong>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Section className="mt-4">
      <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.08em] text-[#d3325c]">
        {label}
      </Text>

      <Text className="m-0 mt-1 break-words text-[15px] leading-[24px] text-[#161616]">
        {value}
      </Text>
    </Section>
  );
}