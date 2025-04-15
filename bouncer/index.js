/* 
	Author: Dimetriy Volkov
*/

//document.write("Press any key to move");

var stick_pos = 0;
var pos = 0;
var path = 0;
var lvl = 1;
var score = 0;
var n = 0;
var motion = 0;
speed = 50;
var stick_num = 7;
var game_status = 1;
var sticks = [{"id": "st1", "pos": "0", "dist": "500"}, 
	   {"id": "st2", "pos": "0", "dist": "650"},
	   {"id": "st3", "pos": "0", "dist": "800"}, 
	   {"id": "st4", "pos": "0", "dist": "950"}, 
	   {"id": "st5", "pos": "0", "dist": "1100"},
	   {"id": "st6", "pos": "0", "dist": "1250"},
	   {"id": "st7", "pos": "0", "dist": "1400"}	
	];
var spos = [100, 650, 800, 950, 1100, 1250, 1400];


function play(speed){
	var n = 0;
	//speed = 100;
	
	while (n < 1 && game_status == 1){
		setInterval(move,speed);
		n += 1;
	}
}

function move()
{
	
	if( game_status == 1)
	{
		
		if( path == 70)
		{	
			alert("Level 2"); 
			el = document.getElementById("lvl");
			el.innerText = "Level 2";
			lvl = 2;
			speed = 35;
			play(speed);
		}
		else if( path == 450)
		{
			el2 = document.getElementById("field");
			el2.style.background = "#55f";
			el = document.getElementById("lvl");
			el.style.background = "#55f";
			el.innerText = "Level 3";
			alert("Level 3"); 
			lvl = 3;
			speed = 40;
			play(speed);
		}
		else if( path == 1400)
		{
			el2 = document.getElementById("field");
			el2.style.background = "#a33";
			el = document.getElementById("lvl");
			el.style.background = "#a33";
			el.innerText = "Level 4";
			alert("Level 4"); 
			lvl = 4;
			speed = 35;
			play(speed);
		}
		else if (path == 2100)
		{
			el = document.getElementById("lvl");
			el.innerText = "Level 5";
			el.style.background = "#f77";
			lvl = 5;
			alert("LEVEL INSANE"); 
			
			speed = 32;
			play(speed);
		}
		else if(path >= 3000)
		{	
			alert("Congratulations! You win! Your result:" + (score + path));
			game_status = 0;
		}
		path += 1;
		elpath = document.getElementById("path");
		elpath.innerText = "Distanse: " +  path;
		//alert(sticks[0]["id"]);
		for(var i = 0; i < stick_num; i++)
		{
			stick = document.getElementById(sticks[i]["id"]);
	
			var t = n * 10;
			var s = t + "px";
			var old_marg = parseInt(stick.currentStyle.marginLeft);
			var new_marg = (old_marg - 10) + "px";
			var inmarg = parseInt(new_marg);
			//alert(new_marg);
			if( inmarg <= 45 && inmarg > 0)
			{
				if(pos == sticks[i]["pos"])
				{
					var res = score + path;
					alert("Ваш результат: " + res);
					//localStorage.set("age","20");
					//alert(localStorage["age"]);
					game_status = 0;
				}
			}
			else if(inmarg == 0)
			{
				var dat = new Date();	
				var p = (Math.ceil(Math.random() * 10) + (dat%113)%31)% 2;
				n = 0;
				//alert(p);
				if (p <= 0){
				
					var t = spos[stick_num - 1] + "px";
					stick.style.marginLeft = t;
					stick.style.marginTop = "-100px";
					new_marg = t;
				
					sticks[i]["pos"] = "0";
					//alert(p);
				
				}
				else if(p == 1)
				{
				
					var t = spos[stick_num - 1] + "px";
					stick.style.marginLeft = t;
					new_marg = t;
					sticks[i]["pos"] = "1";
					stick.style.marginTop = "-250px";
					
				
				}
				else
				{	
					alert(p);
				}
			
			}
			if (game_status)
			{	stick.style.marginLeft = new_marg; }
			n += 1;
		}
	}
	
}

function main()
{
	var key = event.keyCode;
	if(game_status == 1)
	{
		
		
		if (motion == 0)
		{
			motion = 1;
			play(speed);
		}
		else if(key == 13)
		{
			pause();
		}
		if(key != 13 || motion == 0)
		{
			elem = document.getElementById("obj");
			var marg = "0px";
			if (pos == 0)
			{
				pos = 1;
			}
			else if(pos == 1)
			{
				marg = "200px";
				pos = 0;
			}
			score += 10;
			selem = document.getElementById("score");
			selem.innerText = "Score: " + score;
			//lvlem = document.getElementById("lvl");
			//lvlem.innerText = "Level " + lvl;
			elem.style.marginTop = marg;
			var dat = new Date();	
			var n = (Math.ceil(Math.random() * 10) + (dat%113)%31)% 3;
		}
	}
	else if(game_status == 0)
	{
		alert("Чтобы начать заново, перезагрузите страницу");
		/*
		for(var i = 0; i < sticks.length; i++)
		{
			t = document.getElementById(sticks[i]["id"]);
			t.style.marginLeft = (parseInt(sticks[i]["dist"])+ 300) +"px";
		}
		game_status = 1;
		path = 0;
		motion = 0;
                                n = 0;
		*/
	}
	else if(game_status == 2)
	{
		if(key == 13)
		{ pause();}
		else
			alert("Чтобы продолжить, снимите игру с паузы");
	}
	//elem.style.background = "black";
}

function pause()
{
	if(game_status == 1)
	{
		game_status = 2;
	}
	else if(game_status == 2)
	{
		game_status = 1;
	}
}
