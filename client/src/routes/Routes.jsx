import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../component/pages/Home/Home';
import SignIn from '../component/pages/User/SignIn';
import SignUp from '../component/pages/User/SignUp';
import About from '../component/pages/About/About';
import Contact from '../component/pages/contact/Contact';
import Profile from '../component/pages/Profile/Profile';
import LandingPage from '../component/pages/Landing/LandingPage';
import CreateNote from '../component/pages/Note/CreateNote';
import Note from '../component/pages/Note/Note';
import ProtectedRoute from '../component/utils/ProtectedRoute'; // Import ProtectedRoute

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/create-note',
        element: (
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        ),
      },
      {
        path: '/view-notes',
        element: (
          <ProtectedRoute>
            <Note />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default Routes;
