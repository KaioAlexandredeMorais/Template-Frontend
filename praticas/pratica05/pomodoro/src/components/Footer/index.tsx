import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href=''>Vai fazendo suas tarefas aí 👌</a>
      <a href=''>
        {/* O &copy; vira © e o JS traz o ano atual dinamicamente! */}
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com suor 💀
      </a>
    </footer>
  );
}