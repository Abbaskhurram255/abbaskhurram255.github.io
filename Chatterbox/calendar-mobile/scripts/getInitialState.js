var getInitialState = function (constants) {
	var d = new Date();
	var todaysMonthNumber = d.getMonth() + 1;
	var todaysMonthName = constants.monthsArray[todaysMonthNumber-1]

	var state = {
		displayed: {
			year: d.getFullYear(),
			month: d.getMonth() + 1
		},
		today: {
			date: d.getDate(),
			day: d.getDay(),
			dayName: constants.daysArray[d.getDay()],
			month: {
				number: todaysMonthNumber,
				name: todaysMonthName
			},
			year: d.getFullYear()
		}
	}
	return state;
}