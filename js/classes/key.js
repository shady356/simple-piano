/*	Class Key
 *
 */
 var Key = function(id, noteName, noteNumber, octave)
 {
   this.id = id;
	 this.noteName	= noteName;           // The name of the key.
   this.noteNumber = noteNumber;        // The note number for the MIDI note sound.
   this.octave = octave;
   this.noteType  = "natural";          // Wheter the note is a natural or sharp.
   this.delay = 0;                      // Play one note every quarter second.
   this.velocity = 127;                 // How hard the note hits.
   this.flagNote = false;               // Flag the note if it's active.

	 this.playKey = function()
	 {
     if(!this.flagNote)
     {
        // Set visual effect:
       document.getElementsByClassName("key")[this.id].classList.add(this.noteType + 'Press');

       // Play the note:
       MIDI.noteOn(0, this.noteNumber, this.velocity, this.delay);
       this.flagNote = true;
    }
	 }

	 this.releaseKey = function()
	 {
     this.flagNote = false;

		 // Set visual effect:
      document.getElementsByClassName("key")[this.id].classList.remove(this.noteType + 'Press');

      // Release the note:
      MIDI.noteOff(0, this.noteNumber, this.delay + 0.25);
	 }

   this.setNoteType = function()
   {
     if( this.noteName.indexOf('s') > -1 )
       this.noteType = "sharp";
   }

   this.renderHtml = function()
   {
     var htmlClass = "key " + this.noteType;
     var displayName = this.noteName.replace('s', '#') + this.octave;

     if(this.noteName != "C" && this.noteName != "F")
       htmlClass += " keySqueeze";

     var htmlSpan = '<span class="noteName">' + displayName + '</span>' +
                    '<span class="keyLabel"></span>';

     $('#pianoContainer').append(
       '<div class="' + htmlClass + '">' + htmlSpan + '</div>'
      );
   }
 };

// Set keys:
var START = 3;                            // Start octave.
var END   = 4;                            // End octave.
var OCTAVES = (END +1) - START;           // Set number of octaves.

var startNoteNumber = 24 * (START-1);     // Get first note number.

var keys = [];                            // Array of Key objects:
var notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];

var counter = 0;

// InitKeys:
for(var i = 0; i < OCTAVES; i++)
{
  for(var j = 0; j < notes.length; j++)
  {
    var noteName   = notes[j];                    // The name of the note.
    var noteNumber = startNoteNumber + counter;   // The note number for the MIDI note sound.
    var octave     = i + START;                   // The octave.

    keys.push( new Key(counter, noteName, noteNumber, octave));

    keys[counter].setNoteType();
    counter++;
  }
}
