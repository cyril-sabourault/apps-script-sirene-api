const API_URL_TEMPLATE = "https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale%3A%22{companyName}%22%20AND%20etablissementSiege%3Atrue";
const API_TOKEN = "REDACTED_API_TOKEN";

/**
  MAIN
 */
function SIRENE(companyName, forceRefresh = false) {
    if (!forceRefresh) {
        let cachedPostalCode = getCachedPostalCode_(companyName);
        if (cachedPostalCode) return cachedPostalCode;
    }

    let companyData = fetchCompanyData_(companyName);
    if (!companyData || !companyData.etablissements || companyData.etablissements.length === 0) {
        throw new Error('No establishments found for the given company name.');
    }

    let address = companyData.etablissements[0].adresseEtablissement;
    let postalCode = address.codePostalEtablissement;
    cachePostalCode_(companyName, postalCode);

    return postalCode;
}


/**
  API SIRENE:
  - [Utiliser les API de l’Insee (pdf)]:  https://www.sirene.fr/static-resources/documentation/Insee_API_publique_modalites_connexion.pdf
  - [API Reference (Swagger)]:            https://portail-api.insee.fr/catalog/api/2ba0e549-5587-3ef1-9082-99cd865de66f/doc?page=6548510e-c3e1-3099-be96-6edf02870699
  - [Recherche sur une variable]:         https://www.sirene.fr/static-resources/documentation/multi_histo_non_histo_311.html
 */
function fetchCompanyData_(companyName) {
    let apiUrl = API_URL_TEMPLATE.replace("{companyName}", encodeURIComponent(companyName));
    let headers = { "X-INSEE-Api-Key-Integration": API_TOKEN };

    let response = UrlFetchApp.fetch(apiUrl, {
        method: 'GET',
        headers: headers
    });

    let responseData = response.getContentText();
    return JSON.parse(responseData);
}


/**
 * CACHING
 */
function getCachedPostalCode_(companyName) {
    return CacheService.getScriptCache().get(companyName);
}

function cachePostalCode_(companyName, postalCode) {
    return CacheService.getScriptCache().put(companyName, postalCode);
}


/**
  TEST FUNCTIONS
 */
function testCACHE() {
    console.log(CacheService.getScriptCache().getAll(["Devoteam G Cloud", "Google France"]));
}

function testSIRENE() {
    console.log(SIRENE("Devoteam G Cloud"));
}