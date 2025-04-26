import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { CreateDonacionRequest } from "../middlewares/validators/donacion";
import { processDonacionRecurrente, processDonacionUnica, roundToTwo } from "../services/donaciones";


export async function processDonacion(req: Request<{}, {}, CreateDonacionRequest>, res: Response, next: NextFunction) {
  const matched = matchedData(req) as CreateDonacionRequest;
  const transactionAmount = roundToTwo(matched.transaction_amount);

  switch (matched.frequency) {
    case 'monthly':
      const suscriptionId = await processDonacionRecurrente({
        amount: transactionAmount,
        email: matched.payer.email,
        token: matched.token,
      });
      res.status(200).json({ suscriptionId });
      break;

    case "one-time":
      const payment = await processDonacionUnica({
        amount: transactionAmount,
        token: matched.token,
        email: matched.payer.email,
        issuer_id: matched.issuer_id,
        payment_method_id: matched.payment_method_id
      });

      res.status(200).json(payment)
      break;
  }

  return;
}