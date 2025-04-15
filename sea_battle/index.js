/*
    Author: Dimetriy Volkov
*/

var lvl = 1;
var turn = 2;
var field = [];
var comp_field = [];
var field_size = 100;
var think_time = 500;
var cells_in_row = 10;
var cell_height = 40;
var cell_width = 40;
var field_height = 405;
var field_width = 406;
var start_x1 = 15;
var start_x2 = 560;
var start_y = 220;
var game_status = 0;
var oneship = 4;
var emptyColor = "aaa";
var twoship = 3;
var thrship = 2;
var fourship = 1;
var ship_chosen = 0;
var ship_active = 0;
var turned = 0;
var shipcount = [4,3,2,1];
var compShipCount = [4,3,2,1];
var user_ships = {};
var userColor = "55f";
var comp_ships = {};
var grey_cells = [];
var comp_moves = {};
var hitColor = "f77";
var dieColor = "black";
function main()
{
	
	document.body.style.background = "ccc";
	document.body.onkeydown = keydown;
	random_button();
	create_button();
	write_turn();
	create_field(1);
	create_field(2);
	display_ships();
	fill_field();
	add_info();
	add_instruction();
}

function add_info()
{
	elem = document.createElement("div");
	elem.id = "info";
	elem.style.border = "3px solid black";
	elem.style.background = "white";
	elem.innerText = "◙◙◙◙ - " + compShipCount[3]+"\n◙◙◙  - " + compShipCount[2]+"\n◙◙    - " + compShipCount[1]+"\n◙      - " + compShipCount[0];
	elem.style.position = "absolute";
	elem.style.display = "block";
	elem.style.padding = "3px";
	elem.style.fontSize = "2em";
	elem.style.marginTop = "650px";
	elem.style.marginLeft = "600px";
	document.body.appendChild(elem);
}

function add_instruction()
{
	elem = document.createElement("div");
	elem.style.position = "absolute";
	elem.style.marginTop = "800px";
	elem.style.fontSize = "1.4em";
	elem.style.display = "block";
	elem.innerText = "Чтобы при установке повернуть корабль нажмите ↑ или ↓";
	document.body.appendChild(elem);
}
function write_turn()
{
	elem = document.createElement("div");
	elem.id = "nextMove";
	elem.innerText = "Следующий ход...";
	elem.style.border = "3px solid black";
	elem.style.padding = "5px";
	elem.style.position = "absolute";
	elem.style.marginLeft = "700px";
	elem.style.fontSize = "1.5em";
	elem.style.display = "none";
	elem.style.width = "200px";
	document.body.appendChild(elem);
}
function keydown()
{
	//alert(event.keyCode);
	var kc = event.keyCode;
	if(kc == 38 || kc == 40 || kc == 83 || kc == 87)
	{
		turn_ship();
	}
	
}
function fill_field()
{
	for(var i = 0; i < field_size; i++)
	{
		field.push(0);
		comp_field.push(0);
	}
}
function display_ships()
{
	elem = document.createElement("div");
	elem.id = "arsenal";
	elem.onclick = arsclicked;
	elem.style.position = "absolute";
	elem.style.display = "block";
	elem.style.marginTop = "10px";
	elem.style.height = "120px";
	elem.style.width = "500px";
	elem.style.border = "3px solid black";
	elem.style.background = "white";
	elem.style.padding = "10px";
	document.body.appendChild(elem);
	
	el4 = document.createElement("div");
	el4.style.position = "absolute";
	el4.id = "ars4";
	el4.style.display = "inline";
	el4.style.marginLeft = "0px";
	el4.style.marginTop = "0px";
	elem.appendChild(el4);
	draw_ship(4);
	el3 = document.createElement("div");
	el3.style.display = "inline";
	el3.id = "ars3";
	el3.style.position = "absolute";
	elem.appendChild(el3);
	el3.style.marginLeft = "260px";
	el3.style.marginTop  = "0px";
	draw_ship(3);
	el2 = document.createElement("div");
	el2.style.position = "absolute";
	el2.style.display = "inline-block";
	el2.id = "ars2";
	
	elem.appendChild(el2);
	el2.style.marginTop = "60px";
	
	draw_ship(2);
	el1 = document.createElement("div");
	el1.id = "ars1";
	//el1.style.display = "inline";
	el1.style.marginLeft = "260px";
	
	el1.style.position = "absolute";
	el1.style.marginTop = "60px";
	elem.appendChild(el1);
	/*
	turn = document.createElement("div");
	turn.innerText = "Повернуть";
	turn.style.display = "block";
	turn.style.position = "absolute";
	turn.style.fontSize = "1.2em";
	turn.style.border = "1px solid blue";
	turn.style.background = "blue";
	turn.style.color = "white";
	turn.style.width = "60px";
	turn.style.height = "30px";
	turn.style.padding = "7px"
	turn.style.marginLeft = "380px";
	turn.style.marginTop = "60px";
	turn.onclick = turn_ship;
	elem.appendChild(turn);
	*/
	draw_ship(1);	
}

