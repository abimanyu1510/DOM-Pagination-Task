const title=document.getElementById("title").innerText="Pagination Task";
const description=document.getElementById("description").innerText="Pagination in Manipulation task";


const dataList = document.getElementById("data-list");
const pagination = document.getElementById("pagination");
const itemsPerPage = 10;
let currentPage = 1;
let data = [];

async function fetchData() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
    const json = await response.json();
    data = json;
    displayList(data, currentPage);
    setupPagination(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayList(items, page) {
  dataList.innerHTML = '';

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = items.slice(start, end);

  const table = document.createElement("table");
  table.innerHTML = `
    <thead id="thead">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="table-body"></tbody>
  `;

  const tableBody = table.querySelector("#table-body");

  paginatedItems.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
    `;
    tableBody.appendChild(row);
  });

  dataList.appendChild(table);
}

function setupPagination(items) {
  pagination.innerHTML = '';

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const firstButton = createPaginationButton('First', () => goToPage(1));
  const lastButton = createPaginationButton('Last', () => goToPage(pageCount));
  const previousButton = createPaginationButton('Previous', () => goToPage(currentPage - 1));
  const nextButton = createPaginationButton('Next', () => goToPage(currentPage + 1));

  pagination.appendChild(firstButton);
  pagination.appendChild(previousButton);

  for (let i = 1; i <= pageCount; i++) {
    const button = createPaginationButton(i, () => goToPage(i));
    pagination.appendChild(button);
  }

  pagination.appendChild(nextButton);
  pagination.appendChild(lastButton);

  highlightActiveButton();
}

function createPaginationButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function goToPage(page) {
  if (page < 1) {
    currentPage = 1;
  } else if (page > Math.ceil(data.length / itemsPerPage)) {
    currentPage = Math.ceil(data.length / itemsPerPage);
  } else {
    currentPage = page;
  }
  displayList(data, currentPage);
  highlightActiveButton();
}

function highlightActiveButton() {
  const buttons = pagination.getElementsByTagName("button");
  for (let button of buttons) {
    button.classList.remove("active");
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add("active");
    }
  }
}

fetchData();
