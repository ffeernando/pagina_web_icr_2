// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage.tsx';
import StudentDashboard from './components/StudentDashboard.tsx'; // Página para el email específico
import TeacherDashboard from './components/TeacherDashboard.tsx'; // Otra página para un email diferente
import NotFoundPage from './components/NotFoundPage.tsx'; // Página de error 404

const App: React.FC = () => {
  return (
    <Router basename="/pagina_web_icr_2">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
