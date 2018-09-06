import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './WeatherInfo.css';

const feather = require('feather-icons');

const WeatherInfo = (props) => {
    if (!!props.err) {
        return (
            <div className='WeatherInfo'>
                <div className='error'>{props.err}</div>
            </div>
        )
    }

    if (!!props.loading) {
        return (
            <div className='WeatherInfo'>
                <div className="WeatherInfo_loading">
                    <svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-loader">
                            <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                </div>
            </div>
        )
    }

    const   iconVal = props.icon,
            iconMap = {
                'clear-day': 'sun',
                'rain': 'cloud-drizzle',
                'snow': 'cloud-snow',
                'wind': 'wind',
                'cloudy': 'cloud',
                'partly-cloudy-day': 'cloud',
                'partly-cloudy-night': 'cloud'
            };
            
            let iconSVG = null;
            if (iconMap[iconVal]) {
                iconSVG = feather.icons[iconMap[iconVal]];
            }
    return (
        <div className='WeatherInfo'>
            <div className='WeatherInfo_icon'>
            {
                (iconSVG) ? 
                <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24"
                        fill="none"
                        stroke={iconSVG.attrs.stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-cloud-drizzle">
                            {ReactHtmlParser(iconSVG.toString())}
                        </svg>
                : null
            }
            </div>
            <div className='WeatherInfo_temp'>{props.temp}&deg;</div>
            <div className='WeatherInfo_feelsLike'>feels like {props.feelsLike}</div>
            <div className='WeatherInfo_wind'>wind {props.wind} mph</div>
            <div className='WeatherInfo_name'>{props.name}</div>
        </div>
    )
}

export default WeatherInfo;
