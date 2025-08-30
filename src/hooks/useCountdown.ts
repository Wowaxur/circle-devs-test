import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountdown(seconds: number, onFinish?: () => void) {
    const [left, setLeft] = useState(seconds);
    const timerRef = useRef<number | null>(null);

    const clear = useCallback(() => {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
    }, []);

    useEffect(() => {
        setLeft(seconds);
        clear();
        timerRef.current = window.setInterval(() => {
            setLeft((s) => {
                if (s <= 1) {
                    clear();
                    onFinish?.();
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        return clear;
    }, [seconds, onFinish, clear]);

    return left;
}