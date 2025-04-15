/*
  Author: Dimetriy Volkov

*/

var lifes = 3;
var form_width = 1000;
var form_height = 500;
var color_form_width = "200px";
var color_form_height = "100px";
var game_time = 60;
var color1 = "";
var color2 = "";
var result = 0;
var c = 1;
var current_time = game_time;
var game_status = 0;
var sec = 1000;
var color_dict = 	{"розовый":"pink","зеленый":"green","синий":"blue",
	"черный":"black","коричневый":"brown",
	"серый":"grey","фиолетовый":"purple", 	"желтый":"yellow","оранжевый":"orange","красный":"red"};
var color_list = [	"розовый","зеленый","синий","черный","коричневый",
		"серый","фиолетовый","желтый","оранжевый","красный"];

function main()
{
	document.body.onkeydown = key_down
	document.body.style.background = "#bbb";
	create_example_form();
	create_disagree_button();
	create_agree_button();
	create_start_button();
	create_time_counter();
	create_lifes_bar();
	create_result_bar();
	create_color_form();
	create_help_bar();
}

function create_help_bar()
{
	elem = document.createElement("div");
	elem.style.position = "absolute";
	elem.style.marginTop = "500px";
	elem.style.marginLeft = "0px";
	elem.innerText = "Управление кнопками или стрелками ←→. Пауза - пробел";
	felem = document.getElementById("exampleForm");
	felem.appendChild(elem);	
}
function create_color_form()
{
	elem = document.createElement("div");
	elem.id = "colorForm";
	elem.style.width = color_form_width;
	elem.style.height = color_form_height;
	elem.style.position = "absolute";
	elem.style.fontSize = "4em";
	elem.style.marginLeft = "384px";
	elem.style.marginTop = "175px";
	elem.innerText = "оранжевый";
	elem.style.color = color_dict[elem.innerText];
	elem.style.visibility = "hidden";
	felem = document.getElementById("exampleForm");
	felem.appendChild(elem);
}

function create_lifes_bar()
{
	elem = document.createElement("div");	
	elem.id = "lifesBar";
	elem.innerText = "♥ ♥ ♥";
	elem.style.background = "black";
	elem.style.fontSize = "3em";
	elem.style.lineHeight = "40px";
	elem.style.marginLeft = "10px";
	elem.style.marginTop = "10px";
	elem.style.position = "absolute";
	elem.style.padding = "0 5px 2px";
	elem.style.visibility = "hidden";
	elem.style.border = "3px solid black";
	elem.style.color = "red";
	felem = document.getElementById("exampleForm");
	felem.appendChild(elem);
}

function create_result_bar()
{
	elem = document.createElement("div");
	elem.id = "resultBar";
	elem.innerText = "Результат: " + result;
	elem.style.fontSize = "1.6em";
	elem.style.position = "absolute";
	elem.style.marginTop = "80px";
	elem.style.marginLeft = "10px";
	elem.style.visibility = "hidden";
	felem = document.getElementById("exampleForm");
	felem.appendChild(elem);
}
function create_example_form()
{
	elem = document.createElement("div");
	elem.id = "exampleForm";
	elem.style.background = "white";
	elem.style.height = form_height + "px";
	elem.style.width = form_width + "px";
	elem.style.border = "5px solid blue";
	elem.style.marginLeft = "200px";
	elem.style.marginTop = "100px";
	document.body.appendChild(elem);
}

function create_agree_button()
{
	elem = document.createElement("div");
	elem.id = "agreeButton";
	elem.style.background = "green";
	elem.style.height = "90px";
	elem.style.width = "90px";
	elem.style.marginLeft = "500px";
	elem.style.marginTop = "390px";
	elem.innerText = "V";
	elem.onclick = desicion;
	elem.style.position = "absolute";
	elem.style.fontSize = "5em";
	elem.style.paddingLeft = "15px";
	elem.style.border = "3px solid black";
	elem.style.visibility = "hidden";
	form_elem = document.getElementById("exampleForm");
	form_elem.appendChild(elem);
	
}

function create_disagree_button()
{
	elem = document.createElement("div");
	elem.id = "disagreeButton";
	elem.style.background = "red";
	elem.style.height = "90px";
	elem.style.width = "90px";
	elem.innerText = "X";
	elem.style.fontSize = "5em";
	elem.style.marginLeft = "400px";
	elem.style.position = "absolute";
	elem.onclick = desicion;
	elem.style.marginTop = "390px";
	elem.style.paddingLeft = "15px";
	elem.style.border = "3px solid black";
	elem.style.visibility = "hidden";
	form_elem = document.getElementById("exampleForm");
	form_elem.appendChild(elem);
}

