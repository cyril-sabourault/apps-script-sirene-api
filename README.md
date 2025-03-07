# AppsScript Sirene API

This project provides a Google Apps Script to fetch and cache postal codes for companies using the SIRENE API.

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/apps-script-sirene-api.git
   ```

2. **Open the project in Google Apps Script:**
   - Go to [Google Apps Script](https://script.google.com/).
   - Create a new project and copy the contents of `code.gs` into the script editor.

3. **Set up the API Token:**
   Create an account and set up an application to get an API token. This [linked PDF][utiliser-les-api-de-l’insee] details the process well.
   - Replace `REDACTED_API_TOKEN` in `code.gs` with your actual SIRENE API token.

## Usage

1. **Fetch Postal Code:**

    In a spreadsheet cell, use the `=SIRENE(companyName)` function to fetch the postal code for a company name.

2. **Test Functions:**
   - Run `testCACHE()` to see cached postal codes.
   - Run `testSIRENE()` to fetch and log the postal code for 'Devoteam G Cloud'.

## References

- [Utiliser les API de l’Insee (pdf)][utiliser-les-api-de-l’insee]
- [API Reference (Swagger)][api-reference]
- [Recherche sur une variable][recherche-sur-une-variable]

[utiliser-les-api-de-l’insee]: https://www.sirene.fr/static-resources/documentation/Insee_API_publique_modalites_connexion.pdf
[api-reference]: https://portail-api.insee.fr/catalog/api/2ba0e549-5587-3ef1-9082-99cd865de66f/doc?page=6548510e-c3e1-3099-be96-6edf02870699
[recherche-sur-une-variable]: https://www.sirene.fr/static-resources/documentation/multi_histo_non_histo_311.html
