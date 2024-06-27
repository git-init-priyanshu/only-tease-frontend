import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatUnits, parseUnits } from 'viem';
import Big from 'big.js';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const toastStyles = {
  style: {
    boxShadow: '0px 4px 4px 0px #00000040',
    background: '#000000',
    color: '#cdb9e8',
  },
  iconTheme: {
    primary: '#bf25e9',
    secondary: '#FFFAEE',
  },
};
export const shortenAddress = (
  address: string,
  trimLength?: number
): string => {
  const l = address.length;
  const _trimlength = trimLength || 3;
  return `${address.slice(0, _trimlength || 3)}..${address.slice(
    l - _trimlength,
    l - 0
  )}`;
};

export const scale = (
  number: string | bigint | number,
  decimals: string | bigint | number
) => {
  return parseUnits(
    Big(number.toString()).toFixed(Number(decimals), 0),
    Number(decimals)
  );
};

export const scaleDown = (
  number: string | bigint | number,
  decimals: string | bigint | number
) => {
  return formatUnits(BigInt(number), decimals as number);
};
