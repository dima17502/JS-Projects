/*
    Author: Dimetriy Volkov
 
*/

var move_key = 0;
var field = [];
var f_size = 16;
var f_width = 4;
var game_status = 1;
var score = 0;
var sum_num = 0;
var colors = {"": "white", 2: "#77f", 4: "#55f", 8: "#ff7", 16:"#f7f", 32: "#7f7",64:"#999",128:"#777",
		256: "#359", 512: "#f77", 1024:"#f55", 2048:"#f33", 4096:"#c72",8192:"#c5f", 16384: "#31f", 32768:"magenta",65536:"#a2e"};

function main()
{
	
	create_field();
	new_number();
	print_field();
}

function action()
{
	if(game_status == 1){
		move();
		if(move_key)
			new_number();
		print_field();
	}
}
function new_number()
{
	var count = 0;
	for(var ki = 0; ki < f_width; ki++)
		count += count_nums(ki + 1);
	if(count == f_size)
	{
		game_status = 0;
		alert("Game over");
	}
	else{
		var cid = gen_num(1);
		var num = gen_num(2);
		sum_num += num;
		elem = document.getElementById(cid);
		elem.innerText = num;
		field[cid - 1] = num;
	}
}
function create_field()
{
	for(var i = 0; i < f_size; i++)
	{	
		field.push(""); 
	}
}
function gen_num(mode)
{
	
	var d = new Date();
	var dtype = 1;
	var t = f_size
	if(mode == 2)
		t = 10;
	var p = Math.ceil(Math.random() * 100 + d % 113) % t + 1;
	if(mode == 1)
	{
		if(field[p-1] =="")
			return p;
		return gen_num(1);
	}
	if(p <= 6)
		return 2;
	if(p <= 9)
		return 4;
	return 2;

}

function move()
{
	
	var key = event.keyCode;
	move_key = 1;
	if(key == 37)
	{	
		move_left();
	}
	else if(key == 39)
	{	
		move_right();	
	}
	else if(key == 38)
	{	
		trans_matrix();
		move_left();

		trans_matrix();
		
	}
	else if(key == 40)
	{	
		trans_matrix();
		move_right();
		trans_matrix();
	}
	else
	{
		move_key = 0;
	}
	print_field();
}
function move_right()
{
	for(var line = 1; line <= f_width; line++)
		{	
			var lsize = count_nums(line);
			var temp = [];
			
			for(var i = 0; i < f_width; i++) 
			{	
				if(field[i + (line - 1) * f_width] != "")
					temp.push(field[i + (line - 1) * f_width]);
			}
			var t2 = temp;
			//alert(temp);
			if(lsize == 2)
			{
				if(temp[0] == temp[1])
				{
					score += temp[0];
					temp[0] = temp[0] + temp[1];
					temp.pop();
				}
			}
			else if(lsize == 3)
			{
				if(temp[2] == temp[1])
				{
					t2 = [temp[0], temp[2]*2];
					score += temp[2];
					temp = t2;
				}
				else if(temp[1] == temp[0])
				{

					t2 = [temp[0]*2,temp[2]];
					score += temp[0];
					temp = t2;
				}
			}
			else if(lsize == 4)
			{
				var a1 = (temp[3] == temp[2]);
				var a2 = (temp[1] == temp[2]);
				var a3 = (temp[1] == temp[0]);
				
				if(a1)
				{
					if(a3){
						t2 = [temp[0]*2,temp[2]*2];
						score += (temp[2] + temp[0]);
					}
					else
					{
						t2 = [temp[0],temp[1],temp[3]*2];
						score += temp[3];
					}
				}
				else if(a2)
				{
					t2 = [temp[0], temp[1]*2, temp[3]];
					score += temp[1];
				}
				else if(a3)
				{
					t2 = [temp[0]*2,temp[2],temp[3]];
					score += temp[0];
				}
				temp = t2;
			}
			
			for(var p = 0; p < f_width; p++)
			{
				elem = document.getElementById(f_width*(line-1)+p +1);
				if(p < f_width - temp.length)
				{
					elem.innerText = "";
					field[f_width*(line-1)+p] = "";
				}
				else
				{
					elem.innerText = temp[p - (f_width - temp.length)];
					field[f_width*(line-1)+p] = temp[p - (f_width - temp.length)];
					
				}
			}
			
		}
}

