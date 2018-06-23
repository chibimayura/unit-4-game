var hP, currentHP,atkP, catkP, rivalHP, rivalCurrentHP, playerSelect, rivalPokeName, yourPokeName;

var atkMultiplier = 1.5;
var rivalCount = 3;

var charPokeSelect = false;
var rivalPokeSelect = false;

var userPoke = $(".yourPokemon");
var rivalPoke = $(".rivalPokemon");
var textDialogue = $(".dialogue");
var selectionText = $("#characterSelection");
var yourHealthDisplay = $(".yourHealthBar");
var rivalHealthDisplay = $(".rivalHealthBar");
var yourHPBar = $(".yourHP");
var rivalHPBar = $(".rivalHP");

var attackButton = $("#attack");
var restartButton = $("#restart");

var openingSong = new Audio("assets/sounds/opening.mp3");
var victorySong = new Audio("assets/sounds/victory.mp3");
var endSong = new Audio("assets/sounds/ending.mp3");
var battleSong = new Audio("assets/sounds/battle.mp3");

yourHealthDisplay.hide();
rivalHealthDisplay.hide();
attackButton.hide();
restartButton.hide();

openingSong.play();

var characters = [
					{
						"pokemon_name" : "Bulbasaur",
						"health_points" : 90,
						"atk_points" : 15
					},
					{
						"pokemon_name" : "Charmander",
						"health_points" : 78,
						"atk_points" : 20
					},
					{
						"pokemon_name" : "Squirtle",
						"health_points" : 88,
						"atk_points" : 18
					},
					{
						"pokemon_name" : "Pikachu",
						"health_points" : 70,
						"atk_points" : 22
					}
				];

$(document).on('click', 'img', function(){
	playerSelect = $(this);
	battleSong = new Audio("assets/sounds/battle.mp3");

	//make sure player selects a pokemon and after they select a pokemon they can select a rival they want to battle
	if(!charPokeSelect){
		charPokeSelect = true;
		hP = parseInt(playerSelect.attr("data-health"));
		yourPokeName = playerSelect.attr("data-name");
		currentHP = hP;
		atkP = parseInt(playerSelect.attr("data-atk"));

		$('img').addClass('red');
		playerSelect.addClass('green');
		playerSelect.appendTo(userPoke);
		selectionText.text("Select rival Pokemon you would like to battle");
		yourHealthDisplay.show();
		yourHPBar.text(hP);
	}else if(charPokeSelect && !rivalPokeSelect){
		openingSong.pause();
		victorySong.pause();
		battleSong.play();
		rivalPokeSelect = true;
		rivalHP = parseInt(playerSelect.attr("data-health"));
		rivalPokeName = playerSelect.attr("data-name");
		rivalCurrentHP = rivalHP;
		catkP = parseInt(playerSelect.attr("data-atk"));

		textDialogue.text("Begin your battle");
		playerSelect.appendTo(rivalPoke);
		rivalHealthDisplay.show();
		attackButton.show();
		rivalHPBar.css("background-color", "#00ff00");
		rivalHPBar.text(rivalHP);
		rivalHPBar.css("width",  "100%");
	}
});

$(document).on('click', '#attack', function(){
	victorySong = new Audio("assets/sounds/victory.mp3");
	if(currentHP > catkP && rivalCurrentHP > atkP){
		var rivalHPPercent, yourHPPercent;
		currentHP -= catkP;
		rivalCurrentHP -= atkP;
		atkP = parseInt(atkP * atkMultiplier);

		yourHPBar.text(hP);
		rivalHPBar.text(rivalHP);

		yourHPPercent = (currentHP/hP)*100;
		rivalHPPercent = (rivalCurrentHP/rivalHP)*100;

		if(yourHPPercent < 25 || rivalHPPercent < 25){
			if(rivalHPPercent < 25){
				rivalHPBar.css("background-color", "#ff0000");
			}
			if(yourHPPercent < 25){
				yourHPBar.css("background-color", "#ff0000");
			}
		}

		yourHPBar.css("width", yourHPPercent + "%");
		rivalHPBar.css("width", rivalHPPercent + "%");

		yourHPBar.text(currentHP);
		rivalHPBar.text(rivalCurrentHP);

		textDialogue.text("Your Pokemon, " + yourPokeName + " does " + atkP + " dmg to " + rivalPokeName + ".\n\n Your rival's pokemon, " + rivalPokeName + " does " + catkP + " dmg to " + yourPokeName + ".");

	}else if(rivalCurrentHP <= atkP && rivalCount >= 1){
		attackButton.hide();
		rivalCount--;
		rivalPokeSelect = false;
		victorySong.play();
		battleSong.pause();

		rivalPoke.empty();
		rivalHealthDisplay.hide();
		textDialogue.text("Your rival's pokemon, " + rivalPokeName + " has fainted.\n\n Select a new Pokemon to battle");
	}else if(currentHP < catkP && rivalCurrentHP > atkP){
		battleSong.pause();
		userPoke.empty();
		yourHealthDisplay.hide();
		textDialogue.text("Your pokemon " + yourPokeName + " has blacked out. You have lost the battle!");
		restartButton.show();
		attackButton.hide();
	}
	if (rivalCount < 1) {
		restartButton.show();
		battleSong.pause();
		victorySong.pause();
		endSong.play();
		textDialogue.text("Your rival's pokemon, " + rivalPokeName + " has fainted. You have defeated all your opponents!!");
	}
});

$(document).on('click', '#restart', function(){
	location.reload();
})
