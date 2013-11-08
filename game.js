var INGREDIENT_LIST = "ingredients";
var ANIMAL_LIST = "animals";
var SEEDS_LIST = "seeds";
var UTENSILS_LIST = "utensils";
var myGame;

function init() {
	// Do Something
	//alert(".");
	myGame = new FoodGame();
	
}

var FoodGame = function() {
	this.player = undefined;
	this.dwelling = undefined;
	this.seeds = [];
	this.animals = [];
	this.ingredients = [];
	this.plants = [];
	this.recipes = [];
	this.compostBin = [];
	this.utensils = [];
	this.neighborSupplies = [];
	this.messages = [];
	this.story = [];
	this.challenges = [];
	
	this.eventHandler = new EventHandler();
	
	this.vegetablesThrownAway = 0;
	this.vegetablesSpoiled = 0;
	this.dishesGiven = 0;
	this.itemsBorrowed = 0;
	
	this.init();
	this.updateDisplay();
}; FoodGame.prototype = {
	init: function() {
	
		// Ingredients
		//name, cost, usesLeft, spoilageRate, spoilageLeft, storageType, isEdible, isCompostable
		var carrots = new Ingredient("Carrots", 5, 0, .2, 4, "cold", true, true, 4);
		var potatoes = new Ingredient("Potatoes", 5, 0, .1, 4, "roomTemp", false, true, 4);
		var tomatoes = new Ingredient("Tomatoes", 25, 0, .3, 4, "cold", true, true, 4);
		var basil = new Ingredient("Basil", 15, 0, .3, 4, "roomTemp", false, true, 4);
		var oliveOil = new Ingredient("Olive Oil", 35, 0, 0, 4, "roomTemp", false, false, 10);
		var flour = new Ingredient("Flour", 10, 4, 0, 4, "roomTemp", false, false, 10);
		var salt = new Ingredient("Salt", 5, 4, 0, 4, "roomTemp", false, false, 15);
		var pepper = new Ingredient("Pepper", 10, 0, 0, 4, "roomTemp", false, false, 15);
		var bakingPowder = new Ingredient("Baking Powder", 5, 4, 0, 4, "roomTemp", false, false, 10);
		var bakingSoda = new Ingredient("Baking Soda", 5, 4, 0, 4, "roomTemp", false, false, 10);
		var butter = new Ingredient("Butter", 15, 0, 0, 4, "cold", false, false, 4);
		var milk = new Ingredient("Milk", 10, 0, .2, 4, "cold", true, false, 4);
		var parsnips = new Ingredient("Parsnips", 10, 0, .1, 4, "cold", true, true, 4);
		var lettuce = new Ingredient("Lettuce", 5, 0, .5, 4, "cold", true, true, 4);
		var greenOnions = new Ingredient("Green Onions", 8, 0, .2, 4, "cold", false, true, 4);
		var dressing = new Ingredient("Dressing", 15, 0, 0, 4, "cold", false, false, 8);
		var chickenBroth = new Ingredient("Chicken Broth", 10, 0, 0, 4, "cold", false, false, 2);
		var leeks = new Ingredient("Leeks", 10, 0, .1, 4, "cold", false, true, 4);
		var bacon = new Ingredient("Bacon", 15, 0, 0, 4, "cold", true, false, 2);
		var eggs = new Ingredient("Eggs", 10, 0, 0, 4, "cold", true, false, 3);
		this[INGREDIENT_LIST] = [carrots, potatoes, tomatoes, basil, oliveOil, flour, salt, bakingPowder, bakingSoda, butter, milk, pepper, parsnips, lettuce, greenOnions, dressing, chickenBroth, bacon, eggs];
		this.storeIngredients = [carrots, potatoes, tomatoes, basil, oliveOil, flour, salt, bakingPowder, bakingSoda, butter, milk, pepper, lettuce, greenOnions, dressing, chickenBroth];
		
		// Plants
		// name, ingredient, state
		var carrotPlant = new Plant("Carrots", carrots, "ripe");
		var potatoPlant = new Plant("Potatoes", potatoes, "ripe");
		var tomatoPlant = new Plant("Tomatoes", tomatoes, "ripe");
		var basilPlant = new Plant("Basil", basil, "ripe");
		var lettucePlant = new Plant("Lettuce", lettuce, "ripe");
		var greenOnionPlant = new Plant("Green Onions", greenOnions, "ripe");
		var leekPlant = new Plant("Leeks", leeks, "ripe");
		this.plants = [carrotPlant, potatoPlant, tomatoPlant, basilPlant, lettucePlant, leekPlant];
		
		// Seeds
		// name, cost, plant
		var tomatoSeeds = new Seed("Tomato Seeds", 10, tomatoPlant);
		var basilSeeds = new Seed("Basil Seeds", 5, basilPlant);
		var carrotSeeds = new Seed("Carrot Seeds", 2, carrotPlant);
		var potatoSeeds = new Seed("Potato Seeds", 5, potatoPlant);
		var lettuceSeeds = new Seed("Lettuce Seeds", 2, lettucePlant);
		var greenOnionSeeds = new Seed("Green Onion Seeds", 5, lettucePlant);
		var leekSeeds = new Seed("Leek Seeds", 2, leekPlant);
		this[SEEDS_LIST] = [tomatoSeeds, basilSeeds, carrotSeeds, potatoSeeds, lettuceSeeds, greenOnionSeeds];
		
		// Animals
		// name, ingredient, state, verb, cost
		var pig = new Animal("Pig", bacon, "small baby", "Tend", 10);
		var chicken = new Animal("Chicken", chickenBroth, "small baby", "Make Chicken Broth", 5);
		this[ANIMAL_LIST] = [pig, chicken];
		
		// Utensils
		// name, cost
		var breadPan = new Utensil('Bread Pan', 10);
		var cookingPot = new Utensil("Cooking Pot", 25);
		this[UTENSILS_LIST] = [breadPan, cookingPot];
		this.storeUtensils = [breadPan, cookingPot];
		
		// Recipes
		//name, experienceRequired, sustainabilityGained, greenThumbGained, experienceGained, energyGained, ingredients, utensils
		var vegetableStew = new Recipe("Vegetable Stew", 0, 5, 5, 5, 5, [carrots,potatoes,salt,butter], [cookingPot]);
		vegetableStew.states = ["peeling and slicing carrots", "cutting the potatoes into cubes", "sauteing the vegetables", "adding spices", "simmering in broth", "ready to serve"];
		var bread = new Recipe("Bread", 10, 0, 0, 5, 2, [flour,salt,bakingPowder,bakingSoda,butter], [breadPan]);
		bread.states = ["Mixing ingredients", "Kneading bread", "Baking in oven"];
		var bruschetta = new Recipe("Bruschetta", 20, 10, 5, 10, 3, [bread,tomatoes,basil,salt,oliveOil], []);
		bruschetta.states = ["slicing, oiling, and toasting bread", "chopping and putting tomatoes on the toast", "sprinkling chopped basil and salt on the toast" , "drizzling on olive oil", "ready to serve"];
		var roastedRootVegetables = new Recipe("Roasted Root Vegetables", 50, 15, 15, 15, 3, [carrots,potatoes,parsnips,oliveOil,salt,pepper], []);
		roastedRootVegetables.states = ["Cubing vegetables", "Coating vegetables in oil, salt, and pepper", "Roasting in oven"];
		var gardenSalad = new Recipe("Garden Salad", 110, 10, 5, 10, 2, [lettuce,carrots,greenOnions,bread,dressing], []);
		gardenSalad.states = ["Cutting up vegetables", "Tossing the salad", "Adding dressing"];
		var leekAndPotatoSoup = new Recipe("Leek and Potato Soup", 85, 5, 5, 5, 2, [chickenBroth,leeks,potatoes,butter,salt,pepper], [cookingPot]);
		leekAndPotatoSoup.states = ["chopping vegetables", "sauteing the vegetables", "adding spices", "simmering in broth"];
		var pancakes = new Recipe("Pancakes", 0, 1, 0, 5, 10, [flour,salt,bakingPowder,milk], []);
		pancakes.states = ["mixing ingredients", "cooking on stove"];
		leekAndPotatoSoup.states = ["chopping vegetables", "sauteing the vegetables", "adding spices", "simmering in broth"];
		this.recipes = [vegetableStew, bread, bruschetta, roastedRootVegetables, gardenSalad, leekAndPotatoSoup, pancakes];
		
		
		// Player
		this.player = new GamePlayer();
		this.player.addRecipe(vegetableStew);
			
		// Dwelling
		carrots.usesLeft = 1;
		//potatoes.usesLeft = 2;
		this.dwelling = new SmallUrbanDwelling();
		this.dwelling.garden.addItem(carrotPlant);
		this.dwelling.garden.addItem(potatoPlant);
		this.dwelling.pantry.addItem(flour);
		this.dwelling.pantry.addItem(salt);
		//this.dwelling.pantry.addItem(potatoes);
		this.dwelling.pantry.addItem(bakingPowder);
		//this.dwelling.pantry.addItem(bakingSoda);
		//this.dwelling.fridge.addItem(butter);
		this.dwelling.fridge.addItem(carrots);
		//this.dwelling.fridge.addItem(milk);
		this.dwelling.cupboard.addItem(cookingPot);
		
		// Compost Bin
		this.compostBin = new CompostBin();
		this.compostBin.addListener(this, "handleCompostUpdate");
		
		// Feed Trough
		this.feedTrough = new CompostBin();
		this.feedTrough.addListener(this, "handleTroughUpdate");
		
		// Neighbor Supplies
		this.neighborSupplies = [carrots, salt, parsnips, tomatoes, leeks, parsnips, butter, bakingSoda, salt, butter, parsnips];
		
		// Set up the stories
		// target, property, value, condition
		this.story = [{
				message: "Hey there. Welcome to Urban Cook! Are you ready to start cooking?\n\nYou can make dishes from the recipes in your recipe box, but you have to have all of the ingredients.\n\nLet's start off by making some vegetable stew.\n\nFirst you'll need to buy some butter from the store and harvest some potatoes from your garden.",
				conditions: [new Condition(this.player, "experience", 0)]
			},{
				message: "Great! Your vegetables will grow back over time as long as you keep them watered.\n\nNow try making your vegetable stew recipe.",
				conditions: [	
								//new Condition(carrots, "usesLeft", 4),
								new Condition(potatoes, "usesLeft", 4),
								new Condition(butter, "usesLeft", 4)
								//new Condition(carrotPlant, "state", "growing", "exact")
							]
			},{
				message: "Nice work! You've gathered all of your ingredients and are prepping.\n\nEach recipe has several steps that you'll need to complete. Each step takes time and energy.\nYour stew will be ready for the next step in a few seconds.\n\nIn the mean time, make sure to water your potatoes so they'll be ready to harvest when you need some more.",
				conditions: [
								new Condition(vegetableStew, "timesUsed", 1)
							]
			},/*{
				message: "It looks like your carrots need watering. Keep up on tending your garden so you'll have vegetables when you need them for your recipes.",
				conditions: [	
								new Condition(carrotPlant, "needsTending", true, "exact")
							]
			},*/{
				message: "It looks like you're running low on energy. Cooking meals and tending to things takes energy, so make sure to keep your energy up.\n\nEating the dishes that you make gives you energy.\nYou can also snack on vegetables and other ingredients for a smaller boost.",
				conditions: [	
								new Condition(this.player, "energy", 1, "exact")
							]
			},{
				message: "You just made your first recipe!\n\nWhen you eat a dish it gives you energy. Most things that you do require energy.\n\nWhen you give your dish to a friend, you can start to borrow ingredients from them. The more you give the more you can borrow.\n\nIf you set your dish aside, you can use it in another recipe, or eat it later.\n\nSelect what you want to do with this dish, then try cooking it again.",
				conditions: [	
								new Condition(this.player, "experience", 5)
							]
			},{
				message: "Nice work! You now have enough experience to get the bread recipe.\nPut the bread recipe in your recipe box and try making it!\n\nYou may need to buy some ingredients from the store.\nSpend wisely, as you only have a limited amount of cash.\nYou earn more cash each time you harvest something from your garden or\ncook a meal (you're saving money by doing it yourself!)",
				conditions: [	
								new Condition(this.player, "experience", 10)
							]
			},{
				message: "Whoa! It looks like the carrots in your fridge just spoiled. Make sure to use your food, or it will go bad.\n\nYou can eat some ingredients (like carrots) before they go bad.\n\nThis gives you energy, but doesn't add any experience.\n\nTry throwing your carrots in the compost bin.",
				conditions: [	
								new Condition(carrots, "spoilageLeft", 0, "exact"),
								new Condition(carrots, "usesLeft", 1)
							]
			},{
				message: "Wow. You're on your way to becoming a good cook! After you finish the bread, see if you can make some Bruschietta.\nYou'll need more experience, so keep cooking. You'll also need to set aside a dish of bread.\n\nHint: you'll save some money on the recipe if you plant some tomato and basil seeds right now.",
				conditions: [	
								new Condition(bread, "timesUsed", 1)
							]
			},{
				message: "You have enough experience to get the Bruschetta recipe now. Try making it.",
				conditions: [	
								new Condition(this.player, "experience", 20)
							]
			},{
				message: "You have enough experience to get the Roasted Root Vegetables recipe now. You'll need some Parsnips for this recipe. You'll have to borrow some from your neighbor.\n\nIf you're neighbor doesn't have any to offer, try giving them more dishes that you make.",
				conditions: [	
								new Condition(this.player, "experience", 50)
							]
			},{
				message: "You're officially a 'Cookin' Fool'. Keep it up. See if you can gain 100 experience points.\n\n Each time you make a dish or harvest plants from your garden you gain experience.",
				conditions: [	
								new Condition(bruschetta, "timesUsed", 1)
							]
			},{
				message: "Holy smokes! You've been cooking up a storm. You made it to 100 experience points. Keep playing.",
				conditions: [	
								new Condition(this.player, "experience", 100)
							]
			},{
				message: "You just threw away your vegetable. Next time try composting it instead. Keep your compost bin full and you're garden will grow faster.",
				conditions: [	
								new Condition(this, "vegetablesThrownAway", 1)
							]
			},{
				message: "You just gave your neighbor some food. Nice work!\nYou gained a Good Neighbor point, and you're becoming a good neighbor for real.\n\nTry clicking on 'Neighbor' to see what you can borrow.",
				conditions: [	
								new Condition(this.player, "goodNeighbor", 1)
							]
			},{
				message: "You just composted your first vegetable. Your compost bin will help your garden grow faster!\nWhen your compost bin is at least 50% full your garden will grow twice as fast.",
				conditions: [	
								new Condition(this.compostBin, "howFull", 1)
							]
			},{
				message: "You just put some food in your feed trough. Your feed trough will help your animals grow faster!\nWhen your feed trough is at least 50% full your animals will grow twice as fast.",
				conditions: [	
								new Condition(this.feedTrough, "howFull", 1)
							]
			}
			,{
				message: "Your compost bin is over 50% full! Your garden is growing faster now. It will keep growing faster as long as you keep your bin above 50%.",
				conditions: [	
								new Condition(carrotPlant, "fertilizer", 2)
							]
			}
		];
		
		// Challenges
		this.initChallenges();
			
			
		// Set a periodic refresh of the screen 
		$(this).everyTime(3000, this.updateDisplay);
		this.timerRunning = true;
		
		var thisRef = this;
		$(document).keyup(function(event) { 
			if(event.keyCode == 32) { // Space Bar
				if(thisRef.timerRunning) $(thisRef).stopTime();
				else $(thisRef).everyTime(3000, thisRef.updateDisplay);
				thisRef.timerRunning = !thisRef.timerRunning;
			} 
		});
		
	},
	initChallenges: function() {
		// Borrow something from your neighbor
		var borrowFromFriend = new Challenge(
				
				// activate conditions
				[new Condition(this.player, "experience", 25)], 
				
				// Complete conditions
				[
					new Condition(this, "dishesGiven", 1, "", "Give a dish to your neighbor"),
					new Condition(this, "itemsBorrowed", 1, "", "Borrow something from a neighbor")
				],
					
				// Rewards
				[
					{target: this.player, property: "goodNeighbor", amount: 2},
					{target: this.player, property: "experience", amount: 5}
				],
				
				// Message & Description	
				"Borrow something from a neighbor", 
				"Your neighbors are great resources. They'll lend you items when you need them, but first you have to get friendly with them. When you give a dish to a neighbor, they'll have items that you can borrow. See if you can borrow something from a neighbor.\nIf you complete this task you'll get 2 good neighbor points and 5 experience points."
			);
		
		// Friends for a party challenge
		/*var friendsPartyChallenge = new Challenge(
				
				// activate conditions
				[new Condition(this.player, "experience", 25)], 
				
				// Complete conditions
				[
					new Condition(this.player, "experience", 20, "", "Gain 20 experience points"),
					new Condition(this.dwelling.counter.slots, "length", 3, "", "Make three dishes and set them aside")
				],
					
				// Rewards
				[	{target: this.player, property: "experience", amount: 50}, 
					{target: this.player, property: "goodNeighbor", amount: 10},
					{target: this.player, property: "money", amount: 100},
					{target: this.dwelling.counter, method: "empty"}
				],
				
				// Message & Description	
				"Host a Food Party", 
				"It's time to have a party! Having friends over for a food party is great fun. If you complete this task, you'll gain 50 experience points, 10 good neighbor points, and 100 cash points."
			);
		*/	
		// Friends for a party challenge
		var friendsPartyChallenge = new Challenge(

				// activate conditions
				[new Condition(this.player, "experience", 65)], 

				// Complete conditions
				[
					new Condition(this.player, "experience", 80, "", "Gain 80 experience points"),
					new Condition(this.dwelling.counter.slots, "length", 3, "", "Make three dishes and set them aside"),
					new ActionCondition(this.eventHandler, "Invite five friends for dinner", "askFavor", {message: "Would you like to send invitations to five Facebook friends?", description: "asked five friends for dinner", confirmation: "Five of your neighbors accepted your dinner party invitation."})
				],

				// Rewards
				[	{target: this.player, property: "experience", amount: 50}, 
					{target: this.player, property: "goodNeighbor", amount: 10},
					{target: this.player, property: "money", amount: 100},
					{target: this.dwelling.counter, method: "empty"}
				],

				// Message & Description	
				"Host a Food Party", 
				"It's time to have a party! Having friends over for a food party is great fun. If you complete this task, you'll gain 50 experience points, 10 good neighbor points, and 100 cash points."
			);
		this.challenges = [ borrowFromFriend, friendsPartyChallenge ];
	},
	handleCompostUpdate: function(event, source) {
		if(source.percentFull() > 50) {
			//alert("fertilizing plants");
			for (var i = this.plants.length - 1; i >= 0; i--){
				this.plants[i].fertilizer = 2;
			};
		} else {
			for (var i = this.plants.length - 1; i >= 0; i--){
				this.plants[i].fertilizer = 1;
			};
		}
	},
	handleTroughUpdate: function(event, source) {
		if(source.percentFull() > 50) {
			//alert("fertilizing plants");
			for (var i = this[ANIMAL_LIST].length - 1; i >= 0; i--){
				this[ANIMAL_LIST][i].fertilizer = 2;
			};
		} else {
			for (var i = this[ANIMAL_LIST].length - 1; i >= 0; i--){
				this[ANIMAL_LIST][i].fertilizer = 1;
			};
		}
	},
	registerTask: function(newTask) {
		this.tasks.push(newTask);
		return newTask;
	},
	getStorageLocationFor: function(item) {
		if(item.storageContainer) return item.storageContainer;
		switch(item.is) {
			case "Animal":
				var container = "yard";
			break;
			case "Plant":
				var container = "garden";
			break;
			case "Utensil":
				var container = "cupboard";
			break;
			case "Ingredient":
				switch(item.storageType) {
					case "cold":
						var container = "fridge";
					break;
					case "roomTemp":
						var container = "pantry";
					break;
					case "stove":
						var container = "stove";
					break;
					case "counter":
						var container = "counter";
					break;
				};
			break;
		}
		return this.dwelling[container];
	},
	storeItem: function(item, amount) {
		var location = item.product.storageContainer || this.getStorageLocationFor(item.product);
		if(location.addItem(item.product)) {
			item.product.place(amount);
			return true;
		};
		return false;
	},
	tend: function(obj) {
		var objs = obj.split(".");
		var location = this.dwelling[objs[0].toLowerCase()];
		var name = objs[1];
		
		// Make sure the player has enough energy
		if(this.player.energy <= 0) {
			alert("You don't have enough energy to tend your " + name + " right now. Try eating something. You will also re-gain energy with time.");
			return false;
		}
		// Harvest the plant
		for(var i = 0; i< location.slots.length; i++) {
			var item = location.slots[i];
			if(item.name == name) {
				// Flound the plant
				item.tend();
				this.player.useEnergy(1);
				switch(item.is) {
					case "Plant":
						this.player.greenThumb++;
					break;
					case "Animal":
						this.player.animalPerson++;
					break;
				}
				this.updateDisplay();
				return true;
			}
		}
		return false;
	},
	harvest: function(obj) {
		var objs = obj.split(".");
		var location = this.dwelling[objs[0].toLowerCase()];
		var name = objs[1];
		//alert("harvest: " + name + "->" + location);

		// Make sure the player has enough energy
		if(this.player.energy <= 0) {
			alert("You don't have enough energy to harvest " + name + " right now. Try eating something. You will also re-gain energy with time.");
			return false;
		}
		// Harvest the plant
		for(var i = 0; i< location.slots.length; i++) {
			var item = location.slots[i];
			if(item.name == name) {
				// Flound the plant
				if(item.yeild() > 0) {
					var success = this.storeItem(item.ingredient, item.yeild());
					if(success) {
						this.player.useEnergy(1);
						this.player.money += 2;
						item.use();
						this.updateDisplay();
					} else {
						alert("You don't have any room left to store your " + item.ingredient.name + ". \nTry clearing other things out.");
					}
					return success;
				} else {
					alert("Your " + item.name + " is not ready to harvest.");
					return false;
				}
			}
		}
		// didn't find the plant in the garden
		alert("You don't have any " + name + " in your garden;");
		return false;
	},
	remove: function(obj) {
		var objs = obj.split(".");
		var location = this.dwelling[objs[0].toLowerCase()];
		var name = objs[1];
		
		// Make sure the player has enough energy
		if(this.player.energy <= 0) {
			alert("You don't have enough energy to remove your " + name + " right now. Try eating something. You will also re-gain energy with time.");
			return false;
		}
		// Till the land
		for(var i = 0; i< location.slots.length; i++) {
			var item = location.slots[i];
			if(item.name == name) {
				// Flound the plant
				location.removeItem(item);
				this.updateDisplay();
			}
		}
	},
	buy: function(obj) {
		var objs = obj.split(".");
		var list = this[objs[0].toLowerCase()];
		var name = objs[1];
		
		for(var i = 0; i< list.length; i++) {
			var item = list[i];
			if(item.name == name) {
				if(this.player.money >= item.cost) {
					if(this.storeItem(item)) {
						this.player.money -= item.cost;
						$("#store h2").click();
						this.updateDisplay();
					}
				} else {
					alert("You don't have enough money to buy " + item.name + "\nEarn more money by cooking meals and harvesting from your garden.");
				}
			}
		}
	},
	throwAwayUtensil: function(utensilName) {
		for(var i = 0; i< this.utensils.length; i++) {
			var utensil = this.utensils[i];
			if(utensil.name == utensilName) {
				// Flound the ingredient
				utensil.storageContainer.removeItem(utensil);
			}
		}
		this.updateDisplay();
	},
	borrowIngredient: function(ingredientName) {
		for(var i = 0; i< this.neighborSupplies.length; i++) {
			var ingredient = this.neighborSupplies[i];
			if(ingredient.name == ingredientName) {
				// Found the ingredient
				
				// Make sure the neigbor has enough good neighbor points. If they do, send the request
				if(this.player.goodNeighbor >= i) {
					var request = {	message: "Would you like to ask one of your Facebook friends to borrow some " + ingredientName + "?", 
									description: "sent a request to borrow some " + ingredientName + " from your neighbor", 
									confirmation: "Your neighbor just lent you some " + ingredient.name + "."};
					this.eventHandler.addListener(this, "receiveBorrowedIngredient", ingredient.name);
					this.askFavor(ingredient.name, request);
					this.player.goodNeighbor -= 1;
					this.neighborSupplies.splice(i,1); // Remove the item from the list. 
					$("#neighbor h2").click();
					return true;
				} else {
					alert("You don't have enough Good Neighbor points to borrow " + ingredient.name + ".");
					return false;
				}
			}
		}
	},
	receiveBorrowedIngredient: function(ingredientName) {
		// Find the ingredient and increment it by 1
		for(var i = 0; i< this.ingredients.length; i++) {
			var ingredient = this.ingredients[i];
			if(ingredient.name == ingredientName) {
				var success = this.storeItem(ingredient, 1);
				if(success) {
					this.itemsBorrowed++;
					this.updateDisplay();
				}
				return success;
			}
		}
		return false;
	},
	throwAwayIngredient: function(ingredientName) {
		for(var i = 0; i< this.ingredients.length; i++) {
			var ingredient = this.ingredients[i];
			if(ingredient.name == ingredientName) {
				// Flound the ingredient
				ingredient.storageContainer.removeItem(ingredient);
				ingredient.usesLeft = 0;
				if(ingredient.isCompostable) this.vegatablesThrownAway++;
			}
		}
		this.updateDisplay();
	},
	reuseIngredient: function(ingredientName, container) {
		for(var i = 0; i< this.ingredients.length; i++) {
			var ingredient = this.ingredients[i];
			if(ingredient.name == ingredientName) {
				// Flound the ingredient
				if(ingredient.isCompostable) {
					ingredient.storageContainer.removeItem(ingredient);
					ingredient.usesLeft = 0;
					container.addItem(ingredient);
				} else {
					alert("You can't put " + ingredient.name + " there.");
				}
				
			}
		}
		this.updateDisplay();
	},
	compostIngredient: function(ingredientName) {
		this.reuseIngredient(ingredientName, this.compostBin);
	},
	troughIngredient: function(ingredientName) {
		this.reuseIngredient(ingredientName, this.feedTrough);
	},
	eatIngredient: function(ingredientName) {
		for(var i = 0; i< this.ingredients.length; i++) {
			var ingredient = this.ingredients[i];
			if(ingredient.name == ingredientName) {
				// Flound the ingredient
				if(ingredient.usesLeft > 0) {
					// Now eat it
					ingredient.use();
					this.player.gainEnergy(10);
					alert("Yum.");
					
					// If this ingredient is not one you can buy in the store then it should be removed from the ingredients array
					if(ingredient.usesLeft == 0) {
						var buyable = false;
						for(var j = 0; j < this.storeIngredients.length; j++) {
							if(this.storeIngredients[j].name == ingredient.name) {
								buyable = true;
							}
						}
						if(!buyable) this.ingredients.splice(i,1);
					}
					
					// Update the display
					this.updateDisplay();
				} else {
					alert("You don't have any " + ingredientName + " left.");
				}
			}
		}
	},
	useRecipe: function(recipeName) {
		// Make sure the player has enough energy
		if(this.player.energy <= 0) {
			alert("You don't have enough energy to make " + recipeName + " right now. Try eating something. You will also re-gain energy with time.");
			return false;
		}
		// See if there's any room on the stove
		if(!this.dwelling.stove.hasSpace()) {
			alert("You don't have any more space in your stove. \nYou can remove other items to make space.");
			return false;
		}
		
		var hasRecipe = false;
		for(var i = 0; i< this.player.recipes.length; i++) {
			var recipe = this.player.recipes[i];
			if(recipe.name == recipeName) {
				// Found the recipe. Let's make sure we have enough ingredients to make it.
				hasRecipe = true;
				var canUse = true;
				var error = "";
				var ingredients = [];
				for(var j = 0; j < recipe.ingredients.length; j++) { // For each ingredient in the recipe
					var ingredient = recipe.ingredients[j];
					var ingredientFound = false;
					for(var k = 0; k < this.dwelling.foodStorage.length; k++) { // Search through all storage in the dwelling for the ingredient.
						for(var l = 0; l < this.dwelling.foodStorage[k].slots.length; l++) {
							var storageItem = this.dwelling.foodStorage[k].slots[l];
							if(storageItem.name == ingredient.name) { // If you find the ingredient in storage, see if we have enough.
								ingredientFound = true;
								if(ingredient.usesLeft <= 0 || ingredient.spoilageLeft <= 0) {
									error += "You don't have enough " + ingredient.name + " to make this recipe.\n";
									canUse = false;
								} else {
									ingredients.push(storageItem);
								}
							}
						}
					}
					if(!ingredientFound) { // If you didn't find the ingredient, we can't make the recip
						canUse = false;
						error += "You don't have any " + ingredient.name + ".\n";
					}
					
					
				}
				// Now let's make sure we have all neccessary equipment
				for(var j = 0; j < recipe.utensils.length; j++) { // For each piece of equipment in the recipe
					var utensilFound = false;
					var neededUtensil = recipe.utensils[j];
					for(var k = 0; k < this.dwelling.cupboard.slots.length; k++) {
						var ownedUtensil = this.dwelling.cupboard.slots[k];
						if(neededUtensil.name == ownedUtensil.name) {
							utensilFound = true;
						}
					}
					if(!utensilFound) { // If you didn't find the utensil, we can't make the recipe
						canUse = false;
						error += "You don't have a " + neededUtensil.name + ".\n";
					}
				}
				// We've got everything we need, let's use it.
				if(canUse) {
					// Try putting it on the stove
					ingredient = new Ingredient(recipe.name, 0, 1, 0, 4, "counter", true, false, 1); //name, cost, usesLeft, spoilageLeft, storageType, isEdible, isCompostable, servings
					var dish = new Dish(recipe.name, ingredient, recipe.states[0], recipe.energyGained, recipe);
					dish.states = recipe.states;
					var success = this.dwelling.stove.addItem(dish);
					if(success) {
						dish.place();
						recipe.timesUsed++;
						for(j = 0; j < ingredients.length; j++) {
							//alert(ingredients[j].name + " is a " + ingredients[j].is /*+ ", and is in the " + ingredients[j].storageContainer.name*/);
							ingredients[j].use();
						}
						this.player.useEnergy(1);
						
						this.updateDisplay();
					}
					
				} else {
					alert("You don't have everything that you need to make this recipe.\n" + error + "You can purchase most things at the store, but you save money\nif you harvest them from your garden or borrow them from a neighbor.")
				}
				
			}
		}
		if(!hasRecipe) alert("You don't have the " + recipeName + " recipe");
	},
	getRecipe: function(recipeName) {
		//alert(".")
		for(var i = 0; i< this.recipes.length; i++) {
			var recipe = this.recipes[i];
			//alert(recipeName + ":" + recipe.name);
			if(recipe.name == recipeName) {
				if(this.player.experience >= recipe.experienceRequired) {
					this.player.addRecipe(recipe);
					$("#recipes h2").click();
				} else {
					alert("You don't have enough experience to use this recipe.")
				}
			}
		}
		this.updateDisplay();
	},
	finishDish: function(dishName) {
		// Harvest the plant
		var location = this.dwelling.stove;
		for(var i = 0; i< location.slots.length; i++) {
			var item = location.slots[i];
			if(item.name == dishName) {
				this.player.experience += item.recipe.experienceGained;
				this.player.money += 5;
				this.player.useEnergy(1);
				location.removeItem(item);
		
				var choices = [{name: "Eat It", action: "eatDish", id: item.name}, {name: "Set It Aside", action: "setDishAside", id: item.name}, {name: "Give it to a neighbor", action: "giveDishToNeighbor", id: item.name}];
				this.messages.push(new Message("Nice Work!", "You just made " + item.name + ".\nNow what would you like to do with it?", choices));
				item = null;
				this.updateDisplay();
			}
		}
	},
	eatDish: function(recipeName) {
		//alert(".")
		for(var i = 0; i< this.recipes.length; i++) {
			var recipe = this.recipes[i];
			//alert(recipeName + ":" + recipe.name);
			if(recipe.name == recipeName) {
				this.player.gainEnergy(recipe.energyGained);
				this.closeMessage();
			}
		}
	},
	setDishAside: function(recipeName) {
		//alert(".");
		for(var i = 0; i< this.recipes.length; i++) {
			var recipe = this.recipes[i];
			//alert(recipeName + ":" + recipe.name);
			if(recipe.name == recipeName) {
				var dishIngredient = new Ingredient(recipe.name, 0, 1, 0, 4, "roomTemp", true, false, 1); //name, cost, usesLeft, spoilageLeft, storageType, isEdible, isCompostable, servings
				this.dwelling.counter.addItem(dishIngredient);
				this.ingredients.push(dishIngredient);
			}
		}
		this.closeMessage();
	},
	giveDishToNeighbor: function(recipeName) {
		if(confirm("Would you like to share this with one of your Facebook friends?")) {
			this.player.goodNeighbor += 1;
			this.dishesGiven++;
		}
		this.closeMessage();
	},
	askFavor: function(favorName, data) {
		if(confirm(data.message)) {
			alert("You just " + data.description + ". We'll let you know when they respond.");
			var thisRef = this;
			$(this).oneTime(Math.round(Math.random(30000)) + 30000, function() { thisRef.receiveFavor(favorName, data)});
		}
	},
	receiveFavor: function(favorName, data) {
		alert(data.confirmation);
		this.handleEvent(favorName);
	},
	updateStory: function() {
		for(var i = 0; i < this.story.length; i++) {
			var storyLine = this.story[i];
			var turningPoint = true;
			for(var j = 0; j < storyLine.conditions.length; j++) {
				var condition = storyLine.conditions[j];
				if(!condition.doesPass()) turningPoint = false;
			}
			if(turningPoint/* && $("#messages").css("display") == "none"*/) {
				// Display the message and remove the item from the story
				//alert(condition.target.name + ": " + condition.property + " = " + condition.target[condition.property] + " and is " + condition.condition + " than " + condition.value);
				alert(storyLine.message);
				this.story.splice(i,1);
			}
		}
	},
	updateChallenges: function() {
		for (var i=0; i < this.challenges.length; i++) {
			if(this.challenges[i].state == "active") {
				if(this.challenges[i].tryToComplete()) {
					this.challenges.splice(i,1);2
				};
			} else if (this.challenges[i].state == "inactive") {
				this.challenges[i].tryToActivate();
			}
		};
	},
	displayChallenge: function(challengeName) {
		//alert(".")
		for(var i = 0; i< this.challenges.length; i++) {
			var challenge = this.challenges[i];
			//alert(recipeName + ":" + recipe.name);
			if(challenge.name == challengeName) {
				// "Found the challenge"
				this.messages.push(challenge);
				$("#challenges h2").click();
			}
		}
		this.updateDisplay();
	},
	handleEvent: function(eventName) {
		this.eventHandler.sendEvent(eventName);
	},
	closeMessage: function() {
		this.messages.splice(0,1);
		this.updateDisplay();
	},
	updateDisplay: function() {
		
		// Player info
		var gameHTML = "<div id='player'><h2>Your Player</h2>";
		gameHTML += "Cash: " + this.player.money + "<br />";
		gameHTML += "Energy: " + this.player.energy + "<br />";
		gameHTML += "Experience: " + this.player.experience + "<br />";
		gameHTML += "Good Neighbor: " + this.player.goodNeighbor + "<br />";
		gameHTML += "Green Thumb: " + this.player.greenThumb + "<br />";
		gameHTML += "Animal Person: " + this.player.animalPerson + "<br />";
		gameHTML += "<h3>Recipe Box</h3>";
		for(var i = 0; i < this.player.recipes.length; i++) {
			gameHTML += this.player.recipes[i].activeOutput() + "<br /><br />";
		}
		gameHTML += "</div>";
		
		// Dwelling info/
		gameHTML += "<div id='dwelling'><h2>Your Home</h2>";
		gameHTML += "Compost Bin: " + this.compostBin.output();
		gameHTML += "<h3>Stove <span>(" + this.dwelling.stove.slots.length + " of " + this.dwelling.stove.maxSlots + " slots used)</span></h3>";
		gameHTML += arrayOutput(this.dwelling.stove.slots, "output", "<div class='ingredient'>* ", "</div>");
		
		// Trying to add a graphic on the stove for the pancake recipe. It thinks that the graphic is undefined for some reason.
		//if(this.dwelling.stove.slots[0])  console.log(this.dwelling.stove.slots[0].name);
		if(this.dwelling.stove.slots[0] && (this.dwelling.stove.slots[0].name == "Pancakes" || this.dwelling.stove.slots[0].name == "Vegetable Stew")) {
		  //console.log("graphic: " + this.dwelling.stove.slots[0].graphic );
		  gameHTML += "<div class='on-stove' style='background-image: url(images/recipes/" + encodeURI(this.dwelling.stove.slots[0].name.toLowerCase()) + "/cooking.png);'></div>";
	  }

		gameHTML += "<h3>Garden <span>(" + this.dwelling.garden.slots.length + " of " + this.dwelling.garden.maxSlots + " slots used)</span></h3>";
		gameHTML += arrayOutput(this.dwelling.garden.slots, "output", "<div class='ingredient'>* ", "</div>");
		gameHTML += "<h3>Pantry <span>(" + this.dwelling.pantry.slots.length + " of " + this.dwelling.pantry.maxSlots + " slots used)</span></h3>";
		gameHTML += arrayOutput(this.dwelling.pantry.slots, "output", "<div class='ingredient'>* ", "</div>");
		gameHTML += "<h3>Fridge <span>(" + this.dwelling.fridge.slots.length + " of " + this.dwelling.fridge.maxSlots + " slots used)</span></h3>";
		gameHTML += arrayOutput(this.dwelling.fridge.slots, "output", "<div class='ingredient'>* ", "</div>");
		gameHTML += "<h3>Counter <span>(" + this.dwelling.counter.slots.length + " of " + this.dwelling.counter.maxSlots + " slots used)</span></h3>";
		gameHTML += arrayOutput(this.dwelling.counter.slots, "output", "<div class='ingredient'>* ", "</div>");
		gameHTML += "<h3>Cupboard <span>(" + this.dwelling.cupboard.slots.length + " of " + this.dwelling.cupboard.maxSlots + " slots used)</span></h3>";
		gameHTML += arrayOutput(this.dwelling.cupboard.slots, "output", "<div class='ingredient'>* ", "</div>");
		gameHTML += "</div>";
		
		// Yard
		gameHTML += "<div id='yard'><h2>Your Yard</h2>";
		gameHTML += "Feed Trough: " + this.feedTrough.output() + "<br /><br />"; 
		gameHTML += arrayOutput(this.dwelling.yard.slots, "output", "<div class='ingredient'>* ", "</div>");
		
		// Recipes
		var recipeOutput = "";
		var activeRecipeCount = 0;
		
		for(var i = 0; i < this.recipes.length; i++) {
			var recipe = this.recipes[i];
			if(!recipe.owned) {
				if(recipe.experienceRequired <= this.player.experience) {
					recipeOutput += recipe.availableOutput() + "<br /><br />";
					activeRecipeCount++;
				}
				else recipeOutput += recipe.unavailableOutput() + "<br /><br />";
			}
		}
		var recipeHTML = "<h2>More Recipes (" + activeRecipeCount + ")</h2>" + recipeOutput;
		
		// Store
		var storeHTML = "<h2>Store</h2>";
		storeHTML += "<h3>Ingredients</h3>";
		storeHTML += arrayOutput(this.storeIngredients, "storeOutput", "<div class='ingredient'>* ", "</div>");
		storeHTML += "<h3>Seeds</h3>";
		storeHTML += arrayOutput(this[SEEDS_LIST], "output", "<div class='ingredient'>* ", "</div>");
		storeHTML += "<h3>Animals</h3>";
		storeHTML += arrayOutput(this[ANIMAL_LIST], "storeOutput", "<div class='ingredient'>* ", "</div>");
		storeHTML += "<h3>Equipment</h3>";
		storeHTML += arrayOutput(this[UTENSILS_LIST], "storeOutput", "<div class='ingredient'>* ", "</div>");
		
		// Neighbor
		var neighborHTML = "<h2>Neighbor (" + Math.min(this.player.goodNeighbor, this.neighborSupplies.length) + ")</h2>";
		if(this.player.goodNeighbor <= 0) neighborHTML += "You have to give your neighbor a dish that you made before you can borrow from them.";
		for(var i = 0; i < this.player.goodNeighbor && i < this.neighborSupplies.length; i++) {
			neighborHTML += this.neighborSupplies[i].neighborOutput();
		}
		
		// Messages
		var messageHTML = "";
		if(this.messages.length > 0) {
			messageHTML += this.messages[0].output();
			$("#messages").css("display", "block");
		} else {
			$("#messages").css("display", "none");
		}
		
		// Challenges
		var challengeOutput = "";
		var challengeCount = 0;
		for (var i=0; i < this.challenges.length; i++) {
			var challenge = this.challenges[i];
			if(challenge.state == "active") {
				challengeOutput += challenge.briefOutput();
				challengeCount++;
			}
		};
		if(challengeCount == 0) {
			challengeOutput += "There are currently no active challenges. Keep cooking!";
		}
		var challengeHTML = "<h2>Challenges (" + challengeCount + ")</h2>" + challengeOutput;
		
		// Output
		$("#game").html(gameHTML);
		$("#store").html(storeHTML);
		$("#messages").html(messageHTML);
		$("#neighbor").html(neighborHTML);
		$("#challenges").html(challengeHTML);
		$("#recipes").html(recipeHTML);
		
		// Actions
		var myGame = this;
		$(".gameControl").click(function() {
			var data = {};
			if($(this).attr("data")) data = $.evalJSON($(this).attr("data"));
			myGame[$(this).attr("action")]($(this).attr("id"), data);
			return false;
		});
		// Panels
		$("#store h2, #neighbor h2, #challenges h2, #recipes h2").click(function() {
			var holder = $(this).parent();
			if(holder.height() == 29) holder.css("height", "auto");
			else holder.css("height", "29px");
		});
		
		// Update and display any story messages.
		this.updateStory();
		
		// Update challenges
		this.updateChallenges();
	}
}

