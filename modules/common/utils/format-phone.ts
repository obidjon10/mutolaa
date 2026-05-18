export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ];

  return parts.filter(Boolean).join(" ");
}
