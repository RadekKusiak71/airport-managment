import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import Card from './UI/Card';
import Header from './components/Header';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Card>
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Card>
      </AuthProvider>
    </Router>
  );
}

export default App;
