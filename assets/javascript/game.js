var hP, atkP, catkP, rivalHP, playerSelect;

var charSelect = false;
var rivalSelect = false;

var userPoke = $(".yourPokemon");
var rivalPoke = $(".rivalPokemon");
var textDialogue = $(".dialogue");
var selectionText = $("#characterSelection");
var yourHealthBar = $(".yourHealthBar");
var rivalHealthBar = $(".rivalHealthBar");

yourHealthBar.hide();
rivalHealthBar.hide();

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

	//make sure player selects a pokemon and after they select a pokemon they can select a rival they want to battle
	if(!charSelect){
		$('img').addClass('red');
		playerSelect.addClass('green');
		playerSelect.appendTo(userPoke);
		charSelect = true;
		selectionText.text("Select rival Pokemon you would like to battle");
		yourHealthBar.show();

	}else if(charSelect && !rivalSelect){
		textDialogue.text("Begin your battle");
		playerSelect.appendTo(rivalPoke);
		rivalSelect = true;
		rivalHealthBar.show();
	}
});