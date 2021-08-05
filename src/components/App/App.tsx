import "./App.less";
import { AuthProvider } from "../../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { MainLayout } from "../Layout";
import { AppRouter } from "../../routers/AppRouter";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
