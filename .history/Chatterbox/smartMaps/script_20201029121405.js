var map, infoWindow;
var destinationLocations; //a2d array containing markers and associated place info as well as if info is cached or not
var currentLocation; //an array containing the marker location and place info as well as if info is cached or not
var startingLocations; //a 2d array contianing markers and associated place info as well as if info is cached or not
var savedPlaces;

var currentLocationIcon = "static/icons/currentLocationIcon.png";
var destinationIcon = "static/icons/destinationIcon.png";
const selectDestination = document.getElementById("defaultCheck1");

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const centerBtn = document.getElementById("centerBtn");
const showAllBtn = document.getElementById("showAllBtn");

var startingPointLabels = 0;

window.onload= function(){
	debugger;
	loadSavedPlaces();
}

function loadSavedPlaces(){
	savedPlaces = JSON.parse(localStorage.getItem("savedPlaces"));
	if(savedPlaces==null)
		savedPlaces=[];

	createSavedPlacesCards();
}

function createSavedPlacesCards(){
	let accordion = document.getElementById("savedAccordion");
	if(savedPlaces.length>0)
		accordion.innerHTML = "";

	savedPlaces.forEach((placeBasicInfo, i)=>{
		accordion.innerHTML += `
		<div class="card" id="${i}">
			<div class="card-header" id="headingOne">
				<h5 class="mb-0">
					<span style = "vertical-align: middle; display: flex; align-items: center;">
						<button class="btn btn-link" data-toggle="collapse" data-target="#collapseSaved${i}" aria-expanded="false" aria-controls="collapseSaved${i}">
							<i class="far fa-caret-square-down"></i>
						</button>
						<h6 class="placeTitle" onclick="setCurrentLocation('${savedPlaces[i][0]}, ${savedPlaces[i][1]}', '${savedPlaces[i][3]}')" style="margin-left:10px; margin-top: 0.4rem; text-align: start;">${savedPlaces[i][3]}</h6>
						<button data-toggle="tooltip" title="Remove" type="button" onclick="removeSavedLocation(${i})" class="savedBtn btn btn-outline-dark"><i class="far fa-trash-alt" style="font-size: 10px;"></i></button>
					</span>
				</h5>
			</div>

			<div id="collapseSaved${i}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				<div class="card-body">${savedPlaces[i][2]}</div>
			</div>
		</div>
	
		`
	});
}


function removeSavedLocation(index){
	savedPlaces.splice(index, 1);
	if(savedPlaces.length===0)
		savedPlaces=null;
	localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));
	let cardToDel = document.getElementById(index);
	cardToDel.parentElement.removeChild(cardToDel);
	if(savedPlaces===null){
		document.getElementById("savedAccordion").innerHTML=`
			<div class="card border-light mb-3">
  				<div class="card-header d-flex align-items-center justify-content-center" style="border-bottom: 0; height: 63px;"><i class="far fa-folder-open" style="font-size: 1.5rem">...</i>
  				</div>
			</div>

		`
	}

}

