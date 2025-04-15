/*	
    Author: Dimetriy Volkov
*/

var game_status = 1;
var errors = 0;
var solved = 0;
var user_field = [];
var user_attempts = {};
var n = 10;
var minesFound = 0;
var k = 0;
var clicks = 0;
var grid_size = 100;
var field = [];
var t_f = [];
var mn = 0;
var max_error = 10;
var mode = 0;


function main(lev)
{
	
	elem = document.getElementById("levels");
	elem.style.display = "none";
	elem2 = document.getElementById("outer");
	elem2.style.display = "block";
	
	if(lev == 0)
	{ 	mn = prompt("Введите количество мин от 1 до 100"); }
	else if(lev == 1)
	{	mn = 20; }
	else if(lev == 2)
	{	mn = 30; }
	else if( lev == 3)
	{	mn = 40; }
	max_error = Math.ceil(mn / 10) + 1;
	if(mn <= 10)
	{	max_error = 1; }
	elm = document.getElementById("minnum");
	elm.style.display = "none";
	el2 = document.createElement("div");
	el2.style.border = "1px solid blue";
	el2.style.background = "white";
	el2.innerText = "Найдено мин: " + minesFound + "/" + mn;
	el2.style.display = "block";
	el2.style.width = "200px";
	el2.style.padding = "5px";
	el2.style.fontSize = "1.3em";
	el2.id = "minesFound";
	document.body.appendChild(el2);
	
	
	el = document.getElementById("errors");
	el.innerText = "Ошибок: " +errors+"/" + max_error;
	//gen_mines(mn);
	//count_mines();
	//print_field();
	//alert("1");
	
	while (k < 1)
	{
		setInterval(disp_time, 1000);
		k += 1;
	}
	
}

function checkAns(cid)
{
	
	if(game_status == 1)
	{
		if(clicks == 0)
		{
			
			gen_mines(cid, mn);
			count_mines();
			solved = 1;
			
			
		}
		clicks += 1;
		//print_field();
		var ev = event.button;
		
		elem = document.getElementById(cid);
		el1 = document.getElementById("minesFound");
		if(ev == 1)
		{
			if(user_field[cid-1] != "?")
			{
					
				if(field[cid-1] == "*")
				{
					if(elem.innerText != "*")
					{
						minesFound += 1;
						user_field[cid-1] = field[cid-1];
					
						if(errors < max_error)
						{ 
							errors += 1;
							el = document.getElementById("errors");
							el.innerText = "Ошибок: " +errors+"/"+ max_error;
						}
						else
						{
							elem.style.background = "#f77";
							game_status = 0;
							alert("Game over");
							print_field();
						}
					}
					elem.innerText = field[cid-1];
				}
				else if(solved  == n * n - mn)
				{
					game_status = 0;
					el2 = document.getElementById("solved");
					el2.innerText = "Разгадано ячеек: " + solved+"/"+(n*n - mn);
					alert("You win! Congratulations!");
					print_field();
				}
				else if(t_f[cid-1] == 0){
					t_f[cid-1] = 2;
					if(clicks != 1)
						solved += 1;
					elem.innerText = field[cid-1];
					user_field[cid-1] = field[cid-1];
					if(solved == n*n -mn)
					{
						game_status = 0;
						el2 = document.getElementById("solved");
						el2.innerText = "Разгадано ячеек: " + solved+"/"+(n*n - mn);
						alert("You win! Congratulations!");
						print_field();
					}
				}
			}
			el2 = document.getElementById("solved");
			el2.innerText = "Разгадано ячеек: " + solved+"/"+(n*n - mn);
		}
		else if(ev == 2)
		{
			if(user_field[cid - 1] == "a")
			{	
				minesFound += 1;
				elem.innerText = "?"; 
				user_field[cid - 1] = "?";
			}
			else if(user_field[cid - 1] == "?")
			{
				minesFound -= 1;
				elem.innerText = ""; 
				user_field[cid - 1] = "a";
			}
		}
		el1.innerText = "Найдено мин: " + minesFound + "/" + mn;
	}
	else if(game_status == 2)
	{	alert("Cнимите игру с паузы, чтобы продолжить");}
	//event.returnValue = false;
}

function gen_mines(cid, mn)
{
	if(mn >= 100)
	{	alert("Impossible");
		game_status = 0;
	}
	for(var i = 0; i < 100; i++)
	{	
		field.push(0);
		t_f.push(0);
		user_field.push("a");
	}
	//print_field();
	var m = 0;
	
	while(m<mn)
	{
		var dat = new Date();	
		var m_i = (Math.ceil(Math.random() * 10000) + (dat%113))% 100;
		if(field[m_i] == 0 && m_i != (cid - 1))
		{
			field[m_i] = "*";
			t_f[m_i] = 1;
			m += 1;
		}
	}
	
}
function count_mines()
{
	for(var i = 0; i < grid_size; i++)
	{
		if(field[i] != "*")
		{
			if(i == 0)
			{	field[i] = t_f[i+1] + t_f[i+n]+ t_f[i+n + 1];  }
			else if(i == n - 1)
			{	field[i] = t_f[i -1] + t_f[i+n]+ t_f[i+n  - 1];  }
			else if(i == n*(n - 1))
			{	field[i] = t_f[i + 1] + t_f[i - n]+ t_f[i - n  + 1];  }
			else if(i == n*n - 1)
			{	field[i] = t_f[i -1] + t_f[i-n]+ t_f[i - n  - 1];  }
			else if(i < n)
			{	field[i] = t_f[i - 1]+t_f[i+1]+t_f[i +n-1]+t_f[i+n]+t_f[i+n+1]; }
			else if(i % n == 0)
			{	field[i] = t_f[i-n]+t_f[i-n+1]+t_f[i+1]+t_f[i+n]+t_f[i+n+1]; }
			else if(i % n == (n - 1))
			{	field[i] = t_f[i-n-1]+t_f[i-n]+t_f[i-1]+t_f[i+n-1]+t_f[i+n]; }
			else if(n*n - i < n)
			{	field[i] = t_f[i-n-1]+t_f[i-n]+t_f[i-n+1]+t_f[i-1]+t_f[i+1]; }
			else
			{         field[i] = 						t_f[i-n-1]+t_f[i-n]+t_f[i-n+1]+t_f[i-1]+t_f[i+1]+t_f[i+n-1]+t_f[i+n]+t_f[i+n+1];
			}
		}
	}
}
function print_field()
{
	for(var i = 0; i < field.length; i++)
	{	
		elem = document.getElementById(i +1);
		elem.innerText = field[i];
	}
}
function disp_time()
{
	if(game_status == 1)
	{
		k += 1;
		s = k % 60;
		m = (k - s) / 60;
		js = s;
		jm = m;
		if(s < 10)
			js = "0" + s;
		if(m < 10)
			jm = "0" + m;
		elem = document.getElementById("time");
		elem.innerText = "Прошло: " +jm+":"+js;
	}
	
}
function pause()
{
	if(game_status == 1)
	{	game_status = 2; }
	else if(game_status == 2)
	{	game_status = 1; }
}

function chlvl(lev)
{
	//alert(lev);
	main(lev);
}
function test()
{
	alert("test");
}

function set_mode()
{
	if(mode == 0)
	{	
		mode = 1;
	}
	else if(mode == 1)
	{
		mode = 0;
	}
	elem = document.getElementById("mode");
	elem.innerText = "Режим: " + (mode + 1);
}

function func()
{
	event.returnValue = false;
}
function open_zero(cid)
{
	if(field[cid-1] == 0)
	{
		
	}
}
