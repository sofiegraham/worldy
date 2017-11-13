import React, { Component } from 'react';
import countryJson from './workingOutGeo.js';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      geoJson: {}
    }
    this.geoJson;

  }

  componentDidMount() {
    var mapboxAccessToken = 'pk.eyJ1Ijoic29maWVncmFoYW0iLCJhIjoiY2o5dzB4cnVuMGYzdTJ4bWRqYTM4NGh2eCJ9.IPE6P6L3wKGkGYmj52W8qQ';
    var map = L.map('mapid', {zoomControl:false}).setView([0.0, 0.0], 2);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
        id: 'mapbox.light',
        maxZoom: 2,
        minZoom: 2,
    }).addTo(map);

    const geoJson = L.geoJson(countryJson, {style: this.style}).addTo(map);
    this.geoJson = geoJson;
    
    this.setState({
      map: map,
    })

  }

  componentDidUpdate() {
    //debugger;
    // layer.clearLayers(); // inherited from LayerGroup
    // layer.addData(newData);

    // this.state.map.eachLayer(layer => {
    //   console.log(layer);
    //   this.state.map.removeLayer(layer);
    // });
    this.state.map.removeLayer(this.geoJson);

    const geoJSON = {"type":"FeatureCollection","features":[]};
    this.props.countries.map(country => {
      const userCountry = this.props.userCountries.find((el) => {
        return el.CountryId === country.id
      });
      if(userCountry && country.geometry) {
        country.geometry.score = userCountry.score;
        geoJSON.features.push(country.geometry);
      }
      return country.geometry;
    });

    const geoJson = L.geoJson(geoJSON, {style: this.style}).addTo(this.state.map);

    this.geoJson = geoJson;

    

    

  }

  getColor = (score) => {
    return score === 0 ? '#d8d8d8' : '#02d188';
  }

  style = (feature) => {
    return {
      fillColor: this.getColor(feature.score),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }


  render() {
    return (
      <div id="mapid">MAP</div>
    );
  }
}

export default Map;