import { ChangeEvent, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import styles from "./PropertyInfo.module.css";
import { Dispatch } from "react";

export interface PropertyInfoProps {
  name: string;
  resultNumber: string | number;
  property: string;
  value: string;
  checkboxChange: Dispatch<SetStateAction<string>>
  checkboxBoolean: Dispatch<SetStateAction<boolean>>
}

export default function PropertyInfo({
  property,
  name,
  value,
  resultNumber,
  checkboxChange,
  checkboxBoolean
}: PropertyInfoProps) {
  const [checkboxArr, setCheckboxArr] = useState<any>([]);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    checkboxChange(checkboxValue)
    checkboxBoolean(isChecked)
  };

  useEffect(() => {
    console.log(checkboxArr);
  }, [checkboxArr]);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <input
          className={styles.input}
          type="checkbox"
          name={name}
          value={value}
          onChange={handleCheckbox}
        />

        <h5 className={styles.header}>
          {property.charAt(0).toUpperCase() + property.slice(1)}
        </h5>
      </div>
      <div className={styles.inputContainer}>
        <span className={styles.span}>{resultNumber}</span>
      </div>
    </div>
  );
}
