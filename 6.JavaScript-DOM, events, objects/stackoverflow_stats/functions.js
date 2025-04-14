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