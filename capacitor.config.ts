import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alexandriasaws.app',
  appName: 'شركة الإسكندرية للمناشير',
  webDir: 'dist',
  backgroundColor: '#2F3437',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#2F3437'
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#2F3437',
      style: 'DARK',
      overlaysWebView: false
    },
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#2F3437'
    }
  }
};

export default config;
