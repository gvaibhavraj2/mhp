window.onload = function()
{
	new_game();
	var button = document.querySelector('.interface .button');
  if(sessionStorage.s1||sessionStorage.s2){
 if(sessionStorage.s1===undefined){
  document.getElementById("s02").innerHTML=sessionStorage.s2;
                document.getElementById("w02").innerHTML=sessionStorage.w2;
                document.getElementById("p02").innerHTML=sessionStorage.p2; 
         document.getElementById("s01").innerHTML=0;
                document.getElementById("w01").innerHTML=0;
                document.getElementById("p01").innerHTML=0; 
}
else if(sessionStorage.s2===undefined){
document.getElementById("s01").innerHTML=sessionStorage.s1;
                document.getElementById("w01").innerHTML=sessionStorage.w1;
                document.getElementById("p01").innerHTML=sessionStorage.p1; 
         document.getElementById("s02").innerHTML=0;
                document.getElementById("w02").innerHTML=0;
                document.getElementById("p02").innerHTML=0; 
}

else{
        document.getElementById("s02").innerHTML=sessionStorage.s2;
                document.getElementById("w02").innerHTML=sessionStorage.w2;
                document.getElementById("p02").innerHTML=sessionStorage.p2; 
         document.getElementById("s01").innerHTML=sessionStorage.s1;
                document.getElementById("w01").innerHTML=sessionStorage.w1;
                document.getElementById("p01").innerHTML=sessionStorage.p1; 

}
}



 else{
 document.getElementById("s02").innerHTML=0;
                document.getElementById("w02").innerHTML=0;
                document.getElementById("p02").innerHTML=0; 
         document.getElementById("s01").innerHTML=0;
                document.getElementById("w01").innerHTML=0;
                document.getElementById("p01").innerHTML=0; 

}


	button.onclick = function()
	{
		event.preventDefault();
		common_button_action();
                
                
	}
}
var opened = [];
var gate_content = [];
var g_clicked=[];
var w=0,l=0;
var a=0,b=0,c=0,d=0,e=0,f=0;
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
                g_clicked.push(gate_no);
	}
	else
	{
		open_gate( document.querySelectorAll('.gates')[gate_no] );
                g_clicked.push(gate_no);
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
			g_content[i].innerHTML= '<img src="images/Car.png"/>';
			continue;
		}
		gate_content.push(0);
		g_content[i].classList.add('goat');
		g_content[i].innerHTML= '<img src="images/Goat.png"/>';
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
                        if(result=='won') {w=1;l=0;}
                        else{w=0;l=1;}
                        stats();
                        document.getElementById("s01").innerHTML=a;
                document.getElementById("w01").innerHTML=b;
                document.getElementById("p01").innerHTML=c;
                  document.getElementById("s02").innerHTML=d;
                document.getElementById("w02").innerHTML=e;
                document.getElementById("p02").innerHTML=f;
		}
	}
}
function reloadpage(){
     location.reload();
}
function displaybox(){
    document.querySelector(".rules").style.display='block';
    document.querySelector(".wrapper").style.opacity='0.4';
    document.querySelector(".play").addEventListener('click',function(){
        location.reload();

});
    event.preventDefault();
}

function stats(){
    if(typeof(Storage)!=="undefined")
  {
if(g_clicked[0] === g_clicked[1]){
  if (sessionStorage.s1)
    {
    sessionStorage.s1=Number(sessionStorage.s1)+1;
       if(w==1) sessionStorage.w1=Number(sessionStorage.w1)+1;
      
    }
  else
    {
    sessionStorage.s1=1;
    if(w==1) {sessionStorage.w1=1;}
else sessionStorage.w1=0;
              
       
    }
sessionStorage.p1=Number(sessionStorage.w1)*100/Number(sessionStorage.s1);
}

else{

if (sessionStorage.s2)
    {
    sessionStorage.s2=Number(sessionStorage.s2)+1;
       if(w==1) sessionStorage.w2=Number(sessionStorage.w2)+1;
      
    }
  else
    {
    sessionStorage.s2=1;
    if(w==1) sessionStorage.w2=1;
else sessionStorage.w2=0;
              
       
    }
sessionStorage.p2=Number(sessionStorage.w2)*100/Number(sessionStorage.s2);

}
if(!sessionStorage.w1){
sessionStorage.w1=0;
sessionStorage.p1=0;
}
if(!sessionStorage.w2){
sessionStorage.w2=0;
sessionStorage.p2=0;
}


a=sessionStorage.s1;
b=sessionStorage.w1;
c=sessionStorage.p1;
d=sessionStorage.s2;
e=sessionStorage.w2;
f=sessionStorage.p2;
  }
else
  {
  document.getElementById("total").innerHTML="Sorry, your browser does not support web storage...";
  }



}

