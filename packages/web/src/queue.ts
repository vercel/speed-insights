export const initQueue = (): void => {
  // initialize va until script is loaded
  if (window.si) return;

  window.si = function a(...params): void {
    (window.siq = window.siq || []).push(params);
  };
};
