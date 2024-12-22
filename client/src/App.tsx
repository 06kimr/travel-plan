import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loading from "./components/common/Loading";

const RegisterCity = lazy(() => import("./pages/admin/RegisterCity"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/admin">
            <Route path="register-city" element={<RegisterCity />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
