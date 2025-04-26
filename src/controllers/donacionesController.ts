import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { CreateDonacionRequest } from "../middlewares/validators/donacion";
import { payment } from "../config/mercadoPago";


export async function processDonacion(req: Request<{}, {}, CreateDonacionRequest>, res: Response, next: NextFunction) {
  const matched = matchedData(req) as CreateDonacionRequest;

  const description = `Donación ${matched.frequency === 'monthly' ? 'recurrente (mensual)' : 'única'} a Conquistando Sonrisas A.C.`;
  const transactionAmount = Math.round((matched.transaction_amount + Number.EPSILON) * 100) / 100;

  const mercadoPagoRes = await payment.create({
    body: {
      transaction_amount: transactionAmount,
      token: matched.token,
      description,
      installments: 1,
      payment_method_id: matched.payment_method_id,
      issuer_id: matched.issuer_id,
      payer: {
        email: matched.payer.email
      },
    }
  });

  res.status(200).json({ paymentId: mercadoPagoRes.id })
  return;
}