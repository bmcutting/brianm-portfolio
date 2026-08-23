import { Component } from "react"

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleReload = () => {
    window.location.assign("/")
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-semibold">Algo ha salido mal</h1>
        <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
          Se ha producido un error inesperado al mostrar esta página. Puedes recargarla o
          escribirme si el problema persiste.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={this.handleReload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Volver al inicio
          </button>
          <a
            href="mailto:bmoralescutting@gmail.com"
            className="border border-gray-300 dark:border-gray-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Contactar
          </a>
        </div>
      </main>
    )
  }
}
