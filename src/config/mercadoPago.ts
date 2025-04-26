import MercadoPagoConfig from "mercadopago";

export const checkoutApiClient = new MercadoPagoConfig({
  accessToken: process.env.DONACIONES_UNICAS_ACCESS_TOKEN,
  options: {
    timeout: 5000
  }
})

export const suscriptionsApiClient = new MercadoPagoConfig({
  accessToken: process.env.DONACIONES_RECURRENTES_ACCESS_TOKEN,
  options: {
    timeout: 5000
  }
})
