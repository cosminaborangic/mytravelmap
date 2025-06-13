import React, { useEffect, useRef } from "react";

/* global google */

class Puzzle {
  map_;
  polys_ = [];
  difficulty_ = "Easy";
  count_ = 0;
  pieceDiv_;
  timeDiv_;
  dataLoaded_ = false;
  NUM_PIECES_ = 10;
  countries_ = [];
  timer_ = 0;
  START_COLOR_ = "#FE6B8B";
  END_COLOR_ = "#037e29";

  constructor(map) {
    this.map_ = map;
    this.pieceDiv_ = document.createElement("div");
    this.timeDiv_ = document.createElement("div");
    this.createMenu_();
    this.setDifficultyStyle_();
    this.loadData_();
  }

  createMenu_() {
    const menuDiv = document.createElement("div");

    menuDiv.style.cssText =
      "margin: 20px; padding: 20px; border-radius: 10px; width: 220px;" +
      "background-color: #fff; font-size: 14px; font-family: Roboto;" +
      "text-align: center; color: grey; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" +
      "margin-top: 100px;";  

    const titleDiv = document.createElement("div");

    titleDiv.style.cssText =
      "width: 100%; background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); color: white; font-size: 20px;" +
      "line-height: 40px; margin-bottom: 20px; border-radius: 8px;";
    titleDiv.innerText = "Game Options";

    const pieceTitleDiv = document.createElement("div");

    pieceTitleDiv.innerText = "PIECE:";
    pieceTitleDiv.style.fontWeight = "800";
    pieceTitleDiv.style.marginTop = "10px";

    const pieceDiv = this.pieceDiv_;

    pieceDiv.innerText = "0 / " + this.NUM_PIECES_;
    pieceDiv.style.marginBottom = "10px";

    const timeTitleDiv = document.createElement("div");

    timeTitleDiv.innerText = "TIME:";
    timeTitleDiv.style.fontWeight = "800";
    timeTitleDiv.style.marginTop = "10px";

    const timeDiv = this.timeDiv_;

    timeDiv.innerText = "0 seconds";
    timeDiv.style.marginBottom = "10px";

    const difficultyTitleDiv = document.createElement("div");

    difficultyTitleDiv.innerText = "DIFFICULTY:";
    difficultyTitleDiv.style.fontWeight = "800";
    difficultyTitleDiv.style.marginTop = "10px";

    const difficultySelect = document.createElement("select");

    ["Easy", "Average", "Medium", "Moderate", "Hard", "Extreme", "Impossible"].forEach((level) => {
      const option = document.createElement("option");

      option.value = level.toLowerCase();
      option.innerText = level;
      difficultySelect.appendChild(option);
    });
    difficultySelect.style.cssText =
      "border: 2px solid lightgrey; background-color: white; color: #FE6B8B;" +
      "padding: 8px; margin: 10px 0;";
    difficultySelect.onchange = () => {
      this.setDifficulty_(difficultySelect.value);
      this.resetGame_();
    };

    const resetDiv = document.createElement("div");

    resetDiv.style.cssText =
      "cursor: pointer; border-top: 1px solid lightgrey; margin-top: 20px;" +
      "color: #FE6B8B; line-height: 40px; font-weight: 800; display: flex; justify-content: center; align-items: center;";
    resetDiv.onclick = this.resetGame_.bind(this);

    const resetIcon = document.createElement("span");

    resetIcon.style.cssText =
      "margin-right: 8px; display: inline-block; width: 16px; height: 16px; background: url('https://img.icons8.com/ios-filled/50/FE6B8B/restart.png') no-repeat center center; background-size: contain;";

    const resetText = document.createElement("span");

    resetText.innerText = "Reset";

    resetDiv.appendChild(resetIcon);
    resetDiv.appendChild(resetText);

    menuDiv.appendChild(titleDiv);
    menuDiv.appendChild(pieceTitleDiv);
    menuDiv.appendChild(pieceDiv);
    menuDiv.appendChild(timeTitleDiv);
    menuDiv.appendChild(timeDiv);
    menuDiv.appendChild(difficultyTitleDiv);
    menuDiv.appendChild(difficultySelect);
    menuDiv.appendChild(resetDiv);
    this.map_.controls[google.maps.ControlPosition.TOP_LEFT].push(menuDiv);
  }

  render() {
    if (!this.dataLoaded_) {
      return;
    }

    this.start_();
  }

  loadData_() {
    const xmlhttpRequest = new XMLHttpRequest();

    xmlhttpRequest.onreadystatechange = () => {
      if (
        xmlhttpRequest.status !== 200 ||
        xmlhttpRequest.readyState !== XMLHttpRequest.DONE
      )
        return;

      this.loadDataComplete_(JSON.parse(xmlhttpRequest.responseText));
    };

    xmlhttpRequest.open(
      "GET",
      "https://storage.googleapis.com/mapsdevsite/json/puzzle.json",
      true,
    );
    xmlhttpRequest.send(null);
  }

