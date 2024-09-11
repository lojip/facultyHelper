import HorizontalScrollItem from "../horizontalScrollItem/horizontalScrollItem.jsx"
import styles from '../../../assets/style/main/main.module.scss'

const horizontalScroll = () => {
	return (
		<>
			<section className={styles.horizontalScroll}>
				<HorizontalScrollItem step={10} patch={true}>Faculty</HorizontalScrollItem>
				<HorizontalScrollItem step={10} patch={false}>helper</HorizontalScrollItem>
			</section>
		</>
	)
}

export default horizontalScroll