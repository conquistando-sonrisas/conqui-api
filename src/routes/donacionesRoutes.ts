import expresss, { NextFunction, Request, Response } from "express"
import { CreateDonacionRequest, createDonacionValidation } from "../middlewares/validators/donacion";
import { validator } from "../middlewares/validates";
import { processDonacion } from "../controllers/donacionesController";

const donacionesRouter = expresss.Router();


donacionesRouter.post('/',
  createDonacionValidation(),
  validator,
  processDonacion,
)


export default donacionesRouter