function turn_ship()
{
	
	if(turned)
		turned = 0;
	else
		turned = 1;
	if(ship_chosen != 0)
	{
		elem = document.getElementById(ship_chosen);
		if(turned)
			elem.style.width = "50px";
		else
			elem.style.width = "auto";
	}
}
function arsclicked()
{
	if(ship_chosen != 0 && ship_active == 1)
	{
		//alert(ship_chosen);
		elem = document.getElementById(ship_chosen);
		

		if(ship_chosen == "ars3")
		{
			elem.style.marginLeft = "260px";
			elem.style.marginTop = "0px";
		}
		else if(ship_chosen == "ars2")
		{
			elem.style.marginTop = "60px";
			
			elem.style.marginLeft = "0px";
		}
		else if(ship_chosen == "ars1")
		{
			elem.style.marginLeft = "260px";
			elem.style.marginTop = "60px";
		}
		else
		{
			elem.style.marginLeft = "0px";
			elem.style.marginTop = "0px";
		}
		ship_chosen = 0;
		ship_active = 0;
		elem.style.width = "auto";
	}
	else if(ship_chosen != 0 && ship_active == 0)
	{
		ship_active = 1;
	}
	
}
function draw_ship(size)
{
	elems = document.getElementById("ars"+ size);
	for(var j = 0; j < size; j++)
	{
		
		celem = document.createElement("div");
		celem.style.display = "inline";
		celem.style.width = cell_width;
		celem.style.height = cell_height;
		celem.style.border = "2px solid black";
		celem.style.background = userColor;
		var val = "s" + size;
		celem.id = val + (j + 1);
		celem.onclick = choose;
		elems.appendChild(celem);	
	}
}
function mouse_move()
{
	if(ship_chosen != 0)
	{
		
		var tx = event.x;
		var ty = event.y;
		elem = document.getElementById(ship_chosen);
		//alert("x: " + tx + "y: " + ty + "s:" + ship_chosen);
		
		//alert(parseInt(elem.style.marginLeft));
		
		elem.style.marginLeft = tx - 40;
		elem.style.marginTop =  ty - 50;
		elem.style.visibility = "visible";
	}
}
function choose()
{
	
	if(ship_chosen == 0)
	{
		//alert(event.x + " y11: " + event.y);
		var tx = event.x;
		var ty = event.y;
		var cid = "ars";
		var margx1 = 25; //183
		var margy = 39; // 77			// y1 220 y2 620 x1 12 x2 413
		var margx2 = 285; // 403
		var margy2 = 100; // 137
		turned = 0;
		if(ty > 38 && ty < 78)
		{
			if(tx > 24 && tx < 184)
				cid += "4";
			else
				cid += "3";
		}	
		else if(tx > 24 && tx < 184)
			cid += "2";
		else
			cid += "1";
		//alert(cid);
		ship_chosen = cid;
		document.body.onmousemove = mouse_move;
	}
	else if(event.x > 12 && event.x < 413 && event.y > 220 && event.y < 620)
	{
		var tx = event.x;
		var ty = event.y;
		cid = parseInt((ty - start_y) / cell_height)*cells_in_row + parseInt((tx - start_x1) / cell_width)+1;
		
		cstr = new String (ship_chosen);
		var num = cstr.substr(ship_chosen.length - 1);
		var t = check_ship(cid,num,turned,field);
		
		//alert("t:" + t + "num:" + num+ " cid: " + cid);
				
		if(t && shipcount[num - 1] > 0)
		{
			shipcount[num - 1] -= 1;
			if(shipcount[num-1] == 0)
			{
				elem = document.getElementById("ars" + num);
				elem.style.visibility = "hidden";
			}
			if(turned == 0)
			{
				for(var i = 0; i < num; i++)
				{
					field[cid + i - 1] = 1;
					elem = document.getElementById(cid + i);
					elem.style.background = userColor;
					user_ships[cid + i] = [cid, num, turned];
				}
			}
			else
			{
				for(var i = 0; i < num; i++)
				{
					field[cid + i*10 - 1] = 1;
					elem = document.getElementById(cid + i*10);
					elem.style.background = userColor;
					user_ships[cid + i*10] = [cid, num, turned];
				}
			}
		}
		
	}
}

