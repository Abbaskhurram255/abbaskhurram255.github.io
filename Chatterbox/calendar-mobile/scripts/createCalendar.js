var createCalendar = function(htmlElements, constants, state, helperFunctions) {
	// create or update html elements to match the input month, year
	var displayedYear = state.displayed.year;
	var displayedMonth = state.displayed.month;
	var monthsArray = constants.monthsArray;
	var daysArray = constants.daysArray;

	var daysInMonth = helperFunctions.getDaysInMonth(displayedMonth, displayedYear);
	var firstDayOfMonth = helperFunctions.getFirstDayOfMonth(displayedMonth, displayedYear)
	var numberOfBlankSpaces = firstDayOfMonth;
	var monthName = monthsArray[displayedMonth-1];

	var tr = document.createElement('tr');	

	htmlElements.tbody.appendChild(tr);

	htmlElements.calendarTitle.month.innerHTML =  monthName;
	htmlElements.calendarTitle.year.innerHTML = displayedYear;

	//blank spaces in first row
	for(var i = 1; i<= numberOfBlankSpaces; i++) {
		var td = document.createElement('td');		
		td.innerHTML = "";
		tr.appendChild(td);			
	}

	//non-blank spaces in first row
	var numberOfNonBlankSpacesInFirstRow = 7 - numberOfBlankSpaces;

	for(var i = 1; i <= numberOfNonBlankSpacesInFirstRow; i++) {
		var date = document.createElement('td');	
		date.className = "selectable-day";
		date.dataset.day = daysArray[numberOfBlankSpaces + i - 1];	
		date.dataset.month = monthName;
		date.dataset.year = displayedYear;
		var dayNumber = i;
		date.innerHTML = dayNumber;
		tr.appendChild(date);		
	}

	//add the rest of the rows to the table
	var NumOfRowsAfterFirst = Math.ceil((numberOfBlankSpaces + days) / 7) - 1;

	//fill the next rows
	helperFunctions.populateRowsAfterFirst(htmlElements, constants, state, helperFunctions, numberOfNonBlankSpacesInFirstRow, NumOfRowsAfterFirst, daysInMonth);

	helperFunctions.highlightToday(htmlElements, state);

	helperFunctions.addSelectDayEventListener(htmlElements);
}


