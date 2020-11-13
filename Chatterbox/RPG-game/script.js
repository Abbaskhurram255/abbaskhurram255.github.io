// ======================== 1. CHARACTER, ENEMIES AND EQUIPMENT DEFINITIONS============================
// ==== 1.1 CHARACTER
const hero = {
	name: "Hero",
	minDmg: 5,
	maxDmg: 10,
	hp: 15,
	maxHp: 15,
	defense: 0,
	experienceCurrent: 0,
	experienceToLevel: 3,
	level: 1,
	gold: 100,
	equipmentWorn: []
};

// ==== 1.2 ENEMIES
const enemyPlace = [{
	name: "Forest",
	enemies: [{
		name: "Rabid Rabbit",
		level: 1,
		minDmg: 1,
		maxDmg: 2,
		hp: 9,
		maxHp: 9,
		defense: 0,
		loot: [
			{ 
				name: "Thick Stick",
				chance: 0.3
			}],
		experienceWorth: 1,
	},
	{
		name: "Zombie's Arm",
		level: 1,
		minDmg: 1,
		maxDmg: 2,
		hp: 13,
		maxHp: 13,
		defense: 0,
		loot: [
			{ 
				name: "Thick Stick",
				chance: 0.35
			}],
		experienceWorth: 1,
	},
	{
		name: "Elderly skeleton",
		level: 2,
		minDmg: 2,
		maxDmg: 3,
		hp: 8,
		maxHp: 8,
		defense: 0,
		loot: [
			{ 
				name: "Thick Stick",
				chance: 0.4
			},
			{
				name: "Rotten Club",
				chance: 0.25
			}],
		experienceWorth: 2,
	}]
},
{	
	name: "Caves",
	enemies: [{
		name: "Small wolf",
		level: 4,
		minDmg: 2,
		maxDmg: 5,
		hp: 16,
		maxHp: 16,
		defense: 0,
		loot: [
			{ 
				name: "Half-broken Bow",
				chance: 0.2
			},
			{
				name: "Used Cloth Armor",
				chance: 0.3
			}],
		experienceWorth: 3,
	},
	{
		name: "Toxic Mushroom",
		level: 5,
		minDmg: 2,
		maxDmg: 4,
		hp: 20,
		maxHp: 20,
		defense: 0,
		loot: [
			{ 
				name: "Half-broken Bow",
				chance: 0.3
			},
			{
				name: "Used Cloth Armor",
				chance: 0.3
			}],
		experienceWorth: 4,
	},
	{
		name: "The Rock",
		level: 6,
		minDmg: 3,
		maxDmg: 7,
		hp: 14,
		maxHp: 14,
		defense: 0,
		loot: [
			{ 
				name: "Almost-new Club",
				chance: 0.3
			},
			{
				name: "Dad's Quilted Armor",
				chance: 0.2
			}],
		experienceWorth: 4,
	}]
},
{	
	name: "Dungeon",
	enemies: [{
		name: "Skeleton Archer",
		level: 7,
		minDmg: 4,
		maxDmg: 8,
		hp: 35,
		maxHp: 35,
		defense: 0,
		loot: [
			{ 
				name: "Old Sword",
				chance: 0.4
			},
			{ 
				name: "Two-handed Hammer",
				chance: 0.15
			},
			{
				name: "Real Deal Ring Mail",
				chance: 0.3
			}],
		experienceWorth: 6,
	},
	{
		name: "Confused Ogre",
		level: 8,
		minDmg: 4,
		maxDmg: 9,
		hp: 43,
		maxHp: 43,
		defense: 0,
		loot: [
			{ 
				name: "Two-handed Hammer",
				chance: 0.2
			},
			{
				name: "Real Deal Ring Mail",
				chance: 0.3
			},
			{
				name: "Sword of Glory",
				chance: 0.1
			}],
		experienceWorth: 7,
	},
	{
		name: "The Thing",
		level: 9,
		minDmg: 5,
		maxDmg: 9,
		hp: 41,
		maxHp: 41,
		defense: 0,
		loot: [
			{ 
				name: "Two-handed Hammer",
				chance: 0.3
			},
			{
				name: "Sword of Glory",
				chance: 0.25
			},
			],
		experienceWorth: 7,
	}]
},
{	
	name: "Castle",
	enemies: [{
		name: "Small Crippled DRAGON(!)",
		level: 10,
		minDmg: 10,
		maxDmg: 13,
		hp: 90,
		maxHp: 90,
		defense: 0,
		loot: [],
		experienceWorth: 50,
	}]
}];

