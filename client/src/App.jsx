import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './component/pages/Navbar/Navbar'

function App() {
    return (
        <div>
            <Navbar />

            <Outlet />
        </div>
    );
}

export default App;
