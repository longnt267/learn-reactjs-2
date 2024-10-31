import { Box, ThemeProvider } from '@mui/material'
import { theme } from '../theme'

const MainLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(https://i.postimg.cc/q76rVqtf/1600w-fp-JFOdu-K3w4.webp)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  )
}

export default MainLayout
