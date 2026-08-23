import { useState, useEffect } from "react"
import { ThemeContext } from "./ThemeContext"

function getInitialTheme() {
  const saved = localStorage.getItem("theme")
  if (saved === "light" || saved === "dark") return saved
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)")
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) setTheme(e.matches ? "light" : "dark")
    }
    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])

  function handleChangeTheme(newTheme) {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const value = { theme, handleChangeTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
