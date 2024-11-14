import { Box, Card, CardContent, Container, TablePagination, Typography } from '@mui/material'
import './Order.css'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { colors } from '../../assets/color'
import { LineChart } from '@mui/x-charts'
import { FaLeaf } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { orderApi } from '../../apis/order.js'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.green,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

export const Order = () => {
  const [orders, setOrders] = React.useState([])
  const [paginate, setPaginate] = React.useState({})
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const { user, token } = useAuth()

  const fetchData = async (pageNumber, limit) => {
    try {
      console.log(pageNumber)
      const response = await orderApi.getListByUser(token, {
        page: pageNumber + 1, // BE page bắt đầu từ 1
        limit: limit
      })
      const { orders, count, totalPage } = response
      setOrders(orders)
      setPaginate({
        count: count, // Tổng số items
        totalPage
      })
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  // Xử lý khi thay đổi page
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Xử lý khi thay đổi số lượng items mỗi trang
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(newRowsPerPage)
    setPage(0) // Reset về trang đầu tiên
    fetchData(0, newRowsPerPage)
  }

  React.useEffect(() => {
    console.log('page', page)
    fetchData(page, rowsPerPage)
  }, [page])
  return (
    <Container
      className='order'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt: '100px'
      }}
    >
      <Container
        sx={{
          backgroundColor: colors.linen,
          pt: 20,
          pb: 10,
          borderRadius: '12px',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, pt: 5 }}>
          <h1>Hãy xem mình đã mukbang những gì nhé</h1>
        </Box>
        <Box sx={{ mb: 10, display: 'flex' }}>
          <Card sx={{ flex: 1, mr: 3 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                <h3>Thống kê calo mukbang trong tuần</h3>
              </Typography>
              <div className='w-full'>
                <LineChart
                  dataset={[
                    { day: 'Thứ 2', calories: 2100 },
                    { day: 'Thứ 3', calories: 2300 },
                    { day: 'Thứ 4', calories: 2000 },
                    { day: 'Thứ 5', calories: 2400 },
                    { day: 'Thứ 6', calories: 1900 },
                    { day: 'Thứ 7', calories: 2200 },
                    { day: 'Chủ nhật', calories: 2500 }
                  ]}
                  xAxis={[
                    {
                      dataKey: 'day',
                      scaleType: 'point'
                    }
                  ]}
                  series={[
                    {
                      dataKey: 'calories',
                      label: 'Calo',
                      valueFormatter: (value) => `${value} kcal`,
                      area: true,
                      color: colors.solarStorm
                    }
                  ]}
                  height={300}
                />
              </div>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, ml: 3 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                <h3>Thông tin mukbang</h3>
              </Typography>
              <Table aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align='right'></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component='th' scope='row'>
                      Số lượng sản phẩm đã múc (Sản phẩm)
                    </StyledTableCell>
                    <StyledTableCell align='right'>10</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component='th' scope='row'>
                      Số lượng calo đã múc (Calo)
                    </StyledTableCell>
                    <StyledTableCell align='right'>1000</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component='th' scope='row'>
                      Số lượng tea đã tiêu ( <FaLeaf size={13} color={colors.green} /> )
                    </StyledTableCell>
                    <StyledTableCell align='right'>{user.tea}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
        <Card>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary' }}>
              <h3>Thông tin sản phẩm đã mukbang</h3>
            </Typography>
          </CardContent>
          <TableContainer component={Paper} sx={{ height: 'fit-content' }}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>STT</StyledTableCell>
                  <StyledTableCell>Tên mukbang</StyledTableCell>
                  <StyledTableCell align='center'>Số lượng</StyledTableCell>
                  <StyledTableCell align='center'>
                    <FaLeaf size={12} />
                  </StyledTableCell>
                  <StyledTableCell align='right'>Trạng thái</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row, index) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align='center'>{page * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell component='th' scope='row'>
                      {row?.product?.name}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{row.quantity}</StyledTableCell>
                    <StyledTableCell align='center'>{row.totalTea}</StyledTableCell>
                    <StyledTableCell align='right'>{row.status}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component='div'
            count={paginate.count}
            rowsPerPage={rowsPerPage}
            page={page}
            totalPage={paginate.totalPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Container>
  )
}
