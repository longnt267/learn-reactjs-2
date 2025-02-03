import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import Confetti from 'react-confetti'; // Import thư viện confetti
import { Wheel } from 'react-custom-roulette';
import './App.css';
import { authApi } from '../apis/auth';  // Import authApi

const data = [
  { option: '10k', style: { backgroundColor: '#FF5722', textColor: 'black' } },
  { option: '50k', style: { backgroundColor: '#4CAF50', textColor: 'white' } },
  { option: '10k', style: { backgroundColor: '#FF5722', textColor: 'black' } },
  { option: '100k', style: { backgroundColor: '#FFA500', textColor: 'black' } },
  { option: '10k', style: { backgroundColor: '#FF5722', textColor: 'black' } },
  { option: '20k', style: { backgroundColor: '#2196F3', textColor: 'white' } },
  { option: '10k', style: { backgroundColor: '#FF5722', textColor: 'black' } },
  { option: '20k', style: { backgroundColor: '#2196F3', textColor: 'white' } },
  { option: '50k', style: { backgroundColor: '#4CAF50', textColor: 'white' } },
  { option: '20k', style: { backgroundColor: '#2196F3', textColor: 'white' } },
  { option: '20k', style: { backgroundColor: '#2196F3', textColor: 'white' } },
  { option: '200k', style: { backgroundColor: '#FFDD00', textColor: 'black' } },
  { option: '10k', style: { backgroundColor: '#FF5722', textColor: 'black' } },
  { option: '50k', style: { backgroundColor: '#4CAF50', textColor: 'white' } },
  { option: '100k', style: { backgroundColor: '#FFA500', textColor: 'black' } }
];

const MainLayout = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [image, setImage] = useState(null); // Lưu trữ ảnh

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Lưu trữ file ảnh khi người dùng chọn ảnh
    }
  };

  const handleSpinClick = () => {
    if (!image) {
      alert('Vui lòng chọn ảnh trước khi quay!');
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = async () => {
    setMustSpin(false);
    setOpenPopup(true);
    setConfettiVisible(true);

    // Gửi thông tin phần thưởng và ảnh lên backend
    const prizeInfo = data[prizeNumber];

    try {
      // Gọi api.savePrize thay vì trực tiếp gọi axios
      console.log("image ", image)
      const response = await authApi.savePrize(image, prizeInfo);
      console.log('Response from backend:', response);
      // Xử lý kết quả upload ở đây nếu cần
    } catch (error) {
      console.error('Lỗi khi gửi phần thưởng lên backend:', error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setConfettiVisible(false);
  };

  return (
    <div className='container'>
      {/* Input để upload ảnh */}
      <div className='upload-section'>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          id='file-upload'
        />
        <label htmlFor='file-upload'>Chọn ảnh để tải lên</label>
      </div>

      {/* Vòng quay */}
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={handleStopSpinning}
        className='wheel'
      />
      <button className='spin-button' onClick={handleSpinClick}>
        SPIN
      </button>

      {/* Hiệu ứng Confetti */}
      {confettiVisible && (
        <Confetti
          recycle={false}
          numberOfPieces={200}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2000 }}
        />
      )}

      {/* Popup chúc mừng */}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          style: {
            width: '50%',
            height: '50%',
            margin: 'auto',
            zIndex: 1000,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Chúc Mừng!
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <h3
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#FFDD00',
              textAlign: 'center',
            }}
          >
            Bạn đã nhận được
          </h3>
          <h2
            style={{
              fontSize: '3rem',
              color: '#4CAF50',
              textAlign: 'center',
            }}
          >
            {data[prizeNumber].option}
          </h2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color='primary'>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainLayout;
