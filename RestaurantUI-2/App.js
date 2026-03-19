import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Import file điều hướng của bạn
import BottomTab from './src/navigation/BottomTab';

// Import màn hình Login và Context (Trạm phát sóng)
import LoginScreen from './src/screens/LoginScreen'; 
import { AuthProvider, AuthContext } from './src/context/AuthContext'; 

// Tạo một "Người gác cổng" để quyết định xem mở màn hình nào
function RootNavigator() {
  // Rút biến isLoggedIn từ trạm phát sóng ra kiểm tra
  const { isLoggedIn } = useContext(AuthContext);

  // Nếu chưa đăng nhập (false) -> Chặn lại, bắt hiện màn hình Login
  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  // Nếu đã đăng nhập (true) -> Mở cửa cho vào App chính (BottomTab của bạn)
  return <BottomTab />;
}

export default function App() {
  return (
    // Phải bọc AuthProvider ở ngoài cùng nhất thì toàn bộ App mới nhận được dữ liệu
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}