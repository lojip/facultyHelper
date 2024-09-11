import styles from './horizontalScroll.module.scss'

const horizontalScrollItem = ({ children, step, patch }) => {
    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.wrapper}>
                <div className={`${patch ? styles.textContent : styles.textContentRight}`}>
                    {Array(step)
                        .fill()
                        .map((_, index) => (
                            <h3 key={index} className={styles.text}>{children}</h3>
                        ))}
                </div>
                <div className={`${patch ? styles.textContent : styles.textContentRight}`}>
                    {Array(step)
                        .fill()
                        .map((_, index) => (
                            <h3 key={index} className={styles.text}>{children}</h3>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default horizontalScrollItem;