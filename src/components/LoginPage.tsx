// LoginPage.tsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 
import logo from '../assets/images/icr.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de validación de login
    if (email === 'student@example.com' && password === 'password123') {
      setError('');
      navigate('/student'); // Redirige a la página del dashboard
    } else if (email === 'teacher@example.com' && password === 'admin123') {
      setError('');
      navigate('/teacher'); // Redirige a la página de administración
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <Container className="login-container d-flex flex-column align-items-center">
      {/* Imagen centrada en la parte superior */}
      <div className="login-image-container text-center">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>

      {/* Formulario de login */}
      <div className="d-flex justify-content-center align-items-start login-content">
        <Form onSubmit={handleLogin} className="login-form">
          <h2 className="text-center mb-4">Inicia Sesión en la Plataforma ICR</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Contenedor horizontal para el botón de login y el enlace de olvidaste contraseña */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Button variant="primary" type="submit" className="login-btn">
              Iniciar sesión
            </Button>
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
        </Form>
      </div>

      {/* Bloque de acceso mediante QR */}
      <div className="qr-section text-center mt-4">
        <Button variant="secondary">Ingresar mediante QR</Button>
      </div>

      {/* Pie de página: política, términos, ayuda alineados a la altura del formulario */}
      <footer className="footer mt-auto d-flex justify-content-center align-items-center">
        <div className="small-text-links">
          <a href="#">Política de privacidad</a> | 
          <a href="#">Términos de uso</a> | 
          <a href="#">Ayuda</a>
        </div>
      </footer>
    </Container>
  );
};

export default LoginPage;
