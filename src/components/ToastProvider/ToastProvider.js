import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  function clearToasts() {
    setToasts([]);
  }

  return (
    <ToastContext.Provider
      value={{ toasts, createToast, dismissToast, clearToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
