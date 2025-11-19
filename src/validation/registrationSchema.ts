import * as yup from "yup";

export type RegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const phoneRegex = /^[\d+\-\s()]{6,20}$/;

const schema: yup.SchemaOf<RegistrationData> = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain uppercase letter")
    .matches(/\d/, "Must contain a number"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone is required").matches(phoneRegex, "Invalid phone number")
});

export default schema;
