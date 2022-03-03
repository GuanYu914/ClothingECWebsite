import { useEffect, useRef } from "react";

// 回傳前一個狀態
export default function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}