// ==== 1.3 Chest Loot

const lootChest = [{
	type: "Forest",
	loot: [{
		name: "Rags",
		chance: 1
	},
	{
		name: "Rusty Dagger",
		chance: 0.6
	}]
},
{
	type: "Caves",
	loot: [{
		name: "Almost-new Club",
		chance: 0.6
	},
	{
		name: "Old Sword",
		chance: 0.3
	},
	{
		name: "Dad's Quilted Armor",
		chance: 0.4
	},
	{
		name: "Real Deal Ring Mail",
		chance: 0.2
	}]
},
{
	type: "Dungeon",
	loot: [{
		name: "Legendary Gothic Plate",
		chance: 0.3
	},
	{
		name: "Sword of Glory",
		chance: 0.4
	},
	{
		name: "Legendary DragonSlayer",
		chance: 0.35
	}]
},
{
	type: "Castle",
	loot: [{
		name: "Rags",
		chance: 1
	}]
}];

// ==== 1.4 Equipment

const equipment = [{
	type: "armor",
	name: "Rags",
	value: 1,
	minDmg: 0,
	maxDmg: 0,
	defense: 1,
	levelRequirement: 1,
},
{
	type: "armor",
	name: "Used Cloth Armor",
	value: 2,
	minDmg: 0,
	maxDmg: 0,
	defense: 2,
	levelRequirement: 2,
},
{
	type: "armor",
	name: "Dad's Quilted Armor",
	value: 3,
	minDmg: 0,
	maxDmg: 0,
	defense: 3,
	levelRequirement: 3,
},
{
	type: "armor",
	name: "Real Deal Ring Mail",
	value: 4,
	minDmg: 0,
	maxDmg: 0,
	defense: 4,
	levelRequirement: 6,
},
{
	type: "armor",
	name: "Light Plate",
	value: 5,
	minDmg: 0,
	maxDmg: 0,
	defense: 5,
	levelRequirement: 6,
},
{
	type: "armor",
	name: "Legendary Gothic Plate",
	value: 6,
	minDmg: 0,
	maxDmg: 0,
	defense: 7,
	levelRequirement: 9,
},
{
	type: "weapon",
	name: "Pointy Rock",
	value: 1,
	minDmg: 1,
	maxDmg: 3,
	defense: 0,
	levelRequirement: 1,
},
{
	type: "weapon",
	name: "Thick Stick",
	value: 2,
	minDmg: 2,
	maxDmg: 3,
	defense: 0,
	levelRequirement: 1,
},
{
	type: "weapon",
	name: "Rotten Club",
	value: 3,
	minDmg: 2,
	maxDmg: 5,
	defense: 0,
	levelRequirement: 1,
},
{
	type: "weapon",
	name: "Rusty Dagger",
	value: 4,
	minDmg: 3,
	maxDmg: 5,
	defense: 0,
	levelRequirement: 3,
},
{
	type: "weapon",
	name: "Half-broken Bow",
	value: 5,
	minDmg: 3,
	maxDmg: 7,
	defense: 0,
	levelRequirement: 4,
},
{
	type: "weapon",
	name: "Almost-new Club",
	value: 6,
	minDmg: 4,
	maxDmg: 9,
	defense: 0,
	levelRequirement: 4,
},
{
	type: "weapon",
	name: "Old Sword",
	value: 7,
	minDmg: 5,
	maxDmg: 10,
	defense: 0,
	levelRequirement: 4,
},
{
	type: "weapon",
	name: "Two-handed Hammer",
	value: 8,
	minDmg: 5,
	maxDmg: 11,
	defense: 0,
	levelRequirement: 4,
},
{
	type: "weapon",
	name: "Sword of Glory",
	value: 9,
	minDmg: 7,
	maxDmg: 10,
	defense: 0,
	levelRequirement: 1,
},
{
	type: "weapon",
	name: "Legendary DragonSlayer",
	value: 10,
	minDmg: 8,
	maxDmg: 12,
	defense: 0,
	levelRequirement: 1,
},
{
	type: "ring",
	name: "Ring of Fire",
	value: 0,
	minDmg: 5,
	maxDmg: 10,
	defense: 0,
	levelRequirement: 1,
}];





