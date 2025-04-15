/* 
  Author: Dimetriy Volkov
*/

var deck = [];
var deck_size = 36;
var iterations = 100;
var card_path = "../cards/";
var card_width = 150;
var card_height = 215;
var user_cards_num = 0;
var max_card_num = 8;
var beaten_cards = [];
var user_margin = 740;
var game_status = 1;
var user_cards = [];
var bot_cards = [];
var created_user_cards = 0;
var created_bot_cards = 0;
var compare_dict = { "a": 11, "0": 10,"6":6,"7":7,"8":8,"9":9,"j":2,"q":3,"k":4};
var bot_score = 0;
var bot_speed = 500;
var temp = 0;
var user_score = 0;
var move_is_done = 0;
var user_depo = 0;
var comp_depo = 0;
var user_win = 0;
var comp_win = 0;


function main()
{
	
	set_body();
	create_deck();
	shuffle_deck();
	create_extra_card();
	create_bot_cards_frame();
	create_user_cards_frame();
	create_card_num();
	create_info_field();
	create_new_game_button();
	create_enough_button();
	create_win_bar();
	/*
	user_depo = prompt("Введите стартовый депозит");
	comp_depo = user_depo;
	create_depo();
	*/
	display_pair();
	
}

function create_win_bar()
{
	elem = document.createElement("div");
	elem.id = "gameResult";
	elem.innerText = "0:0";
	elem.style.color = "white";
	elem.style.border = "1px solid white";
	elem.style.width = "30px";
	elem.style.height = "30px";
	elem.style.position = "absolute";
	elem.style.marginLeft = "1160px";
	elem.style.padding = "5px 10px";
	elem.style.fontSize = "2.0em";
	elem.style.marginTop = "230px";
	document.body.appendChild(elem);
}

function create_depo()
{
	elem = document.createElement("div");
	
}

function create_info_field()
{
	elem = document.createElement("div");
	elem.style.position = "absolute";
	elem.id = "gameInfo";
	elem.style.width = "300px";
	elem.style.height = "30px";
	elem.style.color = "white";
	elem.style.fontSize = "1.6em";
	elem.innerText = "J=2,Q=3,K=4,A=11. На руках: " + user_score;
	elem.style.marginTop = "600px";
	document.body.appendChild(elem);
}

function create_card_num()
{
	num = document.createElement("div");
	num.style.position = "absolute";
	num.id = "cardNum";
	num.innerText = deck.length;
	num.style.width = "30px";
	num.style.height = "30px";
	num.style.fontSize = "1.8em";
	num.style.color = "white";
	num.style.marginLeft = "1170px";
	num.style.marginTop = "380px";
	num.style.padding = "10px";
	num.style.border = "1px solid white";
	document.body.appendChild(num);
	
}

function create_new_game_button()
{
	elem = document.createElement("div");
	elem.id = "newGameButton";
	elem.style.position = "absolute";
	elem.style.marginTop = "400px";
	elem.innerText = "Новая игра";
	elem.onclick = start_new_game;
	elem.style.fontSize = "1.8em";
	elem.style.border = "3px solid black";
	elem.style.width = "155px";
	elem.style.height = "50px";
	elem.style.padding = "5px 0 0 5px";
	elem.style.background = "yellow";
	elem.style.color = "blue";
	document.body.appendChild(elem);
}

function start_new_game()
{
	deck = [];
	comp_win = 0;
	user_win = 0;
	create_deck();
	shuffle_deck();
	elem = document.getElementById("extraCard");
	elem.style.visibility = "visible";
	score = document.getElementById("gameResult");
	score.innerText = "0:0";
	start_new_round();
	
}

