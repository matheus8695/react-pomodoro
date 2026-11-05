import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

type AvailableThemes = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>("dark");

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a
        href="#"
        className={styles.menuLink}
        aria-label="Ir para a Home"
        title="Ir para a Home"
      >
        <HouseIcon />
      </a>

      <a
        href="#"
        className={styles.menuLink}
        aria-label="Ir para o Historico"
        title="Ir para o Historico"
      >
        <HistoryIcon />
      </a>

      <a
        href="#"
        className={styles.menuLink}
        aria-label="Ir para o Configuracoes"
        title="Ir para o Configuracoes"
      >
        <SettingsIcon />
      </a>

      <a
        href="#"
        className={styles.menuLink}
        aria-label="Mudar tema"
        title="Mudar tema"
        onClick={handleThemeChange}
      >
        <SunIcon />
      </a>
    </nav>
  );
}