// ============================ 2. ACTION BUTTONS===========================

const attackEnemyButton = document.querySelector("#attackEnemy");
attackEnemyButton.addEventListener("click", calculateRound);

const nextFightButton = document.querySelector("#nextFight");
nextFightButton.addEventListener("click", nextFight);

const backToCityButton = document.querySelector("#backToCity");
backToCityButton.addEventListener("click", backToCity);

const inventoryButton = document.querySelector("#inventory");
inventoryButton.addEventListener("click", initializeBigInventoryView);

const quitInventoryButton = document.querySelector("#quitInventory");
quitInventoryButton.addEventListener("click", quitInventoryView);

const place1 = document.querySelector("#Place1");
place1.addEventListener("click", () => newBattlePlace(0));

const place2 = document.querySelector("#Place2");
place2.addEventListener("click", () => newBattlePlace(1));

const place3 = document.querySelector("#Place3");
place3.addEventListener("click", () => newBattlePlace(2));

const place4 = document.querySelector("#Place4");
place4.addEventListener("click", () => newBattlePlace(3));



// ============================ 3.HERO AND ENEMY STATS SCREENS===========================

const heroSheet = document.querySelector(".heroSheet");
const heroSheetLevel = document.querySelector("#heroLevel");
// const heroSheetExperience = document.querySelector("#heroExperience");
// const heroSheetHp = document.querySelector("#heroHp");
const heroSheetDamage = document.querySelector("#heroDamage");
const heroSheetDefense = document.querySelector("#heroDefense");
const heroSheetWeapon = document.querySelector("#heroWeapon");
const heroSheetArmor = document.querySelector("#heroArmor");
const heroSheetRing = document.querySelector("#heroRing");
const heroSheetAmulet = document.querySelector("#heroAmulet");

function refreshHeroSheet() {
	heroSheetLevel.innerHTML = hero.level;
	// heroSheetExperience.innerHTML = `${hero.experienceCurrent}/${hero.experienceToLevel}`;
	// heroSheetHp.innerHTML = `${hero.hp}/${hero.maxHp}`;
	moveExpProgressBar();
	moveHpProgressBar(hero.hp, hero.maxHp, hpProgressBar);
}

function refreshHeroEquipment() {
	heroSheetDamage.innerHTML = `${hero.minDmg}-${hero.maxDmg}`;
	heroSheetDefense.innerHTML = `${hero.defense}`;
	refreshEquipmentWorn();

	function refreshEquipmentWorn() {
		hero.equipmentWorn.forEach((val, index) => {
			if (val.type === "weapon") {
				heroSheetWeapon.innerHTML = val.name;
			} else if (val.type === "armor") {
				heroSheetArmor.innerHTML = val.name;
			} else if (val.type === "ring") {
				heroSheetRing.innerHTML = val.name;
			} else if (val.type === "weapon") {
				heroSheetAmulet.innerHTML = val.name;
			}
		});
	}
}


