'use client'

import { useState, useRef, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import styles from '../../../assets/style/main/main.module.scss'

const typedText = () => {
	const [isVisible, setIsVisible] = useState(false);
	const aboutRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.5 }
		);

		if (aboutRef.current) {
			observer.observe(aboutRef.current);
		}

		return () => {
			if (aboutRef.current) {
				observer.unobserve(aboutRef.current);
			}
		};
	}, [aboutRef]);

	return (
		<section className={styles.about} ref={aboutRef}>
			<div className={styles.container}>
				<h3 className={styles.typedText}>
					{isVisible && (
						<ReactTyped
							strings={[
								"Найди свой идеальный профиль без стресса.",
								"Открой свои возможности – начни с правильного выбора.",
								"Твой путь к успешной карьере начинается здесь!"
							]}
							typeSpeed={50}
							backSpeed={25}
							backDelay={1000}
							startDelay={500}
						/>
					)}
				</h3>
			</div>
		</section>
	)
}

export default typedText