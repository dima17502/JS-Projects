/* 
  Author: Dimetriy Volkov

*/
var deck = [];
var deck_size = 36;
var iterations = 100;
var spec = ["♥","♦","♣","♠"];
var spec_dict = {"♥":"c","♦":"b","♣":"k","♠":"p"};
var specials = 0;
var card_path = "../cards/";
var card_width = 150;
var card_height = 215;
var user_cards_num = 0;
var max_card_num = 8;
var beaten_cards = [];
var user_margin = 740;
var game_status = 0;
var user_cards = new Array();
var bot_cards = new Array();
var common_cards = new Array();
var created_user_cards = 0;
var created_bot_cards = 0;
var compare_dict = { "a": 14, "1": 10,"6":6,"7":7,"8":8,"9":9,"j":11,"q":12,"k":13};
var order = "bot";
var round_started = order;
var bot_score = 0;
var user_score = 0;
var bot_speed = 500;
var show_time = 1500;
var think_time = 500;
var temp = 0;
var moved = 0;
var move_is_done = 0;
var take_status = 0;

function main()
{
	set_body();
	create_deck();
	shuffle_deck();
	create_extra_card();
	create_common_cards_frame();
	create_common_cards();
	
	create_bot_cards_frame();
	create_user_cards_frame();
	create_user_cards();
	create_bot_cards();
	create_card_num();
	create_take_button();
	create_score_bar();
	
	create_new_game_button();
	create_enough_button(); // бита
	create_order_bar();
	create_special_bar();
	
	/*
	
	comp_depo = user_depo;
	create_depo();
	*/
	//display_pair();
	
}

function create_score_bar()
{
	elem = document.createElement("div");
	elem.id = "scoreBar";
	elem.innerText = user_score + ":" + bot_score; 
	elem.style.position = "absolute";
	
	elem.style.fontSize = "2.5em";
	elem.style.color = "white";
	elem.style.marginLeft = "1300px";
	elem.style.marginTop = "100px";
	document.body.appendChild(elem);
	

}

function create_user_cards()
{
	for(var i = 0; i < 30; i++)
	{
		card = document.createElement("div");
		card.onclick = card_chosen;
		card.id = "u" + (i + 1); 
		card.style.width = card_width+"px";
		uf = document.getElementById("userCards");
	
		card.style.display = "inline";
		card.style.marginRight = "10px";
		
		card.style.height = card_height+"px";
		card.style.border = "1px solid black";
		card.style.marginBottom = 8 + "px";
		card.style.visibility = "hidden";
		uf.appendChild(card);
	}
}



//algerian, comic sans, Univers

function create_bot_cards()
{
	for(var i = 0; i < 30; i++)
	{
		card = document.createElement("div");
		card.id = "b" + (i + 1); 
		card.style.width = card_width+"px";
		uf = document.getElementById("botCards");
	
		card.style.display = "inline";
		card.style.marginRight = "10px";
		
		card.style.height = card_height+"px";
		card.style.border = "1px solid black";
		card.style.marginBottom = 8 + "px";
		var path_str = "url(" + card_path + "back" + ".jpg"+")";
		card.style.background = path_str;
		card.style.visibility = "hidden";
		uf.appendChild(card);
	}
}

function create_common_cards()
{
	frame = document.getElementById("commonCards");
	elem = document.createElement("div");
	for(var i = 0; i < 12; i++)
	{
		card = document.createElement("div");
		card.id = "c" + (i + 1); 
		card.style.width = card_width+"px";
		if(i % 2)
		{
			card.style.position = "absolute";
			card.style.marginTop = "20px";
			card.style.marginLeft = "-168px";
		}
		card.style.display = "inline";
		card.style.marginRight = "50px";
		card.style.background = "url(" + card_path + "k10" + ".jpg"+")";
		card.style.height = card_height+"px";
		card.style.border = "1px solid black";
		card.style.marginBottom = 8 + "px";
		card.style.visibility = "hidden";
		frame.appendChild(card);
	}
}



