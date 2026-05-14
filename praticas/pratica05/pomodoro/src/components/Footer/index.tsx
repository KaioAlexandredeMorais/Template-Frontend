import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro/'>
        Entenda como funciona a técnica
      </RouterLink>
      <RouterLink href='/home'>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com Vite TypeScript
      </RouterLink>

    </footer>
  );
}
