import { useState, useEffect } from "react";
import Screen from "../Components/Screen";
import { CircleFlag } from 'react-circle-flags'
import { useHistory } from "react-router-dom";

const styles = {

  welcomeHeader: {
    marginTop: 0
  },
  welcomeText: {
    margin: 0,
    marginTop: 5
  },
  welcomeFlags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
    width: "90%",
  },
  roundBorder: {
    borderRadius: "50%",
    margin: 5
  }
}

function WelcomeScreen() {
  const history = useHistory();

  const [CountrySelected, setCountrySelected] = useState("");

  useEffect(() => {
    if (CountrySelected) {
      console.log("Language Selected: " + CountrySelected);
      setTimeout(() => {
        history.push('/booking')
      }, 500);
    }
    // eslint-disable-next-line
  }, [CountrySelected]);

  return (
    <Screen verticalAlign="center">
      <div className="WelcomeScreen flex-col ai-center" style={styles.WelcomeScreen}>
        <div id="welcomeHeader" style={styles.welcomeHeader}>
          <h1 style={styles.welcomeText}>WELKOM</h1>
          <h1 style={styles.welcomeText}>WELCOME</h1>
          <h1 style={styles.welcomeText}>BIEN VENUE</h1>
          <h1 style={styles.welcomeText}>WILKOMMEN</h1>
        </div>
        <div id="welcomeFlags" style={styles.welcomeFlags}>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "gb" ? "country-active" : ''}`} onClick={() => setCountrySelected("gb")}>
            <CircleFlag countryCode="gb" />
          </div>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "nl" ? "country-active" : ''}`} onClick={() => setCountrySelected("nl")}>
            <CircleFlag countryCode="nl" />
          </div>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "fr" ? "country-active" : ''}`} onClick={() => setCountrySelected("fr")}>
            <CircleFlag countryCode="fr" />
          </div>
          <div style={styles.roundBorder} className={`flag-round-border ${CountrySelected === "de" ? "country-active" : ''}`} onClick={() => setCountrySelected("de")}>
            <CircleFlag countryCode="de" />
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default WelcomeScreen;