function create_order_bar()
{
	elem = document.createElement("div");
	elem.id = "orderBar";
	if(order == "user")
		elem.innerText = "Ваш ход";
	else
		elem.innerText = "Ход компьютера";
	elem.style.position = "absolute";
	
	elem.style.fontSize = "2em";
	elem.style.color = "white";
	elem.style.marginLeft = "1270px";
	elem.style.marginTop = "50px";
	document.body.appendChild(elem);
	
}


function create_common_cards_frame()
{
	common = document.createElement("div");
	common.id = "commonCards";
	common.style.position = "absolute";
	common.style.marginTop = "380px";
	common.style.width ="1200px";
	common.style.display = "block";
	document.body.appendChild(common);
}

function create_take_button()
{
	elem = document.createElement("div");
	elem.style.position = "absolute";
	elem.style.id = "takeButton";
	elem.style.width = "100px";
	elem.style.height = "50px";
	elem.innerText = "Беру";
	elem.style.fontSize = "1.8em";
	elem.style.border = "3px solid black";
	elem.style.background = "white";
	elem.style.color = "red";
	elem.style.padding = "5px 0 0 15px";
	elem.style.marginLeft = "1300px";
	elem.style.marginTop = "750px";
	elem.onclick = take_common_cards;
	document.body.appendChild(elem);
}


function create_special_bar()
{
	elem = document.createElement("div");
	elem.id = "specials";
	elem.style.color = "white";
	
	elem.style.width = "70px";
	//elem.style.height = "30px";
	//elem.style.border = "1px solid white";
	elem.style.position = "absolute";
	elem.style.marginLeft = "1170px";
	elem.style.marginTop = "380px";
	//elem.style.background = "5f5";
	//elem.style.padding = "5px 10px";
	elem.style.fontSize = "5em";
	//elem.style.lineHeight = "10px";
	
	document.body.appendChild(elem);
}



function create_user_cards_frame()
{
	user_frame = document.createElement("div");
	user_frame.id = "userCards";
	user_frame.display = "block";
	user_frame.style.width = "1300px";
	user_frame.style.marginTop = user_margin + "px";
	user_frame.style.position = "absolute";
	document.body.appendChild(user_frame);
}	


function create_bot_cards_frame()
{
	bot_frame = document.createElement("div");
	bot_frame.id = "botCards";
	bot_frame.style.width = "1300px";
	bot_frame.display = "block";
	bot_frame.style.position = "absolute";
	document.body.appendChild(bot_frame);
}

function create_extra_card()
{
	ec = document.createElement("div");
	ec.id = "extraCard";
	ec.style.width = card_width;
	ec.style.height = card_height;
	ec.style.position = "absolute";
	ec.style.marginLeft = "1250px";
	ec.style.marginTop = "330px";
	ec.style.border = "1px solid black";
	ec.style.background = "url(" + card_path + "back" + ".jpg"+")";
	document.body.appendChild(ec);
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
	num.style.marginLeft = "1300px";
	num.style.marginTop = "260px";
	num.style.padding = "5px 10px";
	num.style.border = "1px solid white";
	document.body.appendChild(num);
	
}
function create_enough_button()
{
	en = document.createElement("div");
	en.id = "enough";
	en.style.width = "100px";
	en.style.height = "50px";
	en.style.fontSize = "1.8em";
	en.style.padding = "5px 0px 0 15px";
	en.innerText = "Бита";
	en.style.position = "absolute";
	en.style.border = "3px solid black";
	en.style.marginTop = "650px";
	en.style.marginLeft = "1300px";
	en.style.background = "white";
	en.onclick = round_is_done;
	en.style.color = "blue";
	document.body.appendChild(en);
}


