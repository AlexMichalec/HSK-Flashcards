console.log("HELLO");


function setNumHanzi () {
    return Math.floor(parseInt(window.innerHeight)*parseInt(window.innerWidth)/22000)
}

let numHanzi = setNumHanzi()
let finishedFlashcards = 0
let zakres = [1,2,3,4,0,0]
const hanzi = document.getElementById("hanzi")
let tab=[]
let score = localStorage.getItem("score")
if (score != null)
    document.getElementById("counterTotal").innerText = score
console.log("wynik: " + score)
for (let i=0;i<numHanzi;++i){
    let temp = Math.floor(Math.random()*5000)
    while (!zakres.includes(bigtab[temp][4])||tab.includes(temp))
        temp = Math.floor(Math.random()*5000)
    tab[i] = temp
}

function reset(){
    for (let i=0;i<numHanzi;++i){
        if (document.getElementById(""+i)!=null)
        document.getElementById(""+i).remove();
    }
    numHanzi = setNumHanzi();
    finishedFlashcards = 0
    for (let i=0;i<numHanzi;++i){
        let temp = Math.floor(Math.random()*5000)
        while (!(zakres.includes(bigtab[temp][4]))||tab.includes(temp))
            temp = Math.floor(Math.random()*5000)
        tab[i]=temp;               
    }
    for(let i=0;i<numHanzi;++i){
        let temp = bigtab[tab[i]]
        hanzi.innerHTML+='<button class="han" id="'+(''+i)+'" onclick="akcja('+(''+i)+')">'+temp[1]+'</button>'
    }
    animate()

}


for(let i=0;i<tab.length;++i){
    let temp = bigtab[tab[i]]
    hanzi.innerHTML+='<button class="han" id="'+(''+i)+'" onclick="akcja('+(''+i)+')">'+temp[1]+'</button>'
}
animate();

function animate(){
for(let i=0;i<numHanzi;++i){
    document.getElementById(""+i).style.animationName = "fadein";
    document.getElementById(""+i).style.animationDuration = "1s";
    document.getElementById(""+i).style.animationDelay = ""+i*50+"ms";
    document.getElementById(""+i).style.animationFillMode = "backwards"
}}

function hintShow(text,lenWidth){
    function inner(){
        document.getElementById("qhint").innerText=text
    }
    return inner
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve,time));
}

let helpFunc
let toDestroy

function right(){
    finishedFlashcards += 1
    document.getElementById("question").style.backgroundColor="lightgreen"
    helpFunc()
    delay(1200).then(schowaj)
    delay(1200).then(() => toDestroy.remove())
    let temp = document.getElementById("counterTotal")
    temp.innerText = parseInt(temp.innerText)+1
    localStorage.setItem("score",parseInt(temp.innerText))
    temp = document.getElementById("counterSession")
    temp.innerText = parseInt(temp.innerText)+1
}

function wrong(){
    document.getElementById("question").style.backgroundColor="crimson"
}

function setAns(qType,num){
    console.log(num)
    qType = 2+(qType-2+1)%2
    const przes = Math.floor(Math.random()*4)
    let correctAns = bigtab[num][qType]
    document.getElementById("qan"+przes).innerText = correctAns.slice(0,30)
    if (correctAns.length>30)
    document.getElementById("qan"+przes).innerText += "..."
    document.getElementById("qan"+przes).onclick = right
    for(let i=1;i<4;++i){
        console.log(przes + " " + (przes+i)%4)
        let elem = document.getElementById("qan"+((przes+i)%4))
        let temp = Math.floor(Math.random()*5000)
        while(bigtab[temp][1].length!=bigtab[num][1].length||temp==num)
            temp = Math.floor(Math.random()*5000)
        elem.innerText = bigtab[temp][qType].slice(0,30)
        if(bigtab[temp][qType].length>30)
            elem.innerText += "..."
        elem.onclick = wrong
    }
}

function akcja (ident="brew"){
    
    document.getElementById("back").style.visibility = 'visible'
    document.getElementById("question").style.visibility = "visible"
    document.getElementById("question").style.backgroundColor="antiquewhite"
    
    const flashcard = bigtab[tab[ident]]
    document.getElementById("qhan").innerText=flashcard[1]
    document.getElementById("qlevel").innerText="HSK"+flashcard[4]

    let questionType = Math.floor(2+Math.random()*2)

    document.getElementById("qhint").addEventListener("click",hintShow(flashcard[questionType],flashcard[1].length))
    helpFunc = hintShow(flashcard[questionType],flashcard[1].length)
    document.getElementById("qhint").innerText="HINT"
    setAns(questionType,tab[ident])

    document.getElementById("qmore").innerHTML='<a id="mdbg" href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb='+flashcard[1] +'" target="_blank" rel="noopener noreferrer">?</a>'

    

    document.getElementById("question").style.width = ""+(330+80*flashcard[1].length)+"px"
    document.getElementById("qhint").style.width = ""+(50+80*flashcard[1].length)+"px"

    if (document.getElementById(ident).innerText=="X")
    return
    toDestroy = document.getElementById(ident)
}

function setLevel2 (a){
    if (document.getElementById('hsk'+a).checked)
        zakres[a-1]=a
    else{
        zakres[a-1]=0
    }
    if (zakres[0]==0&&zakres[1]==0&&zakres[2]==0&&zakres[3]==0&&zakres[4]==0&&zakres[5]==0){
        for(let i = 0;i<numHanzi;++i){
            if(document.getElementById(""+i)!=null){
                document.getElementById(""+i).innerText="X"
            }
        }
        return
    }
    for (let i=0;i<numHanzi;++i){
        if(document.getElementById(""+i)!=null){
            let temp = Math.floor(Math.random()*5000)
            while (!(zakres.includes(bigtab[temp][4]))||tab.includes(temp))
                temp = Math.floor(Math.random()*5000)
            tab[i]=temp;
            document.getElementById(""+i).innerText=bigtab[temp][1]
            
        }
    }

}

function setLevel (a){
    if (document.getElementById('hsk'+a).checked)
        zakres[a-1]=a
    else{
        zakres[a-1]=0
    }
    if (zakres[0]==0&&zakres[1]==0&&zakres[2]==0&&zakres[3]==0&&zakres[4]==0&&zakres[5]==0){
        for(let i = 0;i<numHanzi;++i){
            if(document.getElementById(""+i)!=null){
                document.getElementById(""+i).innerText="X"
                document.getElementById(""+i).onclick=""
            }
        }
        return
    }
    for (let i=0;i<numHanzi;++i){
        if (document.getElementById(""+i)!=null)
        document.getElementById(""+i).remove();
    }
    numHanzi -= finishedFlashcards
    finishedFlashcards = 0
    for (let i=0;i<numHanzi;++i){
        let temp = Math.floor(Math.random()*5000)
        while (!(zakres.includes(bigtab[temp][4]))||tab.includes(temp))
            temp = Math.floor(Math.random()*5000)
        tab[i]=temp;               
    }
    for(let i=0;i<numHanzi;++i){
        let temp = bigtab[tab[i]]
        hanzi.innerHTML+='<button class="han" id="'+(''+i)+'" onclick="akcja('+(''+i)+')">'+temp[1]+'</button>'
    }
    animate()


}

function schowaj(){
    document.getElementById("back").style.visibility = "hidden"
    document.getElementById("question").style.visibility = "hidden"
}
