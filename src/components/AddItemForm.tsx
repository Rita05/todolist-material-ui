import { ChangeEvent, KeyboardEvent, useState } from "react";

//components
import { Button } from "../elements/ui/Button";
import { Input } from "../elements/ui/Input";


//styles
import s from './AddItemForm.module.css';

export type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
	const [inputValue, setInputValue] = useState('');
	const [errors, setErrors] = useState<Array<string> | []>([]);

	const inputItemLength = inputValue.length;

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.currentTarget.value);
	}

	const handleAddItem = () => {
		const trimmedTaskValue = inputValue.trim();
		if (trimmedTaskValue !== '') {
			addItem(inputValue.trim());
		} else {
			setErrors(['This field is required']);
		};
		setInputValue('');
	}


	const handleAddItemOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		setErrors([]);
		if (event.key === 'Enter' && inputItemLength) {
			handleAddItem();
		}
	}

	return (
		<div>
			<Input
				className={errors.length > 0 ? s.error : ''}
				placeholder={'Enter task'}
				value={inputValue}
				onChange={handleInputChange}
				onKeyUp={handleAddItemOnKeyUp}
			/>
			<Button title={'+'} onClick={handleAddItem} isDisabled={errors.length > 0} />
			<div>
				{errors.length > 0 && (
					errors.map((error) => (
						<div className={s.errorMessage}>{error}</div>
					))
				)}
			</div>
		</div>
	)
}