const enemySheet = document.querySelector(".enemySheet");
const enemySheetName = document.querySelector("#enemyName");
const enemySheetLevel = document.querySelector("#enemyLevel");
// const enemySheetHp = document.querySelector("#enemyHp");
const enemySheetDamage = document.querySelector("#enemyDamage");

let currentEnemy = {name: "none"}; //It will copy one of enemies' sheets later

function refreshEnemySheet() {
	enemySheetName.innerHTML = `Enemy: ${currentEnemy.name}`;
	enemySheetLevel.innerHTML = currentEnemy.level;
	// enemySheetHp.innerHTML = `${currentEnemy.hp}/${currentEnemy.maxHp}`;
	enemySheetDamage.innerHTML = `${currentEnemy.minDmg}-${currentEnemy.maxDmg}`;
	hideEnemySheetIfNoEnemy();

	function hideEnemySheetIfNoEnemy() {
		(currentEnemy.name === "none") ? enemySheet.style.display="none" :	enemySheet.style.display="block";
	}
}




// ============================ 4.HTML AREAS ============================

const wrapper = document.querySelector(".wrapper");
const battleLogArea = document.querySelector(".battleLogArea");
const placesArea = document.querySelector(".placesArea");
const daysLeftArea = document.querySelector(".daysLeftArea");
const inventoryListArea = document.querySelector(".inventoryListArea");
const bigInventoryArea = document.querySelector(".bigInventoryArea");
const invWeaponArea = document.querySelector(".invWeaponArea");
const invArmorArea = document.querySelector(".invArmorArea");
const invRingArea = document.querySelector(".invRingArea");
const invMiscellanousArea = document.querySelector(".invMiscellanousArea");
const equipmentList = document.querySelector("#equipmentList");
const enemyDead = document.querySelector("#enemyDead");


let initializeSimpleView = 0

function initializeCityView() {
	wrapper.classList.remove("grid-container-mainFirst");
	wrapper.classList.add("grid-container-mainNormal");
	battleLogArea.style.display="none";
	battleLogArea.innerHTML="";
	placesArea.style.display="block";
	daysLeftArea.style.display="block";
	heroSheet.style.display="block";
	equipmentList.style.display="block";
	nextFightButton.style.display="none";
	backToCityButton.style.display="none";
	attackEnemyButton.style.display="none";
	inventoryButton.style.display="inline-block";
	if (initializeSimpleView == 0) {
		wrapper.classList.remove("grid-container-mainNormal");
		wrapper.classList.add("grid-container-mainFirst");
		heroSheet.style.display="none";
		daysLeftArea.style.display="none";
	}
	initializeSimpleView = 1;
}

function initializeBattleView() {
	wrapper.classList.remove("grid-container-mainNormal");
	wrapper.classList.add("grid-container-fight");
	battleLogArea.style.display="block";
	heroSheet.style.display="block";
	placesArea.style.display="none";
	equipmentList.style.display="none";
	enemyDead.style.display="none";
	nextFightButton.style.display="none";
	backToCityButton.style.display="none";
	daysLeftArea.style.display="none";
	attackEnemyButton.style.display="inline-block";
	inventoryButton.style.display="none";
}

function initializePostBattleView() {
	enemyDead.style.display="block";
	backToCityButton.style.display="inline-block";
	attackEnemyButton.style.display="none";
	fightNumberCounter = fightNumberCounter + 1;
	if (fightNumberCounter <= 3) nextFightButton.style.display="inline-block";
}

function initializeBigInventoryView() {
	wrapper.classList.remove("grid-container-mainNormal");
	wrapper.classList.add("grid-container-inventory");
	placesArea.style.display="none";
	daysLeftArea.style.display="none";
	bigInventoryArea.style.display="block";
	heroSheet.style.display="none";
	showItemsInInventory();
}

