function constructTableRowsHtml(rowData) {
  return rowData
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
    )
    .join("");
}
function constructTableHeadHtml(headings) {
  return `<tr>${headings.map((heading) => `<th>${heading}</th>`).join("")}</tr>`;
}
function getPublications(publicationsData) {
  const publicationsByYear = {};

  publicationsData.forEach((publication) => {
    const { year, title, authors } = publication;

    if (!authors) return; // Skip publications without authors

    const authorList = Array.isArray(authors.author)
      ? authors.author
      : [authors.author]; // Ensure authors is always an array

    if (!publicationsByYear[year]) {
      publicationsByYear[year] = [];
    }

    publicationsByYear[year].push({
      title,
      authors: authorList,
      year,
    });
  });

  return publicationsByYear;
}
function getYears(publications) {
  const years = Object.keys(publications); // Get all keys as strings
  return years.sort((a, b) => parseInt(a, 10) - parseInt(b, 10)); // Sort as numbers but keep them as strings
}
function fillOptionList(years) {
  const selectElement = document.querySelector("select");
  selectElement.innerHTML = ""; // Clear existing options

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectElement.appendChild(option);
  });

  // Add "All" option
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  selectElement.appendChild(allOption);
}
function constructPublicationRowData(publications, years) {
  const rowData = [];

  years.forEach((year) => {
    if (publications[year]) {
      publications[year].forEach((publication) => {
        const firstAuthor = publication.authors[0].text;
        const coAuthors = publication.authors
          .slice(1)
          .map((author) => author.text)
          .join(", ");
        rowData.push([year, publication.title, firstAuthor, coAuthors || ""]);
      });
    }
  });

  return rowData;
}
function constructPublicationsTableHtml(publications, year = null) {
  const headings = ["Year", "Title", "The 1st author", "Co-authors"];
  const years = year === "all" || year === null ? Object.keys(publications) : [year];
  const rowData = constructPublicationRowData(publications, years);

  const tableHeadHtml = constructTableHeadHtml(headings);
  const tableRowsHtml = constructTableRowsHtml(rowData);

  return `
    <table>
      <caption>Publications</caption>
      <thead>${tableHeadHtml}</thead>
      <tbody>${tableRowsHtml}</tbody>
    </table>
  `;
}
function init() {
  const publications = getPublications(publicationsData);
  const years = getYears(publications);

  // Fill the select options
  fillOptionList(years);

  // Set the table to show publications from the first year
  const container = document.getElementById("container");
  container.innerHTML = constructPublicationsTableHtml(publications, years[0]);

  // Attach event handler to the form
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedYear = document.querySelector("select").value;
    const year = selectedYear === "all" ? "all" : parseInt(selectedYear, 10);

    container.innerHTML = constructPublicationsTableHtml(publications, year);
  });
}