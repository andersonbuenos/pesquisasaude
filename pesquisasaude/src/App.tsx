import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";  // Certifique-se de ajustar o caminho corretamente
import Questions from "./components/Questions"; // Certifique-se de ajustar o caminho corretamente

function App() {
  return (
    <Router>
      <Routes>
        {/* O caminho "/" aponta para o componente Register */}
        <Route path="/" element={<Register />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
