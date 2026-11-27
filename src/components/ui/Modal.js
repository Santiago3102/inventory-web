"use client";

import { useEffect } from "react";
import { CloseIcon } from "./Icons";
import styles from "./Modal.module.css";

/**
 * Centered dialog: eyebrow + title, a body and a footer with the buttons.
 * Closes with Escape, the × button or by clicking the dark background.
 */
export default function Modal({ eyebrow, title, onClose, footer, children }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className={panel ${styles.dialog}} role="dialog" aria-modal="true" aria-label={title}>
        <div className={styles.head}>
          <div>
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h2 className={styles.title}>{title}</h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}