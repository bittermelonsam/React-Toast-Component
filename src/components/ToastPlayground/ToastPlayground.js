import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  const handleDismiss = (id) => {
    setToasts(
      toasts.filter((toast) => {
        return toast.id !== id;
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />

      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          setMessage('');
          setToasts([...toasts, { variant, message, id: crypto.randomUUID() }]);
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              style={{ resize: 'none' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    type="radio"
                    id={id}
                    key={id}
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
