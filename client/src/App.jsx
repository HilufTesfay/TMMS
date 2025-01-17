import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts";
import { AuthProvider, ActiveMenuProvider } from "./context";
import { Login } from "./pages";
import { ProtectRoute } from "./utils";
import { Users, Classes, Equipments } from "./pages";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <ActiveMenuProvider>
                  <AppLayout />
                </ActiveMenuProvider>
              </ProtectRoute>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="equipments" element={<Equipments />} />
            <Route path="classes" element={<Classes />} />
            {/* Add more protected routes here */}
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
