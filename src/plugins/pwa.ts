export const setupPWA = async () => {
    if ('serviceWorker' in navigator) {
        if (['1', 'true'].includes(import.meta.env.VITE_PWA))
            await navigator.serviceWorker.register('/sw.js')
    }
}
