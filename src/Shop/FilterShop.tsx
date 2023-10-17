import PropertyInfo from "./PropertyInfo";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./FilterShop.module.css";
import axios from "axios";
import {
  SetStateAction,
  useEffect,
  Dispatch,
  useState,
  ChangeEvent,
  HtmlHTMLAttributes,
} from "react";
import Properties, { TraitDataProps } from "./Properties";
import { Sort } from "@mui/icons-material";
import { PropertiesProps } from "./Properties";

interface FilterProps {
  setFilterArray: Dispatch<SetStateAction<any[]>>;
  passedDownArray: [];
}

export default function FilterShop({
  setFilterArray,
  passedDownArray,
}: FilterProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [propertiesQuery, setPropertiesQuery] = useState<TraitDataProps[]>([]);
  const [checkboxBoolean, setCheckboxBoolean] = useState<boolean>(false);
  const [checkboxChange, setCheckboxChange] = useState<any>();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('')
    setPropertiesQuery([])
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      setTimeout(() => {
        axios
          .get(
            `http://127.0.0.1:8000/shop/api/claypez_collections/filter/?value_name=${searchQuery}`
          )
          .then((res) =>
            setPropertiesQuery(
              res.data.results.map((value: any) => {
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
      }, 500);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log(propertiesQuery);
  }, [propertiesQuery]);

  const propertiesArray = [
    "Hat",
    "Body",
    "Eyes",
    "Mouth",
    "Clothes",
    "Background",
    "Traitcount",
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPropertiesQuery((prev: any) =>
      [...prev].map((value: any) => {
        if (
          value.value === event.target.value &&
          value.trait_name === event.target.name
        ) {
          return { ...value, checked: event.target.checked };
        } else if (value.checked === true) {
          return { ...value };
        } else {
          return { ...value, checked: false };
        }
      })
    );
    setFilterArray((prev: any) => {
      console.log(prev);
      if ([...prev].length === 0) {
        return [
          {
            value: event.target.value,
            trait: `data__${event.target.name.toLowerCase()}`,
            checked: event.target.checked,
          },
        ];
      } else {
        console.log("not undefined");

        if (
          [...prev].some(
            (item: any) =>
              item.value === event.target.value &&
              item.trait === `data__${event.target.name.toLowerCase()}`
          ) === false
        ) {
          console.log("found");
          return [
            ...prev,
            {
              value: event.target.value,
              trait: `data__${event.target.name.toLowerCase()}`,
              checked: event.target.checked,
            },
          ];
        } else if (
          [...prev].some(
            (item: any) =>
              item.value === event.target.value &&
              item.trait === `data__${event.target.name.toLowerCase()}`
          ) === true
        ) {
          console.log("exists");
          console.log(
            [...prev].filter(
              (item: any) =>
                item.value !== event.target.value &&
                item.trait !== `data__${event.target.name.toLowerCase()}`
            )
          );
          return [...prev].filter(
            (item: any) =>
              item.value !== event.target.value &&
              item.trait !== `data__${event.target.name.toLowerCase()}`
          );
        } else {
          console.log("regular");
          return [...prev];
        }
      }
    });
  };

  return (
    <section className={styles.filterSection}>
      <div className={styles.topsection}>
        <div className={styles.headerContainer}>
          <h3 className={styles.header}>Filter and Sort</h3>
        </div>
        <div className={styles.closeContainer}>
          <CloseIcon className={styles.close} />
        </div>
      </div>
      <div className={styles.midsection}></div>

      <div className={styles.propertiessection}>
        <div className={styles.propertiesHeaderContainer}>
          <h4 className={styles.propertiesHeader}>Properties</h4>
        </div>
        <div className={styles.propertyInputContainer}>
          <input
            className={styles.propertyInput}
            type="text"
            placeholder="Search Property"
            onChange={handleSearch}
            value={searchQuery}
          />
          <button onClick={handleClearSearch}>Clear</button>
        </div>
        <div className={styles.searchResultsContainer}>
          {searchQuery.length > 0 &&
            propertiesQuery.map((value: any) => {
              return (
                <div className={styles.resultsContainer}>
                  <div className={styles.resultsInputContainer}>
                    <input
                      className={styles.resultsCheckbox}
                      type="checkbox"
                      onChange={handleChange}
                      checked={value.checked}
                      name={value.trait_name}
                      value={value.value}
                    />
                    <h5 className={styles.resultsH5}>
                      {value.value.replace(
                        /(^|\s)([a-z])/g,
                        (match: any, space: any, letter: any) => {
                          return space + letter.toUpperCase();
                        }
                      )}{" "}
                      - {value.trait_name}
                    </h5>
                  </div>

                  <span className={styles.resultsSpan}>{value.count}</span>
                </div>
              );
            })}
        </div>
        <div className={styles.propertieslistContainer}>
          {propertiesArray.map((value) => (
            <Properties
              passedDownArray={passedDownArray}
              filterProps={setFilterArray}
              checkboxName={value}
              property={value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