var GamePlayer = function() {
	this.money = 60;
	this.experience = 0;
	//this.accomplishments = new Array();
	this.goodNeighbor = 0;
	this.greenThumb = 0;
	this.animalPerson = 0;
	this.energy = 8;
	this.recipes = new Array();
	var thisRef = this;
	$(this).everyTime(120000, function() { thisRef.gainEnergy(); });
}; GamePlayer.prototype = {
	addRecipe: function(newRecipe) {
		this.recipes.push(newRecipe);
		newRecipe.owned = true;
	},
	gainEnergy: function(gained) {
		if(!gained) gained = 1; // set the default
		this.energy += gained;
		this.energy = Math.min(this.energy, 10);
	},
	useEnergy: function(amount) {
		this.energy -= amount;
		this.energy = Math.max(this.energy, 0);
	}
}

var SmallUrbanDwelling = function() {
	this.garden = new StorageContainer("Garden", 4);
	this.pantry = new StorageContainer("Pantry", 5);
	this.fridge = new StorageContainer("Fridge", 4);
	this.counter = new StorageContainer("Counter", 3);
	this.cupboard = new StorageContainer("Cupboard", 4);
	this.stove = new StorageContainer("Stove", 1);
	this.yard = new StorageContainer("Yard", 8);
	this.foodStorage = [this.pantry, this.fridge, this.counter];
}; SmallUrbanDwelling.prototype = {
	allIngredients: function() {
		return this.garden.slots.concat(this.pantry.slots, this.fridge.slots);
	}
}

