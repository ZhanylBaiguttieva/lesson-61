import  {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {APICountry, ApiFullCountry} from '../types';
import Country from '../components/Country';
import FullCountry from '../components/FullCountry';

const BASE_URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const INFO_URL = 'https://restcountries.com/v2/alpha/';
const List = () => {
  const[countries, setCountries] = useState<APICountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState <string | null>(null);


  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const countriesResponse = await axios.get<APICountry[]>(BASE_URL);

      const promises = countriesResponse.data.map(async (country) => {
        const countryUrl = INFO_URL + country.alpha3Code;
        const userResponse = await axios.get<ApiFullCountry>(countryUrl);

        return{
          name: country.name,
          alpha3Code: userResponse.data.alpha3Code,
          population: userResponse.data.population,
        };
      });

      const newCountries = await Promise.all(promises);
      setCountries(newCountries);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="d-flex">
        <section className="Countries">
          {loading && (
            <h1>Loading!</h1>
          )}
          {countries.map((country) => (
            <Country
              name={country.name}
              onClick={() => setSelectedCountryCode(country.alpha3Code)}
            />
          ))}
        </section>
        <section>
          <FullCountry alpha3Code={selectedCountryCode} />
        </section>
      </div>
    </>
  );
};

export default List;