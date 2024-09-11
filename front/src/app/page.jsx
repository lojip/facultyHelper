'use client'

import styles from '../assets/style/main/main.module.scss'
import HorizontalScroll from '@/components/mainPageComponents/horizontalScroll/horizontalScroll';
import TypedText from '@/components/mainPageComponents/typedText/typedText';
import StaticText from '@/components/mainPageComponents/staticText/staticText';

export default function Home() {
  return (
    <main
      className={styles.main}
    >
      <StaticText />
      <HorizontalScroll />
      <TypedText />
    </main>
  );
}