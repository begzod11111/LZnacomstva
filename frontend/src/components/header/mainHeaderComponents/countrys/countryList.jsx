import React from "react";
import styles from './countryList.module.css'; // Changed 'classes' to 'styles' (conventional naming)

const CountryList = () => {
    // Sample country data (you can expand this or fetch from an API)
    const countries = [
        { value: "ru", label: "Россия" },
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
    ];

    return (
        <div className={styles.countryListContainer}>
            <select
                className={styles.countrySelect}
                defaultValue="ru"
            >
                {countries.map((country) => (
                    <option
                        key={country.value}
                        value={country.value}
                    >
                        {country.label}
                    </option>
                ))}
            </select>
            <i className={`${styles.arrowIcon} ri-arrow-down-s-line`}></i>
        </div>
    );
};

export default CountryList;