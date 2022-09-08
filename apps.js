let TURN = "white";
let GAME_OVER = false;
let fiftfy_move_count = 0;
let VALID_POSITIONS = [
    "a1","b1","c1","d1","e1","f1","g1","h1",
    "a2","b2","c2","d2","e2","f2","g2","h2",
    "a3","b3","c3","d3","e3","f3","g3","h3",
    "a4","b4","c4","d4","e4","f4","g4","h4",
    "a5","b5","c5","d5","e5","f5","g5","h5",
    "a6","b6","c6","d6","e6","f6","g6","h6",
    "a7","b7","c7","d7","e7","f7","g7","h7",
    "a8","b8","c8","d8","e8","f8","g8","h8"];
let Moved_castle = {
    "wK": false,
    "wRw": false,
    "wRb": false,
    "bK": false,
    "bRw": false,
    "bRb": false}
let black_pieces =["bP1","bP2","bP3","bP4","bP5","bP6",
                    "bP7","bP8","bRb","bKb","bBb","bQ","bK","bBw","bKw","bRw"];
let white_pieces =["wRw","wKw","wBw","wQ","wK","wBb",
                    "wKb","wRb","wP1","wP2","wP3","wP4","wP5","wP6","wP7","wP8"];
let current_setup ={
    'wRb': "a1",
    "wKw": "b1",
    "wBb": "c1",
    "wQ": "d1",
    "wK": "e1",
    "wBw": "f1",
    "wKb": "g1",
    "wRw": "h1",
    'wP1': "a2",
    "wP2": "b2",
    "wP3": "c2",
    "wP4": "d2",
    "wP5": "e2",
    "wP6": "f2",
    "wP7": "g2",
    "wP8": "h2",
    'bP1': "a7",
    "bP2": "b7",
    "bP3": "c7",
    "bP4": "d7",
    "bP5": "e7",
    "bP6": "f7",
    "bP7": "g7",
    "bP8": "h7",
    'bRw': "a8",
    "bKb": "b8",
    "bBw": "c8",
    "bQ": "d8",
    "bK": "e8",
    "bBb": "f8",
    "bKw": "g8",
    "bRb": "h8"};
let promoted_counter = {
    "w_R" : [0,"&#9814"],
    "w_K" : [0,"&#9816"],
    "w_B" : [0,"&#9815"],
    "w_Q" : [0,"&#9813"],
    "b_R" : [0, "&#9820"],
    "b_K" : [0, "&#9822"],
    "b_B" : [0, "&#9821"],
    "b_Q" : [0, "&#9819"]};
