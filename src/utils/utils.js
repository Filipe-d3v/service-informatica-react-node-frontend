

export function formatBalance(value) {
  const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
  });

  return formatter.format(Number(value));
};