export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_TOKEN: string;
      FAUNA_TOKEN: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
