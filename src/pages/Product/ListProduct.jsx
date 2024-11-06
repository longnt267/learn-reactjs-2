import {
  Container,
  Grid,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Box,
  AvatarGroup,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@mui/material'
import './product.css'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import { FaLeaf } from 'react-icons/fa'
import { colors } from '../../assets/color'
import { productApi } from '../../apis/product.js'

const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description:
      'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ]
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    tag: 'Product',
    title: 'Innovative product features that drive success',
    description:
      'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
    authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }]
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    tag: 'Design',
    title: 'Designing for the future: trends and insights',
    description:
      'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
    authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }]
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    tag: 'Company',
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }]
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Engineering',
    title: 'Pioneering sustainable engineering solutions',
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' }
    ]
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    tag: 'Product',
    title: 'Maximizing efficiency with our latest product updates',
    description:
      'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
    authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }]
  }
]

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px'
  }
}))

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16
  }
})

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

export const ListProduct = () => {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productApi.getList()
        setProducts(data.products)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }
    console.log(products)
    fetchData()
  }, [])

  const handleFocus = (index) => {
    setFocusedCardIndex(index)
  }

  const handleBlur = () => {
    setFocusedCardIndex(null)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container className='list-product-container'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div>
          <Typography variant='h1' gutterBottom>
            Quà bánh tùm lum á
          </Typography>
          <Typography variant='h5'>
            Dùng <FaLeaf /> để đổi nha
          </Typography>
        </div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            alignItems: { xs: 'start', md: 'center' },
            gap: 4,
            overflow: 'auto'
          }}
        ></Box>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={6} key={index}>
              <SyledCard
                variant='outlined'
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={index}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
                sx={{ backgroundColor: colors.pearl }}
              >
                <CardMedia
                  component='img'
                  alt='product image'
                  image={product.url}
                  sx={{
                    aspectRatio: '16 / 9',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}
                />
                <SyledCardContent>
                  <Typography gutterBottom variant='h6' component='div'>
                    {product.name}
                  </Typography>
                  <StyledTypography variant='body2' color='text.secondary' gutterBottom>
                    {product.description}
                  </StyledTypography>
                </SyledCardContent>
                <Box sx={{ bottom: 0, pl: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <FaLeaf size={20} color={colors.green} />
                    {product.tea}
                  </Box>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={handleClickOpen}
                    sx={{
                      mb: 1,
                      mr: 1,
                      color: `${colors.green}`,
                      '&:hover': { border: '1px solid #60b17d', backgroundColor: colors.green, color: colors.pearl }
                    }}
                  >
                    Lụm luôn
                  </Button>
                </Box>
              </SyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries(formData.entries())
            const email = formJson.email
            console.log(email)
            handleClose()
          }
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
