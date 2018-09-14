/**
 * These are the global variables for this file. Includes audo variables, roman numerals, boolean checks for features, and progression linked list
 * 
 * First is the on document ready functions, then all supporting functions. Bottom is metronome related.
 */
//TODO Seperate files based on logic, make file for variables, clean formatting.

//TODO: make sure all notes go back to white text on refresh etc

var bebop;
var blues;
var totalJSON;
var showing_numerals = false;
var current_scale=null;
var stop=false;
var playing = false;
var current_progression= new LinkedList(0,null,null);
var prog_count=0;
var metronomeSoundOne = new Audio("./Assets/Ping Hi.wav");
var metronomeSoundTwo = new Audio("./Assets/Ping Low.wav");
var just_chords=false;
var just_chord_string = "Just Chords";
var chord_and_scale_string = "Scale and Chord"
roman_numerals = ["I","II","III","IV","V","VI","VII"]



$(document).ready(function(){   
    $("[data-toggle='tooltip']").tooltip();

    $("#just-chord").click(function(){
        just_chords=!just_chords;
        if(just_chords){
            $("#just-chord").text(just_chord_string)
        }
        else{
            $("#just-chord").text(chord_and_scale_string)

        }
        
        
    });

    $('#romanNumeralsBTN').click(function(){

        if(showing_numerals){
            showNote(current_scale);
            showing_numerals=false;
            $("#romanNumeralsBTN").css({"background-color":"#b9b9b9"})
        }
        else if(current_scale !== null){
            showing_numerals=true;
            showNumerals(current_scale);
            $("#romanNumeralsBTN").css({"background-color":"green"})
        }
        else{
            alert("You need to generate a scale before showing the numeration of the scale.")
        }
         
    });

    //clears board if ok
    $("#clearBoard").click(function(){
        if(showing_numerals){
            showNote(current_scale);
            showing_numerals=false;
            $("#romanNumeralsBTN").css({"background-color":"#b9b9b9"})

        }
        
        dehighlight();
        clearBoard();
        addHeading("","",  "Choose a Scale")
        current_progression = new LinkedList(0,null,null);
        showCurrentChord("","");
        clearProgression();
        
        
    });  

    $('#modeAndNoteSubmit').click(function(){
        if(showing_numerals){
            showNote(current_scale);
            showing_numerals=false;
        }
    
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
        var n = createNode(notes);
        addToProgression(notes);
        //not sure what this is but i dont wanna delete yet
       /* current_progression.add(n);
        console.log(current_progression.contains(n));
        if(current_progression.length<1 || !current_progression.contains(n)) {
            addToProgression(n);
        }
        else{
            console.log("Entered else statement.")
            clearProgression();
            var t = current_progression.head;
            while (t!==null){
                addToProgression(t.getDescr());
                t=t.getNext();
            }
        }*/
        

    });  

    //play the loop
    $("#play").on('click',function(){
        playing = true;
        if(current_progression.length <1){
            alert("You must create a progression first! Double click on chords to add them to your progression.")
        }
        highlightMetronome();
    });

    //pause the loop
    $("#pause").on('click',function(){
        playing = false;
        stop = true;
        dehighlight();
        showCurrentChord("","");    
    });
    
    $("#clear-chord-progression").click(function(){
        current_progression = new LinkedList(0,null,null);
        clearProgression();
    });

  
});// END DOC READY

//sets up chord string to be presented on carousel
function formattedStr(str){
    str= str.replace("Chord", "");
    str = str.replace(/[_]/g, " ");
    str = str.replace(/[Ss]harp/g, "# ");
    return str;
}


