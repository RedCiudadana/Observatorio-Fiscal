const fs = require('fs');
const EleventyFetch = require("@11ty/eleventy-fetch");
const { AssetCache } = require("@11ty/eleventy-fetch");

module.exports = async function () {
  // URL for the new API
  const url = 'https://data-dataverso.netlify.app/assets/conjuntos/ranking_municipal_segeplan.json';

  // Fetch options (no authorization needed for this URL)
  const fetchOptions = {
    // You can add more headers if needed
  };

  const data = await EleventyFetch(url, {
    fetchOptions,
    duration: "1h", // save for 1 hour
    type: "json"    // parse JSON
  });

  // Cache item resource to get cached response
  let asset = new AssetCache(url);

  if (asset.isCacheValid('1h')) {
    return data;
  }

  asset.save(data, 'json');

  // Convert the data to JSON
  const jsonData = JSON.stringify(data, null, 2);

  // Define the file path where you want to save the JSON file
  const outputPath = 'jsons/ingresos_municipales.json';

  // Write the JSON data to the file
  try {
    fs.writeFileSync(outputPath, jsonData, 'utf8');
    console.log(`JSON data successfully written to ${outputPath}`);
  } catch (error) {
    console.error('Error writing JSON data:', error);
  }

  return data;
};