import * as React from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

type Task = { id: string; order: number };

type Params<T extends Task> = {
	tasksFromProps: T[];
	canManage: boolean;
	onMoveTask: (params: { taskId: string; toIndex: number }) => Promise<void>;
};

const sortByOrder = <T extends Task>(arr: T[]) => [...arr].sort((a, b) => a.order - b.order);

export function useUserTasksDnD<T extends Task>({
	tasksFromProps,
	canManage,
	onMoveTask,
}: Params<T>) {
	const [tasks, setTasks] = React.useState<T[]>(() => sortByOrder(tasksFromProps));
	const [isSaving, setIsSaving] = React.useState(false);

	React.useEffect(() => {
		if (isSaving) return;
		setTasks(sortByOrder(tasksFromProps));
	}, [tasksFromProps, isSaving]);

	const taskIds = React.useMemo(() => tasks.map((t) => t.id), [tasks]);

	const queuedMoveRef = React.useRef<null | { taskId: string; toIndex: number }>(null);

	const runMove = React.useCallback(
		async (move: { taskId: string; toIndex: number }) => {
			setIsSaving(true);
			try {
				await onMoveTask(move);
			} finally {
				setIsSaving(false);
			}
		},
		[onMoveTask],
	);

	const flushQueueIfAny = React.useCallback(async () => {
		const queued = queuedMoveRef.current;
		if (!queued) return;
		queuedMoveRef.current = null;
		await runMove(queued);
		await flushQueueIfAny();
	}, [runMove]);

	const handleDragEnd = React.useCallback(
		async (event: DragEndEvent) => {
			if (!canManage) return;

			const { active, over } = event;
			if (!over) return;
			if (active.id === over.id) return;

			const oldIndex = taskIds.indexOf(String(active.id));
			const newIndex = taskIds.indexOf(String(over.id));
			if (oldIndex < 0 || newIndex < 0) return;

			// optimistic UI
			setTasks((prev) => arrayMove(prev, oldIndex, newIndex));

			const move = { taskId: String(active.id), toIndex: newIndex };

			if (isSaving) {
				queuedMoveRef.current = move;
				return;
			}
			try {
				await runMove(move);
			} catch (e) {
				console.error(e);
			} finally {
				await flushQueueIfAny();
			}
		},
		[canManage, taskIds, isSaving, runMove, flushQueueIfAny],
	);

	return { tasks, taskIds, handleDragEnd, isSaving };
}
