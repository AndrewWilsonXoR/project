let arr =[];
for (let i=0; i < 64; i++){
    
    let boxes = document.createElement("div")
    boxes.style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? 'grey' : 'white' ; 
    document.querySelector(".mainChessBoard").append(boxes)
    arr.push(boxes)
}
 
let wpawn1 = arr[48];
let wpawn2 = arr[49];
let wpawn3 = arr[50];
let wpawn4 = arr[51];
let wpawn5 = arr[52];
let wpawn6 = arr[53];
let wpawn7 = arr[54];
let wpawn8 = arr[55];

for (let i =0; i < 8; i++){
    arr[i].innerHTML = "logged"
    
}
for (let i =8; i < 16; i++){
    arr[i].innerHTML = "logged"
    
}
for (let i =48; i < 56; i++){ 
    let img = document.createElement("img");
    img.setAttribute("id" , "wpawn");
    img.src = "https://www.shareicon.net/data/512x512/2015/09/27/108207_game_512x512.png";
    wpawn1.append(img);
    wpawn2.append(img);
    wpawn3.append(img);
    wpawn4.append(img);
    wpawn5.append(img);
    wpawn6.append(img);
    wpawn7.append(img);
    wpawn8.append(img);
    
}for (let i =56; i < 64; i++){
    arr[i].innerHTML = "logged"
}
let turn = 'white';
let game_over = false;
let fifty_move_count = 0;
let valid_positions = ["a1","b1","c1","d1","e1","f1","g1","h1","a2","b2","c2","d2","e2","f2","g2","h2","a3","b3","c3","d3","e3","f3","g3","h3","a4","b4","c4","d4","e4","f4","g4","h4","a5","b5","c5","d5","e5","f5","g5","h5","a6","b6","c6","d6","e6","f6","g6","h6","a7","b7","c7","d7","e7","f7","g7","h7","a8","b8","c8","d8","e8","f8","g8","h8"];
let moved_castle = {
    "wk": false,
    "wrw": false,
    "wrb": false,
    "bk": false,
    "brb": false,
}
let black_pieces =["bp1","bp2","bp3","bp4","bp5","bp6","bp7","bp8","brb","bkb","bbb","bq","bk","bbw","bkw","brw"];
let white_pieces =["wp1","wp2","wp3","wp4","wp5","wp6","wp7","wp8","wrw","wkw","wbw","wq","wk","wbb","wkb","wrb"];
let starting_position ={
    'wrb': "a1",
    "wkw": "b1",
    "wbb": "c1",
    "wq": "d1",
    "wk": "e1",
    "wbw": "f1",
    "wkb": "g1",
    "wrw": "h1",
    "wp1": "a2",
    "wp2": "b2",
    "wp3": "c2",
    "wp4": "d2",
    "wp5": "e2",
    "wp6": "f2",
    "wp7": "g2",
    "wp8": "h2",
    "bp1": "a7",
    "bp2": "b7",
    "bp3": "c7",
    "bp4": "d7",
    "bp5": "e7",
    "bp6": "f7",
    "bp7": "g7",
    "bp8": "h7",
    "brw": "a8",
    "bkb": "b8",
    "bbw": "c8",
    "bq": "d8",
    "bk": "e8",
    "bbb": "f8",
    "bkw": "g8",
    "brb": "h8"
};
let promoted_counter = {
    "w_r" : [0,"&#9814"],
    "w_k" : [0,"&#9816"],
    "w_b" : [0,"&#9815"],
    "w_q" : [0,"&#9813"],
    "b_r" : [0,"&#9820"],
    "b_k" : [0,"&#9822"],
    "b_b" : [0,"&#9821"],
    "b_q" : [0,"&#9819"]
};
let $ = function( id ) { return document.getElementById( id); };
$('black-turn').style.display = "none";
function addHighlight(piece){
    if(piece.id == "brw" || piece.id == "brb" || piece.id == "wrw" || piece.id == "wrb"
        || piece.id.substring(0,3) == "w_r" || piece.id.substring(0,3) == "b_r"){
            let currPos = starting_position[piece.id];
            let temp = Number(currPos[1]);
            while(temp > 0){
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
            while(temp2 < 9){
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
            while(index > 96){
                if(currPos[0].charCodeAt(0) != index){
                    let id = String.fromCharCode(index)+currPos[1];
                    if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                    else
                        break;
                }
                index--;
            }
            let index2 = currPos[0].charCodeAt(0);
            while(index2 < 105){
                if(currPos[0].charCodeAt(0) != index2){
                    let id = String.fromCharCode(index2)+currPos[1];
                    if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                    else
                        break;
                }
                index2++;
            }
        }
        else if(piece.id == "bkw" || piece.id == "bkb" || piece.id == "wkw" || piece.id == "wkb"
            || piece.id.substring(0,3) == "w_k" || piece.id.substring(0,3) == "b_k"){
                let currPos = starting_position[piece.id];
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
            else if(piece.id == "bp1" || piece.id == "bp2" || piece.id == "bp3" || piece.id == "bp4" || piece.id == "bp5" || piece.id == "bp6" || piece.id == "bp7" || piece.id == "bp8"){
                let currPos = starting_positing[piece.id];
                let numIndex = Number(currPos[1]);
                if(numIndex == 7){
                    let id = currPos[0] + (numIndex -1);
                    let id2 = currPos[0] + (numIndex - 2);
                    if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                    if($(id).children.length == 0 && $(id2).children.length == 0)
                    $(id2).classList.add("highlight");
                } else {
                    let id = currPos[0] + (numIndex - 1);
                    if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                }
            }
            else if(piece.id == "wp1" || piece.id == "wp2" || piece.id == "wp3" || piece.id == "wp4" || piece.id == "wp5" || piece.id == "wp6" || piece.id == "wp7" || piece.id == "wp8"){
                let currPos = starting_positing[piece.id];
                let numIndex = Number(currPos[1]);
                if(numIndex == 2){
                    let id = currPos[0] + (numIndex +1);
                    let id2 = currPos[0] + (numIndex + 2);
                    if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                    if($(id).children.length == 0 && $(id2).children.length == 0)
                    $(id2).classList.add("highlight");
                } else {
                    let id = currPos[0] + (numIndex - 1);
                    if($(id).children.length == 0)
                    $(id).classList.add("highlight");
                }
            }
            else if(piece.id == "bbw" || piece.id == "bbw" || piece.id == "wbb" || piece.id == "wbw" || piece.id.substring(0,3) == "w_b" || piece.id.substring(0,3) == "b_b"){
                let currPos = starting_position[piece.id];
                let numIndex = Number(currPos[1]);
                let charIndex = currPos[0].charCodeAt(0);
            while(charIndex < 104){
                if(numIndex == 1)break;
                charIndex++;
                numIndex--;
                let id = String.fromCharCode(charIndex) + (numIndex);
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
                let id = String.fromCharCode(charIndex) + (numIndex);
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
                let id = String.fromCharCode(charIndex) + (numIndex);
                if($(id).children.length == 0)
                $(id).classList.add("highlight");
                else break
            }
            numIndex = Number(currPos[1]);
            charIndex = currPos[0].charCodeAt(0);
            while(charIndex > 97){
                if(numIndex == 8)break;
                charIndex--;
                numIndex++;
                let id = String.fromCharCode(charIndex) + (numIndex);
                if($(id).children.length == 0)
                $(id).classList.add("highlight");
                else break;
            }
            }
            else if(piece.id == "bq" || piece.id == "wq" ||
                piece.id.substring(0,3) == "w_q" || piece.id.substring(0,3) == "b_q"){
                    let currPos = starting_position[piece.id];
                    let temp = Number(currPos[1]);
                    while(temp > 0){
                        if(Number(currPos[1]) != temp){
                            let id = currPos[0]+temp.toString();
                            if($(id).children.length == 0)
                            $(id).classList.add("highlight");
                            else break;
                        }
                        temp--;
                    }
                    let temp2 = Number(currPos[1]);
                    while(temp2 < 9){
                        if(Number(currPos[1]) != temp2){
                            let id = currPos[0]+temp2.toString();
                            if($(id).children.length == 0)
                            $(id).classList.add("highlight");
                            else break;
                        }
                        temp2++;
                    }
                    let index = currPos[0].charCodeAt(0);
                    while(index > 96){
                        if(currPos[0].charCodeAt(0) != index){
                            let id = String.fromCharCode(index)+currPos[1];
                            if($(id).children.length == 0)
                            $(id).classList.add("highlight");
                            else break;
                        }
                        index--;
                    }
                    let index2 = currPos[0].charCodeAt(0);
                    while(index2 < 105){
                        if(currPos[0].charCodeAt(0) != index2){
                            let id = String.fromCharCode(index2)+currPos[1];
                            if($(id).children.length == 0)
                            $(id).classList.add("highligh");
                            else break
                        }
                        index2++;
                    }
                    numIndex = Number(currPos[1]);
                    charIndex = currPos[0].charCodeAt(0);
                    while(charIndex < 104){
                        if(numIndex == 1)break;
                        charIndex++;
                        numIndex--;
                        let id = String.fromCharCode(charIndex) + (numIndex);
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
                        let id = String.fromCharCode(charIndex) + (numIndex);
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
                        let id = String.fromCharCode(charIndex) + (numIndex);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                        else break;
                    }
                    numIndex = Number(currPos[1]);
                    charIndex = currPos[0].charCodeAt(0);
                    while(charIndex > 97){
                        if(numIndex == 8)break;
                        charIndex--;
                        numIndex++;
                        let id = String.fromCharCode(charIndex) + (numIndex);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                        else break;
                    }
                }
                else if(piece.id == "bk" || piece.id == "wk"){
                    let currPos = starting_position[piece.id];
                    let numIndex = Number(currPos[1]);
                    let charIndex = currPos[0].charCodeAt(0);
                    if(charIndex + 1 <= 104){
                        let id = String.fromCharCode(charIndex+1) + (numIndex);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(charIndex - 1 >= 97){
                        let id = String.fromCharCode(charIndex-1) + (numIndex);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(numIndex + 1 <= 8){
                        let id = String.fromCharCode(charIndex) + (numIndex+1);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight")
                    }
                    if(numIndex - 1 >= 1){
                        let id = String.fromCharCode(charIndex) + (numIndex-1);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(charIndex + 1 <= 104 && numIndex+1 <= 8){
                        let id = String.fromCharCode(charIndex+1) + (numIndex+1);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(charIndex + 1 <= 104 && numIndex-1 >=1){
                        let id = String.fromCharCode(charIndex+1) + (numIndex-1);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(charIndex - 1 >= 97 && numIndex+1 <= 8){
                        let id = String.fromCharCode(charIndex-1) + (numIndex+1);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(charIndex - 1 >= 97 && numIndex-1 >= 1){
                        let id = String.fromCharCode(charIndex-1) + (numIndex-1);
                        if($(id).children.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(charIndex - 1 >= 97 && numIndex-1 >= 1){
                        let id = String.fromCharCode(charIndex-1) + (numIndex-1);
                        if($(id).character.length == 0)
                        $(id).classList.add("highlight");
                    }
                    if(piece.id == "bk" && !Moved_castle["bk"]){
                        if(!Moved_castle["brb"] && starting_position["brb"]!= "x"){
                            if($("f8").children.length == 0 && $("g8").children.length == 0){
                                let id = String.fromCharCode(charIndex+2) + (numIndex);
                                $(id).classList.add("highlight");
                            }
                        }
                        if(!Moved_castle["brw"] && starting_position["brw"]!= "x"){
                            if($("d8").children.length == 0 && $("c8").children.length ==0 && $("b8").children.length ==0){
                                let id = String.fromCharCode(charIndex-2) + (numIndex);
                                $(id).classList.add("highlight");
                            }
                        }
                    } else if(piece.id == "wk" && !Moved_castle["wk"]){
                        if(!Moved_castle["wrw"]&& starting_position["wrw"]!= "x"){
                            if($("f1").children.length == 0 && $("g1").children.length ==0){
                                let id = String.fromCharCode(charIndex+2) + (numIndex);
                                $(id).classList.add("highlight");
                            }
                        }
                        if(!Moved_castle["wrb"] && starting_position["wrb"]!= "x"){
                            if($("d1").children.length == 0 && $("c1").children.length == 0 && $("b1").children.length ==0){
                                let id = String.fromCharCode(charIndex-2) + (numIndex);
                                $(id).classList.add("highlight");
                            }
                        }
                    }

                }
}
function removeHighlight(piece){
    $(starting_position[selected.id]).classList.remove("selected");
    if(piece.id == "brw" || piece.id == "brb" || piece.id == "wrw" || piece.id == "wrb" || piece.id.substring(0,3) == "w_r" || piece.id.substring(0,3) == "b_r"){
            let currPos = starting_position[piece.id];
            let temp = Number(currPos[1]);
            while(temp > 0){
                if(Number(currPos[1]) != temp){
                    let id = currPos[0]+temp.toString();
                    if($(id).children.length != 0) break;
                    $(id).classList.remove("highlight");
                }
                temp--;
            }
            let temp2 = Number(currPos[1]);
            while(temp2 < 9){
            if(Number(currPos[1]) != temp2){
                let id = currPos[0]+temp2.toString();
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            temp2++;
            }
            let index = currPos[0].charCodeAt(0);
            while (index >96){
            if(currPos[0].charCodeAt(0) != index){
                let id = String.fromCharCode(index)+currPos[1];
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            index--;
            }
            let index2 = currPos[0].charCodeAt(0);
            while(index2 < 105){
            if(currPos[0].charCodeAt(0) != index2){
                let id = String.fromCharCode(index2)+currPos[1];
                if($(id).children.length != 0) break;
                $(id).classList.remove("highlight");
            }
            index2++;
            }
        }else if (piece.id == "bkw" || piece.id == "bkb" || piece.id == "wkw" || piece.id == "wkb" || piece.id.substring(0,3) == "w_k" || piece.id.substring(0,3) == "b_k"){
            let currPos = starting_position[piece.id];
            let numIndex = Number(currPos[1]);
            let charIndex = currPos[0].charCodeAt(0);
            if(charIndex - 1 >= 97 && numIndex +2 <= 8){
                let id = String.fromCharCode(charIndex-1)+(numIndex +2);
                $(id).classList.remove("highlight");
            }
            if(charIndex + 1 <= 104 && numIndex + 2 <= 8){
                let id = String.fromCharCode(charIndex+1)+(numIndex +2);
                $(id).classList.remove("highlight");
            }
            if(charIndex - 1 >= 97 && numIndex - 2 >= 1){
                let id = String.fromCharCode(charIndex-1)+(numIndex-2);
                $(id).classList.remove("highlight");
            }
            if(charIndex + 1 <= 104 && numIndex - 2 >= 1){
                let id = String.fromCharCode(charIndex+1)+(numIndex-2);
                $(id).classList.remove("highlight");
            }
            if(charIndex - 2 >= 97 && numIndex + 1 <= 8){
                let id = String.fromCharCode(charIndex-2)+(numIndex+1);
                $(id).classList.remove("highlight");
            }
            if(charIndex - 2 >= 97 && numIndex - 1 >= 1){
                let id = String.fromCharCode(charIndex-2)+(numIndex-1);
                $(id).classList.remove("highlight");
            }
            if(charIndex + 2 <= 104 && numIndex + 1 <= 8){
                let id = String.fromCharCode(charIndex+2)+(numIndex+1);
                $(id).classList.remove("highlight");
            }
            if(charIndex + 2 <= 104 && numIndex - 1 >= 1){
                let id = String.fromCharCode(charIndex+2)+(numIndex-1);
                $(id).classList.remove("highlight");
            }
        }
        else if(piece.id == "bp1" || piece.id == "bp2" || piece.id == "bp3" || piece.id == "bp4" || piece.id == "bp5" || piece.id == "bp6" || piece.id == "bp7" || piece.id == "bp8"){
            let currPos = starting_position[piece.id];
            let numIndex = Number(currPos[1]);
            if(numIndex == 7){
                let id = currPos[0] + (numIndex -1);
                let id2 = currPos[0] + (numIndex -2);
                $(id).classList.remove("highlight");
                $(id2).classList.remove("highlight");
            } else {
                let id = currPos[0] + (numIndex -1);
                $(id).classList.remove("highlight");
            }
        }
        else if(piece.id == "wp1" || piece.id == "wp2" || piece.id == "wp3" || piece.id == "wp4" || piece.id == "wp5" || piece.id == "wp6" || piece.id == "wp7" || piece.id == "wp8"){
            let currPos = starting_position[piece.id];
            let numIndex = Number(currPos[1]);
            if(numIndex == 2){
                let id = currPos[0] + (numIndex +1);
                let id2 = currPos[0] + (numIndex +2);
                $(id).classList.remove("highlight");
                $(id2).classList.remove("highlight");
            } else {
                let id = currPos[0] + (numIndex +1);
                $(id).classList.remove("highlight");
            }
        }
        else if(piece.id == "bbw" || piece.id == "bbb" || piece.id == "wbb" || piece.id.substring(0,3) == "w_b" || piece.id.substring(0,3) == "b_b"){
            let currPos = starting_position[piece.id];
            let numIndex = Number(currPos[1]);
            let charIndex = currPos[0].charCodeAt(0);
            while(charIndex < 104){
                if(numIndex == 1)break;
                charIndex++;
                numIndex--;
                let id = String.fromCharCode(charIndex) + (numIndex);
                $(id).classList.remove("highlight");
            }
            numIndex = Number(currPos[1]);
            charIndex = currPos[0].charCodeAt(0);
            while(charIndex < 104){
                if(numIndex == 8)break;
                charIndex++;
                numIndex++;
                let id = String.fromCharCode(charIndex) + (numIndex);
                $(id).classList.remove("highlight");
            }
            numIndex = Number(currPos[1]);
            charIndex = currPos[0].charCodeAt(0);
            while(charIndex > 97){
                if(numIndex == 1)break;
                charIndex--;
                numIndex--;
                let id = String.fromCharCode(charIndex) + (numIndex);
                $(id).classList.remove("highlight");
            }
            numIndex = Number(currPos[1]);
            charIndex = currPos[0].charCodeAt(0);
            while(charIndex > 97){
                if(numIndex == 8)break;
                charIndex--;
                numIndex++;
                let id = String.fromCharCode(charIndex) + (numIndex);
                $(id).classList.remove("highlight");
            }
        }
        else if(piece.id == "bq" || piece.id == "wq" || piece.id.substring(0,3) == "w_q" || piece.id.substring(0,3) == "b_q"){
            let currPos = starting_position[piece.id];
            let temp = Number(currPos[1]);
            while(temp > 0){
                if(Number(currPos[1]) != temp){
                    let id = currPos[0]+temp.toString();
                    if($(id).children.length != 0) break;
                    $(id).classList.remove("highlight");
                }
                temp--;
            }
            let temp2 = Number(currPos[1]);
            while(temp2 < 9){
                if(Number(currPos[1]) != temp2){
                    let id = currPos[0]+temp2.toString();
                    if($(id).children.length != 0) break;
                    $(id).classList.remove("highlight");
                }
                temp2++;
            }
            let index = currPos[0].charCodeAt(0);
            while(index > 96){
                if(currPos[0].charCodeAt(0) != index){
                    let id = String.fromCharCode(index)+currPos[1];
                    if($(id).children.length != 0) break;
                    $(id).classList.remove("highlight");
                }
                index--;
            }
        }

}