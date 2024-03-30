import { useState, useEffect, useCallback } from 'react';
export default function useAsync(fn) {
    const [state, set] = useState({
        loading: true,
    });
    const callback = useCallback(() => {
        fn().then(value => {
            set({
                loading: false,
                data: value,
            });
        }, error => {
            set({
                loading: false,
            });
            console.error(error);
        });
    }, [fn]);
    useEffect(() => {
        callback();
    }, [callback]);
    return state;
}
//# sourceMappingURL=useAsync.js.map