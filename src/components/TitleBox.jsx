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
            Tham gia hệ thống<br />
            <FaLeaf size={30} /> của chúng tôi 
          </Typography>
          <Typography variant='body1' fontWeight='' color='whitesmoke'>
            Sử dụng <FaLeaf size={15} /> của bạn để đổi quà hoặc không, tùy bạn.
          </Typography>
          <Typography variant='body1' fontWeight='' color='whitesmoke'>
            Tôi đếch quan tâm. Đưa <FaLeaf size={15} /> cho tôi ngay!!!.
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default TitleBox
