'use client';

import styles from '../header.module.scss';
import Image from 'next/image';
import BurgerMenu from '../burgerMenu/burgerMenu';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function header() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();


  // Обработчик прокрутки для главной страницы
  useEffect(() => {
    if (pathname === '/') {
      if (window.scrollY == 0) {
        setIsVisible(false);
      }
      // Проверяем, если это главная страница
      const handleScroll = () => {
        if (window.scrollY > 45) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Очистка обработчика прокрутки при размонтировании компонента
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // На других страницах шапка всегда видима
      setIsVisible(true);
    }
  }, [pathname]);

  return (
    <div>
      {/* Добавляем условный класс для видимости шапки */}
      <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.wrapper}>
          <Image src="/logo.svg" alt="logo" width={360} height={40} priority />

          <BurgerMenu isMain={false} />
        </div>
      </header>
    </div>
  );
}