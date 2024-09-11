import styles from '../../../assets/style/main/main.module.scss'
import Link from 'next/link'

const staticText = () => {
	return (
		<section className={styles.sectionMain}>
			<div className={styles.wrapper}>
				<h1>
					Faculty Helper
				</h1>
				<div className={styles.buttonContainer}>
					<Link href="/quiz" className={styles.button}>Начать</Link>
				</div>
			</div>
		</section>
	)
}

export default staticText