import * as yup from "yup";

export const formDataSchema = yup.object({
  name: yup.string().required("Nama wajib diisi"),
  birthdate: yup.date().nullable(),
  phone: yup
    .string()
    .required("Nomor HP wajib diisi")
    .matches(/^\+62\d{9,}$/, "Minimal 9 digit angka"),
  address: yup.string().required("Alamat wajib diisi"),
  province: yup.string().required("Provinsi wajib dipilih"),
  city: yup.string().required("Kota wajib dipilih"),
  state: yup.string().required("Negara wajib dipilih"),
  photo: yup.mixed().nullable(),
});
