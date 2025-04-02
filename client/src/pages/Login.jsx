import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // For API calls

const Login = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: () => console.log("reCAPTCHA solved"),
      });
    }
  }, []);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      if (confirmationResult) {
        const userCredential = await confirmationResult.confirm(otp);
        const idToken = await userCredential.user.getIdToken(); // Get Firebase ID token

        console.log(userCredential)

        // Send token to backend to create JWT
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          idToken,
        });

        if (response.data.jwt) {
          console.log(response.data.jwt)
          localStorage.setItem("token", response.data.jwt); // Store JWT
          navigate("/"); // Redirect to Home
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#0b3d91",
            fontWeight: 500,
            mb: 3,
          }}
        >
          Government Authentication Portal
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Alert
          severity="info"
          sx={{ mb: 3, backgroundColor: "#f0f7ff", color: "#0b3d91" }}
        >
          Please enter your registered phone number to receive an OTP for authentication.
        </Alert>

        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1234567890"
            disabled={otpSent}
            InputProps={{ sx: { borderRadius: 1 } }}
          />

          <div id="sign-in-button"></div>

          {!otpSent ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              onClick={handleSendOtp}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#0b3d91",
                "&:hover": { backgroundColor: "#072a64" },
                borderRadius: 1,
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send OTP"}
            </Button>
          ) : (
            <>
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                InputProps={{ sx: { borderRadius: 1 } }}
              />

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                onClick={handleVerifyOtp}
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "#0b3d91",
                  "&:hover": { backgroundColor: "#072a64" },
                  borderRadius: 1,
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                    Verifying...
                  </Box>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #eaeaea", textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            This is a secure government portal. All information provided is encrypted and protected.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            © {new Date().getFullYear()} Government of India. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
