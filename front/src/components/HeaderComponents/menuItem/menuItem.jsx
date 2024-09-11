'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import styles from '../header.module.scss';

const MenuItem = ({ href, title }) => {
  const pathname = usePathname(); // Получаем текущий путь

  // Обработчик клика
  const handleClick = (e) => {
    if (href === pathname) {
      e.preventDefault(); // Предотвращаем переход на ту же страницу
    }
  };

  return (
    <li key={href}>
      <Link href={href} onClick={handleClick} className={styles.menuItem}>
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;