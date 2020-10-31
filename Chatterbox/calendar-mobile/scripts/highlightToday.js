function highlightToday(htmlElements, state) {
	var todaysYear = state.today.year;
	var todaysMonth = state.today.month.number;
	var todaysDate = state.today.date;
	var dates = htmlElements.dates;
	if ((state.displayed.month === todaysMonth) && (state.displayed.year === todaysYear)) {
		for(var i = 0; i < dates.length; i++) {
			var dayIsSame = (dates[i].innerHTML == todaysDate);
			if(dayIsSame) {
				dates[i].className = 'current-date';
			}			
		}
	}
}