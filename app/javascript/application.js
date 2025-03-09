/* Entry point for the build script in your package.json */
import "@hotwired/turbo-rails"
import "./controllers"
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App.jsx"

// Wait for the DOM to be fully loaded
document.addEventListener("turbo:load", () => {
  const container = document.getElementById("react-root")
  if (container) {
    const root = createRoot(container)
    root.render(<App />)
  }
})
