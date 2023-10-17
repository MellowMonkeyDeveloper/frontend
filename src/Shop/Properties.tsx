import { SetStateAction, useEffect, useState } from "react";
import PropertyInfo from "./PropertyInfo";
import {
  CheckBox,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import styles from "./Property.module.css";
import axios from "axios";
import { Sort } from "@mui/icons-material";
import { Dispatch } from "react";
export interface PropertiesProps {
  property: string;
  checkboxName: string;
  filterProps: Dispatch<SetStateAction<any[]>>;
  passedDownArray: [];
}

export interface PropertyListProps {
  value: string;
  results: string | number;
}

export interface TraitDataProps {
  traitName: string;
  value: string;
  count: number;
  checked: boolean;
}

export default function Properties({
  property,
  checkboxName,
  filterProps,
  passedDownArray,
}: PropertiesProps) {
  const sortValuesArray: string[] = ["A-Z", "Z-A", "Traits Low", "Traits High"];
  const [arrow, setArrow] = useState<boolean>(false);
  const [propsArr, setPropsArr] = useState<TraitDataProps[]>([]);
  const [sort, setSort] = useState<boolean>(true);
  const [sortValue, setSortValue] = useState<string>("");
  const [sendSortValue, setSendSortValue] = useState<string>("");
  const [checkboxValue, setCheckboxValue] = useState<{
    value: string;
    trait: string; 
    checked: boolean;
  }>({ value: "null", trait: "null", checked: false });
  const [checkboxBoolean, setCheckboxBoolean] = useState<boolean>(false);
  const [checkboxArr, setCheckboxArr] = useState<any>([]);
  const [buildCheckboxes, setBuildCheckboxes] = useState<any>();

  /*Anytime the arrow is clicked to expand the checkboxes list a request is s
  sent to the server and then checked against the passedown array in order to determine which checkboxes should be selected */

  const handleArrow = (event: string) => {
    async function getData() {
      await axios
        .get(
          `http://127.0.0.1:8000/shop/api/claypez_collections/?search=${event}`
        )
        .then((res) =>
          setPropsArr(
            res.data.map((value: any) => {
              const findChecked: any = passedDownArray.find(
                (item: any) => item.value === value.value
              );
              if (findChecked) {
                return { ...value, checked: findChecked.checked };
              } else {
                return { ...value, checked: false };
              }
            })
          )
        );
    }
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

  /*Sets the props array according to the sort value requested */

  useEffect(() => {
    if (sortValue === "A-Z") {
      setPropsArr((prev) =>
        [...prev].sort((a, b) => a.value.localeCompare(b.value))
      );
    } else if (sortValue === "Z-A") {
      setPropsArr((prev) =>
        [...prev].sort((a, b) => b.value.localeCompare(a.value))
      );
    } else if (sortValue === "Traits Low") {
      setPropsArr((prev) => [...prev].sort((a, b) => a.count - b.count));
    } else {
      setPropsArr((prev) => [...prev].sort((a, b) => b.count - a.count));
    }
  }, [sortValue]);

  /*Sets props array anytime more checkboxes are added to array without closing the arrow */

  useEffect(() => {
    setPropsArr((prev: any) =>
      [...prev].map((value: any) => {
        const findChecked: any = passedDownArray.find(
          (item: any) => item.value === value.value
        );
        if (findChecked) {
          return { ...value, checked: findChecked.checked };
        } else {
          return { ...value, checked: false };
        }
      })
    );
  }, [passedDownArray]);

  useEffect(() => {
    filterProps((prev: any) => {
      if (prev === undefined) {
        return [];
      } else {
        if (checkboxBoolean === true) {
          return [...prev, checkboxValue];
        } else {
          if ([...prev].length > 1) {
            return [...prev].filter(
              (value) => value.value !== checkboxValue.value
            );
          } else {
            return [];
          }
        }
      }
    });
  }, [checkboxValue, checkboxBoolean]);

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
                checked={value.checked}
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
