import { styled } from '@mui/material/styles'

//components/mui
import Button from '@mui/material/Button'

type MenuButtonProps = {
    isActive: boolean
}

export const StatusButton = styled(Button)<MenuButtonProps>(({ isActive }) => ({

    color: isActive ? '#3e399e' : '',
    fontWeight: 700
}))