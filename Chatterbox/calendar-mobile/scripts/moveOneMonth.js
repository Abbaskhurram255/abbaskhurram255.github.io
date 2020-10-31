var moveOneMonth = function(htmlElements, constants, state, helperFunctions, newMonth, newYear) {

	var newMonthName = constants.monthsArray[newMonth - 1];

	var daysInMonth = helperFunctions.getDaysInMonth(newMonth, newYear);

	state.displayed.year = newYear;
	state.displayed.month = newMonth;

	while(htmlElements.tbody.hasChildNodes()) {
		htmlElements.tbody.removeChild(htmlElements.tbody.lastChild);
	}

	helperFunctions.createCalendar(htmlElements, constants, state, helperFunctions);
}