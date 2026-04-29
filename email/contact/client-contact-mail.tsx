import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ClientContactMailProps {
  name: string;
  message: string;
  services: string[];
}

export function ClientContactMail({
  name,
  message,
  services,
}: ClientContactMailProps) {
  return (
    <Html>
      <Head />
      <Preview>We received your request</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Text style={heading}>Thank You, {name}!</Text>

            <Text style={paragraph}>
              We have successfully received your request. Our team will review
              your details and contact you shortly.
            </Text>

            <Hr style={hr} />

            <Text style={sectionTitle}>Your Request</Text>

            <Section style={infoBox}>
              <Text style={label}>How can we help you?</Text>
              <Text style={value}>{message}</Text>

              <Text style={label}>Selected Services</Text>
              {services.map((service) => (
                <Text key={service} style={serviceItem}>
                  • {service}
                </Text>
              ))}
            </Section>

            <Text style={paragraph}>
              Usually, we respond within 24 hours during business days.
            </Text>

            <Section style={buttonWrap}>
              <Button style={button} href="https://bindzo8.com">
                Visit Our Website
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Best regards,
              <br />
              Bindzo8 Techno Solutions
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff5f4",
  margin: "0",
  padding: "24px 12px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const container = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
};

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "28px 22px",
};

const heading = {
  fontSize: "26px",
  lineHeight: "34px",
  fontWeight: "700",
  color: "#ff4f7b",
  textAlign: "center" as const,
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#374151",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#f1d7d4",
  margin: "24px 0",
};

const sectionTitle = {
  fontSize: "17px",
  fontWeight: "700",
  color: "#111827",
  margin: "0 0 12px",
};

const infoBox = {
  backgroundColor: "#f9fafb",
  borderRadius: "10px",
  padding: "16px",
  margin: "0 0 18px",
};

const label = {
  fontSize: "12px",
  color: "#6b7280",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  margin: "0 0 6px",
};

const value = {
  fontSize: "15px",
  color: "#111827",
  lineHeight: "22px",
  margin: "0 0 14px",
};

const serviceItem = {
  fontSize: "14px",
  color: "#111827",
  margin: "6px 0",
};

const buttonWrap = {
  textAlign: "center" as const,
  marginTop: "24px",
};

const button = {
  backgroundColor: "#ff4f7b",
  borderRadius: "999px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  padding: "12px 28px",
};

const footer = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#6b7280",
  margin: "0",
};