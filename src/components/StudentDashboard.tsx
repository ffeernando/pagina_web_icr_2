import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular} from '@fortawesome/free-regular-svg-icons';
import './StudentDashboard.css';
import logo from '../assets/images/icr.png';

const initialCourses = [
  {
    title: 'React for Beginners',
    description: 'Learn the basics of React.js in this beginner course.',
    image: 'https://via.placeholder.com/200'
  },
  {
    title: 'Advanced TypeScript',
    description: 'Take your TypeScript skills to the next level.',
    image: 'https://via.placeholder.com/200'
  },
  {
    title: 'Web Development with Bootstrap',
    description: 'Master responsive web design using Bootstrap.',
    image: 'https://via.placeholder.com/200'
  },
];

const additionalCourses = [
  {
    title: 'Introduction to Node.js',
    description: 'Get started with server-side development using Node.js.',
    image: 'https://via.placeholder.com/200'
  },
  {
    title: 'GraphQL Basics',
    description: 'Learn the fundamentals of GraphQL for modern APIs.',
    image: 'https://via.placeholder.com/200'
  },
  {
    title: 'Responsive Design Principles',
    description: 'Understand the key principles of responsive web design.',
    image: 'https://via.placeholder.com/200'
  },
];

const StudentDashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentView, setCurrentView] = useState<'courses' | 'library'>('courses');
  const [courses, setCourses] = useState(initialCourses);
  const [visibleCourses, setVisibleCourses] = useState(initialCourses);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [loadMoreText, setLoadMoreText] = useState('Mostrar más cursos');

  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const switchToCourses = () => {
    setCurrentView('courses');
  };

  const switchToLibrary = () => {
    setCurrentView('library');
  };

  const toggleCoursesVisibility = () => {
    if (showLoadMore) {
      const newCourses = courses.concat(additionalCourses);
      setCourses(newCourses);
      setVisibleCourses(newCourses.slice(0, visibleCourses.length + 3)); // Show 3 more courses
      setLoadMoreText('Limitar cursos');
    } else {
      setVisibleCourses(initialCourses); // Show initial courses
      setShowLoadMore(true);
      setLoadMoreText('Mostrar más cursos');
    }
    setShowLoadMore(!showLoadMore);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current && !notificationsRef.current.contains(event.target as Node) &&
        settingsRef.current && !settingsRef.current.contains(event.target as Node) &&
        userMenuRef.current && !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
        setShowSettings(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="student-dashboard">
      {/* Banner Section */}
      <div className="banner">
        <img src={logo} alt="logo-img"></img>
        <div className="right-section">
          <div className="notifications" onClick={toggleNotifications} ref={notificationsRef}>
            <FontAwesomeIcon icon={faBellRegular} style={{ fontSize: '1.5em' }}  />
            {showNotifications && (
              <div className="dropdown">
                <p>Notification 1</p>
                <p>Notification 2</p>
                <p>Notification 3</p>
              </div>
            )}
          </div>
          
          <div className="user-info" onClick={toggleUserMenu} ref={userMenuRef}>
            <div className="user-icon">LF</div>
            <span className="username">Luis Fernando Altamirano Fernandez</span>
            {showUserMenu && (
              <div className="dropdown">
                <p>Mi perfil</p>
                <p>Configuración</p>
                <p>Cerrar sesión</p>
              </div>
            )}
          </div>
          <div className="settings" onClick={toggleSettings} ref={settingsRef}>
            <FontAwesomeIcon icon={faCog} style={{ fontSize: '1.5em' }} />
            {showSettings && (
              <div className="dropdown">
                <p>Mi perfil</p>
                <p>Configuración</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-bar">
        <button onClick={switchToCourses}>Mis Cursos</button>
        <button onClick={switchToLibrary}>Biblioteca</button>
      </div>

      {/* Content Section */}
      <div className="content-container">
        {currentView === 'courses' ? (
          <div className="course-grid">
            {visibleCourses.map((course, index) => (
              <div key={index} className="course-card">
                <img src={course.image} alt={course.title} className="course-image" />
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="library-message">
            <h2>Bienvenido a la Biblioteca</h2>
            <p>Aquí puedes encontrar todos tus recursos disponibles.</p>
          </div>
        )}
        {currentView === 'courses' && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={toggleCoursesVisibility}>
              {loadMoreText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
