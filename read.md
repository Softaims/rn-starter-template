# React Native Template Project
# This project is a React Native template with the following setup:
Expo
TailwindCSS
Supabase (Google, Apple, and Email + OTP authentication)
Atomic design structure (Atoms → Molecules → Organisms)

# Layered architecture: UI → ViewModel → Store → Service

# Splash Screen Setup
1. Open app.json
Locate the splash object and set the image path:
"splash": {
  "image": "./assets/splash-icon.png"
}
2. Export Splash Image
Export your splash image in 3x PNG format from Figma and place it inside the assets folder.
3. Run Prebuild (if needed)
If you created a new project, run:
npx expo run:ios
4. Restart App
Restart the application to see the updated splash screen.

# Google Authentication (Without Firebase)
📖 References:
Expo + Supabase Auth Guide : https://docs.expo.dev/guides/using-supabase/?utm_source=chatgpt.com
Supabase Social Login (Google) : https://supabase.com/docs/guides/auth/social-login/auth-google?platform=react-native&utm_source=chatgpt.com&utm_medium=referral&utm_term=expo-react-native

# Create Google OAuth Clients
Go to Google Cloud Console : https://console.cloud.google.com/apis/credentials?utm_source=chatgpt.com
Configure the OAuth consent screen → set as External.
Create OAuth Client IDs for:
iOS
Android
Web

# Configure Environment Variables
Copy the Web Client ID and paste it into .env:
GOOGLE_WEB_CLIENT_ID=your-client-id-here and ios client id 
(See useGoogleAuth.ts line 6-9 for reference)

# Android Setup
Generate SHA-1 Fingerprint
Run this command in the project root:
keytool -list -v -keystore ./android/app/debug.keystore
Password: android (or your custom password).
(for release create new key and password and keep it safe)
Add Application ID
Copy the applicationId from android/app/build.gradle.
Register your Android client in Google Cloud Console.
Add the client ID into android/app/src/main/res/values/strings.xml:
<string name="server_client_id">
  1034133353106-dai9f83u5vc279vgllvk4og6a1kjj2ef.apps.googleusercontent.com
</string>

# iOS Setup
Create an iOS OAuth client in Google Cloud Console.
Copy the iOS Client ID.

#  Apple Authentication
1. Apple Developer Setup
You need an Apple Developer Account.
In Xcode, enable Apple Sign-In capability.
2. Find Bundle ID
Run in terminal:
grep -r "PRODUCT_BUNDLE_IDENTIFIER" ios/
Use this Bundle ID when creating your Apple Client ID.
3. Create Apple Client ID
After creating, copy the generated client ID (e.g.,
1034133353106-b2iq7gc68nulq1ifn080igj1jr3p9296.apps.googleusercontent.com
).
4. Supabase Setup
Add all Google and Apple client IDs into Supabase (Authentication → Providers).
Add the Web Client Secret as well.
5. Update app.json
<!-- "ios": {
  "usesAppleSignIn": true
},
"plugins": [
  [
    "@react-native-google-signin/google-signin",
    {
      "iosUrlScheme": "com.googleusercontent.apps.1034133353106-b2iq7gc68nulq1ifn080igj1jr3p9296"
    }
  ],
  "expo-apple-authentication"
] -->
# Supabase Configuration
In Supabase → Authentication → Providers:
Add all Google and Apple client IDs.
Under Redirect URLs, include:
host.exp.Exponent          # for Expo testing  
com.anonymous.rn-template  # your actual bundle ID  

✅ That’s it! Your project now supports:
Google & Apple Authentication with Supabase
Custom Splash Screen
Scalable Project Structure