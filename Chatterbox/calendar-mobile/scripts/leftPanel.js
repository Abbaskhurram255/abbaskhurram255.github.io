function createLeftPanel(state) {
	htmlElements.leftPanel.day.innerHTML = state.today.dayName;
	htmlElements.leftPanel.date.innerHTML = state.today.date;
}

function highlightSelectedDay(event) {
	var others = document.getElementsByClassName("selected-day");
	for(var i = 0; i < others.length; i++) {
		others[i].className = "selectable-day";
	}
	event.target.className = "selected-day";	
}

function createChangeLeftPanelFunction(htmlElements) {
	return function(event) {
		htmlElements.leftPanel.date.innerHTML = event.target.innerHTML;
		htmlElements.leftPanel.day.innerHTML = event.target.dataset.day;	
		highlightSelectedDay(event);	
	}

}

function addSelectDayEventListener(htmlElements) {
	var changeLeftPanel = createChangeLeftPanelFunction(htmlElements);
	for(var i = 0; i < htmlElements.dates.length; i++) {
		htmlElements.dates[i].addEventListener("click", changeLeftPanel);	
	}	
}




