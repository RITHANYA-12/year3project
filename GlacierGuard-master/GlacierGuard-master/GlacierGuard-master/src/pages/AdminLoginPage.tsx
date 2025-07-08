import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/auth/LoginForm';

const AdminLoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isAdmin />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <LoginForm isAdmin />
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLoginPage;