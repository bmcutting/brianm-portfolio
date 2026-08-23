import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <p className="text-6xl font-bold text-blue-600 dark:text-blue-400">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Página no encontrada</h1>
      <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
        La página que buscas no existe o se ha movido de sitio.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      >
        Volver al inicio
      </Link>
    </main>
  )
}
