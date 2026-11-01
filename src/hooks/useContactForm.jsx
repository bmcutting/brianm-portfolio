import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const CONTACT_EMAIL = "bmoralescutting@gmail.com"
export const MESSAGE_MAX_LENGTH = 2000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const EMPTY_FORM = {
  user_name: "",
  user_email: "",
  message: "",
}

// Devuelve el error del campo o "" si es válido.
const validateField = (name, rawValue) => {
  const value = rawValue.trim()
  switch (name) {
    case "user_name":
      if (!value) return "Escribe tu nombre."
      if (value.length < 2) return "El nombre es demasiado corto."
      return ""
    case "user_email":
      if (!value) return "Escribe tu email para poder responderte."
      if (!EMAIL_PATTERN.test(value)) return "Revisa el email: parece incompleto."
      return ""
    case "message":
      if (!value) return "Escribe tu mensaje."
      if (value.length < 10) return "Cuéntame un poco más (mín. 10 caracteres)."
      return ""
    default:
      return ""
  }
}

export const useContactForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle")
  const [submitError, setSubmitError] = useState("")
  const [sentTo, setSentTo] = useState("")
  const formRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Un campo marcado con error se revalida mientras se corrige.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
    if (status === "sent" || status === "error") setStatus("idle")
  }

  // Al salir de un campo solo se valida si tiene texto; los vacíos se marcan al enviar.
  const handleBlur = (e) => {
    const { name, value } = e.target
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current

    if (form?.elements.website?.value) {
      setSentTo(formData.user_email.trim())
      setStatus("sent")
      setFormData(EMPTY_FORM)
      return
    }

    const nextErrors = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((name) => [name, validateField(name, formData[name])])
    )
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors).find((name) => nextErrors[name])
    if (firstInvalid) {
      setStatus("idle")
      form?.elements[firstInvalid]?.focus()
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSubmitError(`El formulario no está configurado. Escríbeme a ${CONTACT_EMAIL}.`)
      setStatus("error")
      return
    }

    const name = formData.user_name.trim()
    const email = formData.user_email.trim()
    setStatus("sending")

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: name,
          user_email: email,
          // El formulario ya no tiene campo de asunto; se genera para la plantilla.
          user_subject: `Portfolio: mensaje de ${name}`,
          message: formData.message.trim(),
        },
        PUBLIC_KEY
      )
      .then(
        () => {
          setSentTo(email)
          setFormData(EMPTY_FORM)
          setErrors({})
          setStatus("sent")
        },
        () => {
          setSubmitError(
            `No se pudo enviar el mensaje. Escríbeme directamente a ${CONTACT_EMAIL}.`
          )
          setStatus("error")
        }
      )
  }

  return {
    formData,
    errors,
    status,
    submitError,
    sentTo,
    formRef,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
