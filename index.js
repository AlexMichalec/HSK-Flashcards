

function setNumHanzi () {
    return Math.min(Math.floor(parseInt(window.innerHeight)*parseInt(window.innerWidth)/22000),120)
}



let numHanzi = setNumHanzi()
let finishedFlashcards = 0
let zakres = [1,2,3,4,0,0]
let tempZakres = JSON.parse(localStorage.getItem("zakres"))
if (tempZakres != null)
    zakres = [...tempZakres]

for(let i=1;i<=6;++i){
    if(zakres[i-1]!=0)
    {
        document.getElementById("hsk"+i).checked="checked"
    }
}
const hanzi = document.getElementById("hanzi")
let tab=[]
let score = localStorage.getItem("score")
if (score != null)
    document.getElementById("counterTotal").innerText = score
for (let i=0;i<numHanzi;++i){
    let temp = Math.floor(Math.random()*5000)
    while (!zakres.includes(bigtab[temp][3])||tab.includes(temp))
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
        while (!(zakres.includes(bigtab[temp][3]))||tab.includes(temp))
            temp = Math.floor(Math.random()*5000)
        tab[i]=temp;               
    }
    for(let i=0;i<numHanzi;++i){
        let temp = bigtab[tab[i]]
        hanzi.innerHTML+='<button class="han" id="'+(''+i)+'" onclick="akcja('+(''+i)+')">'+temp[0]+'</button>'
    }
    animate()

}


for(let i=0;i<tab.length;++i){
    let temp = bigtab[tab[i]]
    hanzi.innerHTML+='<button class="han" id="'+(''+i)+'" onclick="akcja('+(''+i)+')">'+temp[0]+'</button>'
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
    qType = 1+(qType)%2
    const przes = Math.floor(Math.random()*4)
    let correctAns = bigtab[num][qType]
    document.getElementById("qan"+przes).innerText = correctAns.slice(0,30)
    if (correctAns.length>30)
    document.getElementById("qan"+przes).innerText += "..."
    document.getElementById("qan"+przes).onclick = right
    for(let i=1;i<4;++i){
        let elem = document.getElementById("qan"+((przes+i)%4))
        let temp = Math.floor(Math.random()*5000)
        while(bigtab[temp][0].length!=bigtab[num][0].length||temp==num)
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
    document.getElementById("qhan").innerText=flashcard[0]
    document.getElementById("qlevel").innerText="HSK"+flashcard[3]

    let questionType = Math.floor(1+Math.random()*2)

    document.getElementById("qhint").addEventListener("click",hintShow(flashcard[questionType],flashcard[0].length))
    helpFunc = hintShow(flashcard[questionType],flashcard[0].length)
    document.getElementById("qhint").innerText="HINT"
    setAns(questionType,tab[ident])

    document.getElementById("qmore").innerHTML='<a id="mdbg" href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb='+flashcard[0] +'" target="_blank" rel="noopener noreferrer">?</a>'

    

    document.getElementById("question").style.width = ""+(330+80*flashcard[0].length)+"px"
    document.getElementById("qhint").style.width = ""+(50+80*flashcard[0].length)+"px"

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
            while (!(zakres.includes(bigtab[temp][3]))||tab.includes(temp))
                temp = Math.floor(Math.random()*5000)
            tab[i]=temp;
            document.getElementById(""+i).innerText=bigtab[temp][0]
            
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
        while (!(zakres.includes(bigtab[temp][3]))||tab.includes(temp))
            temp = Math.floor(Math.random()*5000)
        tab[i]=temp;               
    }
    for(let i=0;i<numHanzi;++i){
        let temp = bigtab[tab[i]]
        hanzi.innerHTML+='<button class="han" id="'+(''+i)+'" onclick="akcja('+(''+i)+')">'+temp[0]+'</button>'
    }
    animate()
    if (JSON.stringify(tempZakres)!=JSON.stringify(zakres))
        document.getElementById("saveHSK").style.visibility="visible"
    else
        document.getElementById("saveHSK").style.visibility="hidden"

}

function schowaj(){
    document.getElementById("back").style.visibility = "hidden"
    document.getElementById("question").style.visibility = "hidden"
}

function saveHSK(){
    localStorage.setItem("zakres",JSON.stringify(zakres))
    document.getElementById("saveHSK").style.visibility="hidden"
    tempZakres = [...zakres]

}
