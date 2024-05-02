import { styled } from '@mui/material/styles'

//components/mui
import Button from '@mui/material/Button'

type StatusButtonProps = {
    isActive: boolean
}

export const StatusButton = styled(Button)<StatusButtonProps>(({ isActive }) => ({
    color: isActive ? '#3e399e' : '',
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1.5rem',
    fontSize: '0.875rem',
    textTransform: 'capitalize',
}))