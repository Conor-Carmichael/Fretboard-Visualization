var bebop;
var blues;
var totalJSON;
var showing_numerals = false;
var current_scale=null;
var stop=false;
current_progression= new Array(4);
var prog_count=0;
var metronomeSoundOne = new Audio("./Assets/Ping Hi.wav");
var metronomeSoundTwo = new Audio("./Assets/Ping Low.wav");

// for (var i=0;i<4;i++){
//     current_progression[i];
// }

roman_numerals = ["I","II","III","IV","V","VI","VII"]

$(document).ready(function(){   
    $("[data-toggle='tooltip']").tooltip();

    $('#rn').click(function(){
        if(showing_numerals){
            showNote(current_scale);
            showing_numerals=false;
        }
        else if(current_scale !== null){
            showing_numerals=true;
            showNumerals(current_scale);
        }
         
    });

    $('#modeAndNoteSubmit').click(function(){
        if(showing_numerals){
            alert("Must switch off roman numerals.");
        }
        else{
            clearBoard();
            var root = $('#notes').val();
            var scale_mode = $('#modes').val();
            totalJSON =  create_chord_JSON(root, scale_mode);
            showChords();

            addHeading(totalJSON.scale, totalJSON.scale[0], scale_mode)
            
            // appendKeys(objTemp);
            var temp = totalJSON.scale;
            current_scale=temp;

            removeSharps(temp);
            showNote(temp);      
        }
          
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
        highlightMetronome();
        highlightNotes()
    });
    $("#pause").on('click',function(){
        stop = true;
    });
    

    $("#clearBoard").click(function(){
        if(showing_numerals){
            if(confirm("Must reload page to restore notes, remove numerals. Continue?"))
                location.reload();
        }
        else{
            current_progression=new Array(4);
            dehighlight();
            clearBoard();
            clearProgression();
        }
        
    });    
});// END DOC READY


function formattedStr(str){
    str= str.replace("Chord", "");
    str = str.replace(/[_]/g, " ");
    return str;
}

function showChords(){
    var n;
    totalJSON.scale.forEach(function(note){
        n=note.toString();
        for (chord in totalJSON.basic[n]){
            $("#basic-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+note+" "+formattedStr(chord)+": "+totalJSON.basic[note][chord]+"</button></li>")
        }
        for (chord in totalJSON.inter[n]){
            $("#intermediate-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+note+" "+formattedStr(chord)+": "+totalJSON.inter[note][chord]+"</button></li>")
        }
        for (chord in totalJSON.jazz[n]){
            $("#jazz-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+note+" "+formattedStr(chord)+": "+totalJSON.jazz[note][chord]+"</button></li>")
        }
    });    
}

function addHeading(scale, root, mode){
    $('h2').text(root+" "+mode+":");
    addSharps(scale)
    $('#scalePara').text(scale.toString());
}
function appendKeys(chordObj){
    for(var i=0;i<Object.keys(chordObj).length; i++){
        $('#chordsInScale').append("<li class='chordFromScale' id='"+chordObj[index_list[String(i)]]+"'>"+index_list[String(i)]+": "+chordObj[index_list[String(i)]]+"</li>");
//        $('#currentProgression').append("<li>"+index_list[String(i)]+": "+chordObj[index_list[String(i)]]+"</li>");

    }
}   




function clearBoard(){
    current_scale=null;
    showing_numerals=false;
    color_counter=0;
    $('#lowestring li').animate({opacity:0});
    $('#astring li').animate({opacity:0});
    $('#dstring li').animate({opacity:0});
    $('#gstring li').animate({opacity:0});
    $('#bstring li').animate({opacity:0});
    if(!showing_numerals){
        $('#highestring li').animate({opacity:0});
        $('#basic-chords li:not(:first)').remove();
        $('#intermediate-chords li:not(:first)').remove();
        $('#jazz-chords li:not(:first)').remove();
    }
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

// function addArrays(){
    
//     return ret;
// }

function addToProgression(notes){
    addSharps(notes)
    // var a = notes.split(": ");
    // var a1 = a[1].split(",");
    // var x=[]
    // for(x in a1){
    //     x
    // }
    // // alert(Array.isArray(a1))   
    // // var temp = addArrays(current_progression, a1);
    // current_progression[prog_count++] = a1;
    // alert(current_progression);
    $("#progression-chords").append("<li class='list-group-item'>"+notes+"</li>");
}


function showNote(notes){
    for(var i=0;i<notes.length;i++){
        $('.'+notes[i]+'').animate({opacity:1});
        $('.'+notes[i]+'').css({'background':'rgba(220, 183, 36,1)'});
        if(showing_numerals){
            var temp = notes.slice()
            addSharps(temp)
            $('.'+notes[i]+"").text(temp[i]);
        }
    }
}

function showNumerals(notes){
    for(var i=0;i<notes.length;i++){
        $('.'+notes[i]+'').animate({opacity:1});
        $('.'+notes[i]+'').css({'background':'rgba(220, 183, 36,1)'});
        $('.'+notes[i]+"").text(roman_numerals[i]);
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

function highlightNotes(progression){
    var tempo = Number($("#set-bpm").val());
    var ms = (1/ (tempo/60))* 1000;
    dehighlight();
    showNote(progression[0]).delay(ms*4);
    showNote(progression[1]).delay(ms*4);
    showNote(progression[2]).delay(ms*4);
    showNote(progression[3]).delay(ms*4);
    highlightNotes(progression);
}

function highlightMetronome(){
    if(!stop){

        var tempo = Number($("#set-bpm").val());
        
        var ms = (1/ (tempo/60))* 1000;
        // alert(ms)
        metronomeSoundOne.play();
        $("#metr-square-1").animate({
            backgroundColor:'red',
            height:"+=4",
            width:"+=4"
        },0.5*ms).animate({
            backgroundColor:'white',
            height:"-=4",
            width:"-=4"
        },0.5*ms);
        $("#metr-square-2").delay(ms).animate({
            backgroundColor:'red',
            height:"+=4",
            width:"+=4"
        },0.5*ms).animate({
            backgroundColor:'white',
            height:"-=4",
            width:"-=4"
        },0.5*ms);

        $("#metr-square-3").delay(2*ms).animate({
            backgroundColor:'red',
            height:"+=4",
            width:"+=4"
        },0.5*ms).animate({
            backgroundColor:'white',
            height:"-=4",
            width:"-=4"
        },0.5*ms);

        $("#metr-square-4").delay(3*ms).animate({
            backgroundColor:'red',
            height:"+=4",
            width:"+=4"
        },0.5*ms).animate({
            backgroundColor:'white',
            height:"-=4",
            width:"-=4"
        },0.5*ms, function(){
            
            highlightMetronome()
        });
    }
    else{
        stop=false;
    }

}

