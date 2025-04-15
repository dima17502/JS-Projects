/*	
    Author: Dimetriy Volkov
*/
var pass_size = 6;
var content = [];
var num = [];
var cell_active = 0;
var last_active = 1;
var game_status = 1;
var zero_point = 0;
max_attempt = 8;
var grid_size = max_attempt * pass_size;
attempt = 1;

function main(){
	gen_num();
}	
function gen_num(){
	var i = 0;
	while (i < pass_size)
	{
		var dat = new Date();
		var n = (Math.ceil(Math.random() * 10) + (dat%113)%31)% 10;
		if (n == 0)
		{ 
			n = 1;
		}
		var j = 0;
		while(j < num.length && n != num[j])
		{ 	
			j += 1;
		}
		if (j >= num.length && n != 0)
		{   
			i += 1;
			num.push(n); 
		}
	}
}
function chnum(cid)
{
	if(cid > (attempt - 1) * pass_size)
	{
		elem = document.getElementById(cid);
		ns = document.getElementById("numbers");
		if(cell_active != 0)
		{
			el = document.getElementById(last_active);
			elem.style.background = "99f";
			el.style.background = "white";
			if(last_active == cid)
			{	
				ns.style.display = "none";   
				cell_active = 0;
			}	
		}
		else
		{
			elem.style.background = "99f";
			ns.style.display = "inline-block";
			ns.style.float = "left";
			cell_active = 1;
		}
		last_active = cid;
	}
}
function checkAns()
{
	if(game_status != 0)
	{
		last = document.getElementById(last_active);
		last.style.background = "white";
		var cgr = 0
		var dexist = 0;
		var wrong = 0;
		for(var i = 0; i < pass_size; i++)
		{
			if (content[pass_size*(attempt-1) + i] == num[i])
			{ cgr += 1;}
			var flag = 0;
			for(var j = 0; j < pass_size; j++)
			{
				if(content[pass_size*(attempt - 1) + j] == num[i])
				{	flag = 1;	}			
			}
			wrong = wrong + 1 - flag;
		}
		dexist = pass_size - cgr - wrong;
		fill_cells(cgr, dexist);
		if(cgr == pass_size)
		{	
			var t = get_time();
			alert("Получилось!;)\nВаше время: "+ t);
			game_status = 0;
		}
		else if( attempt == max_attempt)
		{
			alert("В этот раз не повезло :(");
			game_status = 0;
			for(var i = 0; i < pass_size; i ++)
			{
				var cid = 1 + i;
				elem = document.getElementById("a" + cid);
				elem.innerText = num[i];	
				sel = document.getElementById("sa" + cid);
				sel.style.background = "7f7";
			}
			elem = document.getElementById("ans");
			elem.style.display = "block";
		}	
		else
		{
			var i = attempt + 1;
			t = document.getElementById("try" + i);
			t.style.display = "block";
		}
		attempt += 1;
		if(attempt <= max_attempt)
		{
			elem = document.getElementById("try");
			elem.innerText = "Попытка " + attempt + "/" + max_attempt;
		}
	}	
}	
function fill_cells(cgr, yel)
{
	for(var i = 0; i < pass_size; i++)
	{
		var cid = 6 * (attempt - 1) + i + 1;
		sel = document.getElementById("s" + cid);		
		if(i < cgr)
		{
			sel.style.background = "7f7";
		}
		else if (yel > 0)
		{
			yel -= 1;
			sel.style.background = "ff7";
		}	
	}
}
function try_again()
{}
function chlvl(lvl)
{	
	if (lvl == 1)
		max_attempt = 12;
	else if( lvl == 2)
		max_attempt = 10;
	else
		max_attempt = 8;
	grid_size = max_attempt * pass_size;
	for(var i= 0; i < grid_size; i++)
		content.push(1);
	t = document.getElementById("try");
	t.innerText = "Попытка 1/" + max_attempt;
	wind = document.getElementById("levels");
	wind.style.display = "none";
	o =  document.getElementById("outer");
	o.style.display = "block";
	var n = 0;
	while(n < 1 && game_status == 1)
	{
		setInterval(time_past, 1000);
		n += 1;
	}
}
function clearComb()
{
	for ( var i = 0; i < pass_size; i++)
	{
		var cid = pass_size * (attempt - 1)  + 1 + i;
		elem = document.getElementById(cid);
		elem.innerText = 1;
		content[cid - 1] = 1;
	}
}
function getNum(n)
{
	if(last_active > (attempt - 1) * pass_size)
	{	
		elem = document.getElementById(last_active);
		content[last_active - 1] = n;
		elem.innerText = n;	
	}
}
function time_past()
{
	if(game_status != 0)
	{
		el = document.getElementById("time");
		zero_point += 1;	
		t = get_time();
		el.innerText = "Прошло: " + t;
	}
}
function get_time()
{
	var s = zero_point % 60;
	if(s < 10)
	{  s = "0" + s;}
	var m = (zero_point  - s)/ 60;
	if(m < 10)
	{  m = "0" + m;}
	var t = m + ":" + s;
	return t;
}
