import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(emailRegex, "Format email tidak valid")
    .required("Email wajib diisi"),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),
});
