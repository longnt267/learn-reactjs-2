import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { FaLeaf } from 'react-icons/fa'

const TitleBox = () => {
  return (
    <Grid xs={0} sm={0} md={6} lg={6} xl={6} minHeight={550}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 255, 60, 0.3) , rgba(0, 157, 255, 0.3))`,
          padding: '20px',
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex'
          },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          borderRadius: '0px 30px 30px 0'
        }}
      >
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start'>
          <Typography variant='h4' fontWeight='bold' color='whitesmoke' mb={3}>
            Join Our <br />
            <FaLeaf size={30} /> system
          </Typography>
          <Typography variant='body1' fontWeight='' color='whitesmoke'>
            Use your <FaLeaf size={15} /> to redeem gifts or not, it's up to you.
          </Typography>
          <Typography variant='body1' fontWeight='' color='whitesmoke'>
            I don't care. Give me <FaLeaf size={15} />, right now.
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default TitleBox
