import React from "react"

export const TimeLineList = ({ title, description }) => {
  return (
    <li className="mb-5 lg:mb-10 ms-4">
      <div className="absolute w-5 h-5 bg-primary rounded-full mt-2 -start-2.75 border-5 border-white dark:border-backgroundDark dark:bg-primaryDark"></div>
      <h3 className="font-display text-lg lg:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-4 text-base lg:text-lg leading-relaxed font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </li>
  )
}
