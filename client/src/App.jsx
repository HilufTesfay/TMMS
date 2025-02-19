import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppLayout, Instructor } from "./layouts";
import { AuthProvider, ActiveMenuProvider } from "./context";
import { Login } from "./pages";
import { ProtectRoute } from "./utils";
import {
  Users,
  Classes,
  Equipments,
  RegisterForm,
  Analytics,
  Booking,
} from "./pages";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <ProtectRoute>
                  <ActiveMenuProvider>
                    <AppLayout />
                  </ActiveMenuProvider>
                </ProtectRoute>
              </AuthProvider>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="equipments" element={<Equipments />} />
            <Route path="classes" element={<Classes />} />
            <Route path="Register" element={<RegisterForm />} />
            <Route path="" element={<Analytics />} />
            <Route path="bookings" element={<Booking />} />
            {/* Add more protected routes here */}
          </Route>
          <Route
            path="/login"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
          <Route path="/instructor/*" element={<Instructor />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