var StorageContainer = function(name, maxSlots) {
	this.name = name;
	this.maxSlots = maxSlots;
	this.slots = new Array();
}; StorageContainer.prototype = {
	addItem: function(newItem) {
		// Check to see if this ingredient is already in the container, if it is, don't do anything
		var alreadyHere = false;
		for(var i = 0; i < this.slots.length; i++) {
			if(this.slots[i].name == newItem.name) {
				return true;
			}
		}
		// Not already here, see if we have room for another item
		if(this.hasSpace()) {
			this.slots.push(newItem);
			newItem.setStorageContainer(this);
			return true;
		}
		// No room
		else {
			alert("You don't have any room left in your " + this.name + ".");
			return false;
		}
	},
	removeItem: function(removedItem) {
		for(var i = 0; i < this.slots.length; i++) {
			if(this.slots[i].name == removedItem.name) {
				this.slots.splice(i,1);
				removedItem.setStorageContainer(undefined);
				return true;
			}
		}
		// didn't find it
		alert("You don't have any " + removedItem.name + " in your " + this.name);
		return false;
	},
	empty: function() {
		for (var i = this.slots.length - 1; i >= 0; i--){
			this.removeItem(this.slots[i]);
		};
	},
	hasSpace: function() {
		return this.slots.length < this.maxSlots;
	}
};

