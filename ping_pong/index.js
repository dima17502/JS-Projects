
/*	
  Author: Dimetriy Volkov

*/


var left1_on = 0;
var right1_on = 0;
var left2_on = 0;
var right2_on = 0;
var game_status = -1;
var stick_size = 150;
var x1 = 250;
var x2 = 250;
var x0 = 300;
var y0 = 50; 
var x = x0;
var y = y0;
var stl1 = 0;
var str1 = 0;
var step = 1;
var stepX0 = 5;
var ballStepX = 1;
var ballStepY = 1;
var bounce = 0;
var maxx = 671;
var maxy = 660;
var speed = 2;
var dirnum = 1;
var new_round = 1;
var speed_ball = 15;
var ball_size = 30;
var n = 0;
var ball_x_dir = 1;
var ball_y_dir = 1;
var dirs = 15;
var max_coef = 20;
var y0_coef = (new Date())%12+5;
var x0_coef = max_coef - y0_coef;
var x_coef = x0_coef;
var x_sign = Math.pow(-1 , (new Date()) % 2);
var y_sign = 1;
var gap2 = 20;
var y_coef = y0_coef;
var level = 1;
var level_coef = 4;
var max_level = 3;
var max_score = 5;
var coef = 10;
var player1 = 0;
var player2 = 0;
var error = 10;
var dat = new Date();
var randval = dat % 10 + 1;
var chance = 0; 


function chlvl(lvl)
{
	game_status = 1;
	level = lvl;
	if(lvl == 3)
	{
		max_coef = 22;
		gap2 = 30;
		gap1 = 50;
	}
	else if(lvl == 2)
	{
		max_coef = 20;
		gap2 = 32;
		gap1 = 50;
	}
	else if(lvl == 1)
	{
		max_coef = 19;
		gap2 = 30;
		gap1 = 50;
	}
	el1 = document.getElementById("levels");
	el2 = document.getElementById("out");
	el1.style.display = "none";
	el2.style.display = "block";
	main();
}

function main()
{
	balls = document.getElementById("ball");
	balls.style.marginLeft = x + "px";
	balls.style.marginTop = y + "px";
	
	var u = 0;
	while(u < 10)
	{
		right1_on = 1;
		moveright1();
		
		left1_on = 1;
		moveleft1();
		
		u += 1;
	}
	left1_on = 0;
	right1_on = 0;
	left2_on = 0;
	right2_on = 0;
	
	play_ball();
	restart();	

}