function check_ship(cid, num,turned, field)
{
	var t = (field[cid - 1] == 0);
	if(turned)
		{
			var c2 = (cid > 10);
			var f2 = (field[cid - 11] == 0);
			var f8 = (field[cid + 9] == 0);
			var f4 = (field[cid - 2] == 0);
			var f6 = (field[cid] == 0);
			var c8 = (cid + 10 <= 100);
			var c4 = (cid % 10 != 1);
			var c6 = (cid % 10 != 0) ;
			var f1 = (field[cid - 12] == 0);
			var f3 = (field[cid - 10] == 0)
			var f7 = (field[cid + 8] == 0);
			var f9 = (field[cid + 10] == 0);
			var f18 = (field[cid+19] == 0);
			var f28 = (field[cid + 29] == 0);
			var f38 = (field[cid + 39] == 0);
			var c1 = c2 && c4;
			var c3 = c2 && c6;
			var c7 = c4 && c8;
			var c9 = c8 && c6;
			var c18 = (cid + 20 <= 100);
			var c28 = (cid + 30 <= 100);
			var c38 = (cid + 40 <= 100);
			var c17 = c18 && c4;
			var c19 = c18 && c6;
			var c27 = c4 && c28;
			var c29 = c6 && c28;
			var c37 = c4 && c38;
			var c39 = c6 && c38;
			var f17 = (field[cid + 18] == 0);
			var f19 = (field[cid + 20] == 0);
			var f27 = (field[cid + 28] == 0);
			var f29 = (field[cid + 30] == 0);
			var f37 = (field[cid + 38] == 0);
			var f39 = (field[cid + 40] == 0);
			
			if(c1)
				t = t && f1;
			if(c2)
				t = t && f2;
			if(c3)
				t = t && f3;
			if(c4)
				t = t && f4;
			if(c6)
				t = t && f6;
			if(c7)
				t = t && f7;
			if(c8)
				t = t && f8;
			if(c9)
				t = t && f9;
			if(num >= 2)
			{
				t = t && c8;
				if(c17)
					t = t && f17;
				if(c19)
					t = t && f19;
				if(c18)
					t = t && f18;
			}
			if(num >= 3)
			{
				t = t && c18;
				if(c27)
					t = t && f27;
				if(c29)
					t = t && f29;
				if(c28)
					t = t && f28;
			}
			if(num >= 4)
			{
				t = t && c28;
				if(c37)
					t = t && f37;
				if(c39)
					t = t && f39;
				if(c38)
					t = t && f38;
			}
		}
		else
		{	
			var c21 = (cid % 10 != 1);
			var c23 = (cid % 10 > 0);
			var c24 = (cid % 10 < 9) && c23;
			var c25 = c23 && (cid % 10 < 8);
			var c26 = c23 && (cid % 10 < 7);
			var c12 = (cid > 10);
			var c11 = c21 && c12;
			var c13 = c12 && c23;
			var c14 = c12 && c24;
			var c15 = c12 && c25;
			var c16 = c12 && c26;
			var c32 = (cid + 10 <= 100);
			var c31 = c32 && c21;
			var c33 = c32 && c23;
			var c34 = c32 && c24;
			var c35 = c32 && c25;
			var c36 = c32 && c26;
			var f11 = (field[cid - 12] == 0);
			var f12 = (field[cid - 11] == 0);
			var f13 = (field[cid - 10] == 0);
			var f14 = (field[cid - 9] == 0);
			var f15 = (field[cid - 8] == 0);
			var f16 = (field[cid - 7] == 0);
			var f21 = (field[cid - 2] == 0);
			var f23 = (field[cid] == 0);
			var f24 = (field[cid +1] == 0);
			var f25 = (field[cid+2] == 0);
			var f26 = (field[cid +3] == 0);
			var f31 = (field[cid +8] == 0);
			var f32 = (field[cid +9] == 0);
			var f33 = (field[cid +10] == 0);
			var f34 = (field[cid + 11] == 0);
			var f35 = (field[cid + 12] == 0);
			var f36 = (field[cid + 13] == 0);
			
			if(c11)
				t = t && f11;
			if(c12)
				t = t && f12;
			if(c13)
				t = t && f13;
			if(c21)
				t = t && f21;
			if(c23)
				t = t && f23;
			if(c31)
				t = t && f31;
			if(c32)
				t = t && f32;
			if(c33)
				t = t && f33;
						if(num >= 2)
			{
				t = t && c23;
				if(c14)
					t = t && f14;
				if(c24)
					t = t && f24;
				if(c34)
					t = t && f34;
			}
			if(num >= 3)
			{
				t = t && c24;
				if(c15)
					t = t && f15;
				if(c25)
					t = t && f25;
				if(c35)
					t = t && f35;
			}
			if(num >= 4)
			{
				t = t && c25;
				if(c16)
					t = t && f16;
				if(c26)
					t = t && f26;
				if(c36)
					t = t && f36;
			}
		}
	return t;
}
function create_button()
{
	elem = document.createElement("div");
	
	elem.style.display = "block";
	elem.style.width = "150px";
	elem.style.marginTop = "700px";
	elem.style.background = "ff7";
	elem.style.border = "3px solid black";
	elem.style.color = "blue";
	elem.style.height = "20px";
	elem.style.fontSize = "1.6em";
	elem.id = "newGame";
	elem.onclick = new_game;
	elem.style.position = "absolute";
	elem.innerText = "NEW GAME";
	document.body.appendChild(elem);
	
	
}
function new_game()
{
	
	if(shipcount[0]+shipcount[1]+shipcount[2]+shipcount[3] != 0)
		alert("Не все корабли задействованы");
	else
	{
		game_status = 1;
		start_game();
	}
}


