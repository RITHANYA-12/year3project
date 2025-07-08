import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SignupForm from '../components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <SignupForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;