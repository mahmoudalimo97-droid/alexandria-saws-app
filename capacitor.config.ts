import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alexandriasaws.app',
  appName: 'شركة الإسكندرية للمناشير',
  webDir: 'dist',
  backgroundColor: '#FFFFFF',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#FFFFFF'
  }
};

export default config;
