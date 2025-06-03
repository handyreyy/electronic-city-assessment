export function numberToWords(n: number): string {
  const MAX_VALUE = 999_000_000_000_000; // 999 Triliun

  if (n === 0) return "nol";
  if (n > MAX_VALUE) return "Nominal terlalu besar";

  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];

  function inWords(num: number): string {
    if (num < 12) return satuan[num];
    if (num < 20) return satuan[num - 10] + " belas";
    if (num < 100)
      return satuan[Math.floor(num / 10)] + " puluh " + satuan[num % 10];
    if (num < 200) return "seratus " + inWords(num - 100);
    if (num < 1000)
      return satuan[Math.floor(num / 100)] + " ratus " + inWords(num % 100);
    if (num < 2000) return "seribu " + inWords(num - 1000);
    if (num < 1_000_000)
      return inWords(Math.floor(num / 1000)) + " ribu " + inWords(num % 1000);
    if (num < 1_000_000_000)
      return (
        inWords(Math.floor(num / 1_000_000)) +
        " juta " +
        inWords(num % 1_000_000)
      );
    if (num < 1_000_000_000_000)
      return (
        inWords(Math.floor(num / 1_000_000_000)) +
        " milyar " +
        inWords(num % 1_000_000_000)
      );
    if (num < 1_000_000_000_000_000)
      return (
        inWords(Math.floor(num / 1_000_000_000_000)) +
        " triliun " +
        inWords(num % 1_000_000_000_000)
      );

    return "";
  }

  return inWords(n).replace(/\s+/g, " ").trim();
}
