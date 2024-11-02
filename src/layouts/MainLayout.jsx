import { Box, ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { theme } from '../theme'
import SigninPage from '../components/SigninPage'
import TitleBox from '../components/TitleBox'

const MainLayout = () => {
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
        <Box
          sx={{
            width: {
              sm: '90vw',
              xs: '90vw',
              md: '60vw',
              lg: '60vw',
              xl: '60vw'
            }
          }}
        >
          {/* GRID SYSTEM */}
          <Grid container height='90vh'>
            <SigninPage />

            <TitleBox />
          </Grid>
          {/* GRID SYSTEM END */}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default MainLayout
