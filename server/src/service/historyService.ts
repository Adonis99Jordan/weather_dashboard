// Import fs promises version to read and write to our searchHistory.json file
import { promises as fs } from 'fs';
import {v4} from 'uuid';

class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = v4();
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = 'searchHistory.json';
  }
  // TODO: Define a private read method that reads from the searchHistory.json file - this method will only be accessible within the HistoryService class
  private async read(): Promise<City[]> {
    try {
    // Use fs to read the searchHistory.json file
      const data = await fs.readFile(this.filePath, 'utf8');

    // Using fs will give you unparsed JSON data array
    // return the parsed array - ie. JSON.parse(rawArray);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    // Use fs to overwrite the searchHistory.json file with the stringified array of city objects
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8');
  }
 
  // TODO: Define a get method that returns an array of city objects, using the read method to retrieve the array from searchHistory.json
  async getCities(): Promise<City[]> {
    // Get the array of cites, using the read method
    const cityArray = await this.read();
    return cityArray;
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: City): Promise<void> {
    // Get the array of city objects from searchHistory.json, using this.read
    const citiesArray = await this.getCities();

    // First use citiesArray.find() to check if there is already a city object matching the city name
    // If there is, return without continuing the rest of the code below
    const existingCity = citiesArray.find(c => c.name.toLowerCase() === city.name.toLowerCase());
    if (existingCity) {
      return;
    }
    // Create a city variable that stores a new City object - Pass in the city parameter as an argument
    // Push the new city object to the citiesArray above
    citiesArray.push(city);
    // Use this.write to overwrite the searchHistory.json file with our new array of city objects
    await this.write(citiesArray);
  }

  // // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {
  //   // Get the cities array
  //   const citiesArray = await this.getCities();

  //   // Filter out the city object within citiesArray that has an id matching the id above - ie. citiesArray.filter(() => {})

  //   // Use the write method to overwrite the searchhistory.json file
  //   // console.log a confirmation that the city has been removed
  // }
}

export default new HistoryService();
