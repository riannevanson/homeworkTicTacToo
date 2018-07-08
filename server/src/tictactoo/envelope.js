//-----------GET---------------
http :4000/games/1
http :4000/games

//-----------POST---------------
http post :4000/games name='yourGameName'


//-----------PUT COLOR---------------
http put :4000/games/1 color='someColor'


//-----------PUT MOVE---------------
http put :4000/games/1 board='{
    "rows":[
      ["o","o","o"],
      ["o","o","o"],
      ["o","o","o"]
    ]
}'
OR 

http put :4000/games/1 board='{
    "rows":[
      ["o","o","o"],
      ["o","x","o"],
      ["o","o","o"]
    ]
}'