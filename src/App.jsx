import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '_components';
import { Home } from 'home';
import { Login } from 'login';
import { Projects } from './_components/Projects';
import { history } from '_helpers';

export { App };

function App() {

    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <Routes>
            <Route element={<PrivateRoute><Home /></PrivateRoute>} >
                <Route path='/project' element={<Projects />}></Route>
            </Route>
            <Route path='/' element={<PublicRoute><Login /></PublicRoute>}></Route>
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
}