function quitInventoryView() {
	wrapper.classList.remove("grid-container-inventory");
	bigInventoryArea.style.display="none";
	initializeCityView();
}

function backToCity() {
	wrapper.classList.remove("grid-container-fight");
	clearEnemy();
	initializeCityView();	
	function clearEnemy() {
		currentEnemy.name = "none";
		refreshEnemySheet();
	}
	rest();
}

function addTextTobattleLogArea(text) {
	const itemName = document.createElement("p");
	itemName.appendChild(document.createTextNode(text));
	battleLogArea.appendChild(itemName);
	itemName.setAttribute("class", "mainText");
	const topPos = itemName.offsetTop; //Scrolls div to bottom
	battleLogArea.scrollTop = topPos;
}


// ==== 4.1 Progress bars

const expProgressBar = document.getElementById("expProgressBar"); 
let leveledUp = 0;
let expProgressBarWidth = 0;

function moveExpProgressBar() {
	let maximumWidth = Math.floor(hero.experienceCurrent/hero.experienceToLevel*100);
	let widthDifference = Math.floor(100/hero.experienceToLevel);
	let id = setInterval(frame, 50);
	if (leveledUp === 1) {
		leveledUp = 0;
		expProgressBarWidth = 0;
		expProgressBar.style.width = '0%';
	}
	function frame() {
	    if (expProgressBarWidth >= maximumWidth) {
	    	clearInterval(id);
	    } else {
		    expProgressBarWidth = expProgressBarWidth + widthDifference; 
		    expProgressBar.style.width = expProgressBarWidth + '%'; 
		    expProgressBar.innerHTML = `${hero.experienceCurrent}/${hero.experienceToLevel}`;
	    }
	}
}


const hpProgressBar = document.getElementById("hpProgressBar"); 
hpProgressBar.style.width = "100%";
const hpEnProgressBar = document.getElementById("hpEnProgressBar"); 
hpEnProgressBar.style.width = "100%";

function moveHpProgressBar(statToMoveCurrent, statToMoveMax, bar) {
	let maximumWidth = Math.floor(statToMoveCurrent/statToMoveMax*100);
	let widthDifference = Math.floor(100/statToMoveMax);
	let barWidth = bar.style.width.slice(-4,-1);
	let id = setInterval(frame, 50, statToMoveCurrent, statToMoveMax, bar, barWidth);

	function frame() {
	    (barWidth <= maximumWidth) ? clearInterval(id) : animateBarMovement(statToMoveCurrent, statToMoveMax, bar, barWidth, widthDifference)
	}
	function animateBarMovement(statToMoveCurrent, statToMoveMax, bar, barWidth2, widthDifference) {
		barWidth = barWidth2 - widthDifference; 
		(barWidth < 0) ? bar.style.width = '0%' : bar.style.width = barWidth + '%';    
		bar.innerHTML = `${statToMoveCurrent}/${statToMoveMax}`;
	}
}


// ============================ 5.NEW BATTLE ============================
let monsterLoot = [];
let currentPlace = ""; // Used to pick proper fight when picking next one
let fightNumberCounter = ""; // Used to count number of fights
function newBattlePlace(place) {
	initializeBattleView();
	pickRandomEnemy(place);
	fightNumberCounter = 1;
	showHint(1);
}

//Continuing old battle
function nextFight() {
	pickRandomEnemy(currentPlace);
	initializeBattleView();
}

function pickRandomEnemy(place) {
	//Count number of fights?
	battleLogArea.innerHTML = "";
	currentEnemy = Object.assign({}, enemyPlace[place].enemies[Math.floor(Math.random() * enemyPlace[place].enemies.length)]);
	addTextTobattleLogArea(`You met a ${currentEnemy.name}. Prepare for battle!`);
	refreshEnemySheet();
	currentPlace = place;
	addLootToMonster();
	hpEnProgressBar.style.width = '100%';
	hpEnProgressBar.innerHTML = `${currentEnemy.hp}/${currentEnemy.maxHp}`;

	function addLootToMonster() {
		monsterLoot = [];
		currentEnemy.loot.forEach(i => {
			if ((1 - Math.random()) < i.chance) monsterLoot.push(i.name);
		});
	}
}





