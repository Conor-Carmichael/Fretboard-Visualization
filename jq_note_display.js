var color_counter=0;
var bebop;
var blues;
var total_JSON;

$(document).ready(function(){
    $( function() {
        $( "#chordsInScale, #currentProgression" ).sortable({
            connectWith: ".connectedSortable"
        }).disableSelection();
    } );
    

    $('#modeAndNoteSubmit').click(function(){
        clearBoard();
        $('#currentProgression').append("<li>Drag&Drop to Build \nProgressions Here:</li>");
        //get user input
        var root = $('#notes').val();
        var scale_mode = $('#modes').val();

        alert(JSON.stringify(create_chord_JSON(root,scale_mode)));

        //get chord and scale information as JSON
        total_JSON = create_chord_JSON(root,scale_mode)
        // var arr = scale_create(root,scale_mode);
        addHeading(total_JSON.scale, root, scale_mode);
        // var objTemp = chordsList(arr,scale_mode);
        
        appendKeys(objTemp);
        removeSharps(arr);
        showNote(arr);
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
    $('#chordsInScale').empty();
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
