function create_new_game_button()
{
	elem = document.createElement("div");
	elem.id = "newGameButton";
	elem.style.position = "absolute";
	elem.style.marginTop = "850px";
	elem.style.marginLeft = "1300px";
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
	
	hide_cards();
	take_status = 0;
	deck = [];
	user_cards_num = 0;
	user_cards = [];
	bot_cards = [];
	create_deck();
	shuffle_deck();
	gen_special();
	elem = document.getElementById("extraCard");
	elem.style.visibility = "visible";
	common_cards = [];
	get_new_cards("user", 6);
	get_new_cards("bot", 6);
	user_cards.sort(f_sort);
	bot_cards.sort(f_sort);
	sort_user_cards();
	var bot_specs = count_bot_specials();
	var user_specs = count_user_specials();
	var wait_time = 0;
	if(bot_specs + user_specs == 0)
	{
		var card_num = ((new Date())%37+parseInt(Math.random()*100))%2;
		order = "user";
		if(card_num)
			order = "bot";
	}
	else if(bot_specs == 0 && user_specs != 0)
		order = "user";
	else if(bot_specs != 0)
	{
		var min_bot_spec = bot_cards[0];
		var min_user_spec = user_cards[0];
		for(var i = 0; i < bot_cards.length; i++)
		{
			if(bot_cards[i].charAt(0) == specials)
				min_bot_spec = bot_cards[i];
		}
		if(user_specs != 0)
		{	
			for(var i = 0; i < user_cards.length; i++)
			{
				if(user_cards[i].charAt(0) == specials)
					min_user_spec = user_cards[i];
			}
			if(card_compare(min_bot_spec, min_user_spec) == 1)
				order = "user";
			else
			{
				order = "bot";
			}
		}
		else
		{
			order = "bot";
		}
		if(order == "bot")	
		{
			update_order();
			wait_time = 1;
			show_bot_special(min_bot_spec);
		}
	}
	if(wait_time == 0)
	{
		game_status = 1;
		start_new_round();
	}
}

function show_bot_special(min_bot_spec)
{
	game_status = 0;
	card = document.getElementById("b" + bot_cards.length);
	card.style.background = "url(" + card_path + min_bot_spec + ".jpg"+")";
	setTimeout(turn_bot_card, show_time);
	
	
}

function turn_bot_card()
{
	
	card = document.getElementById("b" + bot_cards.length);
	card.style.background = "url(" + card_path + "back" + ".jpg"+")";
	game_status = 1;
	start_new_round();
}

function f_sort(card1, card2)
{
	//alert([card1,card2, card1.charAt(0), card2.charAt(0)]);
	if(card1.charAt(0) == specials && card2.charAt(0) != specials)
		return -1;
	if(card1.charAt(0) != specials && card2.charAt(0) == specials)
		return 1;
	if(compare_dict[card1.charAt(1)] > compare_dict[card2.charAt(1)])
		return -1;
	if(compare_dict[card2.charAt(1)] > compare_dict[card1.charAt(1)])
		return 1;
	return 0;
}
function sort_user_cards()
{
	
	user_cards.sort(f_sort);
	
	for(var i = 0; i < user_cards.length; i++)
	{
		
		elem = document.getElementById("u" + (i+1));
		elem.style.background = "url(" + card_path + user_cards[i] + ".jpg"+")";
		elem.style.visibility = "visible";
	}
}

function sort_bot_cards()
{
	//alert("sorted:" + bot_cards);
	bot_cards.sort(f_sort);
	
	//alert(bot_cards);
	//alert(bot_cards.length);
	for(var i = 0; i < bot_cards.length; i++)
	{
		elem = document.getElementById("b" +(i+1));
		elem.style.background = "url(" + card_path + "back" + ".jpg"+")";
		elem.style.visibility = "visible";
	}
}
function gen_special()
{
	elem = document.getElementById("specials");
	var random = ((new Date())%113 + parseInt(Math.random()*100))%4;
	var color = "f11";
	if(random > 1)
		color = "000";
	if(random == 0 || random == 2)
		elem.style.paddingLeft = "8px";
	else
		elem.style.paddingLeft = "10px";
	if(random == 1 || random == 3)
		elem.style.fontSize = "6em";
	
	elem.innerText = spec[random];
	
	elem.style.color = color;
	specials = spec_dict[spec[random]];
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
	hide_common_cards();	
}

function hide_common_cards()
{
	for(var i = 0 ; i < 12; i++)
	{
		elem = document.getElementById("c"+(i+1));
		elem.style.visibility = "hidden";
	}
}



