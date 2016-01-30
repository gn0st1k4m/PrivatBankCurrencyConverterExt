var EUR = 0;
var RUB = 1;
var USD = 2;

var currentRates;

function Calculate(){
	var userValue = $("#userValue").val();
	var active = $("#currencyList option:selected").val();

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

		case "uahToEur":
			result = userValue / currentRates[EUR].sale;
			break;

		case "rubToUah":
			result = currentRates[RUB].buy * userValue;
			break;

		case "uahToRub":
			result = userValue / currentRates[RUB].sale;
			break;
	}

	$("#resultValue").val(result.toFixed(2));
}

$(function() {
	$.ajax({
		url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			currentRates = data;

			$("#eurBuy").html(currentRates[EUR].buy);
			$("#eurSale").html(currentRates[EUR].sale);

			$("#rubBuy").html(currentRates[RUB].buy);
			$("#rubSale").html(currentRates[RUB].sale);

			$("#usdBuy").html(currentRates[USD].buy);
			$("#usdSale").html(currentRates[USD].sale);
		}
	});

	$("#userValue").keyup(function(){
		Calculate();
	});
	
	$("#currencyList").change(function(){
		Calculate();
	});
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});