function gen_color()
{
	var dat = new Date();
	var t = parseInt(Math.random() * 37);
	color1 = color_list[(parseInt(Math.random() * 101) + dat % 37)%10];
	color2 = color_list[(t + dat % 19)%10];
	if(t % 3 == 2)
		color1 = color2;
	elem = document.getElementById("colorForm");
	elem.innerText = color1;
	elem.style.color = color_dict[color2];
	
}

function desicion()
{
	if(game_status == 1)
	{
		var des = 1;
		elem = document.elementFromPoint(event.x, event.y);
		if(elem.id == "disagreeButton")
			des = 0;
		check_answer(des);
	}
	
}

function check_answer(des)
{
	var tlifes = lifes;
	if(des)
		if(color1 == color2)
			result += 1;
		else
			lifes -= 1;
	else if(des == 0)
		if(color1 != color2)
			result += 1;
		else
			lifes -= 1;
	if(lifes == tlifes)
	{
		elem = document.getElementById("resultBar");
		elem.innerText = "Результат: " + result;
		gen_color();
	}	
	else if(lifes > 0)
	{
		elem = document.getElementById("lifesBar");
		var tstr = "♥"
		if(lifes == 2)
			tstr = "♥ ♥";
		elem.innerText = tstr;
	}	
	else
	{
		elem = document.getElementById("lifesBar");
		elem.innerText = " ";
		elem.style.visibility = "hidden";
		game_status = 0;
		alert("Ваш результат: " + result);
	}
	
}

function create_time_counter()
{
	elem = document.createElement("div");	
	elem.id = "timeCounter";
	elem.innerText = "1:00";
	elem.style.fontSize = "2em";
	elem.style.visibility = "hidden";
	elem.style.marginLeft = "450px";
	elem.style.position = "absolute";
	fel = document.getElementById("exampleForm");
	fel.appendChild(elem);

}
function create_start_button()
{
	elem = document.createElement("div");
	elem.id = "startButton";
	elem.style.background = "white";
	elem.style.border = "3px solid black";
	elem.innerText = "Start";
	elem.style.paddingLeft = "10px";
	elem.style.fontSize = "2em";
	elem.style.height = "50px";
	elem.style.width = "100px";
	elem.style.marginLeft = "600px";
	elem.style.marginTop = "50px";
	elem.onclick = start_game;
	document.body.appendChild(elem);
}

function start_game()
{
	
	game_status = 1;
	aglem = document.getElementById("agreeButton");
	aglem.style.visibility = "visible";
	dislem = document.getElementById("disagreeButton");
	dislem.style.visibility = "visible";
	telem = document.getElementById("timeCounter");
	telem.innerText = "1:00";
	telem.style.visibility = "visible";
	lifes = 3;
	result = 0;
	relem = document.getElementById("resultBar");
	relem.innerText = "Результат: " + result;
	relem.style.visibility = "visible";
	current_time = game_time;
	lbelem = document.getElementById("lifesBar");
	lbelem.style.visibility = "visible";
	lbelem.innerText = "♥ ♥ ♥";
	gen_color();
	cflem = document.getElementById("colorForm");
	cflem.style.visibility = "visible";
	start_counter();
}

function start_counter()
{
	clearInterval(c);
	c = setInterval(time_pass, sec);
	
}

function key_down()
{
	var des = 0;
	if(event.keyCode == 32)
	{	if(game_status == 1)
			game_status = 2;
		else if(game_status == 2)
			game_status = 1;
	}
	else if (event.keyCode == 39)
		des = 1;
	if( game_status == 1 && (event.keyCode == 37 || event.keyCode == 39))
		check_answer(des);
}
function time_pass()
{
	if (game_status == 1)
	{
		current_time -= 1;
		if(current_time == -1)
		{
			alert("Время вышло. \nВаш результат: "+ result);
			game_status = 0;
		}
		else
		{
			telem = document.getElementById("timeCounter");
			var ttime = current_time;
			if(current_time < 10)
				ttime = "0" + current_time;
			telem.innerText = "00:"+ ttime;
		}
	}
}
