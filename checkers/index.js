/*
    Author: Dimetriy Volkov
	
*/

var desk_width = 897;
var desk_height = 897;
var cell_width = 111;
var cell_height = 111;
var cell1_color = "white";
var cell2_color = "black";
var check2_path = "../images/checker2.bmp";
var white_check_path = "url(../images/black_checker1.bmp)";
var black_check_path = "url(../images/green_checker.bmp)";
var white_queen_path =  "url(../images/white_queen.bmp)";
var black_queen_path =  "url(../images/black_queen.bmp)";
var desk_size = 64; 
var game_status = 0;
var black_checkers = [];
var white_checkers = [];
var queens = {"white":[],"black":[]};
var active_cell = 0;
function main()
{
	
	document.body.style.background  = "aaa";
	create_table();
	create_figures();
	create_new_game_btn();
	create_order_bar();
}

function create_order_bar()
{
	elem = document.createElement("div");
	elem.id = "blackMove";
	elem.style.position = "absolute";
	elem.style.marginLeft = "1000px";
	elem.style.marginTop = "50px";
	elem.style.width = "30px";
	elem.style.height = "30px";
	elem.style.background = "black";
	elem.style.visibility = "hidden";
	document.body.appendChild(elem);

	elem2 = document.createElement("div");
	elem2.id = "whiteMove";
	elem2.style.position = "absolute";
	elem2.style.marginLeft = "1000px";
	elem2.style.marginTop = "830px";
	elem2.style.width = "30px";
	elem2.style.height = "30px";
	elem2.style.background = "white";
	elem2.style.border = "3px solid black";
	elem2.style.visibility = "hidden";
	document.body.appendChild(elem2);
}
function create_table()
{
	desk = document.createElement("div");
	desk.style.width = desk_width + "px";
	desk.id = "desk";
	desk.style.height = desk_height + "px";
	desk.style.position = "absolute";
	desk.style.marginLeft = "50px";
	desk.style.marginTop = "0px";
	desk.style.border = "5px solid black";
	for(var  i = 0; i < desk_size; i++)
	{
		cell = document.createElement("div");
		cell.style.display = "inline";
		cell.style.height = cell_height;
		cell.style.width = cell_width;
		
		cell.id = i + 1;
		cell.onclick = cell_chosen;
		if((i + parseInt(i / 8))%2)
			cell.style.background = cell2_color;
			
		else
			cell.style.background = cell1_color;
		desk.appendChild(cell);
	}
	document.body.appendChild(desk);
	
}

function cell_chosen()
{
	var cell = "empty";
	elem = document.elementFromPoint(event.x, event.y);
	if((elem.id - 1 + parseInt((elem.id  - 1)/ 8))%2)
	{
		
		for(var i = 0; i < black_checkers.length;i++)
		{
			if(elem.id == black_checkers[i])
				cell = "black";
		}
		for(var i = 0; i < white_checkers.length;i++)
		{
			if(elem.id == white_checkers[i])
				cell = "white";
		}
		if(order == cell)
			active_cell = elem.id;
	}
	else{
		active_cell = 0;
	}
	//alert([active_cell, cell]);
	var res = check_beat();
	if(active_cell != 0 && cell == "empty" && move_valid(active_cell, elem.id))
	{
		var x1 = (active_cell - 1) % 8 + 1;
 		var x2  = (elem.id - 1) % 8 + 1;
		var y1 = parseInt((active_cell- x1) / 8+1);
		var y2 = parseInt((elem.id - x2) / 8+1);
		if(Math.abs(x1 - x2) == 2 && Math.abs(y1 - y2) == 2)
		{
			var x3 = parseInt((x1 + x2) /2);
			var y3 = parseInt((y1 + y2) /2);
			var cell3 = (y3 - 1) * 8 + x3;
			intercell = document.getElementById(cell3);
			//alert([intercell.style.background, order]);
			if(order == "white" && intercell.style.background == black_check_path 
			|| order == "black" && intercell.style.background == white_check_path)
			{
				intercell.style.background = "black";
				var temp = [];
				if(order == "white")
				{
					
					for(var i = 0; i < black_checkers.length; i++)
					{
						if(black_checkers[i] != cell3)
							temp.push(black_checkers[i]);
					}
					black_checkers = temp;
				}
				else if(order == "black")
				{
					for(var i = 0; i < white_checkers.length; i++)
					{
						if(white_checkers[i] != cell3)
							temp.push(white_checkers[i]);
					}
					white_checkers = temp;
				}
			}
			
		}
		alert([y2, order]);
		if(order == "white" && y2 == 1)
		{
			alert([y2, order]);
			elem.style.background = white_queen_path;
			queens[order].push(elem.id);
		}
		else if(order == "black" && y2 == 8)
		{
			elem.style.background = black_queen_path;
			queens[order].push(elem.id);
		}
		elem1 = document.getElementById(active_cell);
		elem.style.background = elem1.style.background;
		elem1.style.background = "black";
		var temp = [];
		var active_ch = black_checkers;
		if(order == "white")
			active_ch = white_checkers;
		for(var i = 0; i < active_ch.length; i++)
		{
			if(active_ch[i] != active_cell)
				temp.push(active_ch[i])
			temp.push(elem.id);
		}
		if(order == "white")
			white_checkers = temp;
		else	
			black_checkers = temp;
		// проверка можем ли еще бить, если да, то очередь хода не меняется, active_cell = elem.id
		active_cell = 0;
		if(order == "white")
			order = "black";
		else
			order = "white";
		update_order_bar();
		
	}
	/*
	if(player == "order")
	{
		clear_active();
		active_cell = event.id;
		
	}
	*/
}

