const COVIDOCS_BASE_URL = "http://localhost:3001/covidocs";

const fetchData = (endpoint) => fetch(COVIDOCS_BASE_URL + endpoint).then(res => res.json());

const coviDocService = {
    getWorldwideStatistics: () => fetchData("/worldwide-stats"),
    getCountryRegions: () => fetchData("/country-regions"), 
    getCoviDocsByCountryRegion: (countryRegion) => fetchData("/country-region-stats?name=" + countryRegion),
    getProvinceStatesByCountryRegion: (countryRegion) => fetchData("/province-states?country_region=" + countryRegion),
    getCoviDocsByProvinceState: (countryRegion, provinceState) => fetchData("?country_region=" + countryRegion + "&province_state=" + provinceState)
};

export default coviDocService;