function createMap(){
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 45.4215, lng: -75.6972},
		zoom: 10
	});
	infoWindow = new google.maps.InfoWindow({
		content: " "
	});
	var input = document.getElementById("searchBox");
	var searchBox = new google.maps.places.SearchBox(input);

	//no markers assigned as of yet
	startingLocations = []; 
	destinationLocations = [];
	currentLocation = [];

	//biasing the search box to look within the current bounds of the map
	map.addListener("bounds_changed", function(){
		searchBox.setBounds(map.getBounds());
	});

	//upon detecting a location has been searched by clicking on one or pressing enter
	searchBox.addListener("places_changed", function(){
		var placesFound = searchBox.getPlaces();
		let placesToDisplay = 1;

		if(placesFound.length===0)
			return;

		//searching for destination vs starting point
		if(selectDestination.checked===true){
			placesToDisplay = placesFound.length;
			destinationLocations.forEach((place)=>{
				place[0].setMap(null); //get rid of map reference from marker
			});
			destinationLocations=[];
		} else{
			placesToDisplay = 1;

			if(currentLocation.length>0){
				currentLocation[0].setMap(null);
			}
			currentLocation=[];
		}

		var bounds = new google.maps.LatLngBounds();

		//creating markers at each place found and putting them at respective location
		for(var i = 0; i<placesToDisplay; i++){
			if(!placesFound[i].geometry)
				return;

			if(selectDestination.checked===true){
				destinationLocations.push([createMarker(map, placesFound[i].geometry.location, placesFound[i].name, destinationIcon, null), placesFound[i], false]);
			} else{
				currentLocation.push(createMarker(map, placesFound[i].geometry.location, placesFound[i].name, currentLocationIcon, null));
				currentLocation.push(placesFound[i]);
				currentLocation.push(false);
			}

			//To fit all markers within bounds of map
			if (placesFound[i].geometry.viewport) {
	      		// Only geocodes have viewport.
	      		bounds.union(placesFound[i].geometry.viewport);
	    	} else {
	      		bounds.extend(placesFound[i].geometry.location);
	    	}
		};

    	map.fitBounds(bounds);

	});

	//Utilizing HTML5 Geolocation to get users current location
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(pos){
			debugger;
			var usersPos = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			};
			map.panTo(usersPos);
			currentLocation.push(createMarker(map,usersPos, "Your Location", currentLocationIcon, null));
			currentLocation.push({formatted_address: null});
			currentLocation.push(true);
			makePlaceDetailsServiceRequest("Your Location", new google.maps.LatLng(usersPos.lat, usersPos.lng), "current");
			
		}, function(){
			//User has denied location access
			handleLocationError(true, map.getCenter());
		});
	} else{
		//Browser doesnt support the geolocation feature
		handleLocationError(false, map.getCenter());
	}
}

function createMarker(map, pos, title, icon, label){
	let marker = new google.maps.Marker({position: pos, map: map, title: title, icon: icon,label: label});
	marker.addListener("click", function(event){
		let markerIndex = Number(this.label);
		let contentString = `
		<div class="display-5" style="text-align: center; font-weight: bold;">${title}</div>
		<div style="display: flex; justify-content: space-around">
				<button style="margin: 10px; width: 45px;" data-toggle="tooltip" title="Remove" onclick="removeLocation('${marker.position.lat()}, ${marker.position.lng()}', 'starting')" type="button" class="centerBtn btn btn-outline-dark"><i class="far fa-trash-alt"></i></button>
				<button style="margin: 10px; width: 45px;" title="Info" onclick="setLocationInfoInModal('${marker.position.lat()}, ${marker.position.lng()}', 'starting')" data-toggle="modal" data-target="#infoModal" type="button" class="favBtn btn btn-outline-dark"><i class="far fa-question-circle"></i></button>
				<button style="margin: 10px; width: 45px;" data-toggle="tooltip" title="Save" type="button" onclick="savePlace('${marker.position.lat()}, ${marker.position.lng()}', 'starting')" class="favBtn btn btn-outline-dark"><i class="far fa-star"></i></button>
		</div>
		`;

		if(icon===destinationIcon){
			contentString = `
			<div class="display-5" style="text-align: center; font-weight: bold;">${title}</div>
			<div style="display: flex; justify-content: space-around">
				<button style="margin: 10px; width: 45px;" data-toggle="tooltip" title="Remove" onclick="removeLocation('${marker.position.lat()}, ${marker.position.lng()}', 'destination')" type="button" class="centerBtn btn btn-outline-dark"><i class="far fa-trash-alt"></i></button>
				<button style="margin: 10px; width: 45px;" title="Info" onclick="setLocationInfoInModal('${marker.position.lat()}, ${marker.position.lng()}', 'destination')" data-toggle="modal" data-target="#infoModal" type="button" class="favBtn btn btn-outline-dark"><i class="far fa-question-circle"></i></button>
				<button style="margin: 10px; width: 45px;" data-toggle="tooltip" title="Save" type="button" onclick="savePlace('${marker.position.lat()}, ${marker.position.lng()}', 'destination')" class="favBtn btn btn-outline-dark"><i class="far fa-star"></i></button>
			</div>
		`;
		}
		
		//if its a current location marker, does not need remove button as well
		if(icon===currentLocationIcon){
			contentString=`
			<div class="display-5" style="text-align: center;">${title}</div>
			<div style="display: flex; justify-content: space-around">
				<button style="margin: 10px; width: 45px;" onclick="setLocationInfoInModal('${marker.position.lat()}, ${marker.position.lng()}', 'current')" data-toggle="modal" data-target="#infoModal" title="Info" type="button" class="favBtn btn btn-outline-dark"><i class="far fa-question-circle"></i></button>
				<button style="margin: 10px; width: 45px;" data-toggle="tooltip" title="Save" type="button" onclick="savePlace('${marker.position.lat()}, ${marker.position.lng()}', 'current')" class="favBtn btn btn-outline-dark"><i class="far fa-star"></i></button>
			</div>
			`;
		}
		infoWindow.setContent(contentString);
		infoWindow.open(map, marker);
	});
	return marker;
}

