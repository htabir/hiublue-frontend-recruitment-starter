import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";

export const schema = yup.object().shape({
  planType: yup.string().required("Plan type is required"),
  additions: yup.object().shape({
    refundable: yup.boolean(),
    onDemand: yup.boolean(),
    negotiable: yup.boolean(),
  }),
  user: yup.string().required("User is required"),
  expired: yup
    .mixed<Dayjs>()
    .required("Expiration date is required")
    .typeError("Invalid date"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
});

export interface FormData {
    planType: string;
    additions: {
      refundable: boolean;
      onDemand: boolean;
      negotiable: boolean;
    };
    user: string;
    expired: Dayjs;
    price: number;
  }
