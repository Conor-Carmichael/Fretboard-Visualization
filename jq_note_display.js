var color_counter=0;
var bebop;
var blues;
var totalJSON;

$(document).ready(function(){
    $( function() {
        $( "#chordsInScale, #currentProgression" ).sortable({
            connectWith: ".connectedSortable"
        }).disableSelection();
    } );
    

    $('#modeAndNoteSubmit').click(function(){
        clearBoard();
        $('#currentProgression').append("<li>Drag&Drop to Build \nProgressions Here:</li>");
        var root = $('#notes').val();
        var scale_mode = $('#modes').val();
        totalJSON =  create_chord_JSON(root, scale_mode);
        showChords();

        addHeading(totalJSON.scale, totalJSON.scale[0], scale_mode)
        
        // appendKeys(objTemp);
        var temp = totalJSON.scale;
        removeSharps(temp);
        showNote(temp);
        //create chord list, append to ul on left of screen, make draggable into  list for timings and progressions
        
    });

    $(document).on('mouseenter','.chordFromScale',function(){
        var notes = $(this).attr('id').split(',');
        removeSharps(notes);
        highlight(notes);
    });
    $(document).on('mouseleave','.chordFromScale',function(){
        var notes = $(this).attr('id').split(',');
        removeSharps(notes);
        dehighlight(notes);
    });
    
    $(document).on('mouseenter','.chordFromScale',function(){
        var notes = $(this).attr('id').split(',');
        removeSharps(notes);
        highlight(notes);
    });
    
    
    
    
    
    $("#clearBoard").click(function(){
        clearBoard();
    });    
});// END DOC READY


function showChords(){
    var n;
    totalJSON.scale.forEach(function(note){
        n=note.toString();
        for (chord in totalJSON.basic[n]){
            $("#basic-chords").append("<li class='list-group-item'>"+note+" "+chord.replace("Chord","")+": "+totalJSON.basic[note][chord]+"</li>")
        }
        for (chord in totalJSON.inter[n]){
            $("#intermediate-chords").append("<li class='list-group-item'>"+note+" "+chord.replace("Chord","")+": "+totalJSON.inter[note][chord]+"</li>")
        }
        for (chord in totalJSON.jazz[n]){
            $("#jazz-chords").append("<li class='list-group-item'>"+note+" "+chord.replace("Chord","")+": "+totalJSON.jazz[note][chord]+"</li>")
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
    $('#inter-chords li:not(:first)').remove();
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


function dehighlight(notes){
    for(var i=0;i<notes.length;i++){
        $('.'+notes[i]+'').css({'background':'rgba(220, 183, 36,1)'});
    }
}

function highlight(notes){
    for(var i=0;i<notes.length;i++){
        $('.'+notes[i]+'').css({'background':'#9D002C'});
        
    }
}


function showNote(notes){
    for(var i=0;i<notes.length;i++){
            $('.'+notes[i]+'').animate({opacity:1});
            $('.'+notes[i]+'').css({'background':'rgba(220, 183, 36,1)'});
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
























