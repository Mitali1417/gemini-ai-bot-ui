import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import OtpPage from './pages/OtpPage';
import ChatHomePage from './pages/ChatHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/" element={<ChatHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
