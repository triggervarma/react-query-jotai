import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/home/home-page";
import { CharacterPage } from "./pages/character/character-page";
import { Layout } from "./app/layout/layout";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
