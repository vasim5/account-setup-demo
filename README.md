# RN Account Setup — Test Task

## Summary
React Native + TypeScript implementation of the Account setup + Login flow from the provided web url. Local-only (no network calls). Uses `react-native-keychain` for secure local credential storage and biometric login (optional).

## Features
- Registration screen with fields: Email, Password, First name, Last name, Phone.
- Login screen with Email + Password, "Forgot password" and link to Register.
- Partial registration persistence across app restarts (AsyncStorage).
- Secure credential storage using `react-native-keychain`.
- Biometric login (Face ID / Touch ID) via Keychain access control.
- Validation via `react-hook-form` + `yup`.
- Unit tests for validation.
- ESLint and Prettier scripts.
- Modern mobile-friendly UI while matching web layout cues.

## Setup (native RN, not Expo)
1. Install dependencies:
   ```bash
   npm install

2. iOS only: install CocoaPods
   cd ios
   pod install
   cd ..

3. Run app:
   Android: npm run android
   iOS: npm run ios

4. Run tests:
   npm test

5. Typecheck:
   npm run typecheck