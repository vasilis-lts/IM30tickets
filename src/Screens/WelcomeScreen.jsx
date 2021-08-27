import { useState, useEffect } from "react";
import Screen from "../Components/Screen";
import { CircleFlag } from 'react-circle-flags'

const styles = {
  welcomeHeader: {
    fontSize: 22
  },
  welcomeText: {
    margin: 0,
    marginTop: 5
  },
  welcomeFlags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 60,
    width: "90%",
  },
  roundBorder: {
    borderRadius: "50%",
    margin: 10
  }
}

function WelcomeScreen() {

  const [CountrySelected, setCountrySelected] = useState("");

  useEffect(() => {
    if (CountrySelected) {
      console.log("Country Selected: " + CountrySelected);

    }
  }, [CountrySelected]);

  return (
    <Screen verticalAlign="center">
      <div className="WelcomeScreen flex-col ai-center">
        <div id="welcome-header" style={styles.welcomeHeader}>
          <h1 style={styles.welcomeText}>WELKOM</h1>
          <h1 style={styles.welcomeText}>WELCOME</h1>
          <h1 style={styles.welcomeText}>BIEN VENUE</h1>
          <h1 style={styles.welcomeText}>WILKOMMEN</h1>
        </div>
        <div id="welcomeFlags" style={styles.welcomeFlags}>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "gb" ? "country-active" : ''}`} onClick={() => setCountrySelected("gb")}>
            <CircleFlag countryCode="gb" height="200" />
          </div>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "nl" ? "country-active" : ''}`} onClick={() => setCountrySelected("nl")}>
            <CircleFlag countryCode="nl" height="200" />
          </div>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "fr" ? "country-active" : ''}`} onClick={() => setCountrySelected("fr")}>
            <CircleFlag countryCode="fr" height="200" />
          </div>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "de" ? "country-active" : ''}`} onClick={() => setCountrySelected("de")}>
            <CircleFlag countryCode="de" height="200" />
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default WelcomeScreen;
