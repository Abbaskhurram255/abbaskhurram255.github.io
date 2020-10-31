
function createOneMonthForwardFunction(htmlElements, constants, state, helperFunctions) {
	// show next month until it gets to December
	// when it gets to December, the year adds 1, and the month becomes January
	return function(event) {
		var displayedMonth = state.displayed.month;
		var displayedYear = state.displayed.year;

		if(displayedMonth < 12) {
			var newYear = displayedYear;
			var newMonth = displayedMonth + 1;
		} else {	
			var newYear = displayedYear + 1;
			var newMonth = 1;		
		}
		helperFunctions.moveOneMonth(htmlElements, constants, state, helperFunctions, newMonth, newYear);
	}
	
}

function createOneMonthBackwardFunction (htmlElements, constants, state, helperFunctions)	{
	// show previous month until it gets to January
	// when it gets to January, the year loses 1, and the month becomes December
	return function(event) {
		var displayedMonth = state.displayed.month;
		var displayedYear = state.displayed.year;
		if(displayedMonth > 1) {
			var newYear = displayedYear;
			var newMonth = displayedMonth - 1;
		} else {	
			var newYear = displayedYear - 1;
			var newMonth = 12;		
		}
		helperFunctions.moveOneMonth(htmlElements, constants, state, helperFunctions, newMonth, newYear);
	}
}