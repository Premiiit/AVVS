# AVVS - Advanced Voter Verification System

AVVS is a secure and scalable system built to streamline the voter verification process during elections. By using phone OTP authentication, EPIC ID and voter photo validation, fingerprint verification, and QR code generation, AVVS significantly reduces manual verification time and long queues at polling booths.

## 🚀 Features

- 📱 Firebase Phone OTP Authentication
- 🆔 EPIC Number and Voter Photo Verification
- 🔒 Fingerprint Capture and Matching
- 📄 QR Code Generation after Successful Verification
- 🏛️ Designed for Fast, Secure, and Efficient Voting Day Operations

## 🛠️ Tech Stack

- **Authentication**: Firebase Authentication (Phone OTP)
- **Database**: Firebase Firestore
- **QR Code**: QR Code Generation Libraries (e.g., `qrcode.react`, `react-qr-code`)
- **Fingerprint**: Fingerprint Upload and Matching (Biometric system or manual upload simulation)
- **Frontend**: Next.js / React.js (Assuming)
- **Backend**: Node.js / Express (if applicable)

## 📥 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Firebase Project (Auth + Firestore)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Firebase Project Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

