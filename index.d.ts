declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DONACIONES_UNICAS_ACCESS_TOKEN: string;
      DONACIONES_RECURRENTES_ACCESS_TOKEN: string;
      DONACIONES_RECURRENTES_PREAPPROVAL_PLAN_ID: string;
    }
  }
}

export { }