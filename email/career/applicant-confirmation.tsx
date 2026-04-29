import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface ApplicantConfirmationProps {
  name: string;
  email: string;
  position: string;
  mobileNumber: string;
}

export const ApplicantConfirmation = ({
  name,
  email,
  position,
  mobileNumber,
}: ApplicantConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Application Received - {position}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={heading}>Thank You for Your Application!</Text>
          <Hr style={hr} />
          
          <Text style={paragraph}>
            Hi {name},
          </Text>
          
          <Text style={paragraph}>
            We have successfully received your application for the{' '}
            <strong>{position}</strong> position. Thank you for your interest in
            joining our team!
          </Text>

          <Section style={detailsBox}>
            <Text style={detailsTitle}>Application Details:</Text>
            <Row>
              <Text style={detailLabel}>Position Applied:</Text>
              <Text style={detailValue}>{position}</Text>
            </Row>
            <Row>
              <Text style={detailLabel}>Email:</Text>
              <Text style={detailValue}>{email}</Text>
            </Row>
            <Row>
              <Text style={detailLabel}>Phone:</Text>
              <Text style={detailValue}>{mobileNumber}</Text>
            </Row>
          </Section>

          <Text style={paragraph}>
            Our recruitment team will review your application carefully. If your
            qualifications match our requirements, we will contact you within 5-7
            business days to discuss the next steps.
          </Text>

          <Text style={paragraph}>
            In the meantime, feel free to explore our company and culture by
            visiting our website.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href="https://yourcompany.com">
              Visit Our Website
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={paragraph}>
            If you have any questions, please don&apos;t hesitate to reach out
            to us at{' '}
            <Link href="mailto:careers@yourcompany.com" style={link}>
              careers@yourcompany.com
            </Link>
          </Text>

          <Text style={footer}>
            Best regards,
            <br />
            The Recruitment Team
          </Text>
        </Section>

        <Text style={footerText}>
          © 2024 Your Company Name. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f3f4f6',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const heading = {
  fontSize: '32px',
  fontWeight: '700',
  margin: '16px 0',
  padding: '0',
  color: '#ff6b35',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '26px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '16px 0',
};

const detailsBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const detailsTitle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 12px 0',
};

const detailLabel = {
  fontSize: '14px',
  color: '#6b7280',
  fontWeight: '500',
  margin: '8px 0',
};

const detailValue = {
  fontSize: '14px',
  color: '#1f2937',
  fontWeight: '600',
  margin: '8px 0',
  marginLeft: '16px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#ff6b35',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 32px',
};

const link = {
  color: '#ff6b35',
  textDecoration: 'underline',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0 0 0',
};

const footerText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  margin: '0',
};
