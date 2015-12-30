var currentUsdRate;
var currentEurRate;

function GetRate(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var xmlDoc = xhr.responseXML;
				currentEurRate = xmlDoc.getElementsByTagName("exchangerate")[0].getAttribute("sale");

				currentUsdRate = xmlDoc.getElementsByTagName("exchangerate")[2].getAttribute("sale");


				document.getElementById("usdRate").innerHTML = currentUsdRate;

				document.getElementById("eurRate").innerHTML = currentEurRate;
			}
		}
	};
	xhr.send(null);
}


function Calculate(){
	var userValue = document.getElementById("value").value;
	var active = document.querySelector('input[name="currency"]:checked').value;

	document.getElementById("resultValue").style.color = "red";

	switch(active){
		case "USD":
			document.getElementById("resultValue").value = Math.ceil(currentUsdRate * userValue) + " ₴";
			break;

		case "UAH":
			document.getElementById("resultValue").value = Math.ceil(userValue / currentUsdRate) + " $";
			break;
	}
}

document.addEventListener('DOMContentLoaded', function () {
	GetRate();

	document.getElementById("value").onkeyup = Calculate;
	document.getElementById("₴").onchange = Calculate;
	document.getElementById("$").onchange = Calculate;
});