function move_left()
{
	for(var line = 1; line <= f_width; line++)
		{	
			var lsize = count_nums(line);
			
			var temp = [];
			for(var i = 0; i < f_width; i++) 
			{	
				if(field[i + (line - 1) * f_width] != "")
					temp.push(field[i + (line - 1) * f_width]);
			}
			var t2 = temp;
			//alert(temp);
			if(lsize == 2)
			{
				if(temp[0] == temp[1])
				{
					score += temp[0];
					temp[0] = temp[0] + temp[1];
					temp.pop();

				}
			}
			else if(lsize == 3)
			{
				if(temp[0] == temp[1])
				{
					score += temp[0];
					temp[0] = temp[0] + temp[1];
					t2 = [temp[0], temp[2]];
					temp = t2;
				}
				else if(temp[1] == temp[2])
				{
					score += temp[2];
					temp[1] = temp[1] + temp[2];
					t2 = [temp[0],temp[1]];
					temp = t2;
				}
			}
			else if(lsize == 4)
			{
				var a1 = (temp[0] == temp[1]);
				var a2 = (temp[1] == temp[2]);
				var a3 = (temp[2] == temp[3]);
				
				if(a1)
				{
					if(a3){
						t2 = [temp[0]*2,temp[2]*2];
						score += (temp[2] + temp[0]);
					}
					else
					{
						score += temp[0];
						t2 = [temp[0]*2,temp[2],temp[3]];
					}
				}
				else if(a2)
				{
					t2 = [temp[0], temp[1]*2, temp[3]];
					score += temp[1];
				}
				else if(a3)
				{
					score += temp[2];
					t2 = [temp[0],temp[1],temp[2]*2];
				}
				temp = t2;
			}
			
			for(var p = 0; p < f_width; p++)
			{
				elem = document.getElementById(f_width*(line-1)+p +1);
				if(p < temp.length)
				{
					elem.innerText = temp[p];
					field[f_width*(line-1)+p] = temp[p];
				}
				else
				{
					elem.innerText = "";
					field[f_width*(line-1)+p] = "";
				}
			}
			
		}
		
}
function trans_matrix()
{
	for(var ind1 = 0; ind1 < f_size; ind1++)
	{
		var j1 = ind1 % f_width;
		var i1 = Math.ceil((ind1 - j1) / f_width);
		
		var i2 = j1;
		var j2 = i1;
		
		var ind2 = i2 * f_width + j2;
		
		var tmp = field[ind1];
		if(i1 < j1)
		{
			field[ind1] = field[ind2];
			field[ind2] = tmp;
		}
	}
}
function print_field()
{
	sc  = document.getElementById("sum");
	sc.innerText = "Sum: "+ sum_num;
	sc2  = document.getElementById("score");
	sc2.innerText = "Score: "+ score;
	for(var ind1 = 0; ind1 < f_size; ind1++)
	{
		elem = document.getElementById(ind1 + 1);
		
		if(field[ind1] >= 1024)
		{
			elem.style.fontSize = "1.7em";

			
		}
		
		else if(field[ind1] >= 128)
		{
			
			elem.style.paddingTop = "30px";
			elem.style.paddingLeft = "30px";
		}
		else if(field[ind1]>= 16)
		{
			elem.style.paddingTop = "30px";
			elem.style.paddingLeft = "40px";
		}
		else
		{
			elem.style.paddingTop = "30px";
			elem.style.paddingLeft = "50px";
			elem.style.fontSize = "2.7em";
		}
		elem.innerText = field[ind1];
		elem.style.background = colors[field[ind1]];
	}
}
function count_nums(line)
{
	var count = 0;
	for(var i = 0; i < f_width; i++) 
	{	
		if(field[i + (line - 1) * f_width] != "")
			count += 1;
	}
	return count;
}
