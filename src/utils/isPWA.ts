export const isPWA = () => 'serviceWorker' in navigator && window.matchMedia('(display-mode: standalone)').matches
