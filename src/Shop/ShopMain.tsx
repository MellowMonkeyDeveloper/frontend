import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import styles from "./Shop.module.css";
import { Filter, SortOutlined } from "@mui/icons-material";
import axios from "axios";
import FilterShop from "./FilterShop";

export interface ListingArrayProps {
  image: string;
  assetID: string | number;
  collection: "Claypez";
  onSale: boolean;
  price: string | number
}

export default function ShopMain() {
  const [listings, setListings] = useState<ListingArrayProps[]>([]);
  const [sort, setSort] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false)


  useEffect(() => {
    async function getValues() {
      axios.get('http://127.0.0.1:8000/shop/api/claypeznfts/')
      .then(res => setListings(res.data.results))
    }
    getValues()
  }, [])
  useEffect(() => {
    console.log(listings)
  }, [listings])

  const handleSort = () => {

  }

  const handleFilter = () => {
    if(filter === false){
      setFilter(true)
    }else if(filter === true){
      setFilter(false)
    }
  }

  return (
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
        {filter && <FilterShop filterProps={} />}
      </div>
      <div className={styles.listingContainer}>
        {listings.map((value) => (
          <ListingCard
            price={value.onSale ? value.price : 'Not Listed'}
            image={value.image}
            collection={"Claypez"}
            asset={value.assetID}
          />
        ))}
      </div>
    </article>
  );
}
