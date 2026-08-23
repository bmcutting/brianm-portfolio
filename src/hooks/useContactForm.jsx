import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_FORM = {
  user_name: "",
  user_email: "",
  user_subject: "",
  message: "",
}

export const useContactForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const formRef = useRef()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formRef.current?.elements.website?.value) {
      setDone(true)
      setFormData(EMPTY_FORM)
      return
    }

    if (!EMAIL_PATTERN.test(formData.user_email)) {
      setError("Introduce una dirección de email válida.")
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setError("El formulario no está configurado. Escríbeme directamente por email.")
      return
    }

    setLoading(true)
    setError("")

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setDone(true)
        setLoading(false)
        setFormData(EMPTY_FORM)

        setTimeout(() => {
          setDone(false)
        }, 5000)
      },
      () => {
        setLoading(false)
        setError("No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.")
      }
    )
  }

  return {
    formData,
    done,
    error,
    loading,
    formRef,
    handleChange,
    handleSubmit,
  }
}