function start_new_round()
{
	
	//common_cards = [];
	if(game_status == 1)
	{
		elem = document.getElementById("orderBar");
		if(order == "user")
			elem.innerText = "Ваш ход";
		else
		{
			elem.innerText = "Ход компьютера";
			setTimeout(bot_move, think_time);
		}
	}
	// добрать user & bot_cards до 6
	
}
function card_compare(card1, card2)
{
	if(card1.charAt(0) == specials && card2.charAt(0) != specials)
		return 1;
	if(card1.charAt(0) != specials && card2.charAt(0) == specials)
		return -1;
	if(card1.charAt(0) == card2.charAt(0) && compare_dict[card1.charAt(1)] > 						compare_dict[card2.charAt(1)])
		return 1;
	if(card1.charAt(0) == card2.charAt(0) && compare_dict[card2.charAt(1)] > 	compare_dict[card1.charAt(1)])
		return -1;
	return 0;
}


function card_chosen()
{
	elem = event.srcElement;
	
	//update_order();
	
	if(order == "user" && common_cards.length < 12 )
	{
		var is_valid = 0;
		var unum = (elem.id).charAt(1);
		if((elem.id).length == 3)
			unum += (elem.id).charAt(2);
		var comcard = user_cards[parseInt(unum) - 1];
		
		var card_exist = check_exist(comcard);
		//alert(common_cards.length);
		if(common_cards.length == 0)
		{
			is_valid = 1;		
		}
		else if(common_cards.length % 2)
		{
			if(card_compare(comcard, common_cards[common_cards.length - 1]) == 1)
			{
				is_valid = 1;
			}
		}
		else
		{
			if(card_exist)
			{
				is_valid = 1;
				//alert("card "+comcard + " exist");
			}
		}
		
		if(take_status != 1 && is_valid || card_exist && take_status == 1)
		{
			last_ccard = document.getElementById("c" + 11);
			
			if(take_status == 0 || take_status == 1 && last_ccard.style.visibility == "hidden")
			{
				
				common_cards.push(comcard);
				//alert(common_cards);
				desk_card = document.getElementById("c" + common_cards.length);
				if(take_status == 1)
				{
					var f_hidden = get_first_hidden();
					desk_card = document.getElementById("c" + f_hidden);
				}
				
				
				desk_card.style.background = "url(" + card_path + comcard + ".jpg"+")";
				desk_card.style.visibility = "visible";
				
				var t_array = new Array();
				for(var i = 0; i < user_cards.length; i++)
				{
					
					if( i + 1 != parseInt(unum))
						t_array.push(user_cards[i]);
				}
				user_cards = t_array;
				last = document.getElementById("u" + (user_cards.length + 1));
				last.style.visibility = "hidden";
				sort_user_cards();
				
				if(take_status == 0)
				{
					order = "bot";
					
					elem = document.getElementById("orderBar");
					update_order();
					setTimeout(bot_move, think_time);
				}
				
			}
		}
	}
}
function get_first_hidden()
{
	var card_id = common_cards.length - 1;
	//alert(card_id);
	//alert(common_cards.length);
	if(card_id % 2 == 0)
		card_id += 1;
	elem = document.getElementById("c" + card_id);
	
	while(elem.style.visibility != "hidden" && card_id < 12)
	{
		card_id += 2;
		elem = document.getElementById("c" + card_id);
	}
	return card_id;
}

function update_order()
{
	elem = document.getElementById("orderBar");
	if(order == "bot")
		elem.innerText = "Ход компьютера";
	else
		elem.innerText = "Ваш ход";
}

function check_exist(comcard)
{
	var flag = 0;
	for(var i = 0; i < common_cards.length; i++)
	{
		if(compare_dict[comcard.charAt(1)] == compare_dict[common_cards[i].charAt(1)])
		{
			//alert([comcard, common_cards[i], compare_dict[comcard.charAt(1)],compare_dict[common_cards[i].charAt(1)]]);
			flag = 1;
		}
	}
	return flag;
}

function count_bot_specials()
{
	var count = 0;
	for(var i = 0; i < bot_cards.length; i++)
	{
		if(bot_cards[i].charAt(0) == specials)
			count += 1;
	}
	return count;
}

function count_user_specials()
{
	var count = 0;
	for(var i = 0; i < user_cards.length; i++)
	{
		if(user_cards[i].charAt(0) == specials)
			count += 1;
	}
	return count;
}

