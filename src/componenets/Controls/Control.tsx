import {JSX} from "react";
import {ControlProps} from './Control.model.ts'

import styles from './Control.module.css'

type Labels = {
    label: string;
    color: string
}

export const Control: React.FC<ControlProps> = ({onLabelSelected, selectedLabel}): JSX.Element => {
    const labels: Labels[] = [
        {label: 'ФИО', color: 'greenMark'},
        {label: 'Дата', color: 'blueMark'},
        {label: 'Тип', color: 'redMark'},
    ]

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Метки</h3>
            <div>
                {labels.map(item => {
                    return (
                        <p key={item.label}
                        className={`${styles.controlContainer} ${selectedLabel === item.label ? styles.selected : ''}`}
                        onClick={() => onLabelSelected(item.label)}>
                            <span className={styles[item.color]}></span>
                            {item.label}
                            </p>
                    )
                })}
            </div>
        </div>
    )
};