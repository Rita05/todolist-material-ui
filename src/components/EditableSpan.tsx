import { ChangeEvent, useState } from "react";

//components/mui
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
	title: string
	onChange: (title: string) => void
	className?: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
	const { title, onChange } = props;
	const [isEdit, setIsEdit] = useState<boolean>();
	const [inputTitle, setInputTitle] = useState(title);

	const handleEditMode = () => {
		setIsEdit(!isEdit);
		if (isEdit) {
			handleUpdateTitle();
		}
	}

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setInputTitle(event.currentTarget.value);
	}

	const handleUpdateTitle = () => {
		onChange(inputTitle);
	}

	return (
		<>
			{
				isEdit
					?
					< TextField
						label={'Enter task'}
						variant={'outlined'}
						value={inputTitle}
						size={'small'}
						onChange={handleChangeInput}
						onBlur={handleEditMode}
						autoFocus
						InputLabelProps={{
							sx: {
								top: '-5px',
							}
						}}

					/>
					: <span onDoubleClick={handleEditMode}>{title}</span>
			}
		</>
	)
}
