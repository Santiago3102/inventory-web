"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAlerts } from "@/context/AlertsContext";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Inventario", match: (path) => path === "/" || path.startsWith("/products") },
  { href: "/alerts", label: "Alertas", match: (path) => path.startsWith("/alerts"), showBadge: true },
  { href: "/history", label: "Movimientos", match: (path) => path.startsWith("/history") },
];

export default function Navbar() {
  const pathname = usePathname();
  const { alerts } = useAlerts();

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark}>IS</span>
          Inventario Simple
        </Link>
        <nav className={styles.links}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={${styles.link} ${link.match(pathname) ? styles.active : ""}}
            >
              {link.label}
              {link.showBadge && alerts.length > 0 && <span className={styles.badge}>{alerts.length}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}