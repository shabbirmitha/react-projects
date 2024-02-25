// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContexts";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Spinner from "./Spinner";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoError, setGeoError] = useState("");

  const navigate = useNavigate();

  const [mapLat, mapLng] = useUrlPosition();
  const { addCity, isLoading } = useCities();

  useEffect(
    function () {
      if (!mapLat && !mapLng) return;

      async function getData() {
        try {
          setGeoError("");
          setIsGeoLoading(true);

          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't  seem to be a city. Click somewhere else 😉."
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }
      getData();
    },
    [mapLat, mapLng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };

    await addCity(newCity);
    navigate("/app/cities");
  }

  if (isGeoLoading) return <Spinner />;

  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere in the map." />;

  if (geoError) return <Message message={geoError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          dateFormat="dd-MMM-yyyy"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
