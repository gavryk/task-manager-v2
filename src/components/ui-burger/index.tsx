import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

interface BurgerTypes {
	mobileMenuActive: boolean;
	handlerClick: (val: boolean) => void;
}

export const UIBurger: React.FC<BurgerTypes> = ({ mobileMenuActive, handlerClick }) => {
	return (
		<div
			className={clsx(styles.root, { [styles.active]: mobileMenuActive })}
			onClick={() => handlerClick(!mobileMenuActive)}
		>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};
