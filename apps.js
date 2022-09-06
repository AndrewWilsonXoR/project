// Make a radio Object.Give it a property called stations and make the value an array of station objects
// Give each station object a property called name and songs. Name should be a string and should be an array of song objects.
// Song object should have two properties: title and artist
// Create a method on your radio object that changes the station randomly. 
// When the station is changed, pick a song from that station console.log("Now Playing:" + song,title + "by" + song.artist)
 

// Submission: Submit a share link of your repl file here! 

 

// Happy coding!

// class stations {
//     constructor(name , song){
//         this.name=''
//         this.song=[]
//     }
    
// }
// const Radio = (stations)
// let jazz = new stations('jazz' , ["the hound and the fox" , "strange fruit"])
// console.log(stations.jazz)


class Radio {
    constructor(stations){
        this.stations = stations
    }
    randomStation(){
        let rStation = Math.floor(Math.random() *(this.stations.length) + 0);
        let rSong = Math.floor(Math.random() * (this.stations[rStation].songs.length) + 0);
        console.log(`Now Playing: ${this.stations[rStation].songs[rSong].title} by ${this.stations[rStation].songs[rSong].artist}`)
    }
}
class Station {
    constructor(name , songs){

        this.name = name
        this.songs = songs
    }
}
class Song{
    constructor(title , artist){
        this.title = title
        this.artist = artist
    }
}

let songs = []
songs.push(new Song("the hound and the fox" , "I The Mighty"))
songs.push(new Song("strange fruit" , "billie holiday"))
songs.push(new Song("neurotic" , "polyphia"))
songs.push(new Song("playing god" , "polyphia"))
songs.push(new Song("1000 rounds" , "pouya"))
songs.push(new Song("faucet failure" , "ski mask the slump god"))
songs.push(new Song("the other line" , "Chunk! No Captain Chunk!"))
songs.push(new Song("The Hype You Stole" , "Miss Fortune"))
let stations = [Station]
let jazz = new Station("jazz" , [songs[0] , songs[1]])
let mathrock = new Station("mathrock" , [songs[2] , songs[3]])
let rap = new Station("rap" , [songs[4] , songs[5]])
let poppunk = new Station("poppunk" , [songs[6] , songs[7]])
let radio = Radio
randomStation = ()=> {
    let Num = Math.random()*10
    if (Num > 0 && Num < 3){
        console.log( `Now Playing: || ${songs[0]} || `)
    }
    if (Num > 3 && Num < 6){
        console.log( `Now Playing: || ${songs[2]} || `)
    }
    if (Num > 6 && Num < 10){
        console.log( `Now Playing: || ${songs[4]} || `)
    }
}
randomSong = (stationNumber)=> {
    let Num = Math.random()*10
    if (Num > 0 && Num < 3){
        console.log(`${radio.stations[stationNumber].song1.artist} - ${radio.stations[stationNumber].song1.title}`)
    }
    if (Num > 3 && Num < 6){
        console.log(`${radio.stations[stationNumber].song2.artist} - ${radio.stations[stationNumber].song2.title}`)
    }
    if (Num > 6 && Num < 10){
        console.log(`${radio.stations[stationNumber].song3.artist} - ${radio.stations[stationNumber].song3.title}`)
    }
}

randomStation()
console.log(Station.songs)
// function randomNumber(min, max) {
//     return Math.random() * (max - min) + min;
// }
// const fetchInfo = () =>{
//     if(Station = jazz){
//         return Station.jazz
//     }else if(Station = mathrock){
//         return Station.mathrock
//     }else if(Station = rap){
//         return Station.rap
//     }else if(Station = poppunk){
//         return Station.poppunk
//     }   
    
// }
// let randStation = (Station) =>{
//     return Math.floor(Math.random())
// }