import Link from "next/link";
import styles from "./PageHeader.module.css";

/**
 * Top of every page: optional "← back" link, small uppercase label, big title,
 * and whatever is passed as children on the right (buttons, numbers...).
 */
export default function PageHeader({ eyebrow, title, backHref, backLabel = "Volver al listado", children }) {
  return (
    <header>
      {backHref && (
        <Link href={backHref} className={styles.back}>
          ← {backLabel}
        </Link>
      )}
      <div className={styles.row}>
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className={styles.title}>{title}</h1>
        </div>
        {children}
      </div>
    </header>
  );
}