var CompostBin = function() {
	this.maxCapacity = 4;
	this.howFull = 0;
	this.listeners = [];
	this.capacityUpdated = "capacity updated";
	var thisRef = this;
	$(this).everyTime(15000, function() { thisRef.age(); });
}; CompostBin.prototype = {
	addListener: function(target, handler) {
		this.listeners.push({target: target, handler: handler});
	},
	sendEvent: function(event) {
		for(var i = 0; i < this.listeners.length; i++) {
			this.listeners[i].target[this.listeners[i].handler](event, this);
		}
	},
	setHowFull: function(howFull) {
		this.howFull = howFull;
		this.howFull = Math.min(this.howFull, this.maxCapacity);
		this.sendEvent(this.capacityUpdated);
	},
	percentFull: function() {
		return Math.round((this.howFull / this.maxCapacity) * 100);
	},
	age: function() {
		this.setHowFull(this.howFull * .95);
	},
	addItem: function(newItem) {
		this.setHowFull(this.howFull + 1);
	},
	output: function() {
		return "Currently " + this.percentFull() + "% full.";
	}
};

var Utensil = function(name, cost) {
	this.is = "Utensil";
	this.name = name;
	this.cost = cost;
	this.storageContainer = undefined;
	this.product = this;
}; Utensil.prototype = {
	setStorageContainer: function(a_storageContainer) {
		this.storageContainer = a_storageContainer;
	},
	place: function() {
		// nothing needed here. Just to satisfy the interface
	},
	storeOutput: function() {
		var output = this.name + "<br />";
		output += "Cost: " + this.cost + "<br />";
		output += "<a class='gameControl' id='" + UTENSILS_LIST + "." + this.name + "' action='buy' href='#'>Buy</a><br />"; //
		return output;
	},
	output: function() {
		var output = this.name + "<br />";
		output += "<a class='gameControl' id='" + this.name + "' action='throwAwayUtensil' href='#'>Give Away</a><br />"; //
		return output;
	}
};

