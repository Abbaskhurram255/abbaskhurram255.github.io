
var htmlElements = {
	tbody:  document.querySelector(".calendar-body"),
	leftPanel: {
		day: document.querySelector('.left-panel-day'),
		date: document.querySelector('.left-panel-date')
	},
	calendarTitle: {
		month:  document.querySelector(".title-month"),
		year:  document.querySelector(".title-year")
	},
	dates: document.getElementsByClassName('selectable-day'),
	navs: {
		prev: document.querySelector('.prev'),
		next: document.querySelector('.next')
	}
}

var helperFunctions = {
	getDaysInMonth: getDaysInMonth, 
	moveOneMonth: moveOneMonth, 
	getFirstDayOfMonth: getFirstDayOfMonth, 
	highlightToday: highlightToday, 
	highlightSelectedDay: highlightSelectedDay,
	createSingleRow: createSingleRow, 
	populateRowsAfterFirst: populateRowsAfterFirst, 
	createCalendar: createCalendar, 
	addSelectDayEventListener: addSelectDayEventListener
}

var state = getInitialState(constants);

createCalendar(htmlElements, constants, state, helperFunctions);

createLeftPanel(state);

//navigate calendar
var oneMonthForward = createOneMonthForwardFunction(htmlElements, constants, state, helperFunctions);
var oneMonthBackward = createOneMonthBackwardFunction(htmlElements, constants, state, helperFunctions);

document.onkeydown = function(event) {
    event = event || window.event;
    if(event.keyCode === 37) {
        oneMonthBackward();
    } else if(event.keyCode === 39) {
    	oneMonthForward();
    }
};

htmlElements.navs.prev.addEventListener("click", oneMonthBackward);
htmlElements.navs.next.addEventListener("click", oneMonthForward);