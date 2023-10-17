import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import styles from "./Shop.module.css";
import { Filter, SortOutlined } from "@mui/icons-material";
import axios from "axios";
import FilterShop from "./FilterShop";
import { CheckboxProvider } from "./CheckboxContext";

export interface ListingArrayProps {
  image: string;
  assetID: string | number;
  collection: "Claypez";
  onSale: boolean;
  price: string | number;
}

export default function ShopMain() {
  const [listings, setListings] = useState<ListingArrayProps[]>([]);
  const [sort, setSort] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [filterPropsArray, setFilterPropsArray] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getValues() {
      axios
        .get(`http://127.0.0.1:8000/shop/api/claypeznfts/filter/?page=${page}`)
        .then((res) => setListings(res.data.results));
    }
    if (filterPropsArray.length === 0) {
      getValues();
    }
  }, [page]);
  useEffect(() => {
    async function getValues() {
      const queryObject: any = new Object();
      const traitsSet: any = new Set(
        filterPropsArray.map((value: any) => value.trait)
      );
      console.log(
        [...traitsSet].map(
          (value: any) =>
            (queryObject[value] = filterPropsArray
              .filter((item: any) => item.trait === value)
              .map((value: any) => value.value))
        )
      );
      console.log(queryObject);
      let queryString = "";
      for (const key in queryObject) {
        let values = queryObject[key];
        if (queryString.length === 0) {
          queryString += `${key}=${values}`;
        } else {
          queryString += `&${key}=${values}`;
        }
      }
      console.log(queryString);
      axios
        .get(
          `http://127.0.0.1:8000/shop/api/claypeznfts/filter/?page=${page}&${queryString}`
        )
        .then((res) => setListings(res.data.results));
    } 
    if (filterPropsArray.length > 0) {
      getValues();
    }
  }, [filterPropsArray, page]);

  useEffect(() => {
    console.log(filterPropsArray);
  }, [filterPropsArray, listings]);

  const handleSort = () => {};

  const handleFilter = () => {
    if (filter === false) {
      setFilter(true);
    } else if (filter === true) {
      setFilter(false);
    }
  };

  return (
    <CheckboxProvider>
      <article className={styles.shopContainer}>
        <div className={styles.headerContainer}>
          <h2 className={styles.header}>Find Your Monkey</h2>
        </div>
        <div className={styles.filterSortContainer}>
          <div className={styles.buttonContainer}>
            <button onClick={handleSort} className={styles.button}>
              Sort <SortOutlined />
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleFilter} className={styles.button}>
              Filter <Filter />
            </button>
          </div>
        </div>
        <div className={styles.filterSection}>
          {filter && (
            <FilterShop
              passedDownArray={filterPropsArray}
              setFilterArray={setFilterPropsArray}
            />
          )}
        </div>
        <div className={styles.listingContainer}>
          {listings.map((value) => (
            <ListingCard
              price={value.onSale ? value.price : "Not Listed"}
              image={value.image}
              collection={"Claypez"}
              asset={value.assetID}
            />
          ))}
        </div>
        <div>
          {page === 1 && listings.length === 50 && (
            <button onClick={() => setPage((prev) => (prev += 1))}>
              More Results
            </button>
          )}
          {page > 1 && listings.length < 50 && (
            <button onClick={() => setPage((prev) => (prev -= 1))}>
              Previous Results
            </button>
          )}
          {page > 1 && listings.length === 50 && (
            <>
              <button onClick={() => setPage((prev) => (prev -= 1))}>
                Previous Results
              </button>
              <button onClick={() => setPage((prev) => (prev += 1))}>
                More Results
              </button>
            </>
          )}
        </div>
      </article>
    </CheckboxProvider>
  );
}
