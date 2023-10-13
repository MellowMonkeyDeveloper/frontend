import ada from "../assets/1024px-Coin-ada-big.svg (1).png";
import styles from "./ListingCard.module.css";

export interface ListingCardProps {
  image: string;
  collection: "Claypez";
  asset: string | number;
  price: string | number | boolean;
}

export default function ListingCard({
  image,
  collection,
  asset,
  price,
}: ListingCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={image}
          alt={`${collection} image #${asset}`}
        />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.assetHeaderContainer}>
          <h4 className={styles.assetHeader}>
            {collection} #{asset}
          </h4>
        </div>
        <div className={styles.infoHeaderContainer}>
          <button>Preview</button>
        </div>
      </div>
    </div>
  );
}
