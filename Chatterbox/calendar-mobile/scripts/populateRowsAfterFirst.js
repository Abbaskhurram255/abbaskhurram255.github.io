//fill the next rows

var populateRowsAfterFirst = function(htmlElements, constants, state, helperFunctions, numberOfNonBlankSpacesInFirstRow, NumOfRowsAfterFirst, daysInMonth ) {
	var firstDayOfNextRow = numberOfNonBlankSpacesInFirstRow + 1;
	for(var i = 0; i < NumOfRowsAfterFirst; i++) {
		tr = document.createElement('tr');
		htmlElements.tbody.appendChild(tr);	//add empty row to the table
		helperFunctions,createSingleRow(constants, state, helperFunctions, firstDayOfNextRow, daysInMonth);
		firstDayOfNextRow += 7;				
	}
}