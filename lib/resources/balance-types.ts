type AmountType = {
  amount: number;
  currency: 'BRL';
}

export type BalanceType = {
  unavailable: AmountType;
  future: AmountType;
  current: AmountType;
};