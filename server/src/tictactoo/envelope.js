//-----------ENVELOPE PUT---------------
http post :4000/games/riannesfirstgame
http :4000/games/30
http put :4000/games/30 board='{
    "rows":[
      ["o","x","o"],
      ["o","o","o"],
      ["o","o","o"]
    ]
}'
http :4000/games/30
http put :4000/games/30 board='{
    "rows":[
      ["o","x","o"],
      ["@","@","@"],
      ["o","o","o"]
    ]
}'