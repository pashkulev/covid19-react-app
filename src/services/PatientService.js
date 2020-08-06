const PATIENTS_BASE_URL = "http://localhost:3001/patients";

const fetchData = (endpoint) => fetch(PATIENTS_BASE_URL + endpoint).then(res => res.json());

const patientService = {
    getPatientById: (id) => fetchData("/" + id + "/details"),
    getPatients: (params) => fetchData("?" + addQueryParams(params)),
    getCountries: () => fetchData("/countries"),
    getLocationsByCountry: (country) => fetchData("/locations?country=" + country)
    
};

const addQueryParams = (params) => {
    let queryParamsString = "";
    let paramNames = Object.keys(params);

    for (let i = 0; i < paramNames.length - 1; i++) {
        queryParamsString += paramNames[i] + "=" + params[paramNames[i]] + "&";
    }

    if (paramNames.length > 0) {
        const lastIndex = paramNames.length - 1;
        queryParamsString += paramNames[lastIndex] + "=" + params[paramNames[lastIndex]];
    }

    return queryParamsString;
}

export default patientService;