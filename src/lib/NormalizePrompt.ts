export function normalizeTo100(obj: { [key: string]: number }) {
  const total = Object.values(obj).reduce((acc, v) => acc + v, 0); // SOMA TUDO PESO

  const normalized = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const percent = (value / total) * 100;
      return [key, Math.round(percent)];
    })
  );

  // Ajustar possíveis erros de arredondamento (soma != 100)
  const diff = 100 - Object.values(normalized).reduce((a, b) => a + b, 0);
  if (diff !== 0) {
    // cometer o ajuste no maior peso (mais estável)
    const biggestKey = Object.entries(normalized).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
    normalized[biggestKey] += diff;
  }

  return normalized;
}
