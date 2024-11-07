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
  DialogActions,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import './product.css'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import { FaLeaf } from 'react-icons/fa'
import { colors } from '../../assets/color'
import { productApi } from '../../apis/product.js'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth.js'
import { orderApi } from '../../apis/order.js'

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
  const [selectedProduct, setSelectedProduct] = React.useState(null)
  const [quantity, setQuantity] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const { user, token, setUser } = useAuth() // Lấy user từ context

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value))
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productApi.getList()
        setProducts(data.products)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }
    fetchData()
  }, [])

  const handleFocus = (index) => {
    setFocusedCardIndex(index)
  }

  const handleBlur = () => {
    setFocusedCardIndex(null)
  }

  const handleClickOpen = (product) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleCreateOrder = async () => {
    if (!user || !token || loading) { // Thêm check loading
      return
    }
  
    setLoading(true)
    try {
      const orderData = {
        user_id: user._id,
        product_id: selectedProduct._id,
        quantity: quantity,
        tea: selectedProduct.tea
      }
  
      await toast.promise(orderApi.create(orderData, token), {
        pending: 'Đang xử lý đơn hàng...',
        success: {
          render({ data }) {
            handleClose()
            setQuantity(1)
            if (data.user?.tea) {
              setUser({
                ...user,
                tea: data.user.tea
              })
            }
            return data.message || 'Đổi quà thành công!'
          }
        },
        error: {
          render({ data }) {
            setLoading(false)
            return data?.message || 'Có lỗi xảy ra khi đổi quà!'
          }
        }
      })
    } catch (error) {
      console.error('Error creating order:', error)
      setLoading(false)
    }
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
                    onClick={() => handleClickOpen(product)}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: colors.linen, color: colors.green }}>Chi tiết sản phẩm</DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.linen, paddingTop: 10 }}>
          {selectedProduct && (
            <Grid item xs={12}>
              <SyledCard>
                <CardMedia
                  component='img'
                  alt='product image'
                  image={selectedProduct.url}
                  sx={{
                    aspectRatio: '16 / 9',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}
                />
                <SyledCardContent>
                  <Typography gutterBottom variant='h6' component='div'>
                    {selectedProduct.name}
                  </Typography>
                  <StyledTypography variant='body2' color='text.secondary' gutterBottom>
                    {selectedProduct.description}
                  </StyledTypography>
                </SyledCardContent>
                <Box sx={{ bottom: 0, pl: 2, pb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <FaLeaf size={20} color={colors.green} />
                    {selectedProduct.tea}
                  </Box>
                </Box>
              </SyledCard>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Box display='flex' justifyContent='space-between' width='100%'>
            <TextField
              label='Số lượng'
              type='number'
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'></InputAdornment>
              }}
              sx={{ mr: 2, width: '80%' }}
              inputProps={{
                min: 1,
                max: 2
              }}
              disabled={loading} // Disable TextField khi loading
            />
            <Button
              sx={{
                color: `${colors.green}`,
                backgroundColor: colors.linen,
                '&:hover': { backgroundColor: colors.green, color: colors.pearl },
                width: '20%'
              }}
              onClick={handleCreateOrder}
              disabled={loading || !user || !token} // Thêm các điều kiện disable
            >
              {loading ? <CircularProgress size={24} /> : 'Đổi quà'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
