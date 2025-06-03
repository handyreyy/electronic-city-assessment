import * as yup from "yup";

export const getStarsSchema = yup.object({
  count: yup
    .number()
    .typeError("Jumlah harus berupa angka")
    .required("Jumlah bintang wajib diisi")
    .min(1, "Minimal 1 bintang")
    .max(20, "Maksimal 100 bintang"),
  alignment: yup
    .string()
    .oneOf(["left", "center", "right"], "Pilih alignment yang valid")
    .required("Alignment wajib dipilih"),
});
