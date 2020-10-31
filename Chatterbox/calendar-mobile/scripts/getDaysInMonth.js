// Add how many days are in each month
var getDaysInMonth = function(month, year) {
	if(month === 1 ||
	   month ===	3 ||
	   month ===	5 ||
	   month ===	7 ||
	   month ===	8 ||
	   month ===	10 ||
	   month ===	12) {
	   days = 31;
	} else if(month === 2) {
		var div = year/4;
		if (Math.round(div) === div) {
			days = 29;
		} else {
			days = 28;
		}
	} else {
		days = 30;
	}
	return days;
}