function can_beat()
{
	var user_card = common_cards[common_cards.length - 1];
	var can = 0;
	sort_bot_cards();
	
	for(var i = 0; i < bot_cards.length; i++)
	{
		if(card_compare(bot_cards[i], user_card) == 1)
		{
			can = bot_cards[i];
			//alert(can);
		}
	}
	return can;
}

function bot_move()
{
	//!!  alert(bot_cards);
	sort_bot_cards();
	if(user_cards.length == 0 && deck.length == 0 && game_status == 1)
	{
		if(bot_cards.length > 1 || (common_cards.length % 2 == 0 && bot_cards.length > 0) || bot_cards.length == 1 && common_cards.length % 			2 && (card_compare( common_cards[common_cards.length - 1], bot_cards[0]) == 1))
		{
			alert("You win!");
			user_score += 1;
		}
		else
		{
			
			alert("Draw");
			user_score += 0.5;
			bot_score += 0.5;
		}
		//alert(bot_cards);
		elem = document.getElementById("scoreBar");
		elem.innerText =  user_score + ":" + bot_score; 
		game_status = 0;
	}
	//alert("bot_cards: " + bot_cards);
	//alert(user_cards);
	//alert(common_cards);
	if( bot_cards.length > 0 && common_cards.length < 12 &&(common_cards.length % 2 || user_cards.length > 0))
	{
		if(common_cards.length == 0 && take_status == 0)
		{
			//alert(bot_cards);
			if(bot_cards.length == 2 && card_compare(bot_cards[0], user_cards[0]) == 1)
				last_card = bot_cards.shift();	
			else
				last_card = bot_cards.pop();
			common_cards.push(last_card);
			//alert(bot_cards);
			elem = document.getElementById("b" + (bot_cards.length + 1));
			elem.style.visibility = "hidden";
			//alert(common_cards);
			
			celem = document.getElementById("c" + common_cards.length);
			celem.style.background = "url(" + card_path + last_card + ".jpg"+")";
			celem.style.visibility = "visible";
			sort_bot_cards();
			order = "user";
			orderelem = document.getElementById("orderBar");
			orderelem.innerText = "Ваш ход";
		}
		else if(common_cards.length % 2 && take_status == 0)
		{
			//alert("1: " + order);
			var beat_card = can_beat();
			//alert([beat_card, compare_dict[beat_card.charAt(1)], specials, beat_card.charAt(0)]);
			var bot_specs = count_bot_specials();
			if(common_cards[common_cards.length-1].charAt(0) == specials && deck.length > 0 || beat_card == 0)
			{
				//alert("beat_card:" + beat_card);
				take_status = 1;
				orderelem = document.getElementById("orderBar");
				
				// ! take_common_cards();
				
				// hide_common_cards();
				order = "user";
				orderelem = document.getElementById("orderBar");
				orderelem.innerText = "Ваш ход";
			}
			//else if(beat_card.charAt(0) != specials || compare_dict[beat_card.charAt(1)] < 10 ||  count_bot_specials() > 2|| 			// common_cards.length>6|| bot_cards.length > 6 || (deck.length == 0))
			else if(beat_card.charAt(0) != specials || compare_dict[beat_card.charAt(1)] < 10 &&  count_bot_specials() > 1|| common_cards.length>6|| bot_cards.length > 6 || (deck.length == 0))
			{
				//alert("bbb" +bot_cards);
				var temp_list = new Array();
				for(var i = 0; i < bot_cards.length; i++)
				{
					if(bot_cards[i] != beat_card)
						temp_list.push(bot_cards[i]);
				}
				bot_cards = temp_list;
				common_cards.push(beat_card);
				elem = document.getElementById("b" + (bot_cards.length + 1));
				elem.style.visibility = "hidden";
				celem = document.getElementById("c" + common_cards.length);
				celem.style.background = "url(" + card_path + beat_card + ".jpg"+")";
				celem.style.visibility = "visible";
				order = "user";
				update_order();
			}
			else
			{
				//alert("else block");
				take_status = 1;
				// ! take_common_cards();
				order = "user";
				update_order();
			}
		}
		else if(common_cards.length % 2 == 0 || take_status == 2)
		{
			//alert("hello");
			var extracard = found_similar_card();
			if(extracard!= 0 && (extracard.charAt(0) != specials || bot_cards.length == 1 && deck.length == 0))
			{
				//alert(extracard);
				var temp_list=  [];
				common_cards.push(extracard);
				for(var i = 0; i < bot_cards.length; i++)
				{
					if(bot_cards[i] != extracard)
						temp_list.push(bot_cards[i]);
				}
				bot_cards = temp_list;
				//alert(bot_cards);
				elem = document.getElementById("b" + (bot_cards.length + 1));
				elem.style.visibility = "hidden";
				//alert(common_cards);
				var f_hidden = get_first_hidden();
				celem  = document.getElementById("c" + f_hidden);
				celem.style.background = "url(" + card_path + extracard + ".jpg"+")";
				celem.style.visibility = "visible";
				sort_bot_cards();
				if(take_status != 2)
				{
					order = "user";
					update_order();
				}
				else if(take_status == 2)
					setTimeout(bot_move,think_time);
			}
			else
			{
				//alert(" hello else");
				if(take_status == 2)
				{
					order = "bot";
					update_order();
					round_is_done();
				}
				else{
					round_is_done();
					order = "user";
					update_order();
				}
				take_status = 0;
				common_cards = [];
			}
		}
	}
	else if(bot_cards.length == 0 && deck.length == 0 && user_cards.length > 0 && game_status == 1)
	{
		game_status = 0;
		bot_score += 1;
		alert("You lost");
		//alert(order);
		round_is_done();
		elem = document.getElementById("scoreBar");
		elem.innerText =  user_score + ":" + bot_score; 
		
	}
	else if(common_cards.length == 12)
	{
		round_is_done();
		hide_common_cards();
	}
	
}
function found_similar_card()
{
	
	var extracard = 0;
	
	for(var i = 0; i < common_cards.length; i++)
	{
		
		for(var j = 0; j < bot_cards.length; j++)
		{
			
			if(compare_dict[common_cards[i].charAt(1)] == compare_dict[bot_cards[j].charAt(1)])
			{
				
				if(extracard == 0 || compare_dict[bot_cards[j].charAt(1)] < compare_dict[extracard.charAt(1)])
					extracard = bot_cards[j];
				
			}
			
		}
		
	}
	
	return extracard;
}
function take_common_cards()
{
	//elem = event.srcElement;
	//alert(elem.id);
	
	if(game_status == 1)
	{
		if(order == "bot" )
		{
		
			for(var i = 0; i < common_cards.length; i++)
			{
				bot_cards.push(common_cards[i]);
			}
			if(bot_cards.length > 8 && moved == 0)
			{
				move_down_cards();
			}
		
			sort_bot_cards();
		
			for(var i = 0; i < bot_cards.length; i++)
			{
				elem = document.getElementById("b" + (i+1));
				elem.style.visibility = "visible";
			}
			round_is_done(); 
		}
		else if(take_status == 0 && common_cards.length % 2)
		{
		
			take_status = 2;
			order = "bot";
			update_order();
			setTimeout(bot_move, think_time);
		}
		
	}
	
	
}

