import { useEffect, useRef, useState } from 'react';
import styles from '../header.module.scss'
import MenuItem from '../menuItem/menuItem.jsx';


const burgerMenu = (isMain) => {
	const [active, setActive] = useState(false);
	const menuRef = useRef(null);

	const toggleMenu = () => {
		setActive(!active);
	};

	const handleMenuItemClick = () => {
		setActive(false);
	};


	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setActive(false);
		}
	};


	// Обработчик клика вне области меню
	useEffect(() => {
		if (active) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [active]);


	return (
		<div ref={menuRef} className={styles.menu}>
			<div className={styles.burgerIcon} onClick={toggleMenu}>
				<div className={`${styles.bar} ${active ? styles.openIcon : ''}`}></div>
				<div className={`${styles.bar} ${active ? styles.openIcon : ''}`}></div>
				<div className={`${styles.bar} ${active ? styles.openIcon : ''}`}></div>
			</div>

			<div className={`${styles.burgerMenu} ${active ? styles.openMenu : ''}`} style={isMain ? { position: 'absolute' } : { position: 'fixed' }}>
				<ul className={styles.menuItems}>
					<div onClick={handleMenuItemClick} >
						<MenuItem href="/" title="Главная" />
						<MenuItem href="/quiz" title="Тесты" />
					</div>
				</ul>
			</div>
		</div>
	)
}

export default burgerMenu