// ============================ 6.FIGHTING ============================
function calculateRound() {
	addTextTobattleLogArea("=====");
	attack(hero, currentEnemy);
	if (currentEnemy.hp !== 0) attack(currentEnemy, hero);
	refreshHeroSheet();
	refreshEnemySheet();
}

function attack(attacker, defender) {
	let dmgDealt = calculateAttackDmg(attacker, defender); // needed or it will calculate different dmg every time
	defender.hp = defender.hp - dmgDealt;
	defender.hp < 0 ? defender.hp=0 : "";
	moveHpProgressBar(currentEnemy.hp, currentEnemy.maxHp, hpEnProgressBar);
	addTextTobattleLogArea(`${defender.name} receives ${dmgDealt} damage. He has ${defender.hp}hp left`);
	if (defender.hp <= 0) isDead();

	function calculateAttackDmg(attacker, defender) {
		let damage = Math.floor(Math.random() * (attacker.maxDmg - attacker.minDmg + 1)) + attacker.minDmg - defender.defense;
		damage < 0 ? damage = 0 : "";
		return damage;
	}
	function isDead() {
		if (defender === currentEnemy) {
			if (currentEnemy.name === "Small Crippled DRAGON(!)") window.location.replace("victory.html");
			addTextTobattleLogArea(`${defender.name} is dead!`);
			addTextTobattleLogArea(`You gain +${defender.experienceWorth} experience`);
			if (monsterLoot.length > 0) {
				addTextTobattleLogArea(`${defender.name} won't need this shiny [${monsterLoot}]. You might as well take it.`);
			} else {
				addTextTobattleLogArea(`This ${defender.name} has no loot for you. Maybe the next one will?`);
			}
			hero.experienceCurrent = hero.experienceCurrent + defender.experienceWorth;
			initializePostBattleView();
			levelUp();
			getItemsFromWherever(monsterLoot);
			openLootChest();
			showHint(2);

			function levelUp() {
				if (hero.experienceCurrent >= hero.experienceToLevel) {
					addTextTobattleLogArea(`Level up! You gain 4hp.`);
					hero.level++;
					hero.maxHp = hero.maxHp + 4;
					hero.experienceCurrent = hero.experienceCurrent - hero.experienceToLevel;
					hero.experienceToLevel = hero.experienceToLevel + 3;
					expProgressBar.innerHTML = `${hero.experienceCurrent}/${hero.experienceToLevel}`;
					leveledUp = 1;
					refreshHeroSheet();
				}
			}
			function openLootChest() {
				if (fightNumberCounter === 4) { //Checks if it's the last fight
					thingsInChest = [];
					lootChest[currentPlace].loot.forEach(function(i) {
						if ((1 - Math.random()) < i.chance) thingsInChest.push(i.name);
					});
					getItemsFromWherever(thingsInChest);
					addTextTobattleLogArea(`Congratulations! You've successfully defeated "Terrifying Monsters" and cleansed this place from all evil. At the deepest level, you've also found an ancient loot chest with a legendary loot: [${thingsInChest}]. Nice one.`);
				}
			}

			function getItemsFromWherever(lootFromWherever) {
				let droppedLootObjects = equipment.filter(el => {
					let isItGoodItem;
					lootFromWherever.forEach(num => {
						if (el.name == num) isItGoodItem = true;
					}) 
					return isItGoodItem;
				});
				addLootToInventory();
				function addLootToInventory() {
					droppedLootObjects.forEach(el => inventory.push(el));
				}
			} // It maps items from lootChests and monsters to equipment.		
		} else if (defender === hero) { // 
			window.location.replace("gameOver.html");
		}
	}
}



