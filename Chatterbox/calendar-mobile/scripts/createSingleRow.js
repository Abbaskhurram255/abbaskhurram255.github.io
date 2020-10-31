function createSingleRow(constants, state, helperFunctions, firstDayOfNextRow, daysInMonth) {
	for(var j = 0; j < 7; j++) {
		var td = document.createElement('td');	
		td.dataset.day = constants.daysArray[j];
		td.dataset.month = state.displayed.month;
		td.dataset.year = state.displayed.year;
		var dayNumber = firstDayOfNextRow + j;
		var tdContent;
		if (dayNumber <= daysInMonth)	{
			td.className = "selectable-day";
			tdContent = dayNumber;
		} else {
			tdContent = "";
		}
		td.innerHTML = tdContent;		
		tr.appendChild(td);
		
	}
}	