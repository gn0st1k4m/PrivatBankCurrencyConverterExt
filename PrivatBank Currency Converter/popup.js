var USD = 0;
var EUR = 1;
var RUB = 2;

var currentRates;

function GetRate(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var xmlDoc = xhr.responseXML;

				var eur = xmlDoc.getElementsByTagName("exchangerate")[0];
				var rub = xmlDoc.getElementsByTagName("exchangerate")[1];
				var usd = xmlDoc.getElementsByTagName("exchangerate")[2];

				currentRates = [{
					buy: usd.getAttribute("buy"),
					sale: usd.getAttribute("sale")
				}, {
					buy: eur.getAttribute("buy"),
					sale: eur.getAttribute("sale")
				}, {
					buy: rub.getAttribute("buy"),
					sale: rub.getAttribute("sale")
				}];

				document.getElementById("usdBuy").innerHTML = currentRates[USD].buy;
				document.getElementById("usdSale").innerHTML = currentRates[USD].sale;

				document.getElementById("eurBuy").innerHTML = currentRates[EUR].buy;
				document.getElementById("eurSale").innerHTML = currentRates[EUR].sale;

				document.getElementById("rubBuy").innerHTML = currentRates[RUB].buy;
				document.getElementById("rubSale").innerHTML = currentRates[RUB].sale;
			}
		}
	};
	xhr.send(null);
}


function Calculate(){
	var userValue = document.getElementById("value").value;
	var element = document.getElementById("currencyList");
	var active = element.options[element.selectedIndex].value;

	var result = 0;

	switch(active){
		case "usdToUah":
			result = currentRates[USD].buy * userValue;
			break;

		case "uahToUsd":
			result = userValue / currentRates[USD].sale;
			break;

		case "eurToUah":
			result = currentRates[EUR].buy * userValue;
			break;

		case "uahToeur":
			result = userValue / currentRates[EUR].sale;
			break;

		case "rubToUah":
			result = currentRates[RUB].buy * userValue;
			break;

		case "uahToRub":
			result = userValue / currentRates[RUB].sale;
			break;
	}

	document.getElementById("resultValue").value = result.toFixed(2) + " $";
}

document.addEventListener('DOMContentLoaded', function () {
	GetRate();

	document.getElementById("value").onkeyup = Calculate;
	document.getElementById("value").onpaste = function(){setTimeout(Calculate, 0);}; // after paste event
	document.getElementById("currencyList").onchange = Calculate;
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});