function handleLocationError(geolocationInBrowser, position){
	if(geolocationInBrowser){
		console.log("Location access denied. Centering on Ottawa");
	}
	else{
		console.log("Geolocation not supported. Centering on Ottawa");
	}
	map.panTo(position);
	debugger;
	currentLocation.push(createMarker(map,position, "Ottawa", currentLocationIcon, null));
	currentLocation.push({formatted_address: null});
	currentLocation.push(true);
	makePlaceDetailsServiceRequest("Ottawa", new google.maps.LatLng(position.lat, position.lng), "current");
			
}

addBtn.addEventListener("click", ()=>{
	if(currentLocation.length>0){
		let markerDoesntExist = true;

		//ensuring that the current selected starting point hasnt been previously selected
		startingLocations.forEach((place)=>{
			if(place[0].position===currentLocation[0].position){
				markerDoesntExist=false;
				alert("That starting point is already selected");
			}
		});
		if(markerDoesntExist) {
			startingLocations.push([createMarker(map,currentLocation[0].position, currentLocation[0].title, null, (startingPointLabels++).toString(10)), currentLocation[1], currentLocation[2]]); 
			addStartingCard(startingPointLabels-1, currentLocation[0].title);
			map.panTo(currentLocation[0].position);
		}
	}
});

saveBtn.addEventListener("click", ()=>{
	savePlace(`${currentLocation[0].position.lat()}, ${currentLocation[0].position.lng()}`, "current");
});

function addStartingCard(label, title){
	let accordion = document.getElementById("accordion");
	if(startingLocations.length===1)
		accordion.innerHTML = "";
	accordion.innerHTML += `
		<div class="card startingPointCard">
			<div class="card-header" id="headingOne">
				<h5 class="mb-0">
					<span style = "vertical-align: middle; display: flex; align-items: center;">
						<button class="btn btn-link" data-toggle="collapse" data-target="#collapse${label}" aria-expanded="false" aria-controls="collapse${label}">
							<i class="far fa-caret-square-down"></i>
						</button>
						<h6 class="placeLabel" style="margin-left:10px; margin-top: 0.4rem;">${label}</h6>
						<h6 class="placeTitle" onclick="centerOnStartingLocation(${label})" style="margin-left:10px; margin-top: 0.4rem; text-align: start;">${title}</h6>
					</span>
				</h5>
			</div>

			<div id="collapse${label}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				<div class="card-body">
					No Route Info To Display
				</div>
			</div>
		</div>
	
	`
}

//when clicking on title of starting location card, center map on that location
function centerOnStartingLocation(startingLabel){
	debugger;
	for(let i =0; i<startingLocations.length; i++){
		if(startingLocations[i][0].label==startingLabel){
			map.panTo(startingLocations[i][0].position);
			break;
		}
	}
}

//pans the map to the current selected location
centerBtn.addEventListener("click", ()=>{
	map.panTo(currentLocation[0].position);
});

//fit all visible markers in the view of the map
showAllBtn.addEventListener("click", ()=>{
	let bounds = new google.maps.LatLngBounds();
	startingLocations.forEach((place)=>{
		bounds.extend(place[0].position);
	});
	if(startingLocations.length>0)
		map.fitBounds(bounds);
});

