
import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles';


export const statusButtonsGroupSX: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}

export const getListItemSX = (isCompleted: boolean): SxProps => ({
    p: 0,
    position: 'relative',
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    textDecoration: isCompleted ? 'line-through' : '',
    opacity: isCompleted ? '0.5' : '',
    columnGap: '1.5rem',
    height: '4rem',
    borderBottomWidth: '1px',
    borderBottom: `1px solid rgb(108, 99, 255)`,
})

export const getAddFormButtonSX = (theme: Theme): SxProps => ({
    padding: 0,
    paddingLeft: '4px',
    top: '-2px',
    color: theme.palette.primary.main
})

export const getAddFormIconSX = (): SxProps => ({
    width: '40px',
    height: '40px'
})

export const inputAddItemFormSX: SxProps = {
    '& .MuiInputLabel-root': {
        top: '-5px'
    },

    '& .MuiOutlinedInput-root': {
        height: '30px'
    }
}