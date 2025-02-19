import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, InputBase, Paper, Typography } from '@mui/material'
import { colors } from '../theme'

const CustomInput = ({ isIconActive, label, placeholder, setShowPassword, showPassword, ...props }) => {
  return (
    <Box display='flex' flexDirection='column' alignContent='center' justifyContent='flex-start' mb={2}>
      <Box display='flex' flexDirection='column' justifyContent='flex-start'>
        <Typography color='white' pb={1}>
          {label}
        </Typography>

        <Paper
          sx={{
            background: colors.input[500],
            width: '100%'
          }}
        >
          <InputBase
            {...props}
            placeholder={placeholder}
            fullWidth
            sx={{
              bgcolor: colors.input[500],
              p: 1,
              borderRadius: '5px'
            }}
            endAdornment={
              isIconActive && (
                <InputAdornment position='end' sx={{ pr: 1 }}>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default CustomInput
