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
import { Link } from "lucide-react";

interface AdminNotificationProps {
  name: string;
  email: string;
  mobileNumber: string;
  location: string;
  position: string;
  description: string;
  resumeFileName: string;
  resume?: string;
  submittedAt: string;
}

export const AdminNotification = ({
  name,
  email,
  mobileNumber,
  location,
  position,
  description,
  resumeFileName,
  submittedAt,
  resume
}: AdminNotificationProps) => {
  const details = [
    ["Name", name],
    ["Email", email],
    ["Phone", mobileNumber],
    ["Location", location],
    ["Position", position],
    ["Resume Name", resumeFileName],
    ["Resume", resume],
    ["Submitted", submittedAt],
  ];

  return (
    <Html>
      <Head />
      <Preview>New Application: {name} for {position}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Text style={heading}>New Application Received</Text>

            <Text style={subText}>
              A new candidate has applied for the <strong>{position}</strong>{" "}
              position.
            </Text>

            <Hr style={hr} />

            <Text style={sectionTitle}>Applicant Information</Text>

            <Section style={detailsBox}>
              {details.map(([label, value]) => (
                <Section key={label} style={detailItem}>
                  <Text style={detailLabel}>{label}</Text>
                  <Text style={detailValue}>{value}</Text>
                </Section>
              ))}
            </Section>

            <Text style={sectionTitle}>Cover Letter / Description</Text>

            <Section style={descriptionBox}>
              <Text style={descriptionText}>{description}</Text>
            </Section>

            <Section style={buttonWrap}>
              <Button style={primaryButton} href={`mailto:${email}`}>
                Reply to Applicant
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              This is an automated notification. Please review the applicant’s
              details and take appropriate action.
            </Text>
          </Section>

          <Text style={footerText}>
            © {new Date().getFullYear()} <Link href="https://bindzo8.com/">bindzo8.com</Link>. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f3f4f6",
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
  borderRadius: "12px",
  padding: "28px 22px",
};

const heading = {
  fontSize: "24px",
  lineHeight: "32px",
  fontWeight: "700",
  color: "#ff6b35",
  textAlign: "center" as const,
  margin: "0 0 12px",
};

const subText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#374151",
  textAlign: "center" as const,
  margin: "0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const sectionTitle = {
  fontSize: "17px",
  lineHeight: "24px",
  fontWeight: "700",
  color: "#111827",
  margin: "0 0 12px",
};

const detailsBox = {
  backgroundColor: "#f9fafb",
  borderRadius: "10px",
  padding: "12px 16px",
};

const detailItem = {
  borderBottom: "1px solid #e5e7eb",
  padding: "10px 0",
};

const detailLabel = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#6b7280",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  margin: "0 0 3px",
};

const detailValue = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#111827",
  fontWeight: "500",
  margin: "0",
  wordBreak: "break-word" as const,
};

const descriptionBox = {
  backgroundColor: "#f9fafb",
  borderRadius: "10px",
  padding: "16px",
  borderLeft: "4px solid #ff6b35",
};

const descriptionText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const buttonWrap = {
  textAlign: "center" as const,
  marginTop: "14px",
};

const primaryButton = {
  backgroundColor: "#ff6b35",
  borderRadius: "999px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 28px",
  display: "inline-block",
};

const secondaryButton = {
  backgroundColor: "#e5e7eb",
  borderRadius: "999px",
  color: "#111827",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 28px",
  display: "inline-block",
};

const footer = {
  color: "#6b7280",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0",
  textAlign: "center" as const,
};

const footerText = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center" as const,
  margin: "18px 0 0",
};