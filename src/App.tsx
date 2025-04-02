import React, {JSX, useState} from "react";
import {Declaration, TextLabel} from "./componenets/Declaration/Declaration";
import {Control} from "./componenets/Controls/Control";

import styles from './App.module.css'

export const App: React.FC = (): JSX.Element => {

  const [labeling, setLabeling] = useState<TextLabel[]>([])
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

  const handleLabelSelect = (label: string) => setSelectedLabel(label)

  const text = `Генеральному директору\nООО «Строй-Сервис М»\nИванчукову Д.Т.\nкрановщика\nСитдикова Л. Я.\n\nЗаявление.\n\nПрошу предоставить мне ежегодный оплачиваемый отпуск с «1» сентября 2016 г. по «28» сентября 2016 г.\nсроком на 28 календарных дней.\n\n_____________________/Ситдиков Л.Я./\n\n15 августа 2016 г.`

  return (
          <>
              <div className={styles.wrapper}>
                  <Declaration
                      text={text}
                      labeling={labeling}
                      onChange={setLabeling}
                      selectedLabel={selectedLabel}
                  />
                  <Control onLabelSelected={handleLabelSelect} selectedLabel={selectedLabel}/>
              </div>
          </>
  )
}