function hide_cards()
{
	
	for(var i = 0 ; i < user_cards.length; i++)
	{
		elem = document.getElementById("u"+(i+1));
		elem.style.visibility = "hidden";
	}
	for(var i = 0 ; i < bot_cards.length; i++)
	{
		elem = document.getElementById("b"+(i+1));
		elem.style.visibility = "hidden";
	}
}
function create_enough_button()
{
	en = document.createElement("div");
	en.id = "enough";
	en.style.width = "100px";
	en.style.height = "50px";
	en.style.fontSize = "1.8em";
	en.style.padding = "5px 5px 0";
	en.innerText = "Достаточно";
	en.style.position = "absolute";
	en.style.border = "3px solid black";
	en.style.marginTop = "500px";
	en.style.background = "white";
	en.onclick = choice_made;
	en.style.color = "blue";
	document.body.appendChild(en);
}

function choice_made()
{
	
	//alert(user_cards
	clearInterval(temp);
	if(move_is_done == 0)
	{
		temp = setInterval(bot_move, bot_speed);
	}

	user_score = count_score(user_cards);
	bot_score = count_score(bot_cards);
	//alert([user_score,bot_score]);
	
	if(move_is_done == 1 && game_status == 1)
	{
		
		for(var i = 0; i < bot_cards.length; i++)
		{
			elem = document.getElementById("b" + (i+1));
			elem.style.background = "url(" + card_path + bot_cards[i] + ".jpg"+")";
		}
		game_status = 0;
		if(user_score < 22 &&(user_score > bot_score || bot_score > 21))
		{
			alert("You win! "+user_score + ":" + bot_score);
			user_win += 1;
		}
		else if(bot_score < 22 && (user_score < bot_score || user_score > 21))
		{
			alert("You lost. "+ user_score + ":" + bot_score);
			comp_win += 1;
		}
		else
			alert("Draw. " + user_score + ":" + bot_score);
		
		res = document.getElementById("gameResult");
		res.innerText = user_win + ":" + comp_win;
		start_new_round();
	}
}

function start_new_round()
{
	hide_cards();
	move_is_done = 0;
	if(deck.length >3)
	{
		game_status = 1;
		user_cards = [];
		bot_cards = [];
		bot_score = 0;
		user_score = 0;
		display_pair();
	}
	else
	{
		elem = document.getElementById("extraCard");
		elem.style.visibility = "hidden";
		alert("Закончилась колода, начните новую игру.");
	}
}

function bot_move()
{
	
	if(bot_score < 15 && deck.length > 0)
	{
		get_new_card("bot");
		choice_made();
	}
	else
	{
		move_is_done = 1;
		choice_made();
	}
	
}

function count_score(cards)
{
	var score = 0;
	for(var i = 0; i < cards.length; i++)
	{
		score += compare_dict[cards[i].charAt(cards[i].length - 1)];
		
	}
	return score;
}

function create_extra_card()
{
	ec = document.createElement("div");
	ec.id = "extraCard";
	ec.style.width = card_width;
	ec.style.height = card_height;
	ec.style.position = "absolute";
	ec.style.marginLeft = "1250px";
	//alert("1");
	ec.style.marginTop = "300px";
	ec.style.border = "1px solid black";
	//ec.style.background = "white";
	ec.style.background = "url(" + card_path + "back" + ".jpg"+")";
	ec.onclick = get_user_card;
	document.body.appendChild(ec);
}

function display_pair()
{
	for(var i = 0; i < 2; i++)
		get_new_card("bot");
	for(var i = 0; i < 2; i++)
		get_new_card("user");
}
function get_user_card()
{
	if(deck.length > 0)
		get_new_card("user");
}

function create_user_cards_frame()
{
	user_frame = document.createElement("div");
	user_frame.id = "userCards";
	user_frame.display = "block";
	user_frame.style.marginTop = user_margin + "px";
	user_frame.style.position = "absolute";
	document.body.appendChild(user_frame);
}	