//saves the lat, lng, formatted address and place name
function savePlace(position, typeOfLocation){
	let place = getLocationInfo(position, typeOfLocation);
	let placeExists = false;

	if(savedPlaces===null)
		savedPlaces=[];

	savedPlaces.forEach((savedPlace)=>{
		if(place[0].position.lat()===savedPlace[0] && place[0].position.lng()===savedPlace[1]){
			alert("The location " + place[0].title + " is already saved.");
			placeExists= true;
		}
	});

	if(placeExists)
		return;

	let basicPlaceInfo = [place[0].position.lat(), place[0].position.lng(), place[1].formatted_address, place[0].title];
	savedPlaces.push(basicPlaceInfo);
	localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));
	
	let accordion = document.getElementById("savedAccordion");
	if(savedPlaces.length===1)
		accordion.innerHTML = "";

	
	accordion.innerHTML += `
		<div class="card" id="${savedPlaces.length-1}">
			<div class="card-header" id="headingOne">
				<h5 class="mb-0">
					<span style = "vertical-align: middle; display: flex; align-items: center;">
						<button class="btn btn-link" data-toggle="collapse" data-target="#collapse${savedPlaces.length-1}" aria-expanded="false" aria-controls="collapse${savedPlaces.length-1}">
							<i class="far fa-caret-square-down"></i>
						</button>
						<h6 class="placeTitle" onclick="setCurrentLocation('${basicPlaceInfo[0]}, ${basicPlaceInfo[1]}', '${basicPlaceInfo[3]}')" style="margin-left:10px; margin-top: 0.4rem; text-align: inital;">${basicPlaceInfo[3]}</h6>
						<button data-toggle="tooltip" title="Remove" type="button" onclick="removeSavedLocation(${savedPlaces.length-1})" class="savedBtn btn btn-outline-dark"><i class="far fa-trash-alt" style="font-size: 10px;"></i></button>
						</span>
				</h5>
			</div>

			<div id="collapse${savedPlaces.length-1}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				<div class="card-body">${basicPlaceInfo[2]}</div>
			</div>
		</div>
	
		`
}

function setCurrentLocation(position, title){
	let lat = Number(position.substr(0, position.indexOf(',')));
	let lng = Number(position.substr(position.indexOf(',')+2, position.length-1));
	currentLocation[0].setMap(null);
	currentLocation = [];
	let location = new google.maps.LatLng(lat, lng);
	currentLocation.push(createMarker(map, location, title, currentLocationIcon, null), null, false);
	makePlaceDetailsServiceRequest(title, location, "current");

}

//removes a marker, requires the lat and lng as "lat, lng" as well as type of location being removed
function removeLocation(position, typeOfLocation){
	let place = getLocationInfo(position, typeOfLocation);
	if(typeOfLocation==="starting"){
		let indexOfPlace = startingLocations.indexOf(place);
		startingLocations.splice(startingLocations.indexOf(place), 1);
		document.querySelectorAll(".startingPointCard")[indexOfPlace].parentElement.removeChild(document.querySelectorAll(".startingPointCard")[indexOfPlace]);
		startingPointLabels-=1;


		let labelsInLocationCards = document.querySelectorAll(".placeLabel");

		//this is to update the labels (reduce all by 1 starting at index of removal)
		for(var i = indexOfPlace; i<startingLocations.length; i++){
			let markerLabel = Number(startingLocations[i][0].label);
			markerLabel-=1;
			startingLocations[i][0].set('label', markerLabel.toString(10));
			labelsInLocationCards[i].textContent=markerLabel;
		}	
		
	} else if(typeOfLocation==="destination"){
		destinationLocations.splice(destinationLocations.indexOf(place), 1);
	}
	place[0].setMap(null);
}

//tales a position in 'lat, lng' as well as a type of location and displays info in the modal
function setLocationInfoInModal(position, typeOfLocation){

	let place = getLocationInfo(position, typeOfLocation);
	debugger;
	
	//if its true, that means detailed info for that place has already been requested before 
	if(!place[2]==true){
		let location = new google.maps.LatLng(place[0].position.lat(), place[0].position.lng());
		makePlaceDetailsServiceRequest(place[0].title, location, typeOfLocation);
	} else{
		updateModalContents(place[1]);
	}
	

}

