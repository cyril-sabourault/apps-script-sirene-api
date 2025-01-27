/**
  MAIN
 */
function SIRENE(companyName, forceRefresh = false) {
    if (!forceRefresh) {
        let companyCACHE = getCache_(companyName);
        if (companyCACHE) return companyCACHE;
    }

    let company_data = callAPI_(companyName);
    console.log(company_data.etablissements);

    let adresseEtablissement = company_data.etablissements[0].adresseEtablissement
    let codePostal = adresseEtablissement.codePostalEtablissement;
    setCache_(companyName, codePostal);

    return codePostal;
}


/**
  API SIRENE:
  - [Utiliser les API de l’Insee (pdf)]:  https://www.sirene.fr/static-resources/documentation/Insee_API_publique_modalites_connexion.pdf
  - [API Reference (Swagger)]:            https://portail-api.insee.fr/catalog/api/2ba0e549-5587-3ef1-9082-99cd865de66f/doc?page=6548510e-c3e1-3099-be96-6edf02870699
  - [Recherche sur une variable]:         https://www.sirene.fr/static-resources/documentation/multi_histo_non_histo_311.html
 */
function callAPI_(companyName) {
    let API_URL = "https://api.insee.fr/api-sirene/3.11/siret?q=denominationUniteLegale%3A%22" + companyName + "%22%20AND%20etablissementSiege%3Atrue";
    let API_TOKEN = "REDACTED_API_TOKEN";

    let headers = { "X-INSEE-Api-Key-Integration": API_TOKEN };

    let apiResponse = UrlFetchApp.fetch(API_URL, {
        method: 'GET',
        headers: headers
    })

    let apiData = apiResponse.getContentText();
    return JSON.parse(apiData);
}


/**
 * CACHING
 */
function getCache_(companyName) {
    return CacheService.getScriptCache().get(companyName);
}

function setCache_(companyName, codePostal) {
    return CacheService.getScriptCache().put(companyName, codePostal);
}


/**
  TEST FUNCTIONS
 */

function testCACHE() {
    console.log(CacheService.getScriptCache().getAll(["ACOEM", "Google France"]));
}

function testSIRENE() {
    console.log(SIRENE('Devoteam G Cloud'))
}
