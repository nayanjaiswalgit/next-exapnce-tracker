import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Heading,
  Section,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
  url: string;
}
const VerificationEmail = ({ username, otp , url}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Verification Code</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Heading style={styles.heading}>Expense Management</Heading>
        <Section style={styles.section}>
          <Text style={styles.text}>Hello, {username}</Text>
          <Text style={styles.text}>
            Use the verification code below to complete your sign-in:
          </Text>
          <Text style={styles.otp}>{otp}</Text>
          <Text style={styles.text}>
            This code will expire in 10 minutes. If you did not request this
            code, please ignore this email.
          </Text>
          <Section style={styles.buttonContainer}>
            <Button href={url} style={styles.button}>
              Verify Now
            </Button>
          </Section>
        </Section>
        <Text style={styles.footer}>
          Thank you for using Expense Management!
        </Text>
        <Text style={styles.footer}>
          If you have any questions, contact our support team.
        </Text>
      </Container>
    </Body>
  </Html>
);

const styles = {
  body: {
    backgroundColor: "#f4f4f4",
    margin: 0,
    padding: "20px 0",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "20px",
    margin: "0 auto",
    maxWidth: "600px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333333",
  },
  section: {
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#666666",
    marginBottom: "10px",
  },
  otp: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333333",
    margin: "20px 0",
    textAlign: "center" as "center", // casting to correct type
  },
  buttonContainer: {
    textAlign: "center" as "center", // casting to correct type
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "16px",
  },
  footer: {
    fontSize: "14px",
    color: "#999999",
    textAlign: "center" as "center", // casting to correct type
    marginTop: "20px",
  },
};

export default VerificationEmail;
