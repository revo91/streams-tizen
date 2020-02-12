import { useEffect } from 'react';

export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useWindowResize = (callback) => {
  return useWindowEvent('resize', callback)
}
export const useWindowKeydown = (callback) => {
  return useWindowEvent('keydown', callback)
}