//takes a detailed place object and updates the modal text
function updateModalContents(place){
	
	if(place===null){
		document.getElementById("infoModalTitle").textContent="No name to display";
		document.getElementById("addres").textContent="No address info to display.";
		document.getElementById("phoneNum").textContent="No phone number info to display.";
		document.getElementById("website").textContent="No website info to display.";
		document.getElementById("hours").textContent="No hours info to display.";
		document.getElementById("rating").textContent="No rating info to display.";
		document.querySelector(".carousel-inner").innerHTML=""; //clearing images
		return
	}
	
	document.getElementById("infoModalTitle").textContent=place.name;

	
	if(place.formatted_address!=null){
		document.getElementById("addres").textContent=place.formatted_address;
	} else{		
		document.getElementById("addres").textContent="No address info to display.";
	}

	if(place.formatted_phone_number!=null){
		document.getElementById("phoneNum").textContent=place.formatted_phone_number;
	} else{		
		document.getElementById("phoneNum").textContent="No phone number info to display.";
	}

	if(place.website!=null){
		document.getElementById("website").textContent=place.website;
		document.getElementById("websiteLink").setAttribute("href", place.website);
	} else{		
		document.getElementById("website").textContent="No website info to display.";
	}

	if(place.opening_hours!=null){
		if(place.opening_hours.weekday_text!=null){
			document.getElementById("hours").textContent=place.opening_hours.weekday_text.flat();
		} else{
			document.getElementById("hours").textContent="No hours info to display.";

		}
	} else{		
		document.getElementById("hours").textContent="No hours info to display.";
	}

	if(place.rating!=null){
		document.getElementById("rating").textContent=place.rating;
	} else{		
		document.getElementById("rating").textContent="No rating info to display.";
	}
	
	if(place.photos!=null && place.photos.length>0){
		setModalPhotos(place.photos);
	} else{
		document.querySelector(".carousel-inner").innerHTML="";
	}
}

//takes an array of photo objects with a method to retrieve their urls and puts them in the modal
function setModalPhotos(photos){
	let carousel = document.querySelector(".carousel-inner");
	carousel.innerHTML="";
	photos.forEach((photo, index)=>{
		let photoSrc = photo.getUrl();
		let newPhoto = document.createElement("div");
		newPhoto.setAttribute("class", "carousel-item-active");
		newPhoto.innerHTML =`
		<img style="object-fit: cover; height: 250px;" class="d-block w-100" src="${photoSrc}" alt="Slide ${index}">
		`
		carousel.appendChild(newPhoto);
	});
}

//gets detailed location info, takes a search query and type of location for which info is being obtained (ex: starting)
//place is the array containing the marker and associated place info that was clicked
function makePlaceDetailsServiceRequest(query, loc, typeOfLocation){
	 let request = {
		query: query,
		location: loc,
		radius: 1
	};
	
	var service = new google.maps.places.PlacesService(map);

	  service.textSearch(request, function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
		  for (var i = 0; i < results.length; i++) {
			
			let resultLat = results[i].geometry.location.lat();
			let resultLng = results[i].geometry.location.lng();
			let destination = null;
			let starting = null;

			try{
				//ensuring that the place services has found the matching destination or starting point
				if(typeOfLocation==="destination"){

					destinationLocations.forEach((place)=>{
						if(place[1].geometry.location.lat()===resultLat && place[1].geometry.location.lng()===resultLng)
							destination = place;
					});

					if(destination===null)
						continue;
				} else if(typeOfLocation==="starting"){
				
					
					startingLocations.forEach((place)=>{
							if(place[1].geometry.location.lat()===resultLat && place[1].geometry.location.lng()===resultLng)
								starting = place;
					});
			

					if(starting===null)
						continue;
				}	
			}catch(error){
				console.log(error);
				alert("Ran into an error, unable to request palce information.");
				updateModalContents(null);
				break;
			}

			

			let placeId = results[i].place_id;
			
			var detailedRequest = {
				placeId: placeId,
				fields: ['formatted_address', 'formatted_phone_number', 'website', 'opening_hours', 'rating', 'photo', 'name', 'geometry']
			};
			
			service = new google.maps.places.PlacesService(map);
			service.getDetails(detailedRequest, (placeDetailed, status)=>{
				if(typeOfLocation==="current"){
					currentLocation[1]=placeDetailed;
					currentLocation[2]=true;
					updateModalContents(placeDetailed);
				} else if(typeOfLocation==="starting"){
					startingLocations[startingLocations.indexOf(starting)][1]=placeDetailed;
					startingLocations[startingLocations.indexOf(starting)][2]=true;
					updateModalContents(placeDetailed);
				} else if(typeOfLocation==="destination"){
					destinationLocations[destinationLocations.indexOf(destination)][1]=placeDetailed;
					destinationLocations[destinationLocations.indexOf(destination)][2]=true;
					updateModalContents(placeDetailed);
				}
			});	
			break; //once place service has matched to a current, starting or destination, no further results are needed
		  }
		  if(results.length===0)
			  updateModalContents(null);
		}
	  });
	
}

