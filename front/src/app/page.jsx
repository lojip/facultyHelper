'use client'; // Делает компонент клиентским

import styles from '../assets/style/main/main.module.scss';
import HorizontalScroll from '@/components/mainPageComponents/horizontalScroll/horizontalScroll';
import TypedText from '@/components/mainPageComponents/typedText/typedText';
import StaticText from '@/components/mainPageComponents/staticText/staticText';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Определите ваши анимации здесь
const pageTransition = {
  initial: { opacity: 0, scale: 0.9, y: 5 }, // Начальное состояние с масштабом и смещением
  enter: { opacity: 1, scale: 1, y: 0 }, // Конечное состояние
  exit: { opacity: 0, scale: 1.1, y: -5 } // Состояние при выходе с эффектом увеличения
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false); // Для управления монтированием компонента

  useEffect(() => {
    setIsMounted(true); // Устанавливаем состояние после первого монтирования
  }, []);

  return (
    <main className={styles.main}>
      {isMounted && ( // Проверяем, смонтирован ли компонент
        <motion.div
          className={styles.pageContainer}
          variants={pageTransition}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }} // Настройка длительности и плавности анимации
        >
          <StaticText />
          <HorizontalScroll />
          <TypedText />
        </motion.div>
      )}
      <div className={styles.transitionBackground} /> {/* Фоновый элемент для анимации */}
    </main>
  );
}