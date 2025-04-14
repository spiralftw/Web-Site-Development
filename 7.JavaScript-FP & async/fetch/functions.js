/**
 * Build yearly technology stats
 *
 * @param {object} techStats StackOverflow stats
 * @returns {object} Year by year stats of technologies mentioned in StackOverflow
 */
function buildYearlyTechStats(techStats) {
  const yearlyStats = {};

  // Iterate over the years in the input object
  for (const year in techStats) {
    yearlyStats[year] = {};

    // Iterate over the keys in each year's data
    for (const key in techStats[year]) {
      // Include only keys that start with "current"
      if (key.startsWith("current")) {
        const currentTech = techStats[year][key];

        // Iterate over the technologies in the current key
        for (const tech in currentTech) {
          // Add the technology and its mentions to the yearly stats
          yearlyStats[year][tech] = currentTech[tech];
        }
      }
    }
  }

  return yearlyStats;
}
/**
 * Update table contents
 *
 * @param {HTMLTableElement} table DOM element for the table
 * @param {object} yearlyTechStats Year by year stats of technologies mentioned in StackOverflow
 * @param {Array<string>} selectedTechs Technologies selected
 * @param {number} firstYear First year of data selected
 * @param {number} lastYear Last year of data selected
 */
function updateTable(table, yearlyTechStats, selectedTechs, firstYear, lastYear) {
  // Clear the table
  table.innerHTML = "";

  // Build the table headings
  const headings = ["Technology", ...Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i)];
  const tableHeadHtml = constructTableHeadHtml(headings);

  // Build the table rows
  const rowData = buildRowData(yearlyTechStats, selectedTechs, firstYear, lastYear);
  const tableRowsHtml = constructTableRowsHtml(rowData);

  // Update the table with the new content
  table.innerHTML = `<thead>${tableHeadHtml}</thead><tbody>${tableRowsHtml}</tbody>`;
}

/**
 * Build row data to be shown in a table
 *
 * @param {object} yearlyTechStats Year by year stats of technologies mentioned in StackOverflow
 * @param {Array<string>} selectedTechs Technologies selected
 * @param {number} firstYear First year of data selected
 * @param {number} lastYear Last year of data selected
 * @returns {Array<string|number>}
 */
function buildRowData(yearlyTechStats, selectedTechs, firstYear, lastYear) {
  const rows = [];

  selectedTechs.forEach((tech) => {
    const row = [tech]; // Start the row with the technology name
    for (let year = firstYear; year <= lastYear; year++) {
      const mentions = yearlyTechStats[year]?.[tech] || 0; // Get mentions or default to 0
      row.push(mentions);
    }
    rows.push(row);
  });

  return rows;
}

/**
 * Get HTML of table rows
 *
 * @param {Array<string|number>} rowData
 * @returns {string} HTML of the table rows
 */
function constructTableRowsHtml(rowData) {
  return rowData
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
    )
    .join("");
}

/**
 * Get HTML of table heading row
 *
 * @param {Array<string|number>} headings Table headings
 * @returns {string} HTML of the heading row
 */
function constructTableHeadHtml(headings) {
  return `<tr>${headings.map((heading) => `<th>${heading}</th>`).join("")}</tr>`;
}

/**
 * Fetch JSON data from a given URL
 *
 * @param {string | URL} url The URL to fetch data from
 * @returns {Promise<object>} A Promise that resolves to the JSON data
 */
function getJSON(url) {
  return fetch(url) // Fetch data from the URL
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      return response.json(); // Parse and return the JSON data
    });
}

/**
 * Fetch StackOverflow data from the API
 *
 * @param {string} apiUrl The base API URL
 * @param {Array<string>} [technologies=null] Optional array of technologies to filter the data
 * @returns {Promise<object>} A Promise that resolves to the JSON data
 */
function getStackOverflowData(apiUrl, technologies = null) {
  let url = new URL(apiUrl); // Create a URL object from the base API URL

  // If technologies are provided, build the query string
  if (technologies && technologies.length > 0) {
    const query = technologies.map((tech) => encodeURIComponent(tech)).join(";");
    url.searchParams.append("tech", query); // Append the query string to the URL
  }

  // Fetch data using the getJSON helper function
  return getJSON(url);
}