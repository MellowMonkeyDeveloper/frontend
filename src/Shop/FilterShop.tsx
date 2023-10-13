import PropertyInfo from "./PropertyInfo";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./FilterShop.module.css";
import axios from "axios";
import { SetStateAction, useEffect, Dispatch } from "react";
import Properties from "./Properties";
import { Sort } from "@mui/icons-material";
import { PropertiesProps } from "./Properties";

interface FilterProps {
  filterArray: Dispatch<SetStateAction<[]>>
}

export default function FilterShop({filterArray}: FilterProps) {

  

  const propertiesArray = [
    "Hat",
    "Body",
    "Eyes",
    "Mouth",
    "Clothes",
    "Background",
    "Traitcount",
  ];

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
      <div className={styles.midsection}>
        <div className={styles.subheaderContainer}>
          <h4 className={styles.subheader}>Sort by</h4>
        </div>

        <div className={styles.dropdownContainer}>DROPDOWN SELECTOR</div>
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.pricerHeaderContainer}>
          <h4>Price Range (ADA)</h4>
        </div>
        <div className={styles.priceInputsContainer}>
          <div className={styles.priceInputContainer}>
            <input className={styles.priceInput} type="number" />
          </div>
          <div className={styles.priceInputContainer}>
            <input className={styles.priceInput} type="number" />
          </div>
        </div>
      </div>
      <div className={styles.propertiessection}>
        <div className={styles.propertiesHeaderContainer}>
          <h4 className={styles.propertiesHeader}>Properties</h4>
        </div>
        <div className={styles.propertyInputContainer}>
          <input
            className={styles.propertyInput}
            type="text"
            placeholder="Search Property"
          /> 
        </div>
        <div className={styles.propertieslistContainer}>
          {propertiesArray.map((value) => <Properties filterProps={filterArray} checkboxName={value} property={value} />)}
        </div>
      </div> 
    </section>
  );
}
