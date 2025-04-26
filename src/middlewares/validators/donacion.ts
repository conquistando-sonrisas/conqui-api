import { body } from "express-validator";


export const createDonacionValidation = () => ([
  body('transaction_amount').isFloat().toFloat(),
  body('issuer_id').isInt().toInt(),
  body('payer.email').trim().notEmpty().isEmail(),
  body('token').trim().notEmpty(),
  body('payment_method_id').trim().notEmpty(),
  body('frequency').isIn(['one-time', 'monthly'])
])

export interface CreateDonacionRequest {
  transaction_amount: number;
  issuer_id: number;
  payer: {
    email: string;
  };
  token: string;
  payment_method_id: string;
  paymentType: string;
  frequency: 'one-time' | 'monthly'
}