// ============================ 7.INVENTORY ============================
// ==== 7.1 Inventory screen
let inventory = [];

function showItemsInInventory() {
	cleanInventory();
	showItemByItem();

	function cleanInventory() {
		invWeaponArea.innerHTML="";
		invArmorArea.innerHTML="";
		invRingArea.innerHTML="";
		invMiscellanousArea.innerHTML="";
		inventory.sort(function(a, b) {
			if (a.value > b.value) return -1;
	    	if (a.value < b.value) return 1;
	    	return 0;
		});
	}
	
	function showItemByItem() {
		addEquipmentWornItems();
		addInventoryItems();

		function addEquipmentWornItems() {
			hero.equipmentWorn.forEach((item, index) => {
				const itemName = document.createElement("p");
				itemName.appendChild(document.createTextNode("Equipped: " + item.name + " "));
				addTooltip(itemName, item);
				appendToGoodType(item, itemName);


			});			
		};
		function appendToGoodType(item, itemName) {
			if (item.type == "weapon") {
				invWeaponArea.appendChild(itemName);
			} else if (item.type == "armor") {
				invArmorArea.appendChild(itemName);
			} else if (item.type == "ring") {
				invRingArea.appendChild(itemName);
			} else if (item.type == "miscellanous") {
				invMiscellanousArea.appendChild(itemName);
			}
		};
		function addInventoryItems() {
			inventory.forEach((item, index) => {
				const itemName = document.createElement("p");
				itemName.appendChild(document.createTextNode(item.name + " "));
				addTooltip(itemName, item);
				appendToGoodType(item, itemName);
				addEquipButton();

				function addEquipButton() {
					const newButton = document.createElement("button");
					newButton.appendChild(document.createTextNode("Equip"));
					itemName.appendChild(newButton);
					newButton.className = "actionButton equipButton actionButtonSmall";
					newButton.setAttribute("id", index); 
					newButton.addEventListener("click", equipItem);

					function equipItem() {
						let item = inventory[this.id];
						if (item.type == "weapon") {
							equipWeapon(item);
						} else if (item.type == "armor") {
							equipArmor(item);
						} else if (item.type == "ring") {
							console.log("ring");
						} else if (item.type == "amulet") {
							console.log("amulet");
						};
						inventory.splice(this.id, 1);
						moveItemFromEqWorn();
						hero.equipmentWorn.push(item);
						showItemsInInventory();
						refreshHeroSheet();
						refreshHeroEquipment();

						function moveItemFromEqWorn() {
							var itemToRemoveFromEq = hero.equipmentWorn.findIndex(function(el) {
								return el.type === item.type;
							})
							if (itemToRemoveFromEq != -1) {
								inventory.push(hero.equipmentWorn[itemToRemoveFromEq]);
								hero.equipmentWorn.splice(itemToRemoveFromEq, 1);
							}
						}
						function equipWeapon(weaponToEquip) {
							hero.minDmg = weaponToEquip.minDmg;
							hero.maxDmg = weaponToEquip.maxDmg;
						};
						function equipArmor(armorToEquip) {
							hero.defense = armorToEquip.defense;
						};
					};
				};

			});
		}
		function addTooltip(itemName, item) {
			itemName.className = "tooltipOutside";
			const tooltip = document.createElement("span");
			tooltip.className = "tooltipInside";
			tooltip.appendChild(document.createTextNode(`Damage: ${item.minDmg}-${item.maxDmg}, Defense: ${item.defense}`));
			itemName.appendChild(tooltip);
		}
	}
}


