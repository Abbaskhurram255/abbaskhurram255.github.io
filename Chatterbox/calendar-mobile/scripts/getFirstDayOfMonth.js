var getFirstDayOfMonth = function(month, year) {
	return new Date(year, month - 1, 1).getDay();
}