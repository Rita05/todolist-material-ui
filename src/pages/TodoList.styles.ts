
import { SxProps } from '@mui/material'


export const filterButtonContainerSX: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}

export const getListItemSX = (isCompleted: boolean): SxProps => ({
    p: 0,
    justifyContent: "space-between",
    textDecoration: isCompleted ? 'line-through' : '',
    opacity: isCompleted ? '0.5' : ''
})

export const getAddFormIconSx = (): SxProps => ({
    width: '40px',
    height: '40px'
})