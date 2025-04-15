
/*
  Author: Dimetriy Volkov
*/

var lifes = 3;
var form_width = 1000;
var form_height = 500;
var color_form_width = "400px";
var color_form_height = "100px";
var game_time = 60;
var example = "";
var user_name = "Dima";
var win_set = 0;
var bonus_num = 5;
var ans1 = 0;
var ans2 = 0;
var type = 0;
var num1 = 0;
var num2 = 0;
var num3 = 0;
var num4 = 0;
var dashmap = {};
var result = 0;
var c = 1;
var current_time = game_time;
var game_status = 0;
var sec = 1000;
var names = new Array();
var scores = new Array();
var results = new Array();
var play = 0;
function main()
{	
	
	//document.body.onclick = clicked;
	document.body.onkeydown = key_down;
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
	create_bonus_bar();
	create_best_scores_bar();
	clear_cookie("undefined");
	clear_cookie("anonym");
	clear_cookie("Сынмаминойподруги");
	clear_cookie("seven_heaven");
	clear_cookie("четыре");
	process_cookie();
	display_dashboard();
}

function clicked()
{
	alert([screen.width,screen.height,screen.availWidth,screen.availHeight,screen.colorDepth]);
	elem  = document.elementFromPoint(event.x,event.y);
	alert(elem.id);
}

function set_cookie(name,val)
{

	var c_day = new Date();
	var n_day = c_day.getTime() + 86400000000;
	c_day.setTime(n_day);
	var last_day = c_day.toGMTString();
	document.cookie = name+"="+val+"; expires="+last_day +";";
	
}
function clear_cookie(name)
{	
	var c_day = new Date();
	c_day.setTime(1000);
	var s_date = c_day.toGMTString();
	document.cookie = name +"=; expires=" + s_date +";";
	
}
function f_sort(p1, p2)
{


	if(parseInt(p1[1]) > parseInt(p2[1]))
		return -1;
	if(parseInt(p2[1]) > parseInt(p1[1]))
		return 1;
	return 0;
}
function process_cookie()
{

	dashmap = {};
	if(document.cookie != "")
	{
		
		
		var m_str = new String(document.cookie);
		var pairs = m_str.split(";");
		for(var i = 0; i < pairs.length; i++)
		{
			
			var kv = pairs[i].split("=");
			names.push(kv[0]);
			scores.push(kv[1]);
			results.push(kv);
			dashmap[stripstring(kv[0])] = stripstring(kv[1]);
		}
	}
	results.sort(f_sort);
	
}

function stripstring(str)
{
	var res = "";
	for(var i = 0; i < str.length; i++)
	{
		if(str.charAt(i) != " ")
		{
			res += str.charAt(i);
		}
	}
	return res;
}

function display_dashboard()
{
	var n = 5;
	if(results.length < n)
		n = results.length;
	for(var i = 0; i < n; i++)
	{
		ni = document.getElementById("name"+(i+1));
		si = document.getElementById("score"+(i+1));
		ni.innerText = (i+1) +". " + results[i][0];
		si.innerText = results[i][1];
	}
	dashboard = document.getElementById("bestScores");
	dashboard.style.visibility = "visible";
}

function update_dashboard(result)
{
	
	// проверка result != null
	//
	results.sort(f_sort);
	
	if((results.length < 5 || result > results[4][1]))
	{
		
		username = prompt("Введите ваше имя(до 10 символов)");
		if(String(username) == "null")
			username = "anonym";
		var tempval = stripstring(username);
		username = tempval;
		set_cookie(username, result);
		if(username in dashmap)
		{
			
			if(result > dashmap[username])
			{
				dashmap[username] = result;
				for(var i = 0; i < results.length; i++)
				{
					if(results[i][0] == username)
						results[i][1] = result;
				}
			}
		}
		else
		{
			dashmap[username] = result;
			results.push([username, result]);
		}
		results.sort(f_sort);		
		
	}
	
	display_dashboard();
}
function gen_example()
{
	
	var dat = new Date();
	example = "";
	type = (parseInt(Math.random() * 101) + dat % 71)%5;
	num1 = (parseInt(Math.random() * 91) + dat % 79)%90 + 10;
	num2 = (parseInt(Math.random() * 47) + dat % 19)%10 + 1;
	num3 = (parseInt(Math.random() * 59) + dat % 43) % 9 + 1;
	num4 = (parseInt(Math.random() * 113) + dat % 53) % 9 + 1;
	
	if(type == 0)
	{
		example = num1 + " * " + num2;
		ans1 = num1 * num2;
		ans2 = ans1 + num4*71 % 6;
	}
	else if(type == 1)
	{
		example = num2 + " + " + num3 + " * " + num4;
		ans1 = num2 + num3 * num4;
		ans2 = ans1 + num4*23 % 3;
	}
	else if(type == 2)
	{
		example = num2 + " * " + num3 + " - " + num4;
		ans1 = num2 * num3 - num4;
		ans2 = ans1 + num4*17 % 4;
	}
	else if(type == 3)
	{
		example = (num1 % 10 + 1 ) + " * " + num2 + " - " + num3 + " * " + num4;
		ans1 = (num1 % 10 + 1) *num2-num3*num4;
		ans2 = ans1 + num3 % 3;
	}
	else if(type == 4)
	{
		example = (num1 % 10 + 1 ) + " * " + num2 + " + " + num3 + " * " + num4;
		ans1 = (num1 % 10 + 1) *num2+num3*num4;
		ans2 = ans1 + num2 % 5;
	}
	
	if(type % 2 == 1)
		ans2 = ans1;
	example = example + " = " + ans2;
	
	elem = document.getElementById("colorForm");
	
	elem.innerText = example;
	
}