function create_bot_cards_frame()
{
	bot_frame = document.createElement("div");
	bot_frame.id = "botCards";
	bot_frame.display = "block";
	bot_frame.style.position = "absolute";
	//bot_frame.style.border = "1px solid black";
	document.body.appendChild(bot_frame);
}
function get_new_card(player)
{
	//var card_num = ((new Date())%37+parseInt(Math.random()*100))%36;
	if(deck.length > 0)
	{
		var new_card = deck.shift();
		var points =  compare_dict[new_card.charAt(new_card.length - 1)]
	
		if(player == "user")
		{	
		
			create_card(new_card);
		
			user_cards.push(new_card);
		
			user_score += points;
			game_info = document.getElementById("gameInfo");
		
			game_info.innerText = "J=2, Q=3, K=4, A=11.\nНа руках: " + user_score;
			
		}
		else if(player == "bot")
		{
			add_bot_card(new_card);
			bot_cards.push(new_card);
			bot_score += points;
		}
		cardnum = document.getElementById("cardNum");
		cardnum.innerText = deck.length;
	}
	else
	{
		alert("Колода закончилась. Начните новую игру");
	}
}
function add_bot_card(new_card)
{
	if(created_bot_cards <= bot_cards.length)
	{
		card = document.createElement("div");
		card.id = "b" + (bot_cards.length + 1); 
		card.style.width = card_width+"px";
		bf = document.getElementById("botCards");
		card.style.display = "inline";
		card.style.marginRight = "10px";
		card.style.height = card_height+"px";
		card.style.border = "1px solid black";
		card.style.marginBottom = 8 + "px";
		var path_str = "url(" + card_path + "back" + ".jpg"+")";
		card.style.background = path_str;
		bf.appendChild(card);
		created_bot_cards += 1;
	}
	else
	{
		card = document.getElementById("b" +  (bot_cards.length + 1));
		var path_str = "url(" + card_path + "back" + ".jpg"+")";
		card.style.background = path_str;
		card.style.visibility = "visible";
	}
}
function shuffle_deck()
{
	for(var i = 0; i < iterations; i++)
	{
		var d = new Date();
		var card_num = (d%37+parseInt(Math.random()*100))%36;
		var temp = deck[card_num];
		var card_num2 = (d%137+parseInt(Math.random()*149))%36;
		deck[card_num] = deck[card_num2];
		deck[card_num2] = temp;
	}
} 
function create_card(card_name)
{
	if(created_user_cards <= user_cards.length)
	{
		card = document.createElement("div");
		card.id = "u" + (user_cards.length + 1); 
		card.style.width = card_width+"px";
		uf = document.getElementById("userCards");
		card.style.display = "inline";
		card.style.marginRight = "10px";
		card.style.height = card_height+"px";
		card.style.border = "1px solid black";
		card.style.marginBottom = 8 + "px";
		var path_str = "url(" + card_path + card_name + ".jpg"+")";
		card.style.background = path_str;
		uf.appendChild(card);
		created_user_cards += 1;
	}
	else
	{
		card = document.getElementById("u" +  (user_cards.length + 1));
		var path_str = "url(" + card_path + card_name + ".jpg"+")";
		card.style.background = path_str;
		card.style.visibility = "visible";
	}
}

function create_deck()
{
	for(var i = 6; i <= 14; i++)
	{
		var ti = i;
		if(i == 11)
			ti = "a";
		else if(i == 12)
			ti = "k";
		else if(i == 13)
			ti = "q";
		else if(i == 14)
			ti = "j";

		deck.push("p" + ti);
		deck.push("b" + ti);
		deck.push("k" + ti);
		deck.push("c" + ti);
	}
}

function set_body()
{
	document.body.style.background = "green";
	document.body.onkeydown = key_down;
}

function key_down()
{
	//alert(event.keyCode);

	if(game_status == 1 && event.keyCode == "32" && deck.length > 0)
		get_new_card("user");
	else if(game_status == 1 && event.keyCode == "13")
		choice_made();
	
}
function create_table()
{
	table = document.createElement("div");
	table.id = "table";
	table.style.width = table_width;
	table.style.height = table_height;
	table.style.position = "absolute";
	table.style.background = table_color;
}
