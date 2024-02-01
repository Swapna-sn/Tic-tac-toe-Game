let music= new Audio('../Assests/music.mp3');
let audioTurn=new Audio('../Assests/ting.mp3');
let gameover=new Audio('../Assests/gameover.mp3');
let turn="X";
let isgameover=false;

// function to change the turn:
const changeTurn=()=>{
    return turn==="X"? "0":"X";
}

// function to check the win:
const checkWin=()=>{
    
    // Win logics
    let boxtext=document.getElementsByClassName('boxtext');
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText)&&
        (boxtext[e[2]].innerText===boxtext[e[1]].innerText)&&
        (boxtext[e[0]].innerText!=="")){
            e.forEach(index=>{
                document.getElementsByClassName('box')[index].style.backgroundColor="lightblue"           
             })
            document.querySelector(".info").innerText=boxtext[e[0]].
            innerText+" Won";
            isgameover=true;
            music.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="200px"
                }
    })
}
// game logic:
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
   let boxtext=element.querySelector(".boxtext");
    element.addEventListener('click',()=>{
        if(boxtext.innerText===""){
            boxtext.innerText=turn;
            turn=changeTurn();
            audioTurn.play();
            checkWin();
            if(!isgameover){
                document.getElementsByClassName('info')[0].innerText="Turn for:"+turn;
            }
            if (checkDraw()) {
                document.querySelector('.info').innerText = "It's a Draw!";
                isgameover = true;
                gameover.play();
            }
        }
    })
})

// function to check for a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === "") {
            return false; // If any box is empty, the game is not a draw
        }
    }
    return true; // All boxes are filled, it's a draw
}
// Reset button logic:
document.getElementById('reset').addEventListener("click",()=>{
    let boxtexts=document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach(element=>{
        element.innerText=""
    });
    let boxes=document.querySelectorAll(".box");
    for(let i=0;i<boxes.length;i++){
        boxes[i].style.backgroundColor="";
    }
    turn="X";
    isgameover=false;
    music.pause();
    document.getElementsByClassName('info')[0].innerText="Turn for:"+turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0";
})
