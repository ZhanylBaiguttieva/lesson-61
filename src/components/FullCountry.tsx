import React, {useCallback, useEffect, useState} from 'react';
import {APICountry, ApiFullCountry} from '../types';
import axios from 'axios';

interface Props {
  alpha3Code: string | null;
}

const INFO_URL = 'https://restcountries.com/v2/alpha/';
const FullCountry:React.FC<Props> = ({
                                       alpha3Code,
                                       }) => {
  const [country, setCountry] = useState<ApiFullCountry | null> (null);
  const [borders, setBorders] = useState<APICountry[] | null>(null);

  const fetchData = useCallback( async() => {
    if(alpha3Code !== null) {
      const postResponse = await axios.get<ApiFullCountry>(INFO_URL + alpha3Code);
      setCountry(postResponse.data);
    }
  }, [alpha3Code]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const fetchBorderData = useCallback( async() => {
    const result = country?.borders.map( async border => {
      const borderResponse = await axios.get<APICountry>(INFO_URL + border);
      return borderResponse.data;
    });

    if(result !== undefined) {
      const newBorders = await Promise.all(result);
      setBorders(newBorders);
    }
  }, [country?.borders]);

  useEffect(() => {
    void fetchBorderData();
  }, [fetchBorderData]);


  return country && (
    <div className="FullCountry text-start">
      <p className="fs-3"><strong>{country.name}</strong></p>
      <p><strong>Capital: </strong>{country.capital}</p>
      <p><strong>Subregion: </strong>{country.subregion}</p>
      <p><strong>Population: </strong>{country.population}</p>
      {country.borders && (
        <ul className="fw-normal fs-5">Borders with:{borders?.map(border =>
          <li>{border.name}</li>)}</ul>
      )}
    </div>
  );
};

export default FullCountry;