function move_valid(cell1, cell2)
{
	/*
	var x1 = (cell1 - 1) % 8 + 1;
 	var x2  = (cell2 - 1) % 8 + 1;
	var y1 = parseInt((cell1 - x1) / 8+1);
	var y2 = parseInt((cell2 - x2) / 8+1);
	if(x1 == 1)
	{
		
		var c1 = parseInt(Math.abs(x
		if(y1 == 8)
		{
			if(x2 == 2 && y2 == 2 || x2 == 3 && y2 == 3
		}
		
	}
	*/
	return 1;
}
function check_beat()
{
	return 0;
}

function clear_active()
{
	
	if(active_cell != 0)
	{
		elem = document.getElementById(active_cell);
		/*
		if(order == "white")
			elem.style.background = "url(" + 
		*/
	}
}
function create_figures()
{
	
}

function create_new_game_btn()
{

	elem = document.createElement("div");
	elem.id = "newGame";
	elem.style.position = "absolute";
	elem.innerText = "Новая игра";
	elem.style.marginLeft = "1100px";
	elem.style.marginTop = "800px";
	elem.style.fontSize = "1.6em";
	elem.style.padding = "5px";
	elem.style.border = "3px solid blue";
	elem.onclick = start_new_game;
	elem.style.background = "white";
	document.body.appendChild(elem);
	
}

function start_new_game()
{
	game_status = 1;
	black_checkers = [];
	white_checkers = [];
	display_figures();
	order = "white";
	update_order_bar();
}

function update_order_bar()
{
	if(order == "white")
	{
		elem = document.getElementById("whiteMove");
		elem.style.visibility = "visible";
		elem2 = document.getElementById("blackMove");
		elem2.style.visibility = "hidden";
	}
	else if(order == "black")
	{
		elem = document.getElementById("blackMove");
		elem.style.visibility = "visible";
		elem2 = document.getElementById("whiteMove");
		elem2.style.visibility = "hidden";
	}
}

function display_figures()
{
	
	for(var i = 0; i < desk_size; i++)
	{
		elem = document.getElementById(i + 1);
		var temp = "black";
		if((i + parseInt(i / 8))%2 && i < 24)
		{
			temp = "url(" +"../images/green_checker.bmp" + ")";
			/*
			if(i == 17)
				temp = "url(" +"../images/active_green_checker.bmp" + ")";
			*/
			
			elem.style.background = temp;
			black_checkers.push(i + 1);
		}
		else if((i + parseInt(i / 8))%2 && i > 39)
		{
			
			temp = "url(" +"../images/black_checker1.bmp" + ")";
			//if(i == 40)
			//	temp = "url(" +"../images/active_white_checker.bmp" + ")";
			
			elem.style.background = temp;
			white_checkers.push(i + 1);
			
		}
		else if((i + parseInt(i / 8))%2)
		{
			elem.style.background = temp;
		}
	}
}
