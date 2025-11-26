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

	return <div>UIModal</div>;
};
