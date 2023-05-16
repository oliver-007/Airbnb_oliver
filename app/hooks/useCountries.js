import countries from "world-countries";

const formatedCountries = countries.map((country) => {
  const { cca2, name, flag, latlng, region } = country;
  return {
    value: cca2,
    label: name.common,
    flag: flag,
    latlng: latlng,
    region: region,
  };
});

const useCountries = () => {
  const getAll = () => formatedCountries;

  const getByValue = (value) => {
    return formatedCountries.find((item) => item.value === value);
  };

  return { getAll, getByValue };
};

export default useCountries;
