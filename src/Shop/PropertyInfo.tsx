import { ChangeEvent, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import styles from "./PropertyInfo.module.css";
import { Dispatch } from "react";

export interface PropertyInfoProps {
  name: string;
  resultNumber: string | number;
  property: string;
  value: string;
  checked: boolean;
  checkboxChange: Dispatch<SetStateAction<{value: string, trait: string, checked: boolean}>>
  checkboxBoolean: Dispatch<SetStateAction<boolean>>
}

export default function PropertyInfo({
  property,
  name,
  value, 
  resultNumber, 
  checkboxChange,
  checkboxBoolean,
  checked
}: PropertyInfoProps) {
  const [checkboxArr, setCheckboxArr] = useState<any>([]);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = {value: event.target.value, trait: `data__${event.target.name.toLowerCase()}`, checked: event.target.checked};
    const isChecked = event.target.checked;
    checkboxChange(checkboxValue)
    checkboxBoolean(isChecked)
  };

  useEffect(() => {
    console.log(checked)
  }, [property, checked])

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <input
          className={styles.input}
          type="checkbox"
          name={name}
          value={value}
          onChange={handleCheckbox}
          checked={checked}
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
