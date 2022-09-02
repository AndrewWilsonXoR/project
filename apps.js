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
