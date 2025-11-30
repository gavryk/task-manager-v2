import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ITaskTypes } from '@/common';

interface TaskModalProps {
	open: boolean;
	task: ITaskTypes | null;
	onClose: () => void;
	onSubmit: (data: { title: string; description: string }) => void;
}

export const UIModal: React.FC<TaskModalProps> = ({ open, task, onClose, onSubmit }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description || '');
		} else {
			setTitle('');
			setDescription('');
		}
	}, [task, open]);

	if (!open) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ title: title.trim(), description: description.trim() });
	};

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<h3>{task ? 'Edit task' : 'Create task'}</h3>
				</div>
				<form onSubmit={handleSubmit} className={styles.body}>
					<label className={styles.field}>
						<span>Title</span>
						<input value={title} onChange={(e) => setTitle(e.target.value)} required />
					</label>
					<label className={styles.field}>
						<span>Description</span>
						<textarea value={description} onChange={(e) => setDescription(e.target.value)} />
					</label>
					<div className={styles.footer}>
						<button type="button" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" disabled={!title.trim()}>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
