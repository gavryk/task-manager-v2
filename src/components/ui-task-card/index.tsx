import React from 'react';
import styles from './styles.module.scss';
import { ITaskTypes } from '@/common';
import { UIIcon } from '@/components';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
	task: ITaskTypes;
	onEdit?: () => void;
	onUncheck?: () => void;
}

export const UITaskCard: React.FC<Props> = ({ task, onEdit, onUncheck }) => {
	const me = useSelector((state: RootState) => state.auth.user);
	const isAdmin = me?.role === 'ADMIN';
	const isOwner = !!me?.id && me.id === task.userId;
	const canManage = isAdmin || isOwner;

	return (
		<div className={clsx(styles.root, { [styles.done]: task.status === 'DONE' })}>
			<div className={styles.top}>
				<div className={styles.title}>{task.title}</div>
				<div className={styles.actions}>
					{onEdit && canManage && (
						<button className={styles.iconBtn} onClick={onEdit} type="button">
							<UIIcon name="FaPen" library="fa" size={14} color="#208d88" />
						</button>
					)}

					{onUncheck && canManage && (
						<button className={styles.iconBtn} onClick={onUncheck} type="button">
							<UIIcon name="FiRotateCcw" library="fi" size={16} color="#d3c71f" />
						</button>
					)}
				</div>
			</div>

			{task.description && (
				<div className={styles.desc} dangerouslySetInnerHTML={{ __html: task.description }} />
			)}

			<div className={styles.footer}>
				<span className={styles.dev}>{task.users?.name}</span>
				<span className={styles.badge}>COMPLETE</span>
			</div>
		</div>
	);
};
