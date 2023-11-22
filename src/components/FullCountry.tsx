import React, {useCallback, useEffect, useState} from 'react';
import {ApiFullCountry} from '../types';
import axios from 'axios';

interface Props {

  alpha3Code: string | null;
}

const INFO_URL = 'https://restcountries.com/v2/alpha/';
const FullCountry:React.FC<Props> = ({
                                       alpha3Code,
                                       }) => {
  const [country, setCountry] = useState<ApiFullCountry | null> (null);
  const fetchPost = useCallback( async() => {
    if(alpha3Code !== null) {
      const postResponse = await axios.get<ApiFullCountry>(INFO_URL + alpha3Code);
      setCountry(postResponse.data);
    }
  }, [alpha3Code]);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  return country && (
    <div className="FullCountry">
      <p className="fs-3"><strong>{country.name}</strong></p>
      <p><strong>Capital: </strong>{country.capital}</p>
      <p><strong>Subregion: </strong>{country.subregion}</p>
      <p><strong>Population: </strong>{country.population}</p>
      <h4>Borders with:</h4>
    </div>
  );
};

export default FullCountry;