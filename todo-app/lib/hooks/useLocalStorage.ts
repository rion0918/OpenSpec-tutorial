'use client';

import { useState } from 'react';

/**
 * ローカルストレージと同期する状態管理フック
 * @param key ローカルストレージのキー
 * @param initialValue 初期値
 * @returns [状態, 状態更新関数, エラー]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, Error | null] {
  const [error, setError] = useState<Error | null>(null);

  // 初期値をローカルストレージから読み込む
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(`Error loading ${key} from localStorage:`, err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return initialValue;
    }
  });

  // 値の更新とローカルストレージへの保存
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 関数の場合は現在の値を引数に呼び出す
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // ローカルストレージに保存
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      setError(null);
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err);
      
      // QuotaExceededError のチェック
      if (err instanceof DOMException && err.name === 'QuotaExceededError') {
        setError(new Error('ローカルストレージの容量を超えました。古いデータを削除してください。'));
      } else {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    }
  };

  return [storedValue, setValue, error];
}

