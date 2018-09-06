import React, { Component } from 'react';
import './WeatherSearch.css';

class WeatherSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null
        }
    }

    srchTermHandler = (e) => {
        if (!!e.target.value) {
            this.setState({
                location: e.target.value
            });
        }
    }

    render() {
        return (
            <div className='WeatherSearch'>
                    <p>Enter a city or zipcode to get weather information.</p>
                    <input type='text' maxLength='20' onChange={this.srchTermHandler} />
                    <button onClick={this.props.search.bind(this, this.state.location)}>Search</button>
            </div>
        )
    }
}

export default WeatherSearch;
