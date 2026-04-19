/*
	AUTHOR: 	Henrik Oddløkken

							T A B L E   OF   C O N T E N T S



*/

/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------*/
/* 					V A R I A B L E S   D E C L R A T I O N
/*---------------------------------------------------------------------------*/

var intervalWidth = 50 * 7 + 20;
var mobileW = 720;

/*---------------------------------------------------------------------------*/
/* 								F U N C T I O N S
/*---------------------------------------------------------------------------*/

function initPosition()
{

	$('#pianoContainer').css('width', intervalWidth * OCTAVES + 'px');

	if( $(window).width() > mobileW )
		centerElem( $('#pianoContainer') );
	else
		$('#pianoContainer').css('left',0);
}

function initialize()
{
	for(var i = 0; i < keys.length; i++)
	{
		keys[i].renderHtml();					// Render Key in HTML.
	}

	initPosition();

	MIDI.loadPlugin({
		soundfontUrl: "libs/MIDI.js-master/examples/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			MIDI.setVolume(0, 127);
			$('#loadingState').fadeOut();
		}
	});
}

function centerElem(elem)
{
	elem.css
	({
		'top':  $(window).height() / 2 - elem.outerHeight(true) / 2,
		 'left': $(window).width() / 2 - elem.outerWidth(true) / 2
 	})
}

$(document).ready(function()
{

/*---------------------------------------------------------------------------*/
/* 						 W I N D O W   F U N C T I O N S
/*---------------------------------------------------------------------------*/

$(window).load(function()
{
	initialize();
});

$(window).resize(function()
{
	initPosition();
});

/*---------------------------------------------------------------------------*/
/* 						 				U S E R   I N T E R A C T I O N
/*---------------------------------------------------------------------------*/

$(document).on('keydown keyup', function(event)
{
	var key = event.which;
	var io  = event.type=="keydown" ? 0 : 1; // "0"if keydown; "1" if keyup

	switch(key)
	{
		case 81:
		(io) ? keys[0].releaseKey() : keys[0].playKey();  	break;	// C.
		case 50:
		(io) ? keys[1].releaseKey() : keys[1].playKey(); 		break;	// C#.
		case 87:
		(io) ? keys[2].releaseKey() : keys[2].playKey(); 		break;	// D.
		case 51:
		(io) ? keys[3].releaseKey() : keys[3].playKey(); 		break;	// D#.
		case 69:
		(io) ? keys[4].releaseKey() : keys[4].playKey(); 		break;	// E.
		case 82:
		(io) ? keys[5].releaseKey() : keys[5].playKey();		break;	// F.
		case 53:
		(io) ? keys[6].releaseKey() : keys[6].playKey(); 		break;	// F#.
		case 84: case 226:
		(io) ? keys[7].releaseKey() : keys[7].playKey(); 		break;	// G.
		case 54: case 65:
		(io) ? keys[8].releaseKey() : keys[8].playKey(); 		break;	// G#.
		case 89: case 90:
		(io) ? keys[9].releaseKey() : keys[9].playKey(); 		break;	// A.
		case 55: case 83:
		(io) ? keys[10].releaseKey() : keys[10].playKey(); 	break;	// A#.
		case 85: case 88:
		(io) ? keys[11].releaseKey() : keys[11].playKey(); 	break;	// B.

		case 67: case 73:
		(io) ? keys[12].releaseKey() : keys[12].playKey();  break;	// C.

		case 70: case 57:
		(io) ? keys[13].releaseKey() : keys[13].playKey(); 	break;	// C#.

		case 86: case 79:
		(io) ? keys[14].releaseKey() : keys[14].playKey(); 	break;	// D.

		case 71: case 48:
		(io) ? keys[15].releaseKey() : keys[15].playKey(); 	break;	// D#.
		case 66: case 80:
		(io) ? keys[16].releaseKey() : keys[16].playKey(); 	break;	// E.
		case 78: case 221:
		(io) ? keys[17].releaseKey() : keys[17].playKey();	break;	// F.
		case 74: case 219:
		(io) ? keys[18].releaseKey() : keys[18].playKey(); 	break;	// F#.
		case 77: case 186:
		(io) ? keys[19].releaseKey() : keys[19].playKey(); 	break;	// G.
		case 75:
		(io) ? keys[20].releaseKey() : keys[20].playKey(); 	break;	// G#.
		case 188:
		(io) ? keys[21].releaseKey() : keys[21].playKey(); 	break;	// A.
		case 76:
		(io) ? keys[22].releaseKey() : keys[22].playKey(); 	break;	// A#.
		case 190:
		(io) ? keys[23].releaseKey() : keys[23].playKey(); 	break;	// B.
	}
})


$('#pianoContainer').delegate('.key','mousedown',function()
{
	var index = $('.key').index(this);
	keys[index].playKey();
})
.delegate('.key','mouseup', function()
{
	var index = $('.key').index(this);
	keys[index].releaseKey();
})
.delegate('.key','touchstart', function(e)
{
	e.preventDefault();
	var index = $('.key').index(this);
	keys[index].playKey();
})
.delegate('.key','touchend touchcancel', function(e)
{
	e.preventDefault();
	var index = $('.key').index(this);
	keys[index].releaseKey();
});



});// End doc ready.
