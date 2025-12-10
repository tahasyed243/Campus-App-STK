import AppRouter from "./routes/AppRouter";
import './index.css'
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <AppRouter />
    </div>
  );
}

export default App;
  