function desicion()
{
	if(game_status == 1)
	{
		var x = event.screenX;
		var des = 1;
		elem = document.elementFromPoint(event.x,event.y);
		if(elem.id == "disagreeButton")
			des = 0;
		check_answer(des);
	}
	
}

function check_answer(des)
{
	
	var tlifes = lifes;
	if(des)
		if(ans1 == ans2)
			result += 1;
		else
			lifes -= 1;
	else if(des == 0)
		if(ans1 != ans2)
			result += 1;
		else
			lifes -= 1;
	if(lifes == tlifes)
	{
		win_set += 1;
		elem = document.getElementById(win_set);
		elem.style.visibility = "visible";
		
		if(win_set == bonus_num)
		{	
			current_time += 5; 
			win_set = 0;
			telem = document.getElementById("timeCounter");
			var ttime = current_time;
			if(current_time < 10)
				ttime = "0" + current_time;
			telem.innerText = "00:"+ ttime;
			for(var i = 0; i < bonus_num; i++)
			{
				elem= document.getElementById(i + 1);
				elem.style.visibility = "hidden";
			}
		}
		elem = document.getElementById("resultBar");
		elem.innerText = "Результат: " + result;
		gen_example();
	}	
	else if(lifes > 0)
	{
		win_set = 0;
		elem = document.getElementById("lifesBar");
		var tstr = "♥"
		if(lifes == 2)
			tstr = "♥ ♥";
		elem.innerText = tstr;
		for(var i = 0; i < bonus_num; i++)
		{
			elem= document.getElementById(i + 1);
			elem.style.visibility = "hidden";
		}
	}	
	else
	{
		for(var i = 0; i < bonus_num; i++)
		{
			elem= document.getElementById(i + 1);
			elem.style.visibility = "hidden";
		}
		win_set = 0;
		elem = document.getElementById("lifesBar");
		elem.innerText = " ";
		elem.style.visibility = "hidden";
		game_status = 0;
		alert("Ваш результат: " + result);
		update_dashboard(result);
		
	}
	
}






function start_game()
{
	//process_cookie();
	win_set = 0;
	game_status = 1;
	dashboard = document.getElementById("bestScores");
	dashboard.style.visibility = "hidden";
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
	gen_example();
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
	else if (game_status == 1)
	{
		if(event.keyCode == "39")
			des = 1;
		if(event.keyCode == "39" || event.keyCode == "37")
			check_answer(des);
	}
}
function time_pass()
{
	if (game_status == 1)
	{
		current_time -= 1;
		if(current_time == -1)
		{
			
			alert("Время вышло. \nВаш результат: "+ result);
			update_dashboard(result);
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

function create_best_scores_bar()
{
	elem = document.createElement("div");
	elem.id = "bestScores";
	
	elem.style.width = "250px";
	elem.style.height = "230px";
	elem.style.marginLeft = "800px";
	elem.style.display = "inline";
	elem.style.padding = "10px";
	elem.style.background = "white";
	
	elem.style.border = "3px solid black";
	//elem.innerText = document.cookie;
	game_field = document.getElementById("exampleForm");
	game_field.appendChild(elem);
	
	for(var i = 1; i < 6; i++)
	{
		uname = document.createElement("div");
		uname.id = "name" + i;
		
		uname.style.display = "inline";
		uname.style.width = "160px";
		uname.style.height = "40px";
		//uname.innerText = i + ". " + "Dimetriy";
		uname.style.fontSize = "1.6em";
		//uname.style.border = "1px solid blue";
		uscore = document.createElement("div");
		uscore.id = "score" + i;
		//uscore.style.border = "1px solid red";
		uscore.style.display = "inline";
		uscore.style.width = "50px";
		uscore.style.marginLeft = "10px";
		uscore.style.height = "40px";
		//uscore.innerText = i * 100;
		uscore.style.fontSize = "1.6em";
		uscore.style.textAllign = "center";
		elem.appendChild(uname);
		elem.appendChild(uscore);
		
	}
	
	
}

function create_bonus_bar()
{
	elem = document.createElement("div");
	elem.id = "bonusBar";
	elem.style.position = "absolute";
	elem.style.width = "300px";
	elem.style.height= "100px";
	elem.style.marginTop = "200px";
	
	
	for(var i = 0; i < bonus_num; i++)
	{
		el = document.createElement("div");
		el.id = i + 1;
		el.style.display = "inline";
		el.style.width = "30px";
		el.style.height = "30px";
		el.style.margin = "5px";
		el.style.background = "blue";
		el.style.visibility = "hidden";
		elem.appendChild(el);	
		
	}
	
	felem = document.getElementById("exampleForm");
	felem.appendChild(elem);
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
	elem.style.fontSize = "3em";
	elem.style.marginLeft = "350px";
	elem.style.marginTop = "200px";
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