function start_game()
{
	gen_comp_field(compShipCount, comp_field, comp_ships, 2);
	/*
	+сгенерить comp_ships
	выводить последний сделанный компом ход
	надпись ваш ход
	у всех ячеек comp_field visibility : hidden
	в первом режиме комп играет рандомно
	*/
	elem = document.getElementById("nextMove");
	elem.style.display = "block";
	compShipCount = [4,3,2,1];
	shipcount = [4,3,2,1];
	setTimeout(play_round, think_time);
	//alert(turn);
}

function play_round()
{
	if(lvl == 1 && game_status == 1)
	{
		
		
		if(turn == 2)
		{
			var cid = easy_move();
			while(cid in comp_moves)
				cid = easy_move();
			comp_moves[cid] = 1;
			
			elt = document.getElementById("nextMove");
			elem = document.getElementById(cid);
			if(cid in user_ships && field[cid-1] != 2)
			{
				
				elt.innerText = "Ход компьютера";
				field[cid - 1] = 2;
				var cturned = user_ships[cid][2];
				var tnum = user_ships[cid][1];
				var hcid = user_ships[cid][0];
				//alert([cturned,tnum,hcid]);
				var step = 1;
				var flag = 0;
				if(cturned)
					step = 10;
				for(var u = 0; u < tnum; u++)
				{
					if(field[hcid + u * step] == 1)
						flag = 1;
				}
				if(flag)
					elem.style.background = hitColor;
				else
				{
					for(var u = 0; u < tnum; u++)
					{
						elem = document.getElementById(hcid + u*step);
						elem.style.background = dieColor;
					}
					//alert(shipcount);
					shipcount[tnum-1] -= 1;
					//alert(compShipCount);
					paint_spaces(hcid, tnum, cturned,1);
					if(shipcount[0] <= 0 && shipcount[1]  <= 0 && shipcount[2]  <= 0&&								shipcount[3] <= 0)
					{	
						alert("You lose!"); 		
						game_status = 0;
					}
				}
				
				setTimeout(play_round,think_time);
			}
			else if(field[cid-1]!=2)
			{
				elem.style.background = emptyColor;
				turn  = 1;
				elt.innerText = "Ваш ход";
				elt.style.background ="white";
			}
			
		}
		
	}
	//alert(game_status);
}
function easy_move()
{
	var d = (new Date()) % 101;
	var cid = d * parseInt(Math.random() * 100) % 100 + 1;
	return cid;
	
}
function random_button()
{
	
	elem = document.createElement("div");
	elem.innerText = "Random set";
	elem.style.fontSize = "1.5em";
	elem.id = "random";
	elem.style.padding = "5px";
	elem.style.border = "1px solid blue";
	elem.style.background = "white";
	elem.onclick = genUserSet;
	elem.style.width = "140px";
	elem.style.marginTop = "620px";
	elem.style.position = "absolute";
	elem.style.height = "30px";
	document.body.appendChild(elem);
}

