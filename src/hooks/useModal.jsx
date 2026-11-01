import { useEffect } from "react"

// Comportamiento común de los modales mientras están abiertos: Escape los cierra y
// la página de fondo no hace scroll. `onClose` debe ser estable (useCallback).
export function useModal(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, onClose])
}
