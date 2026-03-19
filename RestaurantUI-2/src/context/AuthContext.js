// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// Tạo Context
export const AuthContext = createContext();

// Tạo Provider (Nhà cung cấp dữ liệu cho toàn bộ App)
export const AuthProvider = ({ children }) => {
  // Biến lưu trạng thái: true là đã đăng nhập, false là chưa
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hàm xử lý Đăng nhập
  const login = (username, password) => {
    // Kiểm tra đúng tên 'admin' và pass '123' thì cho vào
    if (username === 'khiem' && password === '23072005') {
      setIsLoggedIn(true);
      return true; // Báo thành công
    }
    return false; // Báo thất bại
  };

  // Hàm xử lý Đăng xuất
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};