//appends the list of chords in the scale to the appropriate carousel location
function showChords(){
    var n;    
    totalJSON.scale.forEach(function(note){
        
        n=note.toString();
        for (chord in totalJSON.basic[n]){
            addSharps(totalJSON.basic[note][chord])
            $("#basic-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+formattedStr(note)+" "+formattedStr(chord)+": "+totalJSON.basic[note][chord]+"</button></li>")
        }
        for (chord in totalJSON.inter[n]){
            addSharps(totalJSON.inter[note][chord])
            $("#intermediate-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+formattedStr(note)+" "+formattedStr(chord)+": "+totalJSON.inter[note][chord]+"</button></li>")
        }
        for (chord in totalJSON.jazz[n]){
            addSharps(totalJSON.jazz[note][chord]);
            $("#jazz-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+formattedStr(note)+" "+formattedStr(chord)+": "+totalJSON.jazz[note][chord]+"</button></li>")
        }
    });    
}


// adds scale name root, and actual scale to top left
function addHeading(scale, root, mode){
    $('#currentScale').text(root+" "+mode);
    addSharps(scale)
    $('#scalePara').text(scale.toString());
}


//resets freboard to base
function clearBoard(){
    current_scale=null;
    showing_numerals=false;
    color_counter=0;
    dehighlight();
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
    $('currentScale').text("");
    $('#scalePara').text("");
    $('.E').css({'background':'#211f1d'});
    $('.A').css({'background':'#211f1d'});
    $('.D').css({'background':'#211f1d'});
    $('.G').css({'background':'#211f1d'});
    $('.B').css({'background':'#211f1d'});
}

//clear the progression list but append back the ui pieces
function clearProgression(){
    $("#progression-chords").empty();
    $("#progression-chords").append("<li class='list-group-item active'>Your Chord Progression</li>");
    $('#progression-chords').append('<li class="list-group-item active"><button id="clear-chord-progression" onclick="clearProgression()"\
    class="btn" style="padding:0px;float:top;background-color:#9D002C;color:white">Remove Progression</button></li>');
}


//removes highlighting, normal colors applied
function dehighlight(){
    removeSharps(notes_arr);
    for(var i=0;i<notes_arr.length;i++){
        $('.'+notes_arr[i]+'').css({'background':'rgba(220, 183, 36,1)'});
        $('.'+notes_arr[i]+'').css({'color':'white'});
    }
    addSharps(notes_arr)
}

//highlights specific chord red and root white
function highlight(notes){
    for(var i=0;i<notes.length;i++){
        if (i===0){
            $('.'+notes[i].replace("#","sharp"+'')).css({'background':'white'});
            $('.'+notes[i].replace("#","sharp"+'')).css({'color':'black'});
        }else{
            $('.'+notes[i].replace("#","sharp"+'')).css({'background':'#9D002C'});
        }    
    }
}

function createNode(notes){
    // addSharps(notes)
    var a = notes.split(": ");
    var a1 = a[1].split(",");
    var arr = new Array();
    for (var i=0;i<a1.length;i++){
        arr.push(a1[i])
    }
    var n = new Node(arr, null, a[0]);
    return n;
}


// adds chord to a linked list, then adds the chord to ui
function addToProgression(notes){
    var node = createNode(notes);
    current_progression.add(node);    

    $("#progression-chords").append("<li class='list-group-item chord'><button class='chord-button'>"+notes+"</button></li>");
}

//show the notes in notes on fretboard (used for scale)
function showNote(notes){
    for(var i=0;i<notes.length;i++){
        $('.'+notes[i].replace("#","sharp")+'').animate({opacity:1});
        $('.'+notes[i].replace("#","sharp")+'').css({'background':'rgba(220, 183, 36,1)'});
        if(showing_numerals){
            var temp = notes.slice();
            debugger;
            addSharps(temp)
            $('.'+notes[i]+"").text(temp[i]);
        }
    }
}

//show the roman numeral associated with the scale
function showNumerals(notes){
    for(var i=0;i<notes.length;i++){
        $('.'+notes[i].replace("#","sharp"+'')+'').animate({opacity:1});
        $('.'+notes[i].replace("#","sharp"+'')+'').css({'background':'rgba(220, 183, 36,1)'});
        $('.'+notes[i].replace("#","sharp"+'')+'').text(roman_numerals[i]);
    }
}

// from symbol to word sharp
function removeSharps(arr_){
    for(var c=0;c<arr_.length;c++){
        arr_[c]=arr_[c].replace(/#/g, "sharp");
    }
}


//go from the word sharp to symbol #
function addSharps(arr_){
    for(var c=0;c<arr_.length;c++){
        arr_[c]=arr_[c].replace(/[Ss]harp/g, "#");
    }
}

//shows what the slider value is on screen
function outputUpdate(bpm){
    $("#bpmOutput").text(bpm);
}

//sets all notes to transparent, so that only one chord shows
function setAllTransparent(){
    removeSharps(notes_arr);
    for(var i=0;i<notes_arr.length;i++){
        $('.'+notes_arr[i]+'').css({'opacity':'0'});
        $('.'+notes_arr[i]+'').css({'color':'white'});
    }
}


// sets the paragraph for the chord in the progression currently
function showCurrentChord(descr,notes) {
    $("#curr-chord").text(descr+" "+notes.toString());
}



function highlightMetronome(){
    if(!stop){
        var tempo = Number($("#set-bpm").val());
        //get bpm to bpms
        var ms = (1/ (tempo/60))* 1000;
        metronomeSoundOne.play();
        dehighlight();
        

        var temp = current_progression.removeHead();
        //dont show all notes jsut notes in chord if desird
        if(just_chords){
            setAllTransparent();
            showNote(temp.getData());

        }
        else{
            showNote(current_scale);
    
            highlight(temp.getData());
            
        }

        //show the chord and associated notes on top right
        showCurrentChord(temp.getDescr(), temp.getData().toString());
        //add the chord back to loop it
        current_progression.add(temp);

        $("#metr-square-1").animate({
            backgroundColor:'red'
        },0.2*ms).animate({
            backgroundColor:'white'
        },0.8*ms,function(){
            metronomeSoundTwo.play();
        });
        $("#metr-square-2").delay(ms).animate({
            backgroundColor:'red'
        },0.2*ms).animate({
            backgroundColor:'white'
        },0.8*ms,function(){
            metronomeSoundTwo.play();
        });
        // metronomeSoundOne.play();
        $("#metr-square-3").delay(2*ms).animate({
            backgroundColor:'red'
        },0.2*ms).animate({
            backgroundColor:'white'
        },0.8*ms,function(){
            metronomeSoundTwo.play();
        });

        $("#metr-square-4").delay(3*ms).animate({
            backgroundColor:'red'
        },0.2*ms).animate({
            backgroundColor:'white'
        },0.8*ms, function(){
            
            highlightMetronome()
        });
    }
    else{
        stop=false;
    }

}

