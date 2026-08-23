import { TimeLineList } from "./TimeLineList"

export const Timeline = () => {
  return (
    <div className="dark:bg-gray-800 bg-violet-50 p-9 rounded-2xl">
      <ol className="relative border-s-2 border-gray-200 dark:border-gray-700">
        <TimeLineList
          title={"🎓 Formación académica"}
          description={"Ingeniero en Automática, especializado en software industrial."}
        />
        <TimeLineList
          title={"💼 Experiencia profesional"}
          description={
            "Prácticas profesionales como especialista en software industrial."
          }
        />
        <TimeLineList
          title={"🧠 Backend"}
          description={" Desarrollo con .NET (C#), APIs REST y arquitecturas limpias."}
        />
        <TimeLineList
          title={"🎨 Frontend"}
          description={" Interfaces modernas con React y Tailwind CSS."}
        />
      </ol>
    </div>
  )
}