function play_ball()
{
	
	while (n < 1 && (game_status == 1)){
		var st = setInterval(move_ball, speed_ball);
		n += 1;
	}
}
function move_ball()
{
	
	if(game_status == 1)
	{
	//alert([x, y, x_coef]);
	
	balls = document.getElementById("ball");
	x = parseInt(balls.currentStyle.marginLeft);
	y = parseInt(balls.currentStyle.marginTop);
	if(Math.abs(x - maxx) < 20)
	{
		x_coef = (-1)*Math.abs(x_coef);	
	}
	else if(x < 5)
	{
		x_coef = Math.abs(x_coef);
	}
	if(y < 15)
	{
		if((x > x2 + stick_size) || (x2 > x + ball_size ))
		{
			game_status = 2;
			new_round = 1;
			player1 += 1;
			elem = document.getElementById("score");
			elem.innerText = "Score: " + player1+" : "+player2;
			//alert([x, x1,x2, y, x_coef, y_coef, coef]);
			if(player1 == max_score)
			{
				alert("Player1 win");
				game_status = 0;
			}
			else
				restart();
		}
		else{
			if(y_coef < 0)
				y_coef *= -1;
			if( (x  > x2 + stick_size / 2) && (x_coef < 0))
			{
				x_coef *= -1;
			}
			else if(x + ball_size < x2 +stick_size / 2 && x_coef > 0)
			{
				x_coef *= -1;
			}
			coef = (new Date()) % (max_coef - stepX0 - 5)  + stepX0 - 3;
			if(x_coef != 0)
				x_sign = Math.abs(x_coef) / x_coef;
			else
				x_sign = 1;
			if(y_coef != 0)
				y_sign = Math.abs(y_coef) / y_coef;
			else
				y_sign = 1;
			x_sign = Math.pow(-1 , (new Date()) % 2);
			x_coef = x_sign * coef;
			y_coef = y_sign * (max_coef - coef);
			//alert([x_coef, y_coef]);
			//alert([x, x1,x2, y, x_coef, y_coef, coef]);
		}
	}
	if(Math.abs(y -  maxy) <= 15)
	{
		dat = new Date();
		randval = dat % dirs + 1;
		if(randval > dirs - 3 -  (max_level + 1 - level) * level_coef)
			chance = 1;
		else
			chance = 0;
		//alert(randval);
		if((x > x1 + stick_size + 1.5* error) || (x1 > x + ball_size + 1.5*error ))
		{
			game_status = 2;
			new_round = 1;
			player2 += 1;
			elem = document.getElementById("score");
			elem.innerText = "Score: " + player1+" : "+player2;
			//alert([x, x1,x2, y, x_coef, y_coef, coef]);
			if(player2 == max_score)
			{
				alert("Player2 win");
				game_status = 0;
			}
			else
				restart();
		}
		else
		{
			if(y_coef > 0)
				y_coef *= (-1);
			if( (x  > x1 + stick_size / 2) && (x_coef < 0))
			{
				x_coef *= -1;
			}
			else if(x + ball_size < x1 +stick_size / 2 && x_coef > 0)
			{
				x_coef *= -1;
			}
		
			coef = Math.abs(Math.ceil((x1 + stick_size / 2 - x - ball_size /2) / 10));
			if(x_coef != 0)
				x_sign = Math.abs(x_coef) / x_coef;
			else
				x_sign = 1;
			if(y_coef != 0)
				y_sign = Math.abs(y_coef) / y_coef;
			else
				y_sign = 1;
			x_coef = x_sign * coef;
			y_coef = -1 * (max_coef - coef);
			//alert([x, x1,x2, y, x_coef, y_coef, coef]);
		}
	}
	x = x  +  ballStepX * x_coef;
	y = y + ballStepY * y_coef;
	elem = document.getElementById("stick2");
	
	/*
	if(x  < maxx - stick_size && x > gap1 + randval* 10)
	{
		x2 = x - randval * 10 + 5;
		elem.style.marginLeft = x2;
		
	}
	else if( x >= maxx - stick_size)
	{
		if(chance)
		{
			elem.style.marginLeft = maxx - stick_size - gap2;
			x2 = maxx - stick_size - gap2;
		}
		else
		{
			elem.style.marginLeft = maxx - stick_size;
			x2 = maxx - stick_size;
		}
	}
	else if (x < gap1 && x > 0)
	{
		if(chance)
		{
			elem.style.marginLeft = gap1;
			x2 = gap1;
		}
		else
		{
			elem.style.marginLeft = x;
			x2 = x;
		}	
	}
	*/
	if(x > 0 && x < maxx - stick_size + 32){
		if(x < gap1  && chance && y_coef < 0)
			x2 = gap1;
		else if (x > maxx - gap2 - stick_size  && chance && y_coef < 0)
			x2 = maxx - stick_size - gap2;
		/*
		else if( x > stick_size && x + ball_size < maxx)
		{
			tx2 = x - stick_size + randval * 10;
			x2 = tx2;
		}
		*/
		else
			x2 = x;
		elem.style.marginLeft = x2;
	}
	

	
	if(x < maxx - 1)
	{	balls.style.marginLeft = x + "px"; }
	else
	{	
		balls.style.marginLeft = (maxx - ball_size + 15) + "px"; 
		x = maxx - ball_size   + 15;
		if(x_coef > 0)
			x_coef *= -1;
	}
	//balls.style.marginTop = y + "px";
	
	if(game_status != 0)
	{
		
		if( y <= 10)
		{
			balls.style.marginTop = 11 + "px";
			y = 11;
			if(y_coef < 0)
				y_coef *= -1;
		}
		else if(y + 10 >  maxy){
			balls.style.marginTop = (maxy - 14) + "px";
			y = maxy - 14;
			if(y_coef > 0)
				y_coef *= -1;
		}
		else 
			balls.style.marginTop = y + "px";
	} 
		
	}
	
}
function restart()
{
	x = x0;
	y = y0;
	game_status = 2;
	bal = document.getElementById("ball");
	bal.style.marginTop = y0 + "px";
	bal.style.marginLeft = x0 + "px";
	t = new Date();
	y0_coef = (new Date())%12+5;
	x0_coef = Math.pow(-1 , (new Date()) % 2) * (max_coef - y0_coef);
	x_sign = Math.pow(-1 , (new Date()) % 2);
	x_coef = x0_coef;
	y_coef = y0_coef;
}
function action()
{
	if(game_status >= 0)
	{
	var key = event.keyCode;
	if(key == 32)
		{
			new_round = 0;
			if(game_status == 1)
			{
				game_status = 2;
			} 
			else if(game_status == 2)
			{
				game_status = 1;
				
			}
		}
	else if(game_status != 0)
	{
		elem1 = document.getElementById("stick1");
		var tmp = parseInt(elem1.currentStyle.marginLeft);
		elem2 = document.getElementById("stick2");
		var tmp2 = parseInt(elem2.currentStyle.marginLeft);
	
		if(key == 37)
		{
			
			left1_on = 1;
			moveleft1();
			
		}
		else if(key == 39)
		{
			right1_on = 1;
			moveright1();

		}

	}	
	}
}
function disaction(){
	//alert("1");
	
	var key = event.keyCode;
	if(key == 37)
	{	left1_on = 0;}
	if(key == 39)
	{	right1_on = 0;
	//alert("aaa");
	}
	if(key == 65)
	{	left2_on = 0;}
	if(key == 68)
	{	right2_on = 0;}
	
}

