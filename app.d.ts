declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MERCADO_PAGO_ACCESS_TOKEN: string;
    } 
  }
}

export {}