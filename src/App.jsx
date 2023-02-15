import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute,PublicRoute } from '_components';
import { Home } from 'home';
import { Login } from 'login';
import { Projects } from './_components/Projects';

export { App };

function App() {

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
