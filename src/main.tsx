import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

console.log("CSS Variables carregadas:", {
  background: getComputedStyle(document.documentElement).getPropertyValue(
    "--background"
  ),
  primary: getComputedStyle(document.documentElement).getPropertyValue(
    "--primary"
  ),
});
