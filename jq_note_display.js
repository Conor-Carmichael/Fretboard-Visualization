var color_counter=0;
var bebop;
var blues;
var totalJSON;
var set_numerals = false;

roman_numerals = ["I","II","III","IV","V","VI","VII"]

$(document).ready(function(){   

    $("[data-toggle='tooltip']").tooltip();
    if ($('#rn').is(":checked")){
        set_numerals=true;
    }

    $('#modeAndNoteSubmit').click(function(){
        clearBoard();
        var root = $('#notes').val();
        var scale_mode = $('#modes').val();
        totalJSON =  create_chord_JSON(root, scale_mode);
        showChords();

        addHeading(totalJSON.scale, totalJSON.scale[0], scale_mode)
        
        // appendKeys(objTemp);
        var temp = totalJSON.scale;
        removeSharps(temp);
        showNote(temp);        
    });

    //when clicking a chord, highlight it, dehighlight all first
    $(document).on('click','.chord',function(){
        dehighlight();
        var notes = $(this).text();
        notes = notes.split(": ")[1].split(",");
        removeSharps(notes);
        highlight(notes);
        
    });  
    $(document).on('dblclick','.chord',function(){
        var notes = $(this).text();
        addToProgression(notes);

    });  

    $("#play").on('click',function(){
        metronomeApp.toggle();
    });

    

    $("#clearBoard").click(function(){
        dehighlight();
        clearBoard();
        clearProgression();
    });    
});// END DOC READY


function showChords(){
    var n;
    totalJSON.scale.forEach(function(note){
        n=note.toString();
        for (chord in totalJSON.basic[n]){
            $("#basic-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+note+" "+chord.replace("Chord","")+": "+totalJSON.basic[note][chord]+"</button></li>")
        }
        for (chord in totalJSON.inter[n]){
            $("#intermediate-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+note+" "+chord.replace("Chord","")+": "+totalJSON.inter[note][chord]+"</button></li>")
        }
        for (chord in totalJSON.jazz[n]){
            $("#jazz-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+note+" "+chord.replace("Chord","")+": "+totalJSON.jazz[note][chord]+"</button></li>")
        }
    });    
}

function addHeading(scale, root, mode){
    $('h2').text(root+" "+mode+":");
    $('#scalePara').text(scale.toString());
}
function appendKeys(chordObj){
    for(var i=0;i<Object.keys(chordObj).length; i++){
        $('#chordsInScale').append("<li class='chordFromScale' id='"+chordObj[index_list[String(i)]]+"'>"+index_list[String(i)]+": "+chordObj[index_list[String(i)]]+"</li>");
//        $('#currentProgression').append("<li>"+index_list[String(i)]+": "+chordObj[index_list[String(i)]]+"</li>");

    }
}   




function clearBoard(){
    color_counter=0;
    $('#lowestring li').animate({opacity:0});
    $('#astring li').animate({opacity:0});
    $('#dstring li').animate({opacity:0});
    $('#gstring li').animate({opacity:0});
    $('#bstring li').animate({opacity:0});
    $('#highestring li').animate({opacity:0});
    $('#basic-chords li:not(:first)').remove();
    $('#intermediate-chords li:not(:first)').remove();
    $('#jazz-chords li:not(:first)').remove();
    
    $('#currentProgression').empty();
    $('h2').text("");
    $('#scalePara').text("");
    $('.E').css({'background':'#211f1d'});
    $('.A').css({'background':'#211f1d'});
    $('.D').css({'background':'#211f1d'});
    $('.G').css({'background':'#211f1d'});
    $('.B').css({'background':'#211f1d'});
}

function clearProgression(){
    $("#progression-chords").empty();
    $("#progression-chords").append("<li class='list-group-item active'>Your Chord Progression</li>")
}


function dehighlight(){
    removeSharps(notes_arr);
    for(var i=0;i<notes_arr.length;i++){
        $('.'+notes_arr[i]+'').css({'background':'rgba(220, 183, 36,1)'});
        $('.'+notes_arr[i]+'').css({'color':'white'});
        
    }
}

function highlight(notes){
    for(var i=0;i<notes.length;i++){
        if (i===0){
            $('.'+notes[i]+'').css({'background':'white'});
            $('.'+notes[i]+'').css({'color':'black'});
        }else{
            $('.'+notes[i]+'').css({'background':'#9D002C'});
        }    
    }
}

function addToProgression(notes){
    $("#progression-chords").append("<li class='list-group-item'>"+notes+"</li>");
}


function showNote(notes){
    for(var i=0;i<notes.length;i++){
            $('.'+notes[i]+'').animate({opacity:1});
            $('.'+notes[i]+'').css({'background':'rgba(220, 183, 36,1)'});
            if(set_numerals){
                $('.'+notes[i]+"").text(roman_numerals[i]);

            }
    }
}

function removeSharps(arr_){
    for(var c=0;c<arr_.length;c++){
        arr_[c]=arr_[c].replace(/#/g, "sharp");
    }
}

function addSharps(arr_){
    for(var c=0;c<arr_.length;c++){
        arr_[c]=arr_[c].replace(/sharp/g, "#");
    }
}

function outputUpdate(bpm){
    $("#bpmOutput").text(bpm);
    metronomeApp.setTempo(Number(bpm))
}


