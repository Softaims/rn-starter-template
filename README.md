# 🚀 React Native Template Project (Beginner Friendly)

This is a React Native template project with:

- **Expo**: Easy way to run React Native apps
- **TailwindCSS**: For styling
- **Supabase**: For Google, Apple, and Email/OTP login
- **Atomic Design structure**: Atoms → Molecules → Organisms
- **Layered architecture**: UI → ViewModel → Store → Service

## 1️⃣ Before You Start: Install Required Tools

If you just bought a laptop, you’ll need some tools:

### Node.js (runtime for JavaScript)
- **Download & install**: [https://nodejs.org](https://nodejs.org)
- **Check installation**:
  ```bash
  node -v
  npm -v
  ```

### Expo CLI (to run React Native apps easily)
- **Install**:
  ```bash
  npm install -g expo-cli
  ```
- **Learn more**: [https://docs.expo.dev/get-started/installation/](https://docs.expo.dev/get-started/installation/)

### Git (for version control)
- **Download & install**: [https://git-scm.com/downloads]
- **Check**:
  ```bash
  git --version
  ```

### Xcode (for iOS development, Mac only)
- **Download**: From App Store
- **Learn**: [https://developer.apple.com/xcode/]

### Android Studio (for Android development)
- **Download**: [https://developer.android.com/studio]
- **Ensure**: Android SDK & Emulator are installed.

## 2️⃣ Project Setup

### Clone the project
```bash
git clone <your-repo-url>
cd <project-folder>
```

### Install dependencies
```bash
npm install
```

### Run the project
- **iOS (Mac only)**:
  ```bash
  npx expo run:ios
  ```
- **Android**:
  ```bash
  npx expo run:android
  ```
- **Or start Expo for both**:
  ```bash
  expo start
  ```

## 3️⃣ Icons Setup

We use **IconKitchen** to create proper icons for iOS and Android.

- **Website**: [https://icon.kitchen]

### Android
- Copy downloaded icons (except versioned folders) into `android/app/src/main/res/`.
- Update `AndroidManifest.xml` to remove old launcher icon strings if needed.

### iOS
- Open `.xcworkspace` in Xcode.
- Go to **Project → Images → App Icon**.
- Drag your icons from downloads into Xcode.

## 4️⃣ Splash Screen Setup

We use **Ape Tools**: [https://apetools.webprofusion.com]

- Export splash image from Figma (3x PNG) and put it in `./assets/`.
- Open `app.json` and update:
  ```json
  "splash": {
    "image": "./assets/splash-icon.png"
  }
  ```
- Run:
  ```bash
  npx expo run:ios
  ```
- Restart the app to see your splash screen.

## 5️⃣ Google Authentication Setup

### References
- Expo + Supabase: [https://docs.expo.dev/guides/using-supabase/]
- Supabase Social Login: [https://supabase.com/docs/guides/auth/social-login/auth-google]

### Steps
- Go to **Google Cloud Console**.
- Create OAuth Client IDs for:
  - iOS
  - Android
  - Web
- Add Client IDs to `.env`:
  ```bash
  GOOGLE_WEB_CLIENT_ID=<your-web-client-id>
  GOOGLE_IOS_CLIENT_ID=<your-ios-client-id>
  GOOGLE_ANDROID_CLIENT_ID=<your-android-client-id>
  ```

### Android Extra Steps
- Get SHA-1 fingerprint:
  ```bash
  keytool -list -v -keystore ./android/app/debug.keystore
  ```
  - Password: `android` (or your custom password)
- Copy `applicationId` from `android/app/build.gradle`.
- Add Android client ID in `android/app/src/main/res/values/strings.xml`:
  ```xml
  <string name="server_client_id">YOUR_ANDROID_CLIENT_ID_HERE</string>
  ```

### iOS Extra Steps
- Copy iOS Client ID from Google Cloud Console into `.env`.

## 6️⃣ Apple Authentication Setup

- **Apple Developer Account needed**: [https://developer.apple.com]
- In **Xcode** → enable Apple Sign-In capability.
- Get Bundle ID:
  ```bash
  grep -r "PRODUCT_BUNDLE_IDENTIFIER" ios/
  ```
- Create Apple Client ID in Apple Developer account.
- Add Apple client ID and web client secret to **Supabase → Authentication → Providers**.
- Update `app.json`:
  ```json
  "ios": {
    "usesAppleSignIn": true
  },
  "plugins": [
    "expo-apple-authentication"
  ]
  ```
final plugins may look something like this 

 ```"plugins": [
    "expo-apple-authentication"
  ]
  "plugins": [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.googleusercontent.apps.1034133353106-b2iq7gc68nulq1ifn080igj1jr3p9296"
        }
      ],
      "expo-apple-authentication",
      "expo-router",
      "expo-secure-store"
    ]
```

## 7️⃣ Supabase Configuration

- Go to **Supabase → Authentication → Providers**.
- Add all Google and Apple client IDs.
- Add Redirect URLs:
  - `host.exp.Exponent` (Expo testing)
  - `com.yourbundleid.app` (Your actual bundle ID)

## ✅ Project is Ready!

Your project now supports:
- Google & Apple Login via Supabase
- Custom Splash Screen
- Scalable folder structure

## 📚 Helpful Beginner References

- **React Native + Expo Setup**: [https://docs.expo.dev/get-started/]
- **TailwindCSS in React Native**: [https://tailwindcss.com/docs/guides/react-native]
- **Supabase Auth**: [https://supabase.com/docs/guides/auth]
- **Xcode Basics**: [https://developer.apple.com/xcode/]
- **Android Studio Basics**: [https://developer.android.com/studio/]

## ✅ Tips for Beginners

- Keep `.env` safe; don’t share your keys.
- If stuck, Google the exact error—you’re not alone!
