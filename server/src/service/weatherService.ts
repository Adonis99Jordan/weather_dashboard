// Import axios to make our http requests to the OpenWeatherMap API
import axios from 'axios';
import dayjs from 'dayjs';

// TODO: Complete the WeatherService class
class WeatherService {
  // Define the baseURL and API key properties
  baseURL: string;
  apiKey: string;

  constructor() {
    // TODO: Assign the properties baseURL and apiKey using process.env
    this.baseURL = process.env.BASE_URL || 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.API_KEY || '9021431edbdec43ce8fc5b3efa0154ea';
  }

  // TODO: Create fetchLocationData method
  async fetchLocationData(city: string) {
    const url = `${this.baseURL}/weather?units=imperial&q=${city}&appid=${this.apiKey}`
    const res = await axios.get(url);
    return res.data;
  }

  async getForecastWeatherForCity(city: string) {
    // Create the url variable using this.baseURL + '/forecast', a query parameter of 'units' set to imperial, a query parameter of 'q' set to the city parameter above and a query parameter of appid set to this.apiKey
    const url = `${this.baseURL}/weather?units=imperial&q=${city}&appid=${this.apiKey}`;

    // Make a fetch request to OpenWeatherMap using the url above constructed above
    const res = await axios.get(url);

    // Please console.log res.data so you can see how the returned data is structured - The 5 day forecast will be provided to you in an array of 40 objects. Each object represents a 3-hour segment of time. 
    console.log(res.data);
    // return the array of of 40 weather objects
    const forecastData = res.Data.list;
    
    // BONUS: filter the array of 40 objects down to just objects that have a dt_txt that includes '12:00'
    const filteredData = forecastData.filter((item: any) => item.dt_text.includes('12:00'));
    
    return filteredData;

  }

  // TODO: Complete getCurrentWeatherForCity method
  async getCurrentWeatherForCity(city: string) {
    // Create the url variable using this.baseURL + '/weather', a query parameter of 'units' set to imperial, a query parameter of 'q' set to the city parameter above and a query parameter of appid set to this.apiKey
    const url = `${this.baseURL}/weather?units=imperial&q=${city}&appid=${this.apiKey}`;

    // Make a fetch request to OpenWeatherMap using the url constructed above
    const res = await axios.get(url);

    // Create a data object from the weather data you receive
    const data = {
      city: res.data.name, // this is completed for you as an example
      date: dayjs(res.data.dt * 1000).format('MM/DD/YYYY'), // Use the already installed dayjs package to convert res.data.dt * 1000 into a formatted date like '10/17/2024'
      icon: res.data.weather[0].icon,
      iconDescription: res.data.weather[0].description,
      tempF: res.data.main.temp,
      windSpeed: res.data.wind.speed,
      humidity: res.data.main.humidity
    };

    // Return the custom data object of weather information
    return data;
  }
}

// Export a constructed/instatiated object, using our WeatherService class above
export default new WeatherService();