function moveright1()
{
	elem1 = document.getElementById("stick1");

	if(right1_on && x1 < maxx)
	{
		var n = 0;
		while (n < 1 && (game_status == 1) && right1_on && x1 < maxx){
			if(right1_on == 0){
				clearInterval(str1);
			}
			str1 = setInterval(mvr1, speed);
			
			n += 1;
		}
	}
}
function mvr1()
{
	if(right1_on != 0 && (x1+stick_size - 30) < maxx && (game_status == 1 || new_round))
	{
		elem1 = document.getElementById("stick1");
		elem1.style.marginLeft = (parseInt(elem1.currentStyle.marginLeft) + step) + "px";
		x1 += step;
	}
	else if(right1_on == 0){
		clearInterval(str1);
	}
}
function moveleft1()
{
	elem1 = document.getElementById("stick1");

	if(left1_on && x1 > 0)
	{
		var n = 0;
		while (n < 1 && (game_status == 1 || new_round) && left1_on && x1 > 0){
			if(left1_on == 0){
				clearInterval(stl1);
			}
			stl1 = setInterval(mvl1, speed);
			n += 1;
		}
	}
}
function mvl1()
{
	if(left1_on != 0&& x1 > 0 && (game_status == 1 || new_round))
	{
		elem1 = document.getElementById("stick1");
		elem1.style.marginLeft = (parseInt(elem1.currentStyle.marginLeft) - step) + "px";
		x1 -= step;
	}
	else if(left1_on == 0){
		clearInterval(stl1);
	}
}
function moveright2()
{
	
	elem1 = document.getElementById("stick2");

	if(right2_on && x2 < maxx)
	{
		var n = 0;
		while (n < 1 && (game_status == 1 || new_round) && right2_on && x2 < maxx){
			if(right2_on == 0){
				clearInterval(str1);
			}
			str2 = setInterval(mvr2, speed);
			
			n += 1;
		}
	}
}
function mvr2()
{
	if(right2_on != 0 && (x2+ stick_size - 30) < maxx && (game_status == 1 || new_round))
	{
		elem1 = document.getElementById("stick2");
		elem1.style.marginLeft = (parseInt(elem1.currentStyle.marginLeft) + step) + "px";
		x2 += step;
	}
	else if(right2_on == 0){
		clearInterval(str2);
	}
}
function moveleft2()
{
	elem1 = document.getElementById("stick2");

	if(left2_on && x2 > 0)
	{
		var n = 0;
		while (n < 1 && (game_status == 1 || new_round) && left2_on && x2 > 0){
			if(left2_on == 0){
				clearInterval(stl2);
			}
			stl2 = setInterval(mvl2, speed);
			n += 1;
		}
	}
}
function mvl2()
{
	if(left2_on != 0&& x2 > 0 && (game_status == 1 || new_round))
	{
		elem1 = document.getElementById("stick2");
		elem1.style.marginLeft = (parseInt(elem2.currentStyle.marginLeft) - step) + "px";
		x2 -= step;
	}
	else if(left2_on == 0){
		clearInterval(stl2);
	}
}
