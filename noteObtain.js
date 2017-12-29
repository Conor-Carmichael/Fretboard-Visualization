/* CODE TO CREATE SCALES, PATTERNS FOR DIFFERENT MODES **/
var whole_step  = 2;
var half_step   = 1;

var notes_arr = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var modes = ['MAJOR', 'DORIAN', 'PHRYGIAN', 'LYDIAN', 'MIXOLYDIAN', 'MINOR', 'LOCRIAN'];

//patterns for Ionian {modes derived from this}
var scale_pattern = [whole_step, whole_step, half_step, whole_step, whole_step, whole_step, half_step];

//patterns for pentatonics
var pattern_pent_maj=[whole_step, whole_step, half_step+whole_step, whole_step, whole_step+half_step];
var pattern_pent_min=[whole_step+half_step, whole_step, whole_step, whole_step+ half_step, whole_step]
var pattern_maj_min=[whole_step,half_step,half_step,whole_step,whole_step,half_step,whole_step]

var finalList={};
var index_list={};

/**
 * First rotate scale pattern to 
 * Second rotate notes_arr to root note
 * Remove steps if maj/min pentatonic
 * Use scale pattern to get notes in array
 * Calculate chords for each note in notes for scale
 * -Basic chords;-Jazz;-Intermediate;
 * add to respective lists in carousel
 *   
 */

 //Get pattern for the scale::
 function ModePattern(mode){
    var return_list = new Array(modes.length);
    //find the mode in hte modes list, need to rotate to that index
	var mode_index = modes.indexOf(mode);
    var i;
    
    switch (mode){
        case "MAJOR-PENT":
            return_list = pattern_pent_maj;
        case "MINOR-PENT":
            return_list =pattern_pent_min;
        case "MAJ-MIN-PENT":
            return_list =pattern_maj_min;
        default:
            for(i=0; i<scale_pattern.length; i++){
                //go from the mode index, until you hit the mode index again, adding the mod of it and the array
                return_list[i] = (scale_pattern[mode_index%scale_pattern.length]);
                mode_index++;
            }
    }
    return return_list;
    
}

//rotates notes array to start at root note
function RotateNotesArr(arr, elem){
    var ret_list = new Array(arr.length);
    var start_ind = arr.indexOf(elem);
    var i=0;
    while(i<arr.length){
        ret_list[i] = arr[start_ind%arr.length]
        i++;
        start_ind++;
    }
    return ret_list;
}
//returns scale from the notes array and pattrern
function GetScale(notes,pattern){
    var ret = new Array(pattern.length);
    ret[0] = notes[0];
    var prev=0;
    var i=0;
    while (i<pattern.length-1){
        ret[i+1] = notes[prev+pattern[i]];
        prev = prev+pattern[i];
        i++;
    }
    return ret;
}



function create_chord_JSON(root,mode){
    var relative_notes = RotateNotesArr(notes_arr, root);
    var relative_pattern = ModePattern(mode);
    var curr_scale = GetScale(relative_notes, relative_pattern); 
    
    var total_JSON = {
        scale:curr_scale,
        basic:{},
        inter:{},
        jazz:{}
    };
    
    //for loop temps
    var relative_notes_loop;
    var relative_pattern_loop;
    var curr_scale_loop;
    var chord;
    //loop each note in scale, check the chords per root note
    curr_scale.forEach(function(note){
        total_JSON.basic[note] = {};
        relative_notes_loop = RotateNotesArr(notes_arr, note);
        

        //loop basic chords: add chords to JSON iff they are in the original scale for the original root
        basic_function_names.forEach(function(f){
            chord = basic_chord_functions[f](relative_notes_loop);
            if(arrComp(curr_scale, chord)){
                total_JSON.basic[note][f] = chord;
            }
        });

        total_JSON.inter[note] = {};
        
        inter_function_names.forEach(function(f){
            chord= intermediate_chord_functions[f](relative_notes_loop);
            if(arrComp(curr_scale, chord)){
                total_JSON.inter[note][f] = chord;
            }
        });
        total_JSON.jazz[note]={};
        jazz_function_names.forEach(function(f){
            var chord = jazz_chord_functions[f](relative_notes_loop);
            if(arrComp(curr_scale, chord)){
                total_JSON.jazz[note][f] = chord;
            }
        });

    });
    return total_JSON;    
}







//use memoization? just get the relative list of all notes and use c-> including notes not in chords then no need for a lot of calcs

//gets pattern for a mode, bascially just rotates the array scale_pattern


//creates the scale given a root note and mode
//gets pattern from above, goes through notes_arr[] starting at the index of the root, going to the next step(whole/half) in the notes based off pattern



/**
 * Chords for basic chords, intermediate chords, jazz chords
 */
var basic_function_names = ["MajorChord","MinorChord"]
var basic_chord_functions={
    MajorChord:function(notes){
        return [notes[0],notes[4],notes[7]];
    },
    MinorChord:function(notes){
        return [notes[0],notes[3],notes[7]];
    }
}

var inter_function_names=["sus2Chord","sus4Chord","augmentedChord","diminishedChord", "add_nineChord"]
var intermediate_chord_functions = {
    sus2Chord : function(notes){
        return [notes[0],notes[2],notes[7]]
    },
    sus4Chord : function(notes){
        return [notes[0],notes[5],notes[7]]
    },
    augmentedChord : function(notes){
        return [notes[0], notes[4], notes[8]]
    },
    diminishedChord : function(notes){
        return [notes[0], notes[3], notes[6]]
    },
    add_nineChord : function(notes){
        return [notes[0], notes[4], notes[7], notes[2]] 
    }
}
var jazz_function_names=["Major7thChord"]
var jazz_chord_functions = {
    Major7thChord : function(notes){
        return [notes[0],notes[4],notes[7], notes[9]];
    }
}



function arrComp(scale, chord){
    for(var i=0;i<chord.length;i++){
        if(scale.indexOf(chord[i])===-1)
            return false;
    }
    return true;
}
