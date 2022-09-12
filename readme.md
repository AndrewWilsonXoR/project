2 player offline chess game

8x8 board referenced to by "a1...h1-a8...h8"

the game will simulate potential moves on an invisible copied "dummyboard"
because this is what most other chess engines used from my research.

no pieces are allowed to jump pieces besides the knight

working castle functionality 


TDL ://
sometimes knight movement causes game to crash.
incorrectly selecting a piece will cause the highlight and removehighlight function not to work properly, usually requiring a refresh
sometimes the page will stop responding, and i'm not entirely sure why. I dont have any errors in the console so I really dont know what could be causing it.

so this looks a lot more complicated than it really is, the html really boils down to assigning the alt codes into the appropriate divs, and allowing them to be manevurable.

function add highlight reads the dummy board which has baked in current position and adds a highlight to all potential moves upon clicking the corresponding piece,
function remove highlight individually removes all of the previously highlighted squares upon moving to a potential move or upon clicking another piece outside of the previously selected pieces parameters. Unfortunately if a opposing piece is selected outside of the potential highlighted squares the highlight is removed, but the piece selected prior to the opposing piece is still in position to be moved. just something to keep in mind not sure how relevant that'll be.

function IsKingProtectingTheSquare basically just compares where the selected square is in relation to the opposing king, to prevent an early checkmate, and in his square he overwrites the check. 

function isKingInCheck is ran in every move function, preventing any action that will leave your king in check, and also check if the opposing king is in check

function checkinsufficientmaterial runs if both teams piece arrays are 3 or lower, On Chess.com a King and two knights is only considered insufficient material when against a lone king. So if a king and two knights versus a king and a bishop is on the board, the game will continue, however, if the bishop or one of the knights is lost, the game will then end in a draw.

