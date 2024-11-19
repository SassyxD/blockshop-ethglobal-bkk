'use client'

import { useState, useContext, createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// สร้าง Context สำหรับจัดการ Snack
const SnackContext = createContext<any>(null);

export const useSnack = () => useContext(SnackContext);

export default function Page() {
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // ใช้ useEffect เพื่อให้แน่ใจว่า router จะถูกใช้หลังจากที่ component ถูก mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ฟังก์ชันที่แสดง Snack
  const showSnack = (message: string) => {
    setSnackMessage(message);
    setTimeout(() => setSnackMessage(''), 3000); // ซ่อน Snack หลังจาก 3 วินาที
  };

  // ฟังก์ชันไปที่หน้า login
  const goToLogin = () => {
    if (isMounted) {
      router.push('/login');
      showSnack('Redirecting to login...');
    }
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <SnackContext.Provider value={{ showSnack }}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold mb-4">Welcome to the Main Page</h1>
        <button
          onClick={goToLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Go to Login
        </button>

        {/* แสดง SnackBar หากมีข้อความ */}
        {snackMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-green-500 text-white rounded-md">
            {snackMessage}
          </div>
        )}
      </div>
    </SnackContext.Provider>
  );
}