function move_down_cards()
{
	moved = 1;
	cc = document.getElementById("commonCards");
	cc.style.marginTop = (parseInt(cc.currentStyle.marginTop) + 70) + "px";
	uc = document.getElementById("userCards");
	uc.style.marginTop = (parseInt(uc.currentStyle.marginTop) + 70) + "px";
}

function round_is_done()
{
	//alert("round -1");
	var finished = "bot";
	/*
	if(event.x > 1310 && event.x < 1415 && event.y > 660 && event.y < 720)
		finished = "user";
	*/
	//alert(finished);
	
	if(order == "bot" || (order == "user"&& common_cards.length %2 == 0)|| order == "user" && take_status == 1)
	{
		//alert("round0");
		
		if(order == "user" && take_status == 1)
		{
			for(var i = 0; i < common_cards.length; i++)
			{
				bot_cards.push(common_cards[i]);
			}
			if(bot_cards.length > 8 && moved == 0)
			{
				move_down_cards();
			}
		
			sort_bot_cards();
		
			for(var i = 0; i < bot_cards.length; i++)
			{
				elem = document.getElementById("b" + (i+1));
				elem.style.visibility = "visible";
			}
			
			
		}
		for(var i = 0; i < 12; i++)
		{
			elem = document.getElementById("c" + (i+1));
			elem.style.visibility = "hidden";
		}
		if(take_status == 2)
			for(var i = 0; i < common_cards.length; i++)
			{
				user_cards.push(common_cards[i]);
			}
		//alert("round_is1");
		
		if(order == "bot")
		{
			if(deck.length > 12 - bot_cards.length - user_cards.length)
			{
				get_new_cards("bot", min_of_two(deck.length, 6 - bot_cards.length));
				get_new_cards("user", min_of_two(deck.length, 6 - user_cards.length));
			}
			else
			{
				var numsum = deck.length + bot_cards.length + user_cards.length;
				get_new_cards("bot", parseInt(numsum / 2) - bot_cards.length);
				get_new_cards("user", parseInt(numsum / 2) - user_cards.length);
			}
			if(take_status != 2)
			{
				order = "user";
				update_order();
				
			}
			else if(game_status != 0)
			{
				order = "bot";
				update_order();
				setTimeout(bot_move, think_time);
				take_status = 0;
				common_cards = [];
			}
		}
		else
		{
			common_cards = [];
			if(deck.length > 12 - bot_cards.length - user_cards.length)
			{
				get_new_cards("user", min_of_two(deck.length, 6 - user_cards.length));
				get_new_cards("bot", min_of_two(deck.length, 6 - bot_cards.length));
			}
			else
			{
				var numsum = deck.length + bot_cards.length + user_cards.length;
				get_new_cards("bot", parseInt(numsum / 2) - bot_cards.length);
				get_new_cards("user", parseInt(numsum / 2) - user_cards.length);
			}
			
			if(take_status == 0)
			{
				order = "bot";
				update_order();
				setTimeout(bot_move, think_time);
			}
			else if(take_status == 1)
				take_status = 0;
		}
		sort_bot_cards();
		sort_user_cards();
	}
}