//returns a place array with marker and associated place info
//type of location is used when you know which type of location to expect
function getLocationInfo(position, typeOfLocation){
	let lat = Number(position.substr(0, position.indexOf(',')));
	let lng = Number(position.substr(position.indexOf(',')+2, position.length-1));
	if(currentLocation[0].position.lat()===lat && currentLocation[0].position.lng()===lng && (typeOfLocation==="current"||typeOfLocation===null))
		return currentLocation;
	for(var i =0;i<startingLocations.length; i++){
		if(startingLocations[i][0].position.lat()===lat && startingLocations[i][0].position.lng()===lng && (typeOfLocation==="starting"||typeOfLocation===null))
			return startingLocations[i];
	}
	for(var i = 0; i<destinationLocations.length; i++){
		if(destinationLocations[i][0].position.lat()===lat && destinationLocations[i][0].position.lng()===lng && (typeOfLocation==="destination"||typeOfLocation===null))
			return destinationLocations[i];
	}
}


function addStartingCard(label, title){
	let accordion = document.getElementById("accordion");
	if(startingLocations.length===1)
		accordion.innerHTML = "";
	accordion.innerHTML += `
		<div class="card startingPointCard">
			<div class="card-header" id="headingOne">
				<h5 class="mb-0">
					<span style = "vertical-align: middle; display: flex; align-items: center;">
						<button class="btn btn-link" data-toggle="collapse" data-target="#collapse${label}" aria-expanded="false" aria-controls="collapse${label}">
							<i class="far fa-caret-square-down"></i>
						</button>
						<h6 class="placeLabel" style="margin-left:10px; margin-top: 0.4rem;">${label}</h6>
						<h6 class="placeTitle" onclick="centerOnStartingLocation(${label})" style="margin-left:10px; margin-top: 0.4rem; text-align: start;">${title}</h6>
					</span>
				</h5>
			</div>

			<div id="collapse${label}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				<div class="card-body">
					No Route Info To Display
				</div>
			</div>
		</div>
	
	`
}

//will center map on destination after clicing on its title 
function centerOnDestination(location, typeOfLocation){
	debugger;
	let destination = getLocationInfo(location, typeOfLocation);
	destinationLocations.forEach((place)=>{
		if(place[0].position===destination[0].position)
			map.panTo(place[0].position);
	});
}


