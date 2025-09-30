import styles from "./styles.module.scss";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default MainLayout;
