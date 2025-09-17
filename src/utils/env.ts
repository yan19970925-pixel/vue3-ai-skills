export const isDevMode = () => {
  const dev = import.meta.env.VITE_DEV
  if (dev && dev === 'true') {
    return true
  } else {
    return false
  }
}
export const isMock = import.meta.env.VITE_IS_MOCK === 'true'