var Seed = function(name, cost, plant) {
	this.is = "Seed";
	this.name = name;
	this.cost = cost;
	this.product = plant;
}; Seed.prototype = {
	output: function() {
		var output = this.name + "<br />";
		output += "Cost: " + this.cost + "<br />";
		output += "<a class='gameControl' id='" + SEEDS_LIST + "." + this.name + "' action='buy' href='#'>Buy</a><br />"; //
		return output;
	}
};

var Ingredient = function(name, cost, usesLeft, spoilageRate, spoilageLeft, storageType, isEdible, isCompostable, usesPerPurchase) {
	this.is = "Ingredient";
	this.name = name;
	this.cost = cost;
	this.usesPerPurchase = usesPerPurchase;
	this.usesLeft = usesLeft;
	this.spoilageRate = spoilageRate;
	this.spoilageLeft = spoilageLeft;
	this.storageType = storageType;
	this.storageContainer = undefined;
	this.isEdible = isEdible;
	this.isCompostable = isCompostable;
	this.product = this;
}; Ingredient.prototype = {
	setStorageContainer: function(a_storageContainer) {
		this.storageContainer = a_storageContainer;
		if(this.storageContainer) {
			this.spoilageLeft = 4;
			this.startDecay();
		} else {
			this.endDecay();
		}
	},	
	startDecay: function() {
		if(this.spoilageRate > 0) {
			var thisRef = this;
			$(this).everyTime(3000, function() { thisRef.spoil(); });
		}
	},
	endDecay: function() {
		$(this).stopTime();
	},
	spoil: function() {
		this.spoilageLeft = this.spoilageLeft - this.spoilageRate;
		if(this.spoilageLeft <= 0) {
			//alert("Your " + this.name + " just spoiled. Make sure to use your ingredients before they go bad!");
			this.spoilageLeft = 0
			this.endDecay();
		} 
	},
	place: function(amount) {
		if(!amount) amount = this.usesPerPurchase;
		this.usesLeft += amount;
		this.spoilageLeft = 4;
	},
	use: function() {
		if(this.usesLeft > 0) {
			this.usesLeft--;
			if(this.usesLeft <= 0) this.storageContainer.removeItem(this);
			return true;
		}
		if(this._storageContainer) this.storageContainer.removeItem(this);
		return false;
	},
	output: function() {
		var output = this.name + "<br />";
		if(this.spoilageLeft <= 0) output += "<span class='spoiled'>Spoiled</span><br />";
		else { 
				output += "Uses Left: " + this.usesLeft + "<br />";
				if(this.spoilageRate > 0) output += "Spoilage Left: " + Math.round(this.spoilageLeft) + "<br />";
			}
		if(this.spoilageLeft > 0 && this.usesLeft > 0 && this.isEdible) output += "<a class='gameControl' id='" + this.name + "' action='eatIngredient' href='#'>Eat</a><br />";
		if(this.isCompostable) {
			output += "<a class='gameControl secondary' id='" + this.name + "' action='compostIngredient' href='#'>Compost</a>";
			output += "<a class='gameControl secondary' id='" + this.name + "' action='troughIngredient' href='#'>Put in trough</a>";
		}
		else output += "<a class='gameControl' id='" + this.name + "' action='throwAwayIngredient' href='#'>Throw Away</a><br />";
		return output;
	},
	storeOutput: function() {
		var output = this.name + "<br />";
		output += "Cost: " + this.cost + "<br />";
		output += "<a class='gameControl' id='" + INGREDIENT_LIST + "." + this.name + "' action='buy' href='#'>Buy</a><br />"; //
		return output;
	},
	neighborOutput: function() {
		var output = this.name + ": ";
		output += "<a class='gameControl' id='" + this.name + "' action='borrowIngredient' href='#'>Borrow</a><br />"; //
		return output;
	}
};

