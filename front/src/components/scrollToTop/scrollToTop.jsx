'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0); // Прокручиваем страницу на самый верх
  }, [pathname]); // Срабатывает при каждом изменении пути

  return null; // Этот компонент не должен ничего рендерить
}