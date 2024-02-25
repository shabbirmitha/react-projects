import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContexts";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const { emoji, cityName, date, id, position } = city;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <Link
      className={`${styles.cityItem} ${
        currentCity.id === id ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
