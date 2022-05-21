import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { UserContext } from "./UserContext";
import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense, useState } from 'react';
const Home = lazy(() => import('./views/Home'))
const Login = lazy(() => import('./views/Login'));
const WorldMap = lazy(() => import('./views/WorlMap'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Companies = lazy(() => import('./views/Companies'));
const Workers = lazy(() => import('./views/Workers'));



export default function AppRoutes() {
  const [userId, setUserId] = useState(localStorage.getItem('userContext'));

  return (
    <Router>
      {/* <UserContext.Provider value={{userId, setUserId}}> */}
        <Routes>
          <Route path="/worldmap" element={
              <Suspense fallback={<CircularProgress />}>
                <ProtectedRoute component={WorldMap} />
              </Suspense>
            }
          />
          <Route path="/companies" element={
              <Suspense fallback={<CircularProgress />}>
                <ProtectedRoute component={Companies} />
              </Suspense>
            }
          />
          <Route path="/workers" element={
              <Suspense fallback={<CircularProgress />}>
                <ProtectedRoute component={Workers} />
              </Suspense>
            }
          />
          <Route path="/login" element={
              <Suspense fallback={<CircularProgress />}>
                <Login />
              </Suspense>
            }
          />
          <Route path="/" element={
              <Suspense fallback={<CircularProgress />}>
                <Home />
              </Suspense>
            }
          />
        </Routes>
      {/* </div> */}
      {/* </UserContext.Provider> */}
    </Router>
  
  )
}


