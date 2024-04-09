import { MouseEvent } from "react"

type ButtonPropsType = {
	title: string
	className?: string
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	isDisabled?: boolean
}

export const Button = (props: ButtonPropsType) => {
	const {
		title,
		onClick,
		isDisabled,
		className
	} = props;
	return (
		<button
			className={className}
			onClick={onClick}
			disabled={isDisabled}
		>
			{title}
		</button>
	)

}