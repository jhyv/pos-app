import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jvipoystarter.dudepos',
  appName: 'Dude POS',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