function genUserSet()
{
	if(game_status == 0)
	{
		for(var i = 1; i < 5; i++)
		{
			elem = document.getElementById("ars" + i);
			elem.style.visibility = "hidden";
		}
		shipcount = [4,3,2,1];
		for(var i = 0; i < field.length; i++)
		{
			field[i] = 0;
			elem = document.getElementById(i + 1);
			elem.style.background = "white";
		}
		user_ships = {};
		gen_comp_field(shipcount, field, user_ships, 1);
		/*alert(field);
	
		for(var i in user_ships)
			alert(i);
	
		alert(comp_field);
		*/
	}
}

function gen_comp_field(compShipCount, comp_field, comp_ships, mode)
{
	var salt = 100;
	var color = userColor;
	if(mode == 2)
	{
		salt = 0;
		color = "f77";
	}
	
	while(compShipCount[0] +compShipCount[1] + compShipCount[2] + compShipCount[3] != 0)
	{
		
		var d = (new Date()) % 101;
		var cid = d * parseInt(Math.random() * 100) % 100 + 101;
		var cturned = ((d % 37) + parseInt(Math.random() * 100)) % 2;
		var cnum = 1;
		var ct = 0;
		if (compShipCount[3] > 0)
		{
			ct = check_ship(cid-100,4,cturned, comp_field);
			cnum = 4;
		}
		else if (compShipCount[2] > 0)
		{
			ct = check_ship(cid-100,3,cturned, comp_field);
			cnum = 3;
		}
		else if (compShipCount[1] > 0)
		{
			ct = check_ship(cid-100,2,cturned, comp_field);
			cnum = 2;
		}
		else if (compShipCount[0] > 0)
		{
			ct = check_ship(cid-100,1,cturned, comp_field);
			cnum = 1;
		}
		
		if(ct)
		{
			
			compShipCount[cnum-1] -= 1;
			for(var i = 0; i < cnum; i++)
			{
				var t = i;
				if(cturned)
					t = i * 10;
				comp_field[cid - 100 + t - 1] = 1;
				if(mode == 1)
				{
					elem = document.getElementById(cid - salt + t);
					elem.style.background = color;
				}
				/* неудачный эксперимент с visibility hidden
				
				if(mode == 2)
					elem.style.visibility = "hidden";
				*/
				comp_ships[cid -100+ t] = [cid - salt, cnum, cturned];
			}
			
		}	
				
	}
	
	
}
function clicked_cell()
{
	var ty = event.y;
	var tx = event.x;
	var marginx = start_x1;
	var cid = 0;
	if(tx >= start_x2)
	{
		marginx = start_x2;
		cid += 100;
	}
	cid += parseInt((ty - start_y) / cell_height)*cells_in_row + parseInt((tx - marginx) / cell_width)+1;
	
	if(game_status == 0 && cid < 101 && (field[cid-1]==1))
	{
		var tcid = user_ships[cid][0];
		var tnum = user_ships[cid][1];
		turned = user_ships[cid][2];
		for(var i = 0; i < tnum; i++)
		{
			var t = i;
			if(user_ships[cid][2])
				t = i * 10;
			field[tcid + t - 1] = 0;
			elem = document.getElementById(tcid + t);
			elem.style.background = "white";
			//user_ships[cid + t] = [cid, num, turned];
		}
		ship_chosen = "ars" + tnum;
		elem = document.getElementById(ship_chosen);
		if(user_ships[cid][2])
			elem.style.width = "50px";
		ship_active = 1;
		shipcount[tnum-1] += 1;
		//alert([tnum,tcid,cid,turned]);
		mouse_move();
		document.body.onmousemove = mouse_move;
	}
	else if(game_status == 1 && cid > 100)
	{
		
		if(turn == 2)
		{
			order_elem = document.getElementById("nextMove");
			order_elem.innerText = "Ход компьютера";
		}
		else
		{
			//alert(cid);
			elem = document.getElementById(cid);
			//for(var i in comp_ships)
			//	alert(i);
			if(cid - 100 in comp_ships && comp_field[cid - 101] != 2)
			{
				
				var hcid = comp_ships[cid-100][0];
				var tnum = comp_ships[cid-100][1];
				var cturned = comp_ships[cid-100][2];
				comp_field[cid - 101] = 2;
				var step = 1;
				var flag = 0;
				if(cturned)
					step = 10;
				for(var u = 0; u < tnum; u++)
				{
					if(comp_field[hcid - 101 + u * step] == 1)
						flag = 1;
				}
				if(flag)
					elem.style.background = hitColor;
				else
				{
					for(var u = 0; u < tnum; u++)
					{
						elem = document.getElementById(hcid + u*step);
						elem.style.background = dieColor;
					}
					compShipCount[tnum-1] -= 1;
					//alert(compShipCount);
					elem = document.getElementById("info");
					elem.innerText = "◙◙◙◙ - " + compShipCount[3]+"\n◙◙◙  - " + 					compShipCount[2]+"\n◙◙    - " + 					compShipCount[1]+"\n◙      - " + compShipCount[0];
					paint_spaces(hcid, tnum, cturned,2);
					if(compShipCount[0] + compShipCount[1] + compShipCount[2] + 						compShipCount[3] == 0)
					{	
						alert("You win!"); 		
						game_status = 0;
					}
				}
				turn = 1;
				order_elem = document.getElementById("nextMove");
				order_elem.innerText = "Ваш ход";
			}
			else if(comp_field[cid - 101] != 2 && check_grey(cid))
			{
				elem.style.background = emptyColor;
				grey_cells.push(cid);
				//alert(grey_cells);
				turn = 2;
				order_elem = document.getElementById("nextMove");
				order_elem.innerText = "Ход компьютера";
				setTimeout(play_round, think_time);
			}
			
		}
	}
	
}
function check_grey( cid )
{
	var t = 0;
	for(var i in grey_cells)
		if(grey_cells[i] == cid)
			t = 1;
	if(t)
		return 0;
	else
		return 1;
}
function paint_spaces(hcid,tnum,cturned, mode)
{
	var t_f = comp_field;
	var salt = 100;
	if(mode == 1)
	{
		t_f = field;
		salt = 0;
		hcid += 100;
	}
	var step = 1;
	if(cturned)
		step = 10;
	for(var i = 0; i < tnum; i++)
	{
		
		var tcid = hcid - 100 + i * step;
		var c1 = (tcid > 10);
		var c2 = (tcid % 10 != 1);
		var c3 = (tcid < 91);
		var c4 =  (tcid % 10 != 0);
	
		if(c1)
		{
			if(c1 && c2 && (t_f[tcid - 1 - 11] == 0))
			{
				elem = document.getElementById(tcid  + salt - 11);
				elem.style.background = emptyColor;
				grey_cells.push(tcid  + salt - 11);
				if(mode == 1)
				{
					comp_moves[tcid - 11] = 1;
					field[tcid - 12] = 2;
				}
			}
			if(t_f[tcid - 1 - 10] == 0)
			{
				elem = document.getElementById(tcid  + salt - 10);
				elem.style.background = emptyColor;
				grey_cells.push(tcid  + salt - 10);
				if(mode == 1)
				{
					comp_moves[tcid - 10] = 1;
					field[tcid - 11] = 2;
				}
			}
			if(c1 && c4 && (t_f[tcid - 10] == 0))
			{
				elem = document.getElementById(tcid  + salt - 9);
				elem.style.background = emptyColor;
				grey_cells.push(tcid  + salt - 9);
				if(mode == 1)
				{
					comp_moves[tcid - 9] = 1;
					field[tcid - 10] = 2;
				}
			}
		}
		if(c3)
		{
			if(c2 && c3 && (t_f[tcid - 1 + 9] == 0))
			{
				elem = document.getElementById(tcid  + salt + 9);
				elem.style.background = emptyColor;
				grey_cells.push(tcid  + salt + 9);
				if(mode == 1)
				{
					comp_moves[tcid +9] = 1;
					field[tcid +8] = 2;
				}
			}
			if(t_f[tcid - 1 + 10] == 0)
			{
				elem = document.getElementById(tcid  + salt + 10);
				elem.style.background = emptyColor;
				grey_cells.push(tcid  + salt + 10);
				if(mode == 1)
				{
					comp_moves[tcid + 10] = 1;
					field[tcid + 9] = 2;
				}
			}
			if(c4 && c3 && (t_f[tcid - 1 + 11] == 0))
			{
				elem = document.getElementById(tcid  + salt + 11);
				elem.style.background = emptyColor;
				grey_cells.push(tcid  + salt + 11);
				if(mode == 1)
				{
					comp_moves[tcid +11] = 1;
					field[tcid + 10] = 2;
				}
			}
		}
		if (c2 && (t_f[tcid - 1 - 1] == 0))
		{
			elem = document.getElementById(tcid  + salt- 1);
			elem.style.background = emptyColor;
			grey_cells.push(tcid  + salt - 1);
			if(mode == 1)
			{
					comp_moves[tcid - 1] = 1;
					field[tcid - 2] = 2;
			}
		}
		if (c4 && (t_f[tcid - 1 + 1 ] == 0))
		{
			elem = document.getElementById(tcid  + salt+ 1 );
			elem.style.background = emptyColor;
			grey_cells.push(tcid  + salt + 1);
			if(mode == 1)
			{
					comp_moves[tcid + 1] = 1;
					field[tcid] = 2;
			}
		}
	}
	

}
function create_field(fid)
{
	
	elem = document.createElement("div");
	elem.style.display = "block";
	elem.style.width = field_width;
	elem.style.background = "white";
	elem.style.height = field_height;
	elem.style.marginTop = "200px";
	
	if(fid == 2)
	{
		elem.style.border = "3px solid blue";
		elem.style.borderRight = "4px solid blue";
	}
	else
	{
		elem.style.marginLeft = field_width + 140;
		elem.style.border = "3px solid red";
		elem.style.borderRight = "4px solid red";
	}
	elem.style.position = "absolute";
	elem.id = "out"+fid;
	elem.style.float = "left";
	
	document.body.appendChild(elem);
	for(var i = 0; i < field_size; i++)
	{
		celem = document.createElement("div");
		celem.style.display = "inline";
		celem.style.width = cell_width;
		celem.style.height = cell_height;
		celem.style.border = "1px solid black";
		if(fid == 2)
			celem.id = i + 1;
		else
			celem.id = field_size + i + 1;
		var tmp = celem.id;
		celem.onclick = clicked_cell;
		elem.appendChild(celem);
	}
	
}
