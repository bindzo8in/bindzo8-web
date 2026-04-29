import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AdminContactMailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
  description?: string;
  submittedAt: string;
}

export function AdminContactMail({
  name,
  email,
  phone,
  message,
  services,
  description,
  submittedAt,
}: AdminContactMailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact request from {name}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Text style={heading}>New Contact Request</Text>

            <Text style={subText}>
              A new user has submitted the contact form.
            </Text>

            <Hr style={hr} />

            <Text style={sectionTitle}>Customer Details</Text>

            <Section style={infoBox}>
              <Text style={label}>Name</Text>
              <Text style={value}>{name}</Text>

              <Text style={label}>Email</Text>
              <Text style={value}>{email}</Text>

              <Text style={label}>Phone</Text>
              <Text style={value}>{phone}</Text>

              <Text style={label}>Need Help With</Text>
              <Text style={value}>{message}</Text>

              <Text style={label}>Submitted At</Text>
              <Text style={value}>{submittedAt}</Text>
            </Section>

            <Text style={sectionTitle}>Interested Services</Text>

            <Section style={serviceBox}>
              {services.map((service) => (
                <Text key={service} style={serviceItem}>
                  • {service}
                </Text>
              ))}
            </Section>

            {description ? (
              <>
                <Text style={sectionTitle}>Description</Text>
                <Section style={descriptionBox}>
                  <Text style={descriptionText}>{description}</Text>
                </Section>
              </>
            ) : null}

            <Hr style={hr} />

            <Text style={footer}>
              Reply directly to the customer at {email}.
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
  margin: "0 0 10px",
};

const subText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#374151",
  textAlign: "center" as const,
  margin: "0",
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
};

const label = {
  fontSize: "12px",
  color: "#6b7280",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const value = {
  fontSize: "15px",
  color: "#111827",
  lineHeight: "22px",
  margin: "0 0 14px",
  wordBreak: "break-word" as const,
};

const serviceBox = {
  backgroundColor: "#fff5f4",
  borderRadius: "10px",
  padding: "14px 16px",
};

const serviceItem = {
  fontSize: "14px",
  color: "#111827",
  margin: "6px 0",
};

const descriptionBox = {
  backgroundColor: "#f9fafb",
  borderLeft: "4px solid #ff4f7b",
  borderRadius: "10px",
  padding: "16px",
};

const descriptionText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#374151",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  fontSize: "13px",
  color: "#6b7280",
  textAlign: "center" as const,
  margin: "0",
};