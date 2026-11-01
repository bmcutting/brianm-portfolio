import { useEffect, useState } from "react"

export const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(id)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Sin acceso al portapapeles: el texto sigue visible y enlazado al lado.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 cursor-pointer rounded-md border border-gray-300 dark:border-white/20 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:border-primaryInk hover:text-gray-900 dark:hover:border-primaryDark dark:hover:text-gray-100 transition-colors"
      >
        {copied ? "Copiado" : "Copiar"}
        <span className="sr-only"> {label}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copiado` : ""}
      </span>
    </>
  )
}