// ============================ 8.REST ============================
// ==== X.1 REST
let day = 0;
let daysToEnd = 25;
const dayNumber = document.querySelector("#dayNumber");
dayNumber.innerHTML = `${daysToEnd - day} days`;
function rest() {
	hero.hp = hero.maxHp;
	refreshHeroSheet();
	day++;
	dayNumber.innerHTML = `${daysToEnd - day} days`;
	fillHpProgressBar();
	showHint(3);
	if (day === daysToEnd) gameOverTooLong();

	function fillHpProgressBar() {
		hpProgressBar.style.width = '100%'; 
		hpProgressBar.innerHTML = `${hero.hp}/${hero.maxHp}`;
	}
}

function gameOverTooLong() {
	window.location.replace("helloDragonMyOldFriend.html");
}

// ============================ 9.CHEAT CODES ============================
document.addEventListener("keydown", keyDown);
function keyDown(e) {
	if (e.keyCode === 67) cheatMyWayToVictory();
}

function cheatMyWayToVictory() {
	window.alert("Oh you dirty little cheater, you");
	findBestWeaponOrArmor("maxDmg");
	findBestWeaponOrArmor("defense");

	function findBestWeaponOrArmor(statToCheck) {
		let bestStat = 0;
		let itemWithBestStat;
		equipment.forEach(el => {
			if (el[statToCheck] > bestStat) {
				bestStat = el[statToCheck];
				itemWithBestStat = el;
			}
		});
		inventory.push(itemWithBestStat);
	} 	

}

// ============================ 10.HINTS ============================

const hintArea = document.querySelector(".hintArea");
const hintTitle = document.querySelector("#hintTitle");
const hintText = document.querySelector("#hintText");
const overlay = document.querySelector("#overlay");
const hints = [{
	 	type: "hintNewAdventure",
		wasItShown: 0,
		title: "Welcome Dear Adventurer",
		text: "Hello there, It's nice to see you. You couldn't have arrived at a better moment. <br><br> A few days ago a DRAGON(!) attacked our city. We've managed to wound him, but he escaped and hid in the castle nearby. Please find him before 25 days pass or he will heal and destroy our city! <br><br> Oh, and looking at you, I think you might want to gather some loot... You'll find monsters in nearby places. Please don't die."
	},
	{
		type: "hintFirstFight",
		wasItShown: 0,
		title: "First challenge",
		text: "Ooooh, you've found your first enemy. You may attack him. If you attack him enough times, he may or may not die. <br><br> Good Luck"
	},
	{
		type: "hintFirstWin",
		wasItShown: 0,
		title: "First victory",
		text: "Congratulations! <br>I knew you are the greatest of warriors! That DRAGON(!) in the castle is as good as dead. <br><br>You may go back to city to heal or continue cleaning this place. If you manage to defeat 3 enemies in a row, you might find a special loot. But be wary, once your health hits 0, it's over for good."
	},
	{
		type: "hintRest",
		wasItShown: 0,
		title: "Rest",
		text: "You've come back tired from an adventure. A good sleep healed your wounds but another day has passed. Please remember that you have only 25 days to kill that DRAGON(!) or he will recover and kill us all!"
	}
];

function showHint(which) {
	if (hints[which].wasItShown === 0) {
		hintTitle.innerHTML = hints[which].title;
		hintText.innerHTML = hints[which].text;
		hintArea.style.display = "inline";
		hints[which].wasItShown = 1;
		overlay.style.display = "block"
	}
}

const hintButton = document.querySelector("#hintButton");
hintButton.addEventListener("click", () => {
	hintArea.style.display = "none";
	overlay.style.display = "none";
});



// ============================ 11.RUN FUNCTIONS ON PAGE LOAD ============================
giveStartingItems();
refreshHeroSheet();
refreshHeroEquipment();
refreshEnemySheet();
initializeCityView();
showHint(0);

function giveStartingItems() {
	let weapon = equipment[equipment.findIndex(el => el.name === "Pointy Rock")];
	hero.equipmentWorn.push(weapon);
	hero.minDmg = weapon.minDmg;
	hero.maxDmg = weapon.maxDmg;
}
