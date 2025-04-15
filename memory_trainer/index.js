/*	
  Author: Dimetriy Volkov
*/


var front_color = "yellow";
var back_color = "black";

var salt = 0;
var game_status = 0;
var colors = ["#00f","#f00","#ff0","#0c0","#fff","#643","#777","#f0f","#0ff"];
var state = 1;
var lvl = 1;
var user_ind = 0;
var turn = 0;
var cL = [];
var user_ans = [];
var action = 1;
var n = 0;
last_id = 0;

var a = [1,2,3,4,5,6,6,7,8,9];
var b = {};
/*
for(var key in a)
{	b[a[key]] = a[key]*a[key]; }
for(var k in b)
{ 	alert(k+":"+b[k]);	}
*/
var j = 0;
var flag = 0;

function main(){
	if(game_status == 0)
	{	
		elem = document.getElementById("outer");
		elem2 = document.getElementById("start");
		elem2.style.display = "none";
		elem.style.display = "block";	
		game_status = 1;
		play();
	}
}

function playComb()
{
	while(flag != 1)
	{ 
		setInterval(func, 300);
		flag = 1;
	}
	flag = 0;
	j = 0;
}
function func()
{

	elem = document.getElementById(cL[j]);
	if(j == 0){
		last_id = cL[j];
		elem.style.background = back_color;
		//elem.style.border = "2px solid black";
	}
	else if(j < cL.length)
	{
		
		elem2 = document.getElementById(last_id);
		elem2.style.background = colors[last_id-1];
		//elem2.style.border = "none";
		elem.style.background = back_color;
		//elem.style.border = "2px solid black";
		last_id = cL[j];
	}
	else if(j == cL.length)
	{
		elem2 = document.getElementById(last_id);
		elem2.style.background = colors[last_id - 1];
		//elem2.style.border = "none";
	}
	else{
		flag = 1;
	}
	j += 1;
}
function play(){
	elins = document.getElementById("inserted");
	elins.style.display = "block";
	alert("Уровень " + lvl);
	elem = document.getElementById("tex");
	elem.innerText = "Level " + lvl;
	genComb(1);
	playComb();
}
function genComb(size){

	var i = 0;
	while(i < size){
		var dat = new Date();
		var s2 = Math.ceil(Math.random()*10);
		var x = ((((dat % 113) % 31)+Math.ceil(Math.random()*10)) *s2) %9 + 1;
		var s2 = dat % 113;
		if(cL.length == 0 || cL[cL.length - 1] != x){
			cL.push(x);
			i += 1;
		}		
	}
}

function checkAns(ans){
	if(game_status == 1)
	{
		user_ans.push(ans);
		el = document.getElementById("inserted");
		el.innerText = "Введенная комбинация: "+user_ans;
		if(ans != cL[user_ind])
		{
			elem = document.getElementById(ans);
			//elem.style.background = back_color;
			alert("В этот раз не получилось");
			playComb();
			game_status = 0;
			//elem.style.background = color[ans-1];
		}	
		else if( user_ind + 1 >= cL.length)
		{
			user_ans = [];
			el.innerText = "Введенная комбинация: "+user_ans;
			lvl += 1;
			play();
			user_ind = 0;
		}
		else
		{
			user_ind += 1;
		}
	
	}
	else
	{
		alert("Игра окончена. Перезагрузите страницу, чтобы начать заново");
	}
}

function restart(){

}	





