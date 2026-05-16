import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav ms-auto">
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/activities">
              Activities
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/teams">
              Teams
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/users">
              Users
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="text-center py-5">
                    <h1 className="display-6">Welcome to OctoFit Tracker</h1>
                    <p className="lead text-secondary">
                      Use the navigation menu to review REST API data for your fitness app.
                    </p>
                    <p>
                      <NavLink className="btn btn-primary btn-lg" to="/activities">
                        Browse Activities
                      </NavLink>
                    </p>
                  </div>
                }
              />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<Users />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route
                path="*"
                element={
                  <div className="text-center py-5">
                    <h2 className="fw-bold">Page not found</h2>
                    <p className="text-muted">Please select a section from the navigation menu.</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
