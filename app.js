const tableBody = document.querySelector(".savings-table tbody");
const mobileContainer = document.querySelector(".mobile-container");
const productName = document.querySelector(".product-name");
const interestRate = document.querySelector(".interest-rate");
const minimumDeposit = document.querySelector(".minimum-deposit");
const interestType = document.querySelector(".interest-type");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");

let savingsData = [];
let currentMobileItemIndex = 0;

function updateMobileItem(index) {
	const currentItem = savingsData[index];
	productName.textContent = `${currentItem["Product"]}`;
	interestRate.textContent = currentItem["Interest rate"];
	minimumDeposit.textContent = `Minimum deposit: ${currentItem["Minimum Deposit"]}`;
	interestType.textContent = `Interest type: ${currentItem["Interest type"]}`;

	const prevIndex = (index - 1 + savingsData.length) % savingsData.length;
	const nextIndex = (index + 1) % savingsData.length;

	prevButton.textContent = "< " + savingsData[prevIndex]["Product"];
	nextButton.textContent = savingsData[nextIndex]["Product"] + " >";
}

function populateTable() {
	savingsData.forEach((item) => {
		const row = document.createElement("tr");
		row.innerHTML = `
          <td>${item["Product"]}</td>
          <td>${item["Interest rate"]}</td>
          <td>${item["Minimum Deposit"]}</td>
          <td>${item["Interest type"]}</td>
        `;
		tableBody.appendChild(row);
	});
}

// Fetch data and store it
fetch("./products.json")
	.then((resp) => resp.json())
	.then((data) => {
		savingsData = data;
		populateTable();
		updateMobileItem(currentMobileItemIndex);

		prevButton.addEventListener("click", () => {
			currentMobileItemIndex =
				(currentMobileItemIndex - 1 + savingsData.length) % savingsData.length;
			updateMobileItem(currentMobileItemIndex);
		});

		nextButton.addEventListener("click", () => {
			currentMobileItemIndex =
				(currentMobileItemIndex + 1) % savingsData.length;
			updateMobileItem(currentMobileItemIndex);
		});
	});