  loadDataComplete_(data) {
    this.dataLoaded_ = true;
    this.countries_ = data;
    this.start_();
  }

  setDifficulty_(difficulty) {
    this.difficulty_ = difficulty;
    if (this.map_) {
      this.setDifficultyStyle_();
    }
  }

  setDifficultyStyle_() {
    const styles = {
      easy: [
        {
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
        },
        {
          featureType: "landscape",
          stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
        },
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [{ visibility: "on" }, { weight: 1.3 }],
        },
      ],
      average: [
        {
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
        },
        {
          featureType: "landscape",
          stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
        },
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [{ visibility: "on" }, { weight: 1.3 }],
        },
        {
          featureType: "landscape.natural",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "landscape.man_made",
          stylers: [{ visibility: "off" }],
        },
      ],
      medium: [
        {
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
        },
        {
          featureType: "landscape",
          stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [{ visibility: "on" }, { weight: 1.3 }],
        },
      ],
      moderate: [
        {
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
        },
        {
          featureType: "landscape",
          stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
        },
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
      hard: [
        {
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
        },
        {
          featureType: "landscape",
          stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
        },
      ],
      extreme: [
        {
          elementType: "geometry",
          stylers: [{ visibility: "off" }],
        },
      ],
      impossible: [
        {
          elementType: "geometry",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    };

    this.map_.set("styles", styles[this.difficulty_]);
  }

  resetGame_() {
    this.removeCountries_();
    this.count_ = 0;
    this.setCount_();
    this.startClock_();
    this.addRandomCountries_();
  }

  setCount_() {
    this.pieceDiv_.innerText = this.count_ + " / " + this.NUM_PIECES_;
    if (this.count_ === this.NUM_PIECES_) {
      this.stopClock_();
    }
  }

  stopClock_() {
    window.clearInterval(this.timer_);
  }

  startClock_() {
    this.stopClock_();

    const timeDiv = this.timeDiv_;

    if (timeDiv) timeDiv.textContent = "0 seconds";

    const t = new Date();

    this.timer_ = window.setInterval(() => {
      const diff = new Date().getTime() - t.getTime();

      if (timeDiv) timeDiv.textContent = Math.floor(diff / 1000) + " seconds";
    }, 100);
  }

  addRandomCountries_() {
    this.countries_.sort(() => {
      return Math.round(Math.random()) - 0.5;
    });

    const countries = this.countries_.slice(0, this.NUM_PIECES_);

    for (let i = 0, country; (country = countries[i]); i++) {
      this.addCountry_(country);
    }
  }

  addCountry_(country) {
    const options = {
      strokeColor: '#FE6B8B', 
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FE6B8B', 
      fillOpacity: 0.35,
      geodesic: true,
      map: this.map_,
      draggable: true,
      zIndex: 2,
      paths: country.start.map(google.maps.geometry.encoding.decodePath),
    };
    const poly = new google.maps.Polygon(options);

    google.maps.event.addListener(poly, "dragend", () => {
      this.checkPosition_(poly, country);
    });
    this.polys_.push(poly);
  }

  boundsContainsPoly_(bounds, poly) {
    const b = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds[0][0], bounds[0][1]),
      new google.maps.LatLng(bounds[1][0], bounds[1][1]),
    );
    const paths = poly.getPaths().getArray();

    for (let i = 0; i < paths.length; i++) {
      const p = paths[i].getArray();

      for (let j = 0; j < p.length; j++) {
        if (!b.contains(p[j])) {
          return false;
        }
      }
    }
    return true;
  }

  replacePiece_(poly, country) {
    const options = {
      strokeColor: this.END_COLOR_,
      fillColor: this.END_COLOR_,
      draggable: false,
      zIndex: 1,
      paths: country.end.map(google.maps.geometry.encoding.decodePath),
    };

    poly.setOptions(options);
    this.count_++;
    this.setCount_();
  }

  checkPosition_(poly, country) {
    if (this.boundsContainsPoly_(country.bounds, poly)) {
      this.replacePiece_(poly, country);
    }
  }

  start_() {
    this.setDifficultyStyle_();
    this.resetGame_();
  }

  removeCountries_() {
    for (let i = 0, poly; (poly = this.polys_[i]); i++) {
      poly.setMap(null);
    }

    this.polys_ = [];
  }
}

const loadScript = (url, callback) => {
  const script = document.createElement("script");
  script.src = url;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
};

const MapPuzzle = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI&libraries=geometry`,
      () => {
        const map = new google.maps.Map(mapRef.current, {
          disableDefaultUI: true,
          center: { lat: 10, lng: 60 },
          zoom: 2,
        });

        new Puzzle(map);
      }
    );
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default MapPuzzle;
