export interface APIList {
  name: string;
}

export interface APICountry {
  alpha3Code: string;
  name: string;
}

export interface ApiFullCountry {
  alpha3Code: string;
  name: string;
  capital: string;
  subregion: string;
  population: number;
  borders: [];
}