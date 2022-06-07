export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_TOKEN: number;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
