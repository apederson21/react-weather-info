import React, { Component } from 'react';
import './App.css';

import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';

class App extends Component {
  state = {
    data: {
      temp: null,
      name: null,
      feelsLike: null,
      icon: null,
      wind: null
    },
    err: null,
    loading: false
  };

  /**
   * Search Google api for Lat/Lng,
   * then Darksky api by Lat/Lng,
   * and set weather state
   */
  searchLocation = (loc) => {
    if (loc) {
      this.setState({
        loading: true
      });
      fetch(`http://localhost:3001/get-weather?loc=${loc}`)
        .then((weatherInfo) => {
          return weatherInfo.json();
        })
        .then((data) => {
          if (!!data.error) {
            throw data.error;
          }
          this.setState({
            data: {
              temp: data.temp,
              name: data.name,
              feelsLike: data.feelsLike,
              icon: data.icon,
              wind: data.wind
            },
            err: null
            ,
            loading: false
          })
        })
        .catch((err) => {
          this.setState({
            data: {
              temp: null,
              name: null,
              feelsLike: null,
              icon: null,
              wind: null
            },
            err: err,
            loading: false
          })
        });
    }
  }

  render() {
    return (
      <div className="App">
        <WeatherSearch
          search={this.searchLocation} />
        {
          (!!this.state.data.temp || !!this.state.err || !!this.state.loading) ? <WeatherInfo 
                                  temp={this.state.data.temp}
                                  name={this.state.data.name}
                                  feelsLike={this.state.data.feelsLike}
                                  icon={this.state.data.icon}
                                  wind={this.state.data.wind}
                                  err={this.state.err}
                                  loading={this.state.loading} /> : null
        }
      </div>
    );
  }
}

export default App;
