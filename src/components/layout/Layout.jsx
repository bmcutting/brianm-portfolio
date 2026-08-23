import { Outlet } from "react-router-dom"
import { Header } from "../header/Header"
import { ShareButton } from "../share/ShareButton"
import { useActiveSection } from "../../hooks/useActiveSectionObserver"

export const Layout = () => {
  useActiveSection()

  return (
    <div>
      <a
        href="#intro"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Saltar al contenido
      </a>
      <Header />
      <Outlet />
      <ShareButton />
    </div>
  )
}
