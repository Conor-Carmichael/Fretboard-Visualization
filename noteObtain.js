//ported code from og python script
/* CODE TO CREATE SCALES, PATTERNS FOR DIFFERENT MODES *************************************************************************************************************************************************************/
var notes_arr = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var notes_length = notes_arr.length;
var modes = ['MAJOR', 'DORIAN', 'PHRYGIAN', 'LYDIAN', 'MIXOLYDIAN', 'MINOR', 'LOCRIAN'];
var whole_step  = 2;
var half_step   = 1;
var scale_pattern = [whole_step, whole_step, half_step, whole_step, whole_step, whole_step, half_step];
var pentMaj=[]

var finalList={};
var index_list={};


//use memoization? just get the relative list of all notes and use c-> including notes not in chords then no need for a lot of calcs

//gets pattern for a mode, bascially just rotates the array scale_pattern
function modePattern(mode){
	var return_list = new Array(7);
	var mode_index = modes.indexOf(mode);
    var i;
    for(i=1; i<scale_pattern.length; i++){
        return_list[i] = (scale_pattern[mode_index%scale_pattern.length]);
		mode_index++;
    }
//    alert(return_list);
	return return_list;
}

//creates the scale given a root note and mode
//gets pattern from above, goes through notes_arr[] starting at the index of the root, going to the next step(whole/half) in the notes based off pattern
function scale_create(root, mode){
    if(mode === 'MAJOR-PENT'){
        var realMode='MAJOR';
        var pattern = modePattern(realMode);
        var note_index = notes_arr.indexOf(root);
        var notes_return=new Array(scale_pattern.length);
        notes_return[0] = root;
        var i;
        for(i=1; i<pattern.length ; i++){
            note_index += pattern[i];
            notes_return[i] = notes_arr[note_index%notes_arr.length];
        }
        var majorArr=[notes_return[0],notes_return[1],notes_return[2],notes_return[4],notes_return[5]]
        return majorArr;
    }
    else if(mode==='MINOR-PENT'){
         var realMode='MINOR';
        var pattern = modePattern(realMode);
        var note_index = notes_arr.indexOf(root);
        var notes_return=new Array(scale_pattern.length);
        notes_return[0] = root;
        var i;
        for(i=1; i<pattern.length ; i++){
            note_index += pattern[i];
            notes_return[i] = notes_arr[note_index%notes_arr.length];
        }
        var minorArr=[notes_return[0],notes_return[2],notes_return[3],notes_return[4],notes_return[6]]
        return minorArr;
    }
    else if(mode==='MAJ-MIN-PENT'){
        var maj = scale_create(root, 'MAJOR-PENT');
        var min = scale_create(root, 'MINOR-PENT');
        var combine = maj.concat(min);
        alert(combine);
        return combine;
        
    }
    else{
        var pattern = modePattern(mode);
        var note_index = notes_arr.indexOf(root);
        var notes_return=new Array(scale_pattern.length);

        notes_return[0] = root;
        var i;
        for(i=1; i<pattern.length ; i++){
            note_index += pattern[i];
            notes_return[i] = notes_arr[note_index%notes_arr.length];
        }
        return notes_return;
    }
}


/* START OF CHORD FUNCTIONS  *******************************************************************************************************************************************************************************************/
var chord_functions={
    //chords
    'maj_chord':function(scale){
        return [scale[0],scale[2],scale[4]];
    },
    'min_chord':function(scale){
        return [scale[0],notes_arr[notes_arr.indexOf(scale[2])-1],scale[4]];
    },
    'sus2_chord':function (scale){
        return [scale[0],scale[1],scale[4]];
    },
    sus4_chord:function(scale){
        return [scale[0],scale[3],scale[4]];
    },
    augmented_chord: function(scale){	
        return [scale[0],scale[2],notes_arr[(notes_arr.indexOf(scale[4])+1)%notes_length]];
    },
    diminished_chord:function(scale){
        return [scale[0],notes_arr[notes_arr.indexOf(scale[2])-1],notes_arr[notes_arr.indexOf(scale[4])-1]];
    },
    //seventh chords
    maj_seventh_chord:function(scale){
        return [scale[0],scale[2],scale[4], scale[6]];
    },
    min_seventh_chord:function(scale){
        return [scale[0],notes_arr[notes_arr.indexOf(scale[2])-1],scale[4], notes_arr[notes_arr.indexOf(scale[6])-1]];
    },
    seventh_chord:function(scale){ 	
        return [scale[0],scale[2],scale[4], notes_arr[notes_arr.indexOf(scale[6])-1]];
    },
    min_seventh_flat_five_chord:function(scale){	
        return [scale[0],notes_arr[notes_arr.indexOf(scale[2])-1],notes_arr[notes_arr.indexOf(scale[4])-1], notes_arr[notes_arr.indexOf(scale[6])-1]];
    },
    dim_seventh_chord:function(scale){
        return [scale[0],notes_arr[notes_arr.indexOf(scale[2])-1],notes_arr[notes_arr.indexOf(scale[4])-1], notes_arr[notes_arr.indexOf(scale[6])-2]];
    },
    //sixth chords
    sixth_chord:function(scale){
        return [scale[0],scale[2],scale[4], scale[5]];
    },
    min_sixth_chord:function(scale){
        return [scale[0],notes_arr[notes_arr.indexOf(scale[2])-1],scale[4], scale[6]];
    },
    //other
    add_nine_chord:function(scale){
        return [scale[0],scale[2],scale[4], scale[9%scale.length]];
    }
}
var chord_functions_array =['maj_chord', 'min_chord', 'sus2_chord', 'sus4_chord', 'augmented_chord', 'diminished_chord', 'maj_seventh_chord',
				'min_seventh_chord', 'seventh_chord', 'min_seventh_flat_five_chord', 'dim_seventh_chord', 'sixth_chord', 'min_sixth_chord', 'add_nine_chord'];



function arrComp(scale, chord){
    for(var i=0;i<chord.length;i++){
        if(scale.indexOf(chord[i])===-1)
            return false;
    }
    return true;
}
//----------------------------IF YOU ADD CHORDS ADD TO FUNCTIUONS AND CHORD LIST AT SAME PLACE__________________________________________________


function chordsList(initial_scale, mode){
    finalList={};
    index_list={};
    var added=0;
    for(var j=0;j<initial_scale.length;j++){    
        var curr_scale = scale_create(initial_scale[j],'MAJOR');
        for(var i=0;i<chord_functions_array.length;i++){
            var tempChord= chord_functions[chord_functions_array[i]](curr_scale);
            
            if(arrComp(initial_scale,tempChord)){
                var formatted_name = curr_scale[0]+" "+chord_name_toString(chord_functions_array[i]);
                finalList[formatted_name]=tempChord;
                index_list[added++]=formatted_name;
            }
        }
    }


    return finalList;
}


function chord_name_toString(chord){
    chord = chord.replace(/_/g, " ");
    chord = chord.replace(/chord/g, "");
    chord = chord.replace(/min/g, " Minor");
    chord = chord.replace(/maj/g, " Major");
    return chord;
}








