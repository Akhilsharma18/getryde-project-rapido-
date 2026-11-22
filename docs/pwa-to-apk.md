# GETRYDE PWA & APK Generation Manual

## 1. What was Configured
GETRYDE is now a certified Progressive Web App (PWA):
- **`manifest.json`**: App identity, electric lime theme (`#B9F227`), standalone full-screen window, and quick shortcuts (Book, Pool, Assistant, Drive).
- **Service Worker (`/sw.js`)**: Offline caching for static app shells while passing real-time Socket.IO and API requests straight through.
- **PWA Auto-Install Banner (`PwaRegistrar`)**: Automatically intercepts `beforeinstallprompt` on Android Chrome to show an instant 1-tap install prompt.
- **Vector Icons**: 192x192, 512x512, and maskable icons in `/public/icons/`.

---

## 2. How to Test & Install on Your Phone (Immediately)

### Method A: Local Wi-Fi Network
1. Make sure your PC and Android phone are connected to the same Wi-Fi.
2. Find your PC's local IP address (e.g. `ipconfig` -> `192.168.1.XX`).
3. Start the web app:
   ```powershell
   pnpm --filter web dev -- -H 0.0.0.0
   ```
4. On your Android phone, open Chrome and navigate to:
   ```
   http://<YOUR_PC_IP>:3000
   ```
5. You will see an **"Install GETRYDE App"** prompt appear at the bottom!
   Alternatively, tap the 3 dots in Chrome -> **"Install app"** or **"Add to Home screen"**.
6. GETRYDE will install onto your phone as a standalone app with its own icon on your home screen and app drawer!

---

## 3. How to Convert this PWA into an Android `.apk` / `.aab` (Google Play Store)

Using Google's official **Bubblewrap CLI** (Trusted Web Activity - TWA), you can package the PWA into a native Android APK:

### Step 1: Install Bubblewrap
```powershell
npm install -g @bubblewrap/cli
```

### Step 2: Initialize from your URL
```powershell
bubblewrap init --manifest https://your-deployed-domain.com/manifest.json
```
Bubblewrap will automatically download the Android SDK, read the `manifest.json`, configure the splash screen, and create the Android package.

### Step 3: Build the APK
```powershell
bubblewrap build
```
This generates `app-release-signed.apk` (which you can install on any Android phone directly) and `app-release-bundle.aab` (ready to upload to the Google Play Store Developer Console)!