var Grower = function(name, ingredient, state) {
	this.is = "Grower";
	this.name = name;
	this.ingredient = ingredient;
	this.states = [];
	this.state = state;
	this.storageContainer = undefined;
	this.needsTending = false;
	this.baseGrowRate = 6000;
	this.fertilizer = 1;
}; Grower.prototype = {
	setStorageContainer: function(a_storageContainer) {
		this.storageContainer = a_storageContainer;
	},
	setState: function(newState) {
		this.state = newState;
	},
	tend: function() {
		this.mature();
		this.tendTimer();
	},
	tendTimer: function() {
		var thisRef = this;
		$(this).oneTime(this.baseGrowRate / this.fertilizer, function() { thisRef.tendTimerComplete(); });
	},
	tendTimerComplete: function() {
		//alert(this.is + ":" + this.baseGrowRate);
		// Doing it this way insures you don't water the plant and then have it turn immediately ripe.
		if(this.state == this.states[this.states.length - 2]) { //if(this.state == "almost ripe") {
			//alert(this.state + ":" + this.states[this.states.length - 2])
			this.mature();
		} else {
			this.needsTending = true;
		}
	},
	yeild: function() {
		if(this.state == this.states[this.states.length-1]) {
			return 4;
		}
		return 0;
	},
	place: function() {
		this.setState(this.states[0]); //this.setState("seed");
		this.tendTimer();
	},
	use: function() {
		this.state = this.states[this.states.length - 3]; //"growing";
		this.tendTimer();
		return this.ingredient;
	},
	mature: function() {
		for(var i = 0; i < this.states.length - 1; i++) {
			if(this.state == this.states[i]) {
				this.setState(this.states[i+1]);
				break;
			}
		}
		this.needsTending = false;
	},
	output: function() {
		var data = this.storageContainer.name + "." + this.name;
		var output = this.name + "<br />";
		output += "Currently " + this.state + "<br />";
		if(this.state == "ripe") output += "<a class='gameControl' id='" + data + "' action='harvest' href='#'>Harvest</a><br />";
		else if(this.needsTending) output += "<a class='gameControl' id='" + data + "' action='tend' href='#'>Water</a><br />";
		output += "<a class='gameControl secondary' id='" + data + "' action='remove' href='#'>Till & Clear Plot</a><br />";
		if(this.needsTending) {
			output = "<span class='needsTending'>" + output + "</span>";
		}
		return output;
	}
};

