import { useEffect, useState } from "react";
import PropertyInfo from "./PropertyInfo";
import {
  CheckBox,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import styles from "./Property.module.css";
import axios from "axios";
import { Sort } from "@mui/icons-material";
export interface PropertiesProps {
  property: string;
  checkboxName: string;
}

export interface PropertyListProps {
  value: string;
  results: string | number;
}

export interface TraitDataProps {
  traitName: string;
  value: string;
  count: number;
}

export default function Properties({
  property,
  checkboxName,
}: PropertiesProps) {
  const sortValuesArray: string[] = ["A-Z", "Z-A", "Traits Low", "Traits High"];
  const [arrow, setArrow] = useState<boolean>(false);
  const [propsArr, setPropsArr] = useState<TraitDataProps[]>([]);
  const [sort, setSort] = useState<boolean>(true);
  const [sortValue, setSortValue] = useState<string>("");
  const [sendSortValue, setSendSortValue] = useState<string>("");
  const [checkboxValue, setCheckboxValue] = useState<string>("");
  const [checkboxBoolean, setCheckboxBoolean] = useState<boolean>(false);
  const [checkboxArr, setCheckboxArr] = useState<any>([]);

  const handleArrow = (event: string) => {
    async function getData() {
      await axios
        .get(
          `http://127.0.0.1:8000/shop/api/claypez_collections/?search=${event}`
        )
        .then((res) => setPropsArr(res.data));
    }

    console.log(propsArr);
    if (arrow) {
      setArrow(false);
    } else if (!arrow) {
      setArrow(true);
      getData();
    }
  };

  const handleSort = () => {
    if (sort) {
      setSort(false);
    } else if (!sort) {
      setSort(true);
    }
  };

  const handleSortValue = () => {};

  useEffect(() => {
    if (sortValue === "A-Z") {
      setPropsArr((prev) =>
        [...prev].sort((a, b) => a.value.localeCompare(b.value))
      );
      console.log(propsArr);
    } else if (sortValue === "Z-A") {
      setPropsArr((prev) =>
        [...prev].sort((a, b) => b.value.localeCompare(a.value))
      );
      console.log(propsArr);
    } else if (sortValue === "Traits Low") {
      setPropsArr((prev) => [...prev].sort((a, b) => a.count - b.count));
      console.log(propsArr);
    } else {
      setPropsArr((prev) => [...prev].sort((a, b) => b.count - a.count));
      console.log(propsArr);
    }
  }, [sortValue]);

  useEffect(() => {
    setCheckboxArr((prev: any) => {
      if (prev === undefined) {
        return [checkboxValue];
      } else {
        if (checkboxBoolean) {
          return [...prev, checkboxValue].filter((value) => value !== Array);
        } else {
          return [...prev, checkboxValue].filter(
            (value) => value !== checkboxValue
          );
        }
      }
    });
  }, [checkboxValue, checkboxBoolean]);

  useEffect(() => {
    console.log(checkboxArr)
  }, [checkboxArr])

  return (
    <article className={styles.propertyContainer}>
      <div className={styles.topContainer}>
        <div className={styles.headerContainer}>
          <h4 className={styles.header}>{property}</h4>
        </div>
        <div className={styles.arrowContainer}>
          {arrow ? (
            <KeyboardArrowUp
              className={styles.arrow}
              onClick={() => handleArrow(property)}
            />
          ) : (
            <KeyboardArrowDown
              className={styles.arrow}
              onClick={() => handleArrow(property)}
            />
          )}
        </div>
      </div>
      {arrow && (
        <>
          <div className={styles.sortButtonContainer}>
            <button onClick={handleSort} className={styles.sortButton}>
              Sort <Sort className={styles.sortIcon} />
            </button>
          </div>
          <div className={styles.expandedSortContainer}>
            <div className={styles.sortInputsContainer}>
              {sort && (
                <div className={styles.sortInputContainer}>
                  {sortValuesArray.map((value) => (
                    <div>
                      <button onClick={() => setSortValue(value)}>
                        {value}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.propertyInfoContainer}>
            {propsArr.map((value: any) => (
              <PropertyInfo
                name={checkboxName}
                resultNumber={value.count}
                property={value.value}
                value={value.value}
                checkboxChange={setCheckboxValue}
                checkboxBoolean={setCheckboxBoolean}
              />
            ))}
          </div>
        </>
      )}
    </article>
  );
}
