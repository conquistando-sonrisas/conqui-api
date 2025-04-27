import { Payment, PreApproval } from "mercadopago";
import { checkoutApiClient, suscriptionsApiClient } from "../config/mercadoPago";
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";



const payment = new Payment(checkoutApiClient)

type DonacionUnicaArgs = { amount: number, email: string } & Required<Pick<PaymentCreateRequest, 'token' | 'payment_method_id' | 'issuer_id'>>
export const processDonacionUnica = async (args: DonacionUnicaArgs) => {
  const res = await payment.create({
    body: {
      transaction_amount: args.amount,
      token: args.token,
      description: 'Donación única a Conquistando Sonrisas A.C.',
      installments: 1,
      payment_method_id: args.payment_method_id,
      issuer_id: args.issuer_id,
      payer: {
        email: args.email
      },
      three_d_secure_mode: 'optional'
    },
  });

  return {
    paymentId: res.id,
    threeDsInfo: res.three_ds_info
      ? {
        externalResourceURL: res.three_ds_info.external_resource_url,
        creq: res.three_ds_info.creq
      }
      : null
  };
}



const preaproval = new PreApproval(suscriptionsApiClient);

type DonacionRecurrenteArgs = { amount: number, email: string, token: string }
export const processDonacionRecurrente = async (args: DonacionRecurrenteArgs) => {
  const res = await preaproval.create({
    body: {
      preapproval_plan_id: process.env.DONACIONES_RECURRENTES_PREAPPROVAL_PLAN_ID,
      card_token_id: args.token,
      payer_email: args.email,
      status: 'authorized',
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        currency_id: 'MXN',
        transaction_amount: args.amount
      },
    }
  })
  
  return res.id;
}


export const roundToTwo = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;