function Plant(name, ingredient, state) {
	this.is = "Plant";
	this.name = name;
	this.ingredient = ingredient;
	this.states = ["seed", "seedling", "growing", "almost ripe", "ripe"];
	this.state = state;
	this.storageContainer = undefined;
	this.needsTending = false;
	this.baseGrowRate = 6000;
	this.fertilizer = 1;
}
subClass(Grower, Plant, {
	constructor: Plant,
	output: function() {
		//alert("output");
		var data = this.storageContainer.name + "." + this.name;
		var output = this.name + "<br />";
		output += "Currently " + this.state + "<br />";
		if(this.state == "ripe") output += "<a class='gameControl' id='" + data + "' action='harvest' href='#'>Harvest</a><br />";
		else if(this.needsTending) output += "<a class='gameControl' id='" + data + "' action='tend' href='#'>Water</a><br />";
		output += "<a class='gameControl secondary' id='" + data + "' action='remove' href='#'>Till & Clear Plot</a><br />";
		if(this.needsTending) {
			output = "<span class='needsTending'>" + output + "</span>";
		}
		return output;
	}
});

function Animal(name, ingredient, state, verb, cost) {
	this.is = "Animal";
	this.name = name;
	this.ingredient = ingredient;
	this.states = ["small baby", "growing baby", "adolescent", "growing adolescent", "almost grown", "fully grown"];
	this.state = state;
	this.storageContainer = undefined;
	this.needsTending = false;
	this.baseGrowRate = 60000;
	this.fertilizer = 1;
	this.verb = verb;
	this.cost = cost;
	this.product = this;
}; 
subClass(Grower, Animal, {
	constructor: Animal,
	storeOutput: function() {
		var output = this.name + "<br />";
		output += "Cost: " + this.cost + "<br />";
		output += "<a class='gameControl' id='" + ANIMAL_LIST + "." + this.name + "' action='buy' href='#'>Buy</a><br />"; //
		return output;
	},
	output: function() {
		//alert("output");
		var data = this.storageContainer.name + "." + this.name;
		var output = this.name + "<br />";
		output += "Currently " + this.state + "<br />";
		if(this.state == "fully grown") output += "<a class='gameControl' id='" + data + "' action='harvest' href='#'>" + this.verb + "</a><br />";
		else if(this.needsTending) output += "<a class='gameControl' id='" + data + "' action='tend' href='#'>Feed</a><br />";
		output += "<a class='gameControl secondary' id='" + data + "' action='remove' href='#'>Remove</a><br />";
		if(this.needsTending) {
			output = "<span class='needsTending'>" + output + "</span>";
		}
		return output;
	}
});

