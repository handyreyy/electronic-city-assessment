import * as yup from "yup";

export const getSpelledOutSchema = yup.object({
  amount: yup
    .number()
    .typeError("Nominal harus berupa angka")
    .required("Nominal wajib diisi")
    .min(1, "Minimal Rp1")
    .max(999_000_000_000_000, "Nominal maksimal Rp999 triliun"),
});