function addDestinationCards(destinationsInfo){
	let accordion = document.getElementById("accordion");
	if(startingLocations.length===1)
		accordion.innerHTML="";
	let tmpHTML = accordion.innerHTML;
	let destinationCardsHTML = "";

	destinationsInfo.forEach((destinationInfo, distanceRank)=>{
		let color = "";
		if(distanceRank===0)
			color="green";
		else if(distanceRank===1)
			color="orange";
		else
			color="red";
		
		destinationCardsHTML+=`

		<div class="card">
			<div class="card-header" id="headingOne" style="background-color: ${color};">
				<h5 class="mb-0">
					<span style = "vertical-align: middle; display: flex; align-items: center;">
						<button class="btn btn-link" data-toggle="collapse" data-target="#collapseDestination${distanceRank}" aria-expanded="false" aria-controls="#collapseDestination${distanceRank}">
							<i class="far fa-caret-square-down"></i>
						</button>
						<h6 class="placeTitle" onclick="centerOnDestination('${destinationInfo[0][0].position.lat()}, ${destinationInfo[0][0].position.lng()}', 'destination')" style="margin-left:10px; margin-top: 0.4rem; text-align: start;">${destinationInfo[0][0].title}</h6>
					</span>
				</h5>
			</div>

			<div id="collapseDestination${distanceRank}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				<div class="card-body">
					${destinationInfo[0][1].formatted_address}
				</div>
			</div>
		</div>


		`
		
	});
	
	debugger;
	let destinationsToRemove = [];
	destinationLocations.forEach((destination, index)=>{
		let destinationSelected = false;
		destinationsInfo.forEach((destinationInfo)=>{
			if(destinationInfo[0]===destination){
				destinationSelected = true;;
			};
		});
		if(!destinationSelected){
			destination[0].setMap(null);
			destinationsToRemove.push(destination);
		}
	});
	
	destinationsToRemove.forEach((destination)=>{
		destinationLocations.splice(destinationLocations.indexOf(destination), 1);
	});
	
	accordion.innerHTML=destinationCardsHTML+tmpHTML;
}

function getBestDestination(distanceAndDurationInfo, typeOfCalculation){

		for(let i =0; i<distanceAndDurationInfo.length; i++){
			if(distanceAndDurationInfo[i].length!=startingLocations.length+1)
				return;
		}
		if(typeOfCalculation==="distance"){
			let distanceAverages = [];
			distanceAndDurationInfo.forEach((destinationTravelInfo, i)=>{
				let distanceSum = 0;
				destinationTravelInfo.forEach((startingPointTravelToDestinationInfo, j)=>{
					if(j!=0){//this is because the first index is always the destination itself
						distanceSum+=startingPointTravelToDestinationInfo[3];
					} 
				});
				distanceAverages.push(distanceSum/startingLocations.length);
			});
			debugger;
			let distanceAveragesCopy = distanceAverages.slice();
			distanceAveragesCopy.sort();
			let shortestDistancePlaces=[];
			for(let i = 0; i<3; i++){
				if(distanceAverages.length>=i){
					shortestDistancePlaces.push(distanceAndDurationInfo[distanceAverages.indexOf(distanceAveragesCopy[i])]);
				}	
			}
			debugger;
			addDestinationCards(shortestDistancePlaces);
		}
	
}

function makeDistanceMatrixRequest(typeOfCalculation){

	if(!(startingLocations.length>0) || !(destinationLocations.length>0))
		return;

	let distanceAndDurationInfo = [];

	let service = new google.maps.DistanceMatrixService();

	destinationLocations.forEach((destination, i)=>{
		distanceAndDurationInfo.push([destination]);
		startingLocations.forEach((starting)=>{
			let starting1 = new google.maps.LatLng(starting[0].position.lat(), starting[0].position.lng());
			let destination1 = new google.maps.LatLng(destination[0].position.lat(), destination[0].position.lng());
			
			service.getDistanceMatrix(
			  {
			    origins: [starting1],
			    destinations: [destination1],
			    travelMode: 'DRIVING',
			    unitSystem: google.maps.UnitSystem.METRIC,
			    avoidHighways: false,
			    avoidTolls: false,
			  }, function(response, status){
			  		if(status!='OK'){
			  			alert("Error calculating. Error was " + status+".");
			  		} else{
			  			let durationValue = response.rows[0].elements[0].duration.value;
			  			let durationText = response.rows[0].elements[0].duration.text;
			  			let distanceValue = response.rows[0].elements[0].distance.value;
			  			let distanceText = response.rows[0].elements[0].distance.text;
			  			distanceAndDurationInfo[i].push([starting, durationValue, durationText, distanceValue, distanceText]);
			  			getBestDestination(distanceAndDurationInfo, typeOfCalculation);
			  		}
			  });

		});
	});
}