let $ = function( id ) { return document.getElementById( id ); };
$('black-turn').style.display = "none";
function addHighlight(piece){
    if(piece.id == "bRw" || piece.id == "bRb" || piece.id == "wRw" || piece.id == "wRb"
        || piece.id.substring(0,3) == "w_R" || piece.id.substring(0,3) == "b_R"){
        let currPos = current_setup[piece.id];
        let temp = Number(currPos[1]);
        while(temp > 0 ){
            if(Number(currPos[1]) != temp){
                let id = currPos[0]+temp.toString();
                if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                else 
                    break;
            }
            temp--;
        }
        let temp2 = Number(currPos[1]);
        while(temp2 < 9 ){
            if(Number(currPos[1]) != temp2){
                let id = currPos[0]+temp2.toString();
                if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                else 
                    break;
            }
            temp2++;
         }
        let index = currPos[0].charCodeAt(0);
        while(index >96){
            if(currPos[0].charCodeAt(0) != index){
                let id =  String.fromCharCode(index)+currPos[1];
                if($(id).children.length == 0) 
                $(id).classList.add("highlight");
                else break;
            }            
            index--;
        }
        let index2 = currPos[0].charCodeAt(0);
        while(index2 < 105){
            if(currPos[0].charCodeAt(0) != index2){
                let id =  String.fromCharCode(index2)+currPos[1];
                if($(id).children.length == 0) 
                $(id).classList.add("highlight");
                else break;
            }            
            index2++;
        }        
    } 
    else if(piece.id == "bKw" || piece.id == "bKb" || piece.id == "wKw" || piece.id == "wKb"
        || piece.id.substring(0,3) == "w_K" || piece.id.substring(0,3) == "b_K"){
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        if(charIndex - 1 >= 97 && numIndex +2 <= 8 ){
            let id = String.fromCharCode(charIndex-1)+(numIndex +2);
            if($(id).children.length == 0) 
            $(id).classList.add("highlight");
        }
        if(charIndex + 1  <= 104 && numIndex + 2 <= 8){
            let id = String.fromCharCode(charIndex+1)+(numIndex+2);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex - 1 >= 97 && numIndex - 2 >= 1 ){
            let id = String.fromCharCode(charIndex-1)+(numIndex-2);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex + 1  <= 104 && numIndex - 2 >= 1){
            let id = String.fromCharCode(charIndex+1)+(numIndex-2);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex - 2 >= 97 && numIndex + 1 <= 8 ){
            let id = String.fromCharCode(charIndex-2)+(numIndex+1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex - 2  >= 97 && numIndex - 1 >= 1){
            let id = String.fromCharCode(charIndex-2)+(numIndex-1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex + 2 <= 104 && numIndex + 1 <= 8 ){
            let id = String.fromCharCode(charIndex+2)+(numIndex+1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex + 2  <= 104 && numIndex - 1 >= 1){
            let id = String.fromCharCode(charIndex+2)+(numIndex-1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
    } 
    else if(piece.id == "bP1" || piece.id == "bP2" || piece.id == "bP3" || piece.id == "bP4" || piece.id == "bP5" || piece.id == "bP6" || piece.id == "bP7" || piece.id == "bP8"){        
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        if(numIndex == 7){
            let id = currPos[0] + (numIndex -1);
            let id2 = currPos[0] + (numIndex - 2);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            if($(id).children.length == 0 && $(id2).children.length == 0)
            $(id2).classList.add("highlight");
        } else {
            let id = currPos[0] + (numIndex -1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
    } 
    else if(piece.id == "wP1" || piece.id == "wP2" || piece.id == "wP3" || piece.id == "wP4" || piece.id == "wP5" || piece.id == "wP6" || piece.id == "wP7" || piece.id == "wP8"){        
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        if(numIndex == 2){
            let id = currPos[0] + (numIndex +1);
            let id2 = currPos[0] + (numIndex + 2);
            if($(id).children.length == 0)
                $(id).classList.add("highlight");
            if($(id).children.length == 0 && $(id2).children.length == 0)
                $(id2).classList.add("highlight");
        } else {
            let id = currPos[0] + (numIndex +1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
    }
    else if(piece.id == "bBw" || piece.id == "bBb" || piece.id == "wBb" || piece.id == "wBw" 
        || piece.id.substring(0,3) == "w_B" || piece.id.substring(0,3) == "b_B"){
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);        
        while(charIndex < 104){
            if(numIndex == 1)break;
            charIndex++;
            numIndex--;            
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 8)break;
            charIndex++;
            numIndex++;            
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 1)break;
            charIndex--;
            numIndex--;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 8 )break;
            charIndex--;
            numIndex++;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
    }
    else if(piece.id == "bQ" || piece.id == "wQ"
        || piece.id.substring(0,3) == "w_Q" || piece.id.substring(0,3) == "b_Q" ){
        let currPos = current_setup[piece.id];
        let temp = Number(currPos[1]);     
        while(temp > 0 ){
            if(Number(currPos[1]) != temp){
                let id = currPos[0]+temp.toString();
                if($(id).children.length == 0)
                $(id).classList.add("highlight");
                else break;
            }
            temp--;
        }
        let temp2 = Number(currPos[1]);
        while(temp2 < 9 ){
            if(Number(currPos[1]) != temp2){
                let id = currPos[0]+temp2.toString();
                if($(id).children.length == 0) 
                $(id).classList.add("highlight");
                else break;
            }
            temp2++;
        }
        let index = currPos[0].charCodeAt(0);
        while(index >96){
            if(currPos[0].charCodeAt(0) != index){
                let id =  String.fromCharCode(index)+currPos[1];
                if($(id).children.length == 0) 
                $(id).classList.add("highlight");
                else break;
            }            
            index--;
        }
        let index2 = currPos[0].charCodeAt(0);
        while(index2 < 105){
            if(currPos[0].charCodeAt(0) != index2){
                let id =  String.fromCharCode(index2)+currPos[1];
                if($(id).children.length == 0)
                $(id).classList.add("highlight");
                else break;
            }            
            index2++;
        }
         numIndex = Number(currPos[1]);
         charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 1)break;
            charIndex++;
            numIndex--;                     
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 8)break;
            charIndex++;
            numIndex++;                      
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 1)break;
            charIndex--;
            numIndex--;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 8 )break;
            charIndex--;
            numIndex++;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
            else break;
        }
    }
    else if(piece.id == "bK" || piece.id == "wK" ){
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        if(charIndex + 1 <= 104){
            let id =  String.fromCharCode(charIndex+1) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex - 1 >= 97){
            let id =  String.fromCharCode(charIndex-1) + (numIndex);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(numIndex + 1 <= 8){
            let id =  String.fromCharCode(charIndex) + (numIndex+1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }        
        if(numIndex - 1 >= 1){
            let id =  String.fromCharCode(charIndex) + (numIndex-1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex + 1 <= 104 && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex+1) + (numIndex+1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex + 1 <= 104 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex+ 1) + (numIndex-1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex - 1  >= 97  && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex-1) + (numIndex+1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        }
        if(charIndex - 1 >= 97 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex-1) + (numIndex-1);
            if($(id).children.length == 0)
            $(id).classList.add("highlight");
        } 
        if(piece.id == "bK" && !Moved_castle["bK"]){
            if(!Moved_castle["bRb"] && current_setup["bRb"]!= "x"){
                if($("f8").children.length == 0 && $("g8").children.length==0){
                    let id =  String.fromCharCode(charIndex+2) + (numIndex);
                    $(id).classList.add("highlight");
                }
            } 
            if(!Moved_castle["bRw"] && current_setup["bRw"]!= "x"){
                if($("d8").children.length == 0 && $("c8").children.length ==0 && $("b8").children.length ==0){
                    let id =  String.fromCharCode(charIndex-2) + (numIndex);    
                    $(id).classList.add("highlight");
                }
            }
        } else if(piece.id == "wK" && !Moved_castle["wK"]){
            if(!Moved_castle["wRw"]&& current_setup["wRw"]!= "x"){
                if($("f1").children.length == 0 && $("g1").children.length==0){
                    let id =  String.fromCharCode(charIndex+2) + (numIndex);                    
                    $(id).classList.add("highlight");
                }
            } 
            if(!Moved_castle["wRb"] && current_setup["wRb"]!= "x"){
                if($("d1").children.length == 0 && $("c1").children.length ==0 && $("b1").children.length ==0){
                    let id =  String.fromCharCode(charIndex-2) + (numIndex);                    
                    $(id).classList.add("highlight");
                }
            }
        }    
    }
}
function removeHighlight(piece){
    $(current_setup[selected.id]).classList.remove("selected");
    if(piece.id == "bRw" || piece.id == "bRb" || piece.id == "wRw" || piece.id == "wRb"
        || piece.id.substring(0,3) == "w_R" || piece.id.substring(0,3) == "b_R"){
        let currPos = current_setup[piece.id];
        let temp = Number(currPos[1]);
        while(temp > 0 ){
            if(Number(currPos[1]) != temp){
                let id = currPos[0]+temp.toString();
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            temp--;
        }
        let temp2 = Number(currPos[1]);
        while(temp2 < 9 ){
            if(Number(currPos[1]) != temp2){
                let id = currPos[0]+temp2.toString();
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            temp2++;
        }
        let index = currPos[0].charCodeAt(0);
        while(index >96){
            if(currPos[0].charCodeAt(0) != index){
                let id =  String.fromCharCode(index)+currPos[1];
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            index--;
        }
        let index2 = currPos[0].charCodeAt(0);
        while(index2 < 105){
            if(currPos[0].charCodeAt(0) != index2){
                let id =  String.fromCharCode(index2)+currPos[1];
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            index2++;
        }        
    } 
    else if(piece.id == "bKw" || piece.id == "bKb" || piece.id == "wKw" || piece.id == "wKb"
        || piece.id.substring(0,3) == "w_K" || piece.id.substring(0,3) == "b_K"){
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        if(charIndex - 1 >= 97 && numIndex +2 <= 8 ){
            let id = String.fromCharCode(charIndex-1)+(numIndex +2);
            $(id).classList.remove("highlight");
        }
        if(charIndex + 1  <= 104 && numIndex + 2 <= 8){
            let id = String.fromCharCode(charIndex+1)+(numIndex+2);
            $(id).classList.remove("highlight");
        }
        if(charIndex - 1 >= 97 && numIndex - 2 >= 1 ){
            let id = String.fromCharCode(charIndex-1)+(numIndex-2);
            $(id).classList.remove("highlight");
        }
        if(charIndex + 1  <= 104 && numIndex - 2 >= 1){
            let id = String.fromCharCode(charIndex+1)+(numIndex-2);
            $(id).classList.remove("highlight");
        }
        if(charIndex - 2 >= 97 && numIndex + 1 <= 8 ){
            let id = String.fromCharCode(charIndex-2)+(numIndex+1);
            $(id).classList.remove("highlight");
        }
        if(charIndex - 2  >= 97 && numIndex - 1 >= 1){
            let id = String.fromCharCode(charIndex-2)+(numIndex-1);
            $(id).classList.remove("highlight");
        }
        if(charIndex + 2 <= 104 && numIndex + 1 <= 8 ){
            let id = String.fromCharCode(charIndex+2)+(numIndex+1);
            $(id).classList.remove("highlight");
        }
        if(charIndex + 2  <= 104 && numIndex - 1 >= 1){
            let id = String.fromCharCode(charIndex+2)+(numIndex-1);
            $(id).classList.remove("highlight");
        }
    }
    else if(piece.id == "bP1" || piece.id == "bP2" || piece.id == "bP3" || piece.id == "bP4" || piece.id == "bP5" || piece.id == "bP6" || piece.id == "bP7" || piece.id == "bP8"){        
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        if(numIndex == 7){
            let id = currPos[0] + (numIndex -1);
            let id2 = currPos[0] + (numIndex - 2);
            $(id).classList.remove("highlight");
            $(id2).classList.remove("highlight");
        } else {
            let id = currPos[0] + (numIndex -1);
            $(id).classList.remove("highlight");
        }
    } 
    else if(piece.id == "wP1" || piece.id == "wP2" || piece.id == "wP3" || piece.id == "wP4" || piece.id == "wP5" || piece.id == "wP6" || piece.id == "wP7" || piece.id == "wP8"){        
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        if(numIndex == 2){
            let id = currPos[0] + (numIndex +1);
            let id2 = currPos[0] + (numIndex + 2);
            $(id).classList.remove("highlight");
            $(id2).classList.remove("highlight");
        } else {
            let id = currPos[0] + (numIndex +1);
            $(id).classList.remove("highlight");
        }
    } 
    else if(piece.id == "bBw" || piece.id == "bBb" || piece.id == "wBb" || piece.id == "wBw"
    || piece.id.substring(0,3) == "w_B" || piece.id.substring(0,3) == "b_B"){
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 1)break;
            charIndex++;
            numIndex--;            
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 8)break;
            charIndex++;
            numIndex++;            
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 1)break;
            charIndex--;
            numIndex--;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 8 )break;
            charIndex--;
            numIndex++;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
    } 
    else if(piece.id == "bQ" || piece.id == "wQ" || piece.id.substring(0,3) == "w_Q" || piece.id.substring(0,3) == "b_Q"){
        let currPos = current_setup[piece.id];
        let temp = Number(currPos[1]);    
        while(temp > 0 ){
            if(Number(currPos[1]) != temp){
                let id = currPos[0]+temp.toString();
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            temp--;
        }
        let temp2 = Number(currPos[1]);
        while(temp2 < 9 ){
            if(Number(currPos[1]) != temp2){
                let id = currPos[0]+temp2.toString();
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            temp2++;
         }
        let index = currPos[0].charCodeAt(0);
        while(index >96){
            if(currPos[0].charCodeAt(0) != index){
                let id =  String.fromCharCode(index)+currPos[1];
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }            
            index--;
        }
        let index2 = currPos[0].charCodeAt(0);
        while(index2 < 105){
            if(currPos[0].charCodeAt(0) != index2){
                let id =  String.fromCharCode(index2)+currPos[1];
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }            
            index2++;
        }        
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);        
        while(charIndex < 104){
            if(numIndex == 1)break;
            charIndex++;
            numIndex--;            
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 8)break;
            charIndex++;
            numIndex++;            
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 1)break;
            charIndex--;
            numIndex--;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 8 )break;
            charIndex--;
            numIndex++;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            $(id).classList.remove("highlight");
        }
    } 
    else if(piece.id == "bK" || piece.id == "wK" ){
         let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        if(charIndex + 1 <= 104){
            let id =  String.fromCharCode(charIndex+1) + (numIndex);
            $(id).classList.remove("highlight");
        }        
        if(charIndex - 1 >= 97){
            let id =  String.fromCharCode(charIndex-1) + (numIndex);
            $(id).classList.remove("highlight");
        }
        if(numIndex + 1 <= 8){
            let id =  String.fromCharCode(charIndex) + (numIndex+1);
            $(id).classList.remove("highlight");
        }        
        if(numIndex - 1 >= 1){
            let id =  String.fromCharCode(charIndex) + (numIndex-1);
            $(id).classList.remove("highlight");
        }
        if(charIndex + 1 <= 104 && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex+1) + (numIndex+1);
            $(id).classList.remove("highlight");
        }
        if(charIndex + 1 <= 104 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex+ 1) + (numIndex-1);
            $(id).classList.remove("highlight");
        }
        if(charIndex - 1  >= 97  && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex-1) + (numIndex+1);
            $(id).classList.remove("highlight");
        }
        if(charIndex - 1 >= 97 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex-1) + (numIndex-1);
            $(id).classList.remove("highlight");
        }
        if(piece.id == "bK" && !Moved_castle["bK"] && current_setup["bK"] == "e8"){
            if(!Moved_castle["bRb"]){
                if($("f8").children.length == 0 && $("g8").children.length==0){
                    let id =  String.fromCharCode(charIndex+2) + (numIndex);                    
                    $(id).classList.remove("highlight");
                }
            } 
            if(!Moved_castle["bRw"]){
                if($("d8").children.length == 0 && $("c8").children.length ==0 && $("b8").children.length ==0){
                    let id =  String.fromCharCode(charIndex-2) + (numIndex);                    
                    $(id).classList.remove("highlight");
                }
            }
        } else if(piece.id == "wK" && !Moved_castle["wK"] && current_setup["wK"] == "e1"){
            if(!Moved_castle["wRw"] && current_setup["wRw"] != "x"){
                if($("f1").children.length == 0 && $("g1").children.length==0){
                    let id =  String.fromCharCode(charIndex+2) + (numIndex);                    
                    $(id).classList.remove("highlight");
                }
            }
            if(!Moved_castle["wRb"] && current_setup["wRb"] != "x"){
                if($("d1").children.length == 0 && $("c1").children.length ==0 && $("b1").children.length ==0){
                    let id =  String.fromCharCode(charIndex-2) + (numIndex);                    
                    $(id).classList.remove("highlight");
                }
            }
        }        
    }
    
}
function isKingProtectingTheSquare(posId){
        let currPos;
        if(TURN == "white"){
            currPos = current_setup["bK"];
        } else if(TURN == "black"){
            currPos = current_setup["wK"];
        }
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        if(charIndex + 1 <= 104){
            let id =  String.fromCharCode(charIndex+1) + (numIndex);
            if(id == posId)
                return true;
        }        
        if(charIndex - 1 >= 97){
            let id =  String.fromCharCode(charIndex-1) + (numIndex);
            if(id == posId)
                return true;
        }
        if(numIndex + 1 <= 8){
            let id =  String.fromCharCode(charIndex) + (numIndex+1);
            if(id == posId)
                return true;
        }        
        if(numIndex - 1 >= 1){
            let id =  String.fromCharCode(charIndex) + (numIndex-1);
            if(id == posId)
                return true;
        }
        if(charIndex + 1 <= 104 && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex+1) + (numIndex+1);
            if(id == posId)
                return true;
        }
        if(charIndex + 1 <= 104 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex+ 1) + (numIndex-1);
            if(id == posId)
                return true;
        }
        if(charIndex - 1  >= 97  && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex-1) + (numIndex+1);
            if(id == posId)
                return true;
        }
        if(charIndex - 1 >= 97 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex-1) + (numIndex-1);
            if(id == posId)
                return true;
        }
    
    return false;
}
function getAllPossibleMove(){
    let TotalMoves = 0;
    if(TURN == "black")
    {
        for (const piece of black_pieces) {
            if(current_setup[piece] == "x") continue;            
            if(piece == "bRw" || piece == "bRb" || piece.substring(0,3) == "b_R"){
                let currPos = current_setup[piece];
                let temp = Number(currPos[1]);
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        }  else {
                            break;
                        }
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ){
                    if(Number(currPos[1]) != temp2){
                        let id = currPos[0]+temp2.toString();
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        } 
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        }  else {
                            break;
                        }
                    }
                    temp2++;
                 }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        } 
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        }  else {
                            break;
                        }
                    }            
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        } 
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        }  else {
                            break;
                        }
                    }            
                    index2++;
                }        
            } 
            else if(piece == "bKw" || piece == "bKb" || piece.substring(0,3) == "b_K"){
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex - 1 >= 97 && numIndex +2 <= 8 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex +2);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1  <= 104 && numIndex + 2 <= 8){
                    let id = String.fromCharCode(charIndex+1)+(numIndex+2);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 1 >= 97 && numIndex - 2 >= 1 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex-2);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1  <= 104 && numIndex - 2 >= 1){
                    let id = String.fromCharCode(charIndex+1)+(numIndex-2);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 2 >= 97 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex-2)+(numIndex+1);
                    if($(id).children.length == 0){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 2  >= 97 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex-2)+(numIndex-1);
                    if($(id).children.length == 0){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 2 <= 104 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex+2)+(numIndex+1);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 2  <= 104 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex+2)+(numIndex-1);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
            } 
            else if(piece == "bP1" || piece == "bP2" || piece == "bP3" || piece == "bP4" 
                || piece == "bP5" || piece == "bP6" || piece == "bP7" || piece == "bP8"){        
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                
                let id = currPos[0] + (numIndex -1);
                let id2 = currPos[0] + (numIndex - 2);
                if($(id).children.length == 0)
                {   
                    let dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        TotalMoves++;
                    }
                }
                if($(id).children.length == 0 && numIndex == 7 && $(id2).children.length == 0)
                {   
                    let dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        TotalMoves++;
                    }
                }
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex - 1 >=97) {
                    let id = String.fromCharCode(charIndex-1) + (numIndex - 1);
                    let dummyBoard = Object.assign({}, current_setup);
                    if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";                        
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }                    
                }
                if(charIndex + 1 <=104){
                    let id = String.fromCharCode(charIndex+1) + (numIndex - 1);
                    let dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece] = id;
                    if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";                        
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
            }
            else if(piece == "bBw" || piece == "bBb" || piece.substring(0,3) == "b_B"){
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);        
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } 
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } 
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
            }
            else if(piece == "bQ" || piece.substring(0,3) == "b_Q"){
                let currPos = current_setup[piece];
                let temp = Number(currPos[1]);    
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        } 
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ){
                    if(Number(currPos[1]) != temp2){
                        let id = currPos[0]+temp2.toString();
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        } 
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                    temp2++;
                }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        } 
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }            
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }            
                    index2++;
                }
                 numIndex = Number(currPos[1]);
                 charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;                     
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;                      
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } 
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) && $(id).children[0].id != "wK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
            }
            else if(piece == "bK"){
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex + 1 <= 104){
                    let id =  String.fromCharCode(charIndex+1) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    } 
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) 
                        && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }        
                if(charIndex - 1 >= 97){
                    let id =  String.fromCharCode(charIndex-1) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) 
                        && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard) ){
                            TotalMoves++;
                        }
                    }
                }
                if(numIndex + 1 <= 8){
                    let id =  String.fromCharCode(charIndex) + (numIndex+1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) 
                        && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }        
                if(numIndex - 1 >= 1){
                    let id =  String.fromCharCode(charIndex) + (numIndex-1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) 
                        && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1 <= 104 && numIndex+1 <= 8){
                    let id =  String.fromCharCode(charIndex+1) + (numIndex+1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id) 
                        && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1 <= 104 && numIndex-1 >= 1){
                    let id =  String.fromCharCode(charIndex+ 1) + (numIndex-1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 1  >= 97  && numIndex+1 <= 8){
                    let id =  String.fromCharCode(charIndex-1) + (numIndex+1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id)
                    && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 1 >= 97 && numIndex-1 >= 1){
                    let id =  String.fromCharCode(charIndex-1) + (numIndex-1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && white_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "wK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
            }
        }
    }
    else if(TURN == "white")
    {
        for (const piece of white_pieces) {
            if(current_setup[piece] == "x") continue;
            if(piece == "wRw" || piece == "wRb" || piece.substring(0,3) == "w_R") {
                let currPos = current_setup[piece];
                let temp = Number(currPos[1]);
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        }  else {
                            break;
                        }
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ) {
                    if(Number(currPos[1]) != temp2) {
                        let id = currPos[0]+temp2.toString();
                        if($(id).children.length == 0){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                    temp2++;
                }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if($(id).children.length == 0) 
                        {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        }  else {
                            break;
                        }
                    }            
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if($(id).children.length == 0){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        }  else {
                            break;
                        }
                    }            
                    index2++;
                }        
            } 
            else if(piece == "wKw" || piece == "wKb" || piece.substring(0,3) == "w_K" ) {
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex - 1 >= 97 && numIndex +2 <= 8 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex +2);
                    if($(id).children.length == 0){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1  <= 104 && numIndex + 2 <= 8){
                    let id = String.fromCharCode(charIndex+1)+(numIndex+2);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 1 >= 97 && numIndex - 2 >= 1 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex-2);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1  <= 104 && numIndex - 2 >= 1){
                    let id = String.fromCharCode(charIndex+1)+(numIndex-2);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 2 >= 97 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex-2)+(numIndex+1);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 2  >= 97 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex-2)+(numIndex-1);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 2 <= 104 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex+2)+(numIndex+1);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 2  <= 104 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex+2)+(numIndex-1);
                    if($(id).children.length == 0) 
                    {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    } else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK") {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[$(id).children[0].id] = "x";
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
            }             
            else if(piece == "wP1" || piece == "wP2" || piece == "wP3" || piece == "wP4" ||
             piece == "wP5" || piece == "wP6" || piece == "wP7" || piece == "wP8"){        
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                let id = currPos[0] + (numIndex +1);
                if($(id).children.length == 0)
                {   
                    let dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        TotalMoves++;
                    }
                }
                let id2 = currPos[0] + (numIndex + 2);
                if(numIndex == 2 && $(id).children.length == 0 && $(id2).children.length == 0)
                {
                    let dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        TotalMoves++;
                    }
                }
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex - 1 >=97) {
                    let id = String.fromCharCode(charIndex-1) + (numIndex + 1);
                    let dummyBoard = Object.assign({}, current_setup);
                    if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";                        
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }                    
                }
                if(charIndex + 1 <=104){
                    let id = String.fromCharCode(charIndex+1) + (numIndex + 1);
                    let dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece] = id;
                    if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";                        
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
            }
            else if(piece == "wBb" || piece  == "wBw" || piece.substring(0,3) == "w_B"){
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);        
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
            }
            else if(piece == "wQ" || piece.substring(0,3) == "w_Q"){
                let currPos = current_setup[piece];
                let temp = Number(currPos[1]);      
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ){
                    if(Number(currPos[1]) != temp2){
                        let id = currPos[0]+temp2.toString();
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                    temp2++;
                }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        } 
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }            
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if($(id).children.length == 0) {
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                        }
                        else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                            let dummyBoard = Object.assign({}, current_setup);
                            dummyBoard[piece] = id;
                            dummyBoard[$(id).children[0].id] = "x";
                            if(!IsKingInCheck(dummyBoard)){
                                TotalMoves++;
                            }
                            break;
                        } else {
                            break;
                        }
                    }            
                    index2++;
                }
                 numIndex = Number(currPos[1]);
                 charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;                     
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;                      
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) && $(id).children[0].id != "bK"){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                        break;
                    } else {
                        break;
                    }
                }
            }
            else if(piece == "wK" ){
                let currPos = current_setup[piece];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex + 1 <= 104){
                    let id =  String.fromCharCode(charIndex+1) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }        
                if(charIndex - 1 >= 97){
                    let id =  String.fromCharCode(charIndex-1) + (numIndex);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(numIndex + 1 <= 8){
                    let id =  String.fromCharCode(charIndex) + (numIndex+1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }        
                if(numIndex - 1 >= 1){
                    let id =  String.fromCharCode(charIndex) + (numIndex-1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1 <= 104 && numIndex+1 <= 8){
                    let id =  String.fromCharCode(charIndex+1) + (numIndex+1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex + 1 <= 104 && numIndex-1 >= 1){
                    let id =  String.fromCharCode(charIndex+ 1) + (numIndex-1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id) 
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 1  >= 97  && numIndex+1 <= 8){
                    let id =  String.fromCharCode(charIndex-1) + (numIndex+1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }
                if(charIndex - 1 >= 97 && numIndex-1 >= 1){
                    let id =  String.fromCharCode(charIndex-1) + (numIndex-1);
                    if($(id).children.length == 0) {
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            TotalMoves++;
                        }
                    }
                    else if($(id).children.length != 0 && black_pieces.includes($(id).children[0].id)
                        && $(id).children[0].id != "bK" && !isKingProtectingTheSquare(id)){
                        let dummyBoard = Object.assign({}, current_setup);
                        dummyBoard[piece] = id;
                        dummyBoard[$(id).children[0].id] = "x";
                        if(!IsKingInCheck(dummyBoard)){
                            TotalMoves++;
                        }
                    }
                }                    
            }
        }
    }
    return TotalMoves; 
}
function IsKingInCheck(board) {
    if(TURN == "white"){ 
        let pawns = ["bP1","bP2","bP3","bP4","bP5","bP6","bP7","bP8"];
        let pos = board["wK"];
        for(let i = 0 ; i < pawns.length;i++){
            if(board[pawns[i]] != "x"){
                let currPos = board[pawns[i]];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex + 1 <=104){
                    let id = String.fromCharCode(charIndex+1) + (numIndex - 1);
                    if(id== pos)
                        return true;
                } 
                if(charIndex - 1 >=97) {
                    let id = String.fromCharCode(charIndex-1) + (numIndex - 1);
                    if(id == pos)
                        return true;
                }                
            }           
        }    
        let rook = ["bRw","bRb"];
        rook = rook.concat(black_pieces.filter(elem => elem.substring(0,3) === "b_R"));
        for(let i = 0 ; i < rook.length;i++) {
            if(board[rook[i]] != "x"){
                let currPos = board[rook[i]];
                let temp = Number(currPos[1]);
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true;
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ){
                    if(Number(currPos[1]) != temp2){
                        let id = currPos[0]+temp2.toString();
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true;
                    }
                    temp2++;
                }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break;         
                        if(id == pos)
                            return true;
                    }   
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break;             
                        if(id == pos)
                            return true;
                    }            
                    index2++;
                }
            }
        }
        let knights = ["bKw","bKb"];
        knights = knights.concat(black_pieces.filter(elem => elem.substring(0,3) === "b_K"));
        for(let i = 0 ; i < knights.length; i++){
            if(board[knights[i]] != "x"){
                let currPos = board[knights[i]];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex - 1 >= 97 && numIndex +2 <= 8 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex +2);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 1  <= 104 && numIndex + 2 <= 8){
                    let id = String.fromCharCode(charIndex+1)+(numIndex+2);
                    if(id == pos)
                        return true;
                }
                if(charIndex - 1 >= 97 && numIndex - 2 >= 1 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex-2);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 1  <= 104 && numIndex - 2 >= 1){
                    let id = String.fromCharCode(charIndex+1)+(numIndex-2);
                    if(id == pos)
                        return true;
                }
                if(charIndex - 2 >= 97 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex-2)+(numIndex+1);
                    if(id == pos)
                        return true;
                }
                if(charIndex - 2  >= 97 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex-2)+(numIndex-1);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 2 <= 104 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex+2)+(numIndex+1);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 2  <= 104 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex+2)+(numIndex-1);
                    if(id == pos)
                        return true;
                }
            }
        }
        let bishop = ["bBb","bBw"];
        bishop = bishop.concat(black_pieces.filter(elem => elem.substring(0,3) === "b_B"));
        for(let i = 0 ; i < bishop.length;i++){
            if(board[bishop[i]] != "x"){
                let currPos = board[bishop[i]];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;     
                    if(id == pos)
                        return true;     
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;           
                    if(id == pos)
                        return true;
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;     
                    if(id == pos)
                        return true;  
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;             
                    if(id == pos)
                        return true;
                }
            }
        }
        let queens = ["bQ"];
        queens = queens.concat(black_pieces.filter(elem => elem.substring(0,3) === "b_Q"));
        for(let i = 0 ; i < queens.length;i++) {
            if(board[queens[i]] != "x"){
                let currPos = board[queens[i]];
                let temp = Number(currPos[1]);
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if(Object.values(board).includes(id) && id != pos) break;              
                        if(id == pos)
                            return true;
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ){
                    if(Number(currPos[1]) != temp2){
                        let id = currPos[0]+temp2.toString();
                        if(Object.values(board).includes(id) && id != pos) break;       
                        if(id == pos)
                            return true; 
                    }
                    temp2++;
                }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break;                 
                        if(id == pos)
                            return true;
                    }            
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break; 
                        if(id == pos)
                            return true;  
                    }            
                    index2++;
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;                     
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true; 
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;                      
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true;  
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true; 
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true;
                }
            }
        }
    } else if(TURN == "black") {
        let pos = board["bK"];
        let pawns = ["wP1","wP2","wP3","wP4","wP5","wP6","wP7","wP8"];
        for(let i = 0 ; i < pawns.length;i++){
            if(board[pawns[i]] != "x"){
                let currPos = board[pawns[i]];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex + 1 <=104){
                    let id2 = String.fromCharCode(charIndex+1) + (numIndex + 1);
                    if(id2 == pos)
                        return true;
                } 
                if(charIndex - 1 >=97) {
                    let id = String.fromCharCode(charIndex-1) + (numIndex + 1);
                    if(id == pos)
                        return true;
                }               
            }            
        }
        let rook = ["wRw","wRb"];
        rook = rook.concat(white_pieces.filter(elem => elem.substring(0,3) === "w_R"));
        for(let i = 0 ; i < rook.length;i++) {
            if(board[rook[i]] != "x"){
                let currPos = board[rook[i]];
                let temp = Number(currPos[1]);
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if(Object.values(board).includes(id) && id != pos) break;                
                        if(id == pos)
                            return true;
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ){
                    if(Number(currPos[1]) != temp2){
                        let id = currPos[0]+temp2.toString();
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true;
                    }
                    temp2++;
                }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true;  
                    }            
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true; 
                    }            
                    index2++;
                }
            }
        }
        let knights = ["wKw","wKb"];
        knights = knights.concat(white_pieces.filter(elem => elem.substring(0,3) === "w_K"));
        for(let i = 0 ; i < knights.length; i++){
            if(board[knights[i]] != "x"){
                let currPos = board[knights[i]];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                if(charIndex - 1 >= 97 && numIndex +2 <= 8 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex +2);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 1  <= 104 && numIndex + 2 <= 8){
                    let id = String.fromCharCode(charIndex+1)+(numIndex+2);
                    if(id == pos)
                        return true;
                }
                if(charIndex - 1 >= 97 && numIndex - 2 >= 1 ){
                    let id = String.fromCharCode(charIndex-1)+(numIndex-2);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 1  <= 104 && numIndex - 2 >= 1){
                    let id = String.fromCharCode(charIndex+1)+(numIndex-2);
                    if(id == pos)
                        return true;
                }
                if(charIndex - 2 >= 97 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex-2)+(numIndex+1);
                    if(id == pos)
                        return true;
                }
                if(charIndex - 2  >= 97 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex-2)+(numIndex-1);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 2 <= 104 && numIndex + 1 <= 8 ){
                    let id = String.fromCharCode(charIndex+2)+(numIndex+1);
                    if(id == pos)
                        return true;
                }
                if(charIndex + 2  <= 104 && numIndex - 1 >= 1){
                    let id = String.fromCharCode(charIndex+2)+(numIndex-1);
                    if(id == pos)
                        return true;
                }
            }
        }
        let bishop = ["wBb","wBw"];
        bishop = bishop.concat(white_pieces.filter(elem => elem.substring(0,3) === "w_B"));
        for(let i = 0 ; i < bishop.length;i++){
            if(board[bishop[i]] != "x"){
                let currPos = board[bishop[i]];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true; 
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;            
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true;       
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true;       
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true;      
                }
            }
        }
        let queens = ["wQ"];
        queens = queens.concat(white_pieces.filter(elem => elem.substring(0,3) === "w_Q"));
        for(let i = 0 ; i < queens.length;i++){
            if(board[queens[i]] != "x") {
                let currPos = board[queens[i]];
                let temp = Number(currPos[1]);   
                while(temp > 0 ){
                    if(Number(currPos[1]) != temp){
                        let id = currPos[0]+temp.toString();
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true; 
                    }
                    temp--;
                }
                let temp2 = Number(currPos[1]);
                while(temp2 < 9 ){
                    if(Number(currPos[1]) != temp2){
                        let id = currPos[0]+temp2.toString();
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true;  
                    }
                    temp2++;
                }
                let index = currPos[0].charCodeAt(0);
                while(index >96){
                    if(currPos[0].charCodeAt(0) != index){
                        let id =  String.fromCharCode(index)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true; 
                    }            
                    index--;
                }
                let index2 = currPos[0].charCodeAt(0);
                while(index2 < 105){
                    if(currPos[0].charCodeAt(0) != index2){
                        let id =  String.fromCharCode(index2)+currPos[1];
                        if(Object.values(board).includes(id) && id != pos) break;
                        if(id == pos)
                            return true; 
                    }            
                    index2++;
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 1)break;
                    charIndex++;
                    numIndex--;                     
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true;    
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex < 104){
                    if(numIndex == 8)break;
                    charIndex++;
                    numIndex++;                      
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;             
                    if(id == pos){
                        return true;
                    }
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 1)break;
                    charIndex--;
                    numIndex--;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true;         
                }
                numIndex = Number(currPos[1]);
                charIndex = currPos[0].charCodeAt(0);
                while(charIndex > 97){
                    if(numIndex == 8 )break;
                    charIndex--;
                    numIndex++;
                    let id =  String.fromCharCode(charIndex) + (numIndex);
                    if(Object.values(board).includes(id) && id != pos) break;
                    if(id == pos)
                        return true; 
                }
            }
        }
    }
    return false;
}
function checkIfGameOver() {
    if(TURN == "black" && IsKingInCheck(Object.assign({}, current_setup))){
        let total = getAllPossibleMove();
        if(total == 0){
            GAME_OVER = true;
            $('gameOverNotice').style.display = "block";
            $('gameOverNotice').children[0].innerHTML = "White wins!";
            document.querySelectorAll(".move:last-child")[0].getElementsByTagName('td')[0].innerHTML += "+";
            alert("Game over! White win!");
        }
    } else if (TURN == "white" && IsKingInCheck(Object.assign({}, current_setup))){
        let total = getAllPossibleMove();
        if(total == 0){
            GAME_OVER = true;
            $('gameOverNotice').style.display = "block";
            $('gameOverNotice').children[0].innerHTML = "Black wins!";
            document.querySelectorAll(".move:last-child")[0].getElementsByTagName('td')[1].innerHTML += "+";
            alert("Game over! Black win!");
        }
    } else if(TURN == "black" && !IsKingInCheck(Object.assign({}, current_setup))){
        let total = getAllPossibleMove();
        if(total == 0){
            GAME_OVER = true;
            $('gameOverNotice').style.display = "block";
            $('gameOverNotice').children[0].innerHTML = "Stalemate!";
            alert("Game over! Stalemate!");
        }
    } else if (TURN == "white" && !IsKingInCheck(Object.assign({}, current_setup))){
        let total = getAllPossibleMove();
        if(total == 0){
            GAME_OVER = true;
            $('gameOverNotice').style.display = "block";
            $('gameOverNotice').children[0].innerHTML = "Stalemate!";
            alert("Game over! Stalemate!");
        }
    }
    return false;
}
function checkInsufficientMaterial() {
    let bp = [];
    let wp =[];
    for(let i = 0; i < black_pieces.length;i++){
        if(current_setup[black_pieces[i]] != "x"){
            bp.push(black_pieces[i]);
        }
    }
    for(let i = 0; i < white_pieces.length;i++){
        if(current_setup[white_pieces[i]] != "x"){
            wp.push(white_pieces[i]);
        }
    }
    if(bp.length == 1 && wp.length == 1) return true;
    if(bp.length == 2 && wp.length == 1){
        if(wp[0] == "bK" && (wp[1] == "bBw" || wp[1] == "bBb"|| wp[1] == "bKw" || wp[1] == "bKb"|| 
        wp[1].substring(0,3) == "b_K" || wp[1].substring(0,3) == "b_B")){
            return true;
        } 
        if(wp[1] == "bK" && (wp[0] == "bBw" || wp[0] == "bBb"|| wp[0] == "bKw" || wp[0] == "bKb"|| 
        wp[0].substring(0,3) == "b_K" || wp[0].substring(0,3) == "b_B")){
            return true;
        } 
    } else if(wp.length == 2 && bp.length == 1) {
        if(wp[0] == "wK" && (wp[1] == "wBw" || wp[1] == "wBb"|| wp[1] == "wKw" || wp[1] == "wKb"|| 
        wp[1].substring(0,3) == "w_K" || wp[1].substring(0,3) == "w_B")){
            return true;
        } 
        if(wp[1] == "wK" && (wp[0] == "wBw" || wp[0] == "wBb"|| wp[0] == "wKw" || wp[0] == "wKb"|| 
        wp[0].substring(0,3) == "w_K" || wp[0].substring(0,3) == "w_B")){
            return true;
        } 
    }
    return false;
}
let selected;
let previousBlackMove;
let previousWhiteMove;
let enPassant = false;
let blackCastle = false;
let whiteCastle = false;
let bcRight = false;
let bcLeft = false;
let wcRight = false;
let wcLeft = false;
let promoteBlackPawn = false;
let promoteWhitePawn = false;
function canBeTaken(pos){
    let piece = selected;
    if($(pos.id).children.length != 0){
        if($(pos.id).children[0].id == "bK" || $(pos.id).children[0].id == "wK") {
            console.log("Can't take king");
            return false;
        } else if(black_pieces.includes(pos.children[0].id) && TURN == "black"){
            return false;
        } else if(white_pieces.includes(pos.children[0].id) && TURN == "white"){
            return false;
        }
    }
    let dummyBoard = Object.assign({}, current_setup);
    if(piece.id == "bRw" || piece.id == "bRb" || piece.id == "wRw" || piece.id == "wRb"
        || piece.id.substring(0,3) == "b_R" || piece.id.substring(0,3) == "w_R"){
        previousBlackMove = undefined;
        previousWhiteMove = undefined;
        let currPos = current_setup[piece.id];
        let temp = Number(currPos[1]);
        while(temp > 0 ){
            if(Number(currPos[1]) != temp){
                let id = currPos[0]+temp.toString();
                if(id != pos.id && $(id).children.length != 0)
                    break;
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }
            }
            temp--;
        }
        dummyBoard = Object.assign({}, current_setup);
        let temp2 = Number(currPos[1]);
        while(temp2 < 9 ){
            if(Number(currPos[1]) != temp2){
                let id = currPos[0]+temp2.toString();
                if(id != pos.id && $(id).children.length != 0)
                    break;
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;
                    }
                }
            }
            temp2++;
         }
        dummyBoard = Object.assign({}, current_setup);
        let index = currPos[0].charCodeAt(0);
        while(index > 96){
            if(currPos[0].charCodeAt(0) != index){
                let id =  String.fromCharCode(index)+currPos[1];
                if(id != pos.id && $(id).children.length != 0)
                    break;
                
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;
                    }
                }
            }            
            index--;
        }
        dummyBoard = Object.assign({}, current_setup);
        let index2 = currPos[0].charCodeAt(0);
        while(index2 < 105){
            if(currPos[0].charCodeAt(0) != index2){
                let id =  String.fromCharCode(index2)+currPos[1];
                if(id != pos.id && $(id).children.length != 0)
                    break;
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;
                    }
                }                     
            }            
            index2++;
        }      
        return false;      
    } 
    else if(piece.id == "bKw" || piece.id == "bKb" || piece.id == "wKw" || piece.id == "wKb"
        || piece.id.substring(0,3) == "b_K" || piece.id.substring(0,3) == "w_K"){
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        previousBlackMove = undefined;
        previousWhiteMove = undefined;
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex - 1 >= 97 && numIndex +2 <= 8 ){
            let id = String.fromCharCode(charIndex-1)+(numIndex +2);            
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex + 1  <= 104 && numIndex + 2 <= 8){
            let id = String.fromCharCode(charIndex+1)+(numIndex+2);
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";       
                if(!IsKingInCheck(dummyBoard)){
                    return true;
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex - 1 >= 97 && numIndex - 2 >= 1 ){
            let id = String.fromCharCode(charIndex-1)+(numIndex-2);
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex + 1  <= 104 && numIndex - 2 >= 1){
            let id = String.fromCharCode(charIndex+1)+(numIndex-2);
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex - 2 >= 97 && numIndex + 1 <= 8 ){
            let id = String.fromCharCode(charIndex-2)+(numIndex+1);
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex - 2  >= 97 && numIndex - 1 >= 1){
            let id = String.fromCharCode(charIndex-2)+(numIndex-1);
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";          
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex + 2 <= 104 && numIndex + 1 <= 8 ){
            let id = String.fromCharCode(charIndex+2)+(numIndex+1);
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";       
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex + 2  <= 104 && numIndex - 1 >= 1){
            let id = String.fromCharCode(charIndex+2)+(numIndex-1);
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;
                }
            }
        }
        return false;
    }
    else if(piece.id == "bP1" || piece.id == "bP2" || piece.id == "bP3" || piece.id == "bP4" ||
     piece.id == "bP5" || piece.id == "bP6" || piece.id == "bP7" || piece.id == "bP8"){        
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        previousBlackMove = undefined;
        if(pos.children.length != 0){
            dummyBoard = Object.assign({}, current_setup);
            if(charIndex + 1 <=104){
                let id2 = String.fromCharCode(charIndex+1) + (numIndex - 1);
                if(id2 == pos.id){
                    dummyBoard[piece.id] = id2;
                    dummyBoard[pos.children[0].id] = "x";
                    if(numIndex - 1 == 1)
                        promoteBlackPawn = true;
                    if(!IsKingInCheck(dummyBoard)){
                        return true;
                    }
                }
            } 
            dummyBoard = Object.assign({}, current_setup);
            if(charIndex - 1 >=97) {
                let id = String.fromCharCode(charIndex-1) + (numIndex - 1);
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        if(numIndex - 1 == 1)
                            promoteBlackPawn = true;
                        return true;                 
                    }
                }
            }
        } else {
            if(numIndex == 7){
                let id = currPos[0] + (numIndex -1);
                let id2 = currPos[0] + (numIndex - 2);
                dummyBoard = Object.assign({}, current_setup);
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }
                dummyBoard = Object.assign({}, current_setup);
                dummyBoard[piece.id] = id2;
                if($(id).children.length == 0 && $(id2).children.length == 0 && id2 == pos.id && !IsKingInCheck(dummyBoard))
                {
                    previousBlackMove = pos;
                    return true;
                }
            } else if(numIndex == 4 && previousWhiteMove  && previousWhiteMove.nodeType && Number(previousWhiteMove.id[1]) == 4 ){
                let id = String.fromCharCode(charIndex-1) + (numIndex - 1);
                let id2 = previousWhiteMove.id[0] + (numIndex - 1);
                let id3 = String.fromCharCode(charIndex+1) + (numIndex - 1);
                dummyBoard = Object.assign({}, current_setup);
                if(pos.id == id2 && id == pos.id){
                    dummyBoard[piece.id] = id;
                    dummyBoard[previousWhiteMove.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        enPassant = true;
                        return true;                 
                    }
                }
                dummyBoard = Object.assign({}, current_setup);
                if(id3 == id2 && id2 == pos.id){
                    dummyBoard[piece.id] = id;
                    dummyBoard[previousWhiteMove.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        enPassant = true;
                        return true;                 
                    }
                }
                dummyBoard = Object.assign({}, current_setup);
                let id4 = currPos[0] + (numIndex - 1);
                if(id4 == pos.id && pos.children.length == 0) {
                    dummyBoard[piece.id] = id4;
                    if(!IsKingInCheck(dummyBoard)){                        
                        return true;                 
                    }
                }
            }            
            else {
                let id = currPos[0] + (numIndex -1);
                if(numIndex-1 == 1){
                    dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece.id] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        promoteBlackPawn = true;
                    }
                }
                dummyBoard = Object.assign({}, current_setup);
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }
            }
        }
        return false;
    }
    else if(piece.id == "wP1" || piece.id == "wP2" || piece.id == "wP3" || piece.id == "wP4" ||
     piece.id == "wP5" || piece.id == "wP6" || piece.id == "wP7" || piece.id == "wP8"){        
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        previousWhiteMove = undefined;
        if(pos.children.length != 0){
            dummyBoard = Object.assign({}, current_setup);
            if(charIndex + 1 <=104){
                let id2 = String.fromCharCode(charIndex+1) + (numIndex + 1);
                if(id2 == pos.id){
                    dummyBoard[piece.id] = pos.id;
                    dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        if(numIndex + 1 == 8)
                            promoteWhitePawn = true;
                        return true;                 
                    }
                }
            } 
            dummyBoard = Object.assign({}, current_setup);
            if(charIndex - 1 >=97) {
                let id = String.fromCharCode(charIndex-1) + (numIndex + 1);
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        if(numIndex + 1 == 8)
                            promoteWhitePawn = true;
                        return true;                 
                    }
                }
            }
        } else {
            if(numIndex == 2){
                let id = currPos[0] + (numIndex +1);
                let id2 = currPos[0] + (numIndex + 2);
                dummyBoard = Object.assign({}, current_setup);
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }
                dummyBoard = Object.assign({}, current_setup);
                dummyBoard[piece.id] = id2;           
                if($(id).children.length == 0 && $(id2).children.length == 0 && id2 == pos.id && !IsKingInCheck(dummyBoard))
                {
                    previousWhiteMove = pos;
                    return true;
                }
            } 
            else if(numIndex == 5 && previousBlackMove  && previousBlackMove.nodeType && Number((previousBlackMove.id)[1]) == 5){
                let id = String.fromCharCode(charIndex-1) + (numIndex + 1);
                let id2 = previousBlackMove.id[0] + (numIndex + 1);
                let id3 = String.fromCharCode(charIndex+1) + (numIndex + 1);
                dummyBoard = Object.assign({}, current_setup);
                if(id == id2 && id == pos.id){
                    dummyBoard[piece.id] = id;
                    dummyBoard[previousBlackMove.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        enPassant = true;
                        return true;             
                    }                    
                }
                dummyBoard = Object.assign({}, current_setup);
                if(id3 == id2 && id2 == pos.id){
                    dummyBoard[piece.id] = id;
                    dummyBoard[previousBlackMove.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        enPassant = true;
                        return true;                 
                    }
                }
                dummyBoard = Object.assign({}, current_setup);
                let id4 = currPos[0] + (numIndex +1);
                if(id4 == pos.id && pos.children.length == 0) {
                    dummyBoard[piece.id] = id4;
                    if(!IsKingInCheck(dummyBoard)){                        
                        return true;                 
                    }
                }
            } 
            else {
                let id = currPos[0] + (numIndex + 1);
                if(numIndex+1 == 8){
                    dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece.id] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        promoteWhitePawn = true;          
                    }
                }
                dummyBoard = Object.assign({}, current_setup);
                if(id == pos.id) {
                    dummyBoard[piece.id] = id;
                    if(!IsKingInCheck(dummyBoard)){
                        if(numIndex + 1 == 8)
                            promoteWhitePawn = true;
                        return true;                 
                    }
                }
            }
        }
        return false;        
    }
    else if(piece.id == "bBw" || piece.id == "bBb" || piece.id == "wBb" || piece.id == "wBw" 
            || piece.id.substring(0,3) == "b_B" || piece.id.substring(0,3) == "w_B"){
        previousBlackMove = undefined;
        previousWhiteMove = undefined;
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        dummyBoard = Object.assign({}, current_setup);
        while(charIndex < 104){
            if(numIndex == 1)break;
            charIndex++;
            numIndex--;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id != pos.id && $(id).children.length != 0)
                    break;
            if(id == pos.id){
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }
        }
        dummyBoard = Object.assign({}, current_setup);
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 8) break;
            charIndex++;
            numIndex++;            
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id != pos.id && $(id).children.length != 0)
                break;
            if(id == pos.id){
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }             
        }
        dummyBoard = Object.assign({}, current_setup);
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 1) break;
            charIndex--;
            numIndex--;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id != pos.id && $(id).children.length != 0)
                    break;
            if(id == pos.id){
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }             
        }
        dummyBoard = Object.assign({}, current_setup);
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 8 ) break;
            charIndex--;
            numIndex++;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id == pos.id){
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }             
            if(id != pos.id && $(id).children.length != 0)
                break;
        }
        return false;
    }
    else if(piece.id == "bQ" || piece.id == "wQ" ||
            piece.id.substring(0,3) == "b_Q" || piece.id.substring(0,3) == "w_Q"){
        previousBlackMove = undefined;
        previousWhiteMove = undefined;
        let currPos = current_setup[piece.id];
        let temp = Number(currPos[1]);
        dummyBoard = Object.assign({}, current_setup);      
        while(temp > 0 ){
            if(Number(currPos[1]) != temp){
                let id = currPos[0]+temp.toString();
                if(id != pos.id && $(id).children.length != 0)
                    break;
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }                 
            }
            temp--;
        }
        dummyBoard = Object.assign({}, current_setup);
        let temp2 = Number(currPos[1]);
        while(temp2 < 9 ){
            if(Number(currPos[1]) != temp2){
                let id = currPos[0]+temp2.toString();
                if(id != pos.id && $(id).children.length != 0)
                    break;
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }                 
            }
            temp2++;
        }
        dummyBoard = Object.assign({}, current_setup);
        let index = currPos[0].charCodeAt(0);
        while(index >96){
            if(currPos[0].charCodeAt(0) != index){
                let id =  String.fromCharCode(index)+currPos[1];
                if(id != pos.id && $(id).children.length != 0)
                    break;
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }
                 
            }            
            index--;
        }
        dummyBoard = Object.assign({}, current_setup);
        let index2 = currPos[0].charCodeAt(0);
        while(index2 < 105){
            if(currPos[0].charCodeAt(0) != index2){
                let id =  String.fromCharCode(index2)+currPos[1];
                if(id != pos.id && $(id).children.length != 0)
                    break;
                if(id == pos.id){
                    dummyBoard[piece.id] = id;
                    if(pos.children.length != 0)
                        dummyBoard[pos.children[0].id] = "x";
                    if(!IsKingInCheck(dummyBoard)){
                        return true;                 
                    }
                }                 
            }            
            index2++;
        }
        dummyBoard = Object.assign({}, current_setup);
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 1)break;
            charIndex++;
            numIndex--;                     
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id != pos.id && $(id).children.length != 0)
                break;
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }
             
        }
        dummyBoard = Object.assign({}, current_setup);
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex < 104){
            if(numIndex == 8)break;
            charIndex++;
            numIndex++;                      
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id != pos.id && $(id).children.length != 0)
                break;
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            } 
        }
        dummyBoard = Object.assign({}, current_setup);
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 1)break;
            charIndex--;
            numIndex--;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id != pos.id && $(id).children.length != 0)
                break;
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }             
        }
        dummyBoard = Object.assign({}, current_setup);
        numIndex = Number(currPos[1]);
        charIndex = currPos[0].charCodeAt(0);
        while(charIndex > 97){
            if(numIndex == 8 )break;
            charIndex--;
            numIndex++;
            let id =  String.fromCharCode(charIndex) + (numIndex);
            if(id != pos.id && $(id).children.length != 0)
                break;
            if(id == pos.id){
                dummyBoard[piece.id] = id;
                if(pos.children.length != 0)
                    dummyBoard[pos.children[0].id] = "x";
                if(!IsKingInCheck(dummyBoard)){
                    return true;                 
                }
            }             
        }
        return false;
    }
    else if(piece.id == "bK" || piece.id == "wK" ){
        previousBlackMove = undefined;
        previousWhiteMove = undefined;
        let currPos = current_setup[piece.id];
        let numIndex = Number(currPos[1]);
        let charIndex = currPos[0].charCodeAt(0);
        dummyBoard = Object.assign({}, current_setup);
        if(charIndex + 1 <= 104){
            let id =  String.fromCharCode(charIndex+1) + (numIndex);            
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            }
        }        
        if(charIndex - 1 >= 97){
            let id =  String.fromCharCode(charIndex-1) + (numIndex);
            dummyBoard = Object.assign({}, current_setup);
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            }
        }
        if(numIndex + 1 <= 8){
            let id =  String.fromCharCode(charIndex) + (numIndex+1);
            dummyBoard = Object.assign({}, current_setup);
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            }
        }        
        if(numIndex - 1 >= 1){
            let id =  String.fromCharCode(charIndex) + (numIndex-1);
            dummyBoard = Object.assign({}, current_setup);
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            }
        }
        if(charIndex + 1 <= 104 && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex+1) + (numIndex+1);
            dummyBoard = Object.assign({}, current_setup);
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            }
        }
        if(charIndex + 1 <= 104 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex+ 1) + (numIndex-1);
            dummyBoard = Object.assign({}, current_setup);
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            }
        }
        if(charIndex - 1  >= 97  && numIndex+1 <= 8){
            let id =  String.fromCharCode(charIndex-1) + (numIndex+1);
            dummyBoard = Object.assign({}, current_setup);
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            } 
        }
        if(charIndex - 1 >= 97 && numIndex-1 >= 1){
            let id =  String.fromCharCode(charIndex-1) + (numIndex-1);
            dummyBoard = Object.assign({}, current_setup);
            if(id == pos.id) {
                dummyBoard[piece.id] = id;
                if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id))
                    return true;
            }
        }
        if(piece.id == "bK" && !Moved_castle["bK"]){
            if(!Moved_castle["bRb"]){
                if($("f8").children.length == 0 && $("g8").children.length==0){
                    let id2 =  String.fromCharCode(charIndex+1) + (numIndex);
                    dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece.id] = id2;
                    if(IsKingInCheck(dummyBoard)) return false;
                    let id =  String.fromCharCode(charIndex+2) + (numIndex);
                    dummyBoard = Object.assign({}, current_setup);
                    if(id == pos.id){
                        if(IsKingInCheck(dummyBoard)) return false;
                        dummyBoard["bK"] = id;
                        dummyBoard["bRb"] = "f8";
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            blackCastle = true;
                            bcRight = true;
                            return true;
                        }
                    }                                
                }
            } 
            if(!Moved_castle["bRw"]){
                if($("d8").children.length == 0 && $("c8").children.length ==0 && $("b8").children.length ==0){
                    let id2 =  String.fromCharCode(charIndex-1) + (numIndex);
                    dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece.id] = id2;
                    if(IsKingInCheck(dummyBoard)) return false;
                    let id =  String.fromCharCode(charIndex-2) + (numIndex);
                    dummyBoard = Object.assign({}, current_setup);
                    if(id == pos.id){
                        if(IsKingInCheck(dummyBoard)) return false;
                        dummyBoard["bK"] = id;
                        dummyBoard["bRw"] = "d8";
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            blackCastle = true;
                            bcLeft = true;
                            return true;
                        }
                    }                      
                }
            }
        } else if(piece.id == "wK" && !Moved_castle["wK"]){
            if(!Moved_castle["wRw"]){
                if($("f1").children.length == 0 && $("g1").children.length==0){
                    let id2 =  String.fromCharCode(charIndex+1) + (numIndex);
                    dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece.id] = id2;
                    if(IsKingInCheck(dummyBoard)) return false;
                    let id =  String.fromCharCode(charIndex+2) + (numIndex); 
                    dummyBoard = Object.assign({}, current_setup);
                    if(id == pos.id){
                        if(IsKingInCheck(dummyBoard)) return false;
                        dummyBoard["wK"] = id;
                        dummyBoard["wRw"] = "f1";
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            whiteCastle = true;
                            wcRight = true;
                            return true;
                        }
                    }                    
                }
            }
            if(!Moved_castle["wRb"]){
                if($("d1").children.length == 0 && $("c1").children.length ==0 && $("b1").children.length ==0){
                    let id2 =  String.fromCharCode(charIndex-1) + (numIndex);
                    dummyBoard = Object.assign({}, current_setup);
                    dummyBoard[piece.id] = id2;
                    if(IsKingInCheck(dummyBoard)) return false;
                    let id =  String.fromCharCode(charIndex-2) + (numIndex);
                    dummyBoard = Object.assign({}, current_setup);
                    if(id == pos.id){
                        if(IsKingInCheck(dummyBoard)) return false;
                        dummyBoard["wK"] = id;
                        dummyBoard["wRb"] = "d1";
                        if(!IsKingInCheck(dummyBoard) && !isKingProtectingTheSquare(id)){
                            whiteCastle = true;
                            wcLeft = true;
                            return true;
                        }
                    }
                }
            }
        } 
        return false;        
    }
    return false;    
}
let removePiece = "";
let piece_capture = false;
function canMoveTo(elem){
    if(elem.children.length == 0 && canBeTaken(elem) ){
        if(enPassant == true){
            if(TURN == "white"){
                current_setup[previousBlackMove.children[0].id] = "x";
                $("blackTaken").appendChild(previousBlackMove.children[0]);
                previousBlackMove = undefined;
                previousWhiteMove = undefined;
            } else {
                current_setup[previousWhiteMove.children[0].id] = "x";
                $("whiteTaken").appendChild(previousWhiteMove.children[0]);
                previousBlackMove = undefined;
                previousWhiteMove = undefined;
            }
            enPassant = false;            
        }
        if(whiteCastle){
            if(wcLeft){
                $("d1").appendChild($("wRb"));
                Moved_castle["wRb"] = true;
                current_setup["wRb"] = "d1";
                removePiece = "O-O-O";
            } else if(wcRight){
                $("f1").appendChild($("wRw"));
                current_setup["wRw"] = "f1";
                Moved_castle["wRw"] = true;
                removePiece = "O-O";
            }
            whiteCastle = false;            
        }
        if(blackCastle){
            if(bcLeft){
                $("d8").appendChild($("bRw"));
                current_setup["bRw"] = "d8";
                Moved_castle["bRw"] = true;
                removePiece = "O-O-O";
            } else if(bcRight){
                $("f8").appendChild($("bRb"));
                current_setup["bRb"] = "f8";
                Moved_castle["bRb"] = true;
                removePiece = "O-O";
            }
            blackCastle = false;
        }
        return true;
    }
    else if(elem.children.length != 0 ) {
        if(white_pieces.includes(elem.children[0].id,0) && TURN == "white"){
            return false;
        } else if(white_pieces.includes(elem.children[0].id,0) && TURN == "black" && canBeTaken(elem)){
            removePiece = elem.children[0].id;
            current_setup[elem.children[0].id] = "x"; 
            $("whiteTaken").appendChild(elem.children[0]);
            console.log("Black takes white piece.");
            piece_capture = true;
            return true;
        } else if(black_pieces.includes(elem.children[0].id,0) && TURN == "black"){
            return false;
        } else if(black_pieces.includes(elem.children[0].id,0) && TURN == "white" && canBeTaken(elem)){
            removePiece = elem.children[0].id;
            current_setup[elem.children[0].id] = "x"; 
            $("blackTaken").appendChild(elem.children[0]);
            console.log("White takes black piece.");
            piece_capture = true;
            return true;           
        }
    } 
    else {
        console.log("Piece can't be taken");
    }
    return false;
}
let Black_KingInCheck = false;
let White_KingInCheck = false;
let promoteBlackPawnTo;
let promoteWhitePawnTo;
function movePiece(elem) {
    if(GAME_OVER) return;
    if( selected  && selected.nodeType )
    { 
        if(elem.id == current_setup[selected.id]) return;      
        removeHighlight(selected);
        let prevWKingPos = current_setup["wK"];
        let prevBKingPos = current_setup["bK"];
        if(white_pieces.includes(selected.id,0) && TURN == "white" && canMoveTo(elem)){        
            TURN = "black";            
            let moveNote = selected.id;
            $('white-turn').style.display = "none";
            $('black-turn').style.display = "inline-block";           
            $(current_setup[selected.id]).classList.remove("selected");
            if(selected.id == "wK"){
                Moved_castle[selected.id] = true;
            }
            if(selected.id == "wRb" || selected.id == "wRw"){
                Moved_castle[selected.id] = true;
            }
            if(promoteWhitePawn){
                $("whiteTaken").appendChild(selected);                
                promoteWhitePawnTo = elem.id;
                current_setup[selected.id] = "x";
                $("prompt").style.display = "grid";
                $("whiteChoice").style.display = "block";
                $("blackChoice").style.display = "none";
                promoteWhitePawn = false;
            } else {                
                removeHighlight(selected);
                elem.appendChild(selected);
                current_setup[selected.id] = elem.id;
                moveNote = moveNote + elem.id;
            }
            if(removePiece != "" && removePiece != "O-O-O" && removePiece != "O-O"){
                moveNote = moveNote +"x"+ removePiece;
                removePiece = "";
            }
            console.log("Moved WhitePiece");            
            if(IsKingInCheck(Object.assign({}, current_setup))){
                $(current_setup["bK"]).classList.add("danger");
                moveNote = moveNote +"+";
            } else {
                $(prevWKingPos).classList.remove("danger");
            }
            if(removePiece == "O-O-O" || removePiece == "O-O"){
                moveNote = removePiece;
                removePiece = "";
            }
            if(selected.id.substring(0,2) == "wP" || piece_capture ){
                fiftfy_move_count = 0;
                piece_capture = false;
            } else {
                fiftfy_move_count++;                
            }
            let newRow = document.getElementById("move-template").content.cloneNode(true);
            newRow.querySelectorAll("td")[0].innerHTML = moveNote;
            document.getElementById("move-history").appendChild(newRow);
        } 
        else if(black_pieces.includes(selected.id,0)  && TURN == "black" && canMoveTo(elem)){    
            TURN = "white";
            let moveNote = selected.id;
            $('black-turn').style.display = "none";
            $('white-turn').style.display = "inline-block";
            
            $(current_setup[selected.id]).classList.remove("selected");
            if(selected.id == "bK"){
                Moved_castle[selected.id] = true;
            }
            if(selected.id == "bRb" || selected.id == "bRw"){
                Moved_castle[selected.id] = true;
            }
            if(promoteBlackPawn){
                $("whiteTaken").appendChild(selected); 
                promoteBlackPawnTo = elem.id;
                current_setup[selected.id] = "x";
                $("prompt").style.display = "grid";
                $("blackChoice").style.display = "block";
                $("whiteChoice").style.display = "none";
                promoteBlackPawn = false;
            } else {
                elem.appendChild(selected);
                current_setup[selected.id] = elem.id;
                moveNote = moveNote + elem.id;                 
            }
            if(removePiece != "" && removePiece != "O-O-O" && removePiece != "O-O"){
                moveNote = moveNote +"x"+ removePiece;
                removePiece = "";
            }
            console.log("Moved BlackPiece");
            if(IsKingInCheck(Object.assign({}, current_setup))){
                $(current_setup["wK"]).classList.add("danger");
                moveNote = moveNote + "+";
            } else {
                $(prevBKingPos).classList.remove("danger");                
            }
            if(removePiece == "O-O-O" || removePiece == "O-O"){
                moveNote = removePiece;
                removePiece = "";
            }
            if(selected.id.substring(0,2) == "bP" || piece_capture ){
                fiftfy_move_count = 0;
                piece_capture = false;
            } else {
                fiftfy_move_count++;                
            }
            document.querySelectorAll(".move:last-child")[0].getElementsByTagName('td')[1].innerHTML = moveNote;
        } 
        else {
            console.log("Move failed: ",selected.id," to ",elem.id);
        }
        check_fifty_move_rule();
        checkIfGameOver();
        if(checkInsufficientMaterial()){
            GAME_OVER = true;
            $('gameOverNotice').style.display = "block";
            $('gameOverNotice').children[0].innerHTML = "Insufficient Material!";
            alert("Insufficient Material!");
        }
    }  
}
function moveWhite(elem){
    if(GAME_OVER) return;
    if(TURN == "black") return;
    if(selected  && selected.nodeType )
    {
        if(selected.id == elem.id) {
            removeHighlight(selected);
            $(current_setup[selected.id]).classList.remove("selected");
            selected = undefined;  
            return;
        }
    }
    if(TURN == "white") {
        if( selected  && selected.nodeType ) {
            $(current_setup[selected.id]).classList.remove("selected");
            removeHighlight(selected);                   
        }
        selected = elem;
        $(current_setup[elem.id]).classList.add("selected");                
        addHighlight(elem);
    }       
}
function moveBlack(elem)
{
    if(GAME_OVER) return;
    if(TURN == "white") return;
    if( selected  && selected.nodeType ){
        if(selected.id == elem.id){
            removeHighlight(selected);
            $(current_setup[selected.id]).classList.remove("selected");
            selected = undefined;    
            return;
        }
    }
    if(TURN == "black"){
        if(selected  && selected.nodeType ) {
            $(current_setup[selected.id]).classList.remove("selected");
            removeHighlight(selected);                   
        }
        selected = elem;
        addHighlight(elem);
        $(current_setup[elem.id]).classList.add("selected");
    }
}
function promotePawn(selectedPiece){
    if(selectedPiece.id == "b_R" || selectedPiece.id == "b_B" || selectedPiece.id == "b_K" ||
     selectedPiece.id == "b_Q") {
        let newPiece = selectedPiece.cloneNode();
        newPiece.setAttribute('onclick','moveBlack(this)');
        let id = selectedPiece.id+promoted_counter[selectedPiece.id][0];
        promoted_counter[selectedPiece.id][0]++;
        newPiece.setAttribute('id', id);
        newPiece.innerHTML = promoted_counter[selectedPiece.id][1];       
        newPiece.classList.remove(selectedPiece.id);
        $(promoteBlackPawnTo).appendChild(newPiece);
        black_pieces.push(id);
        current_setup[id] = promoteBlackPawnTo;
        selected = undefined;
        document.querySelectorAll(".move:last-child")[0].getElementsByTagName('td')[1].innerHTML += "=";
        document.querySelectorAll(".move:last-child")[0].getElementsByTagName('td')[1].innerHTML += id;
    } else if(selectedPiece.id == "w_Q" || selectedPiece.id == "w_R" || selectedPiece.id == "w_K" ||
     selectedPiece.id == "w_Q") {
        let id = selectedPiece.id+promoted_counter[selectedPiece.id][0];
        promoted_counter[selectedPiece.id][0]++;
        let newPiece = selectedPiece.cloneNode();
        newPiece.setAttribute('onclick','moveWhite(this)');
        newPiece.setAttribute('id', id);
        newPiece.innerHTML = promoted_counter[selectedPiece.id][1];
        newPiece.classList.remove(selectedPiece.id);
        $(promoteWhitePawnTo).appendChild(newPiece);
        white_pieces.push(id);
        current_setup[id] = promoteWhitePawnTo;
        selected = undefined;
        document.querySelectorAll(".move:last-child")[0].getElementsByTagName('td')[0].innerHTML += "=";
        document.querySelectorAll(".move:last-child")[0].getElementsByTagName('td')[0].innerHTML += id;
    }
    $("prompt").style.display = "none";
}
function check_fifty_move_rule(){
    if(fiftfy_move_count == 50){
        GAME_OVER = true;
        $('gameOverNotice').style.display = "block";
        $('gameOverNotice').children[0].innerHTML = "Game draw! by 50 move rule.";
        alert("Game draw! by 50 move rule.");
    }
}
const black_resign = $('black-resign');
const white_resign = $('white-resign');
const black_draw = $('black-draw');
const white_draw = $('white-draw');
const agree_draw = $('agree-draw');
const disagree_draw = $('disagree-draw');
const restart_game = $('restart');
let white_wants_draw = false;
let black_wants_draw = false;
black_resign.onclick = function() {
    if(GAME_OVER) return;
    GAME_OVER = true;
    $('gameOverNotice').style.display = "block";
    $('gameOverNotice').children[0].innerHTML = "Player Resigned!";
    alert("Game over! Black Player resigned!");    
}
white_resign.onclick = function() {
    if(GAME_OVER) return;
    console.log("white resigned");
    GAME_OVER = true;
    $('gameOverNotice').style.display = "block";
    $('gameOverNotice').children[0].innerHTML = "White Player Resigned!";
    alert("Game over! White Player resigned!");    
}
black_draw.onclick = function() {
    if(GAME_OVER) return;
    if(!black_wants_draw){
        black_wants_draw = true;
        $('draw-notice').style.display = "block"; 
        $('resigning-player').innerHTML = "Black wants a draw?"; 
    }
}
white_draw.onclick = function() {
    if(GAME_OVER) return;
    if(!white_wants_draw){
        white_wants_draw = true;
        $('draw-notice').style.display = "block"; 
        $('resigning-player').innerHTML = "White wants to draw?"; 
    }
}
agree_draw.onclick = function() {
    if(GAME_OVER) return;  
    $('draw-notice').style.display = "none"; 
    if(white_wants_draw || black_wants_draw){
        GAME_OVER = true;
        alert("Game drawn by agreement!");
    }
}
disagree_draw.onclick = function() {
    if(GAME_OVER) return;
    $('draw-notice').style.display = "none"; 
    white_wants_draw = false;
    black_wants_draw = false;
    alert("Draw request declined.");
}
restart_game.onclick = function() {
    TURN = "white";
    $('black-turn').style.display = "none";
    GAME_OVER = false;
    fiftfy_move_count = 0;
    Moved_castle = {
        "wK": false,
        "wRw": false,
        "wRb": false,
        "bK": false,
        "bRw": false,
        "bRb": false
    }
    black_pieces =["bP1","bP2","bP3","bP4","bP5","bP6",
                    "bP7","bP8","bRb","bKb","bBb","bQ","bK","bBw","bKw","bRw"];
    white_pieces =["wRw","wKw","wBw","wQ","wK","wBb",
                    "wKb","wRb","wP1","wP2","wP3","wP4","wP5","wP6","wP7","wP8"];
    current_setup ={
        'wRb': "a1",
        "wKw": "b1",
        "wBb": "c1",
        "wQ": "d1",
        "wK": "e1",
        "wBw": "f1",
        "wKb": "g1",
        "wRw": "h1",
        'wP1': "a2",
        "wP2": "b2",
        "wP3": "c2",
        "wP4": "d2",
        "wP5": "e2",
        "wP6": "f2",
        "wP7": "g2",
        "wP8": "h2",
        'bP1': "a7",
        "bP2": "b7",
        "bP3": "c7",
        "bP4": "d7",
        "bP5": "e7",
        "bP6": "f7",
        "bP7": "g7",
        "bP8": "h7",
        'bRw': "a8",
        "bKb": "b8",
        "bBw": "c8",
        "bQ": "d8",
        "bK": "e8",
        "bBb": "f8",
        "bKw": "g8",
        "bRb": "h8"
    };
    promoted_counter = {
        "w_R" : [0,"&#9814"],
        "w_K" : [0,"&#9816"],
        "w_B" : [0,"&#9815"],
        "w_Q" : [0,"&#9813"],
        "b_R" : [0, "&#9820"],
        "b_K" : [0, "&#9822"],
        "b_B" : [0, "&#9821"],
        "b_Q" : [0, "&#9819"]
    };
    selected = undefined;
    previousBlackMove = undefined;
    previousWhiteMove = undefined;
    enPassant = false;
    blackCastle = false;
    whiteCastle = false;
    bcRight = false;
    bcLeft = false;
    wcRight = false;
    wcLeft = false;
    promoteBlackPawn = false;
    promoteWhitePawn = false;
    removePiece = "";
    piece_capture = false;
    Black_KingInCheck = false;
    White_KingInCheck = false;
    promoteBlackPawnTo = undefined;
    promoteWhitePawnTo = undefined;
    $('prompt').style.display = "none";
    $('gameOverNotice').style.display = "none";
    $('draw-notice').style.display = "none"; 
    white_wants_draw = false;
    black_wants_draw = false;
    for(let pos of VALID_POSITIONS){
        if($(pos).children.length != 0){
            $('whiteTaken').appendChild($(pos).children[0]);
            $(pos).classList.remove("select");
            $(pos).classList.remove("highlight");
            $(pos).classList.remove("danger");
        }
    }
    for(let key in current_setup){
        $(current_setup[key]).appendChild($(key));
    }
    $('whiteTaken').replaceChildren();
    $('blackTaken').replaceChildren();
    alert("Resetting game");}