function min_of_two(a, b)
{
	if(a <= b)
		return a;
	return b;
}
function get_new_cards(player, amount)
{
	//var card_num = ((new Date())%37+parseInt(Math.random()*100))%36;
	for(var i = 0; i < amount; i++)
	{
		if(deck.length > 0)
		{
			var new_card = deck.shift();
			if(player == "user")
			{	
				create_card(new_card);
				user_cards.push(new_card);
			}
			else if(player == "bot")
			{
				add_bot_card(new_card);
				bot_cards.push(new_card);
			}
			cardnum = document.getElementById("cardNum");
			cardnum.innerText = deck.length;
			if(deck.length == 0)
			{
				elem = document.getElementById("extraCard");
				elem.style.visibility = "hidden";
			}
		}
		else
		{
			
		}
	}
}
function add_bot_card(new_card)
{
	card = document.getElementById("b" +  (bot_cards.length + 1));
	var path_str = "url(" + card_path + "back" + ".jpg"+")";
	card.style.background = path_str;
	card.style.visibility = "visible";
	
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
	
	card = document.getElementById("u" +  (user_cards.length + 1));
	var path_str = "url(" + card_path + card_name + ".jpg"+")";
	card.style.background = path_str;
	card.style.visibility = "visible";
}

function create_deck()
{
	for(var i = 6; i <= 14; i++)
	{
		var ti = i;
		if(i == 11)
			ti = "j";
		else if(i == 12)
			ti = "q";
		else if(i == 13)
			ti = "k";
		else if(i == 14)
			ti = "a";
		
		deck.push("p" + ti);
		deck.push("b" + ti);
		deck.push("k" + ti);
		deck.push("c" + ti);
	}
}

function set_body()
{
	document.body.style.background = "060";
	//document.body.onkeydown = key_down;
}

function key_down()
{
	//alert(event.keyCode);

	if(game_status == 1 && event.keyCode == "32")
		get_new_cards("user", 1);
	
	
}
