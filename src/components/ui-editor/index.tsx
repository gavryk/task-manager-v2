import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@tiptap/extension-link';

interface TaskEditorProps {
	value: string;
	onChange: (value: string) => void;
}

export const UIEditor: React.FC<TaskEditorProps> = ({ value, onChange }) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [3],
				},
			}),
			Link.configure({
				openOnClick: true,
				linkOnPaste: true,
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || '');
		}
	}, [value, editor]);

	if (!editor) return null;

	const setParagraph = () => {
		editor.chain().focus().setParagraph().run();
	};

	const setHeading3 = () => {
		editor.chain().focus().toggleHeading({ level: 3 }).run();
	};

	const toggleLink = () => {
		const hasLink = editor.isActive('link');
		if (hasLink) {
			editor.chain().focus().unsetLink().run();
			return;
		}
		const previousUrl = editor.getAttributes('link').href as string | undefined;
		const url = window.prompt('Enter URL', previousUrl || 'https://');

		if (!url) return;

		editor.chain().focus().setLink({ href: url }).run();
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.toolbar}>
				<button
					type="button"
					onClick={setParagraph}
					className={`${styles.toolbarButton} ${
						editor.isActive('paragraph') ? styles.toolbarButtonActive : ''
					}`}
				>
					P
				</button>
				<button
					type="button"
					onClick={setHeading3}
					className={`${styles.toolbarButton} ${
						editor.isActive('heading', { level: 3 }) ? styles.toolbarButtonActive : ''
					}`}
				>
					H3
				</button>
				<button
					type="button"
					onClick={toggleLink}
					className={`${styles.toolbarButton} ${
						editor.isActive('link') ? styles.toolbarButtonActive : ''
					}`}
				>
					Link
				</button>
			</div>

			<EditorContent editor={editor} className={styles.editor} />
		</div>
	);
};