function Dish(name, ingredient, state, energyGained, recipe) {
	this.is = "Dish";
	this.name = name;
	this.ingredient = ingredient;
	this.states = ["prepping", "cooking", "cooked"];
	this.state = state;
	this.energyGained = energyGained;
	this.storageContainer = undefined;
	this.needsTending = false;
	this.baseGrowRate = 4000;
	this.fertilizer = 1;
	this.recipe = recipe;
}
subClass(Grower, Dish, {
	constructor: Dish,
	output: function() {
		//alert("output");
		var data = this.storageContainer.name + "." + this.name;
		var output = this.name + "<br />";
		output += "Currently " + this.state + "<br />";
		if(this.state == this.states[this.states.length-1]) output += "<a class='gameControl' id='" + this.name + "' action='finishDish' href='#'>Finish</a><br />";
		else if(this.needsTending) output += "<a class='gameControl' id='" + data + "' action='tend' href='#'>Cook</a><br />";
		output += "<a class='gameControl secondary' id='" + data + "' action='remove' href='#'>Throw Away</a><br />";
		if(this.needsTending) {
			output = "<span class='needsTending'>" + output + "</span>";
		}
		return output;
	}
});

var Recipe = function(name, experienceRequired, sustainabilityGained, greenThumbGained, experienceGained, energyGained, ingredients, utensils) {
	this.is = "Recipe";
	this.name = name;
	this.experienceRequired = experienceRequired;
	this.sustainabilityGained = sustainabilityGained;
	this.greenThumbGained = greenThumbGained;
	this.experienceGained = experienceGained;
	this.energyGained = energyGained;
	this.ingredients = ingredients;
	this.utensils = utensils;
	this.timesUsed = 0;
	this.owned = false;
}; Recipe.prototype = {
	activeOutput: function () {
		return this.output() + "<br /><a class='gameControl' id='" + this.name + "' action='useRecipe' href='#'>Make This Recipe</a>";
	},
	availableOutput: function() {
		var output = "<b>" + this.name + "</b><br />";
		output += "Required Experience: " + this.experienceRequired;
		output += "<br /><a class='gameControl' id='" + this.name + "' action='getRecipe' href='#'>Get This Recipe</a>";
		return output;
	},
	unavailableOutput: function () {
		var output = "<span class='inactive'><b>" + this.name + "</b><br />";
		output += "Required Experience: " + this.experienceRequired;
		output += "<br />- Ingredients<br />" + arrayOutput(this.ingredients, "name", " ", ",");
		//output += "<br />(You don't have enough experience to cook this recipe)";
		output += "</span>";
		return output;
	},
	output: function() {
		var output = "<b>" + this.name + "</b><br />";
		output += "- Experience Gained: " + this.experienceGained + "<br />";
		output += "- Ingredients<br />" + arrayOutput(this.ingredients, "name", " ", ",");
		if(this.utensils) output += "<br />- Utensils<br />" + arrayOutput(this.utensils, "name", " ", ",");
		return output;
	}
};

var Message = function(heading, copy, choices) {
	this.heading = heading;
	this.copy = copy;
	this.choices = choices;
}; Message.prototype = {
	output: function() {
		var output =  "<h1>" + this.heading + "</h1><p>" + this.copy + "</p>";
		for(var i = 0; i < this.choices.length; i++) {
			output += "<a class='gameControl' id='" + this.choices[i].id + "' action='" + this.choices[i].action + "' href='#'>" + this.choices[i].name + "</a><br />";
		}
		return output;
	}
};

//[{name: "Invite Five Friends Now", action: "eatDish", id: recipe.name}]}
var ActionCondition = function(eventHandler, name, action, params) {
	this.eventHandler = eventHandler;
	this.name = name;
	this.action = action;
	this.params = params;
	this.complete = false;
	
}; ActionCondition.prototype = {
	init: function() {
		// Create the storage object & wire it up for receiving events from the response handler
		this.eventHandler.addListener(this, "receiveEvent", this.name);
	},
	doesPass: function() {
		return this.complete;
	},
	receiveEvent: function() {
		alert("You just completed the " + this.name + " task.");
		this.eventHandler.removeListener(this, this.name);
		this.complete = true;
	},
	output: function() {
		var output = "<b>" + this.name + "</b>: ";
		if(this.doesPass()) output += "complete<br />";
		else output += "not complete<br />";
		output += "<a class='gameControl' id='" + this.name + "' action='" + this.action + "' data='" + $.toJSON(this.params) + "' href='#'>" + this.name + "</a><br />";
		return output;
	}
};

var Condition = function(target, property, value, condition, name) {
	this.target = target;
	this.property = property;
	this.value = value;
	this.condition = condition;
	this.name = name;
	
}; Condition.prototype = {
	init: function() {
		// Simply fulfilling the interface requirement
	},
	doesPass: function() {
		switch(this.condition) {
			case "exact":
				//alert(condition.target[condition.property] + ":" + condition.value);
				if(this.target[this.property] != this.value) return false;
			break;
			case "less":
				if(this.target[this.property] > this.value) return false;
			break;
			default:
				if(this.target[this.property] < this.value) return false;
			break;
		}
		return true;
	},
	output: function() {
		var output = "<b>" + this.name + "</b>: ";
		if(this.doesPass()) output += "complete<br />";
		else output += "not complete<br />";
		return output;
	}
};

var Challenge = function(activateCondition, completeConditions, rewards, name, description) {
	this.activateCondition = activateCondition;
	this.completeConditions = completeConditions;
	this.rewards = rewards;
	this.name = name;
	this.description = description;
	this.state = "inactive";
}; Challenge.prototype = {
	init: function() {
		this.state = "active";
		
		// Activate custom conditional objects for this challenge
		for (var i=0; i < this.completeConditions.length; i++) {
			var task = this.completeConditions[i];
			task.init();
		};
		alert("The " + this.name + " challenge is available in the Challenges panel.");
	},
	tryToActivate: function() {
		// Loop through all activateConditions. Return false if any one doesn't pass. Activate this challenge if they all do.
		for (var i = this.activateCondition.length - 1; i >= 0; i--){
			if(!this.activateCondition[i].doesPass()) return false;
		};
		this.init();
	},
	tryToComplete: function() {
		// Loop through all activateConditions. Return false if any one doesn't pass. Activate this challenge if they all do.
		for (var i = this.completeConditions.length - 1; i >= 0; i--){
			if(!this.completeConditions[i].doesPass()) return false;
		};
		this.state = "complete";
		// All tasks are complete. Dish out the rewards and let them know about it.
		for (var i = this.rewards.length - 1; i >= 0; i--){
			var reward = this.rewards[i];
			if(reward.property) reward.target[reward.property] += reward.amount;
			if(reward.method) reward.target[reward.method]();
		};
		alert("You just completed the " + this.name + " challenge. Nice work!");
		return true;
	},
	briefOutput: function() {
		return "<a class='gameControl' id='" + this.name + "' action='displayChallenge' href='#'>" + this.name + "</a><br />";
	},
	output: function() {
		var output = "<h3>" + this.name + "</h3>";
		output += "<p>" +  this.description + "</p>";
		output += arrayOutput(this.completeConditions, "output", "", "");
		output += "<a class='gameControl' action='closeMessage' href='#'>Close This Window</a><br />";
		return output;
	}
};

var EventHandler = function() {
	this.listeners = [];
}; EventHandler.prototype = {
	addListener: function(newListener, eventHandler, eventType) {
		this.listeners.push({listener: newListener, handler: eventHandler, type: eventType});
	},
	removeListener: function(listener, type) {
		for (var i = this.listeners.length - 1; i >= 0; i--){
			if(this.listeners[i].listener == listener && (!type || this.listeners[i].type == type)) {
				this.listeners.splice(i,1);
			}
		};
	},
	sendEvent: function(eventType) {
		for(var i = 0; i < this.listeners.length; i++) {
			var listener = this.listeners[i];
			if(listener.type == eventType) listener.listener[listener.handler](eventType, this);
		}
	}
};

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

function subClass(sup, sub, obj) {
	sub.prototype = new sup();
	$.each(obj, function(i,n){
		sub.prototype[i] = n;
	});
	sub.superClass = sup;
};


function arrayOutput(myArray, key, pre, post) {
	var output = "";
	for(i = 0; i < myArray.length; i++) {
		if(key) arrayValue = $.isFunction(myArray[i][key]) ? myArray[i][key]() : myArray[i][key];
		else arrayValue = myArray[i];
		output += pre + arrayValue + post;
	}
	return output;
}

