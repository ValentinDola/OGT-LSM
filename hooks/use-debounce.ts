import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number):T{
    const [deboucedValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay || 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return deboucedValue;
};