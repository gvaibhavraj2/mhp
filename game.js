window.onload = function()
{
	new_game();
	var button = document.querySelector('.interface .button');
	button.onclick = function()
	{
		event.preventDefault();
		common_button_action();
	}
}
var opened = [];
var gate_content = [];
function gate_clicked( gate_no )
{
	var ordinal = ['First', 'Second', 'Third'];
	goat_gate = '';
	if( opened.length === 0 )
	{
		//first choice
		for(var i = 0; i < 3; i++ )
		{
			if( i != gate_no && gate_content[i] === 0 )
				goat_gate = i;
		}
		var msg = 'You have choosen the '+ordinal[gate_no]+' gate. Let me show you what\'s there in '+ordinal[goat_gate]+' Gate';
		set_button_text('Show');
		set_instruction(msg);
		display_msg();
		document.querySelector('.button').addEventListener('click', extra1, null);
	}
	else
	{
		open_gate( document.querySelectorAll('.gates')[gate_no] );
	}

}
function extra1()
{
	open_gate( document.querySelectorAll('.gates')[goat_gate]);
}
function new_game()
{
	var car = parseInt( Math.random() * 3 );
	var g_content = document.querySelectorAll('.gates .g_content');
	for( var i = 0; i < 3; i++ )
	{
		if( i === car )
		{
			gate_content.push(1);
			g_content[i].classList.add('car');
			g_content[i].textContent = 'Car';
			continue;
		}
		gate_content.push(0);
		g_content[i].classList.add('goat');
		g_content[i].textContent = 'Goat';
	}
}
function common_button_action()
{
	document.querySelector('.three_gates').style.opacity = 1;
	document.querySelector('.interface').style.display = 'none';
}
function display_msg()
{
	document.querySelector('.three_gates').style.opacity = .65;
	document.querySelector('.interface').style.display = 'block';
}
function set_button_text( text )
{
	document.querySelector('.interface .button').textContent = text;
}
function set_instruction( text )
{
	document.querySelector('.interface .instructions').textContent = text;
}
function open_gate( selector )
{
	opened.push(selector);
	var ani_time = .3;
	setTimeout( clipping, ani_time * 1000);
	setTimeout(extra, ani_time * 1000 + 1000);
	selector.children[0].style.webkitTransform = 'scale(0)';
	function clipping()
	{
		selector.children[1].style.display = 'block';
		selector.children[1].classList.add('clip_ani');
	}
	function extra()
	{
		if( opened.length ===1 )
		{
			var msg = 'Now would you like to alter your choice?';
			set_instruction(msg);
			set_button_text('Choose');
			display_msg();
			document.querySelector('.button').removeEventListener('click', extra1, null);
		}
		else if( opened.length ===2 )
		{
			var result = (selector.children[1].classList.contains('car'))?'won':'lose';
			var msg = 'You '+result;
			document.querySelector('.interface .info').innerHTML = '<p class="result '+result+'">'+msg+'</p>';
			display_msg();
		}
	}
}