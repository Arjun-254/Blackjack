let firstCard,secondCard,sum=0
let blackJack=false
let isAlive=false
let message=""
let messageEl=document.getElementById("message-el")
let sumEl=document.getElementById("sum-el")
let DsumEl=document.getElementById("dealersum-el")
let cardEl=document.getElementById("card-el")
let dcardEl=document.getElementById("dealercard-el")
let dsum=0;
let flagStart=0
let cardArray=[]
let dcardArray=[]

let values=["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
let types=["C","D","H","S"]

let stayflag=0
let winflag=0
const divdealer=document.getElementById('dealer-cards')
let dscale=document.getElementById("dealer-cards")
let pscale=document.getElementById('player-cards')
let pcardcount=0
console.log(messageEl)

function dealercards()
{
    dfirstCard=dealerrandomcard()
    //dsecondCard=dealerrandomcard()
    dcardArray.push(dfirstCard)
    //dcardArray.push(dsecondCard)
    dsum=dfirstCard
    //dcardEl.textContent +=dcardArray[0]+"-"
    let facedown=document.createElement("img")
    facedown.src="./cards/BACK.png"
    facedown.setAttribute("id",facedown)
    document.getElementById("dealer-cards").append(facedown)
}

function dealerStay()
{
   
    if(stayflag==0 && isAlive==true)
    {
        divdealer.removeChild(divdealer.children[1]);
        stayflag=1
        while(isAlive==true && dsum<17) //takes cards until sum>17
        {
            dcard=dealerrandomcard()
            dcardArray.push(dcard)
            dsum=dsum+dcard
            if(dsum>21) // Ace in dealer cards check
            {
                for(let i=0;i<dcardArray.length;i++)
                {
                    if(dcardArray[i]==11)
                    {
                        dcardArray[i]=1
                        dsum=dsum-10 //Ace counts as 1 in this case in bust case 
                    }
                }
            }
            //rendergame()
        }
    
        DsumEl.textContent="Dealer Sum: "+dsum
        
        /*for(let i=1;i<(dcardArray.length);i++)
        {
            dcardEl.textContent +=dcardArray[i]+"-"
        }*/

        isAlive=false
        setInterval(stay(),5000);
    }
}

function stay()
{
    if(dsum>21)
    {
        message='Dealer Busts,You Win'
        winflag=1
    }
    else if(dsum>sum)
    {
        message='You Lose'
        winflag=-1
    }
    else if(dsum<sum && sum<=21)
    {
        winflag=1
        message='You Win'
    }
    else if(dsum==21)
    {
        message="Dealer has blackjack, you Lose"
        winflag=-1;
    }

    else{
        message="PUSH"
    }
    messageEl.textContent=message
    //messageEl.style.transform="scale("+1.50+","+1.50+")"+"rotate(367deg)"
    messageEl.style.transform="skewX(180deg)"+"scale("+1.50+","+1.50+")"

    if(winflag==1)
    {
        pscale.style.transform="scale("+1.50+","+1.50+")"+"rotate(367deg)"
    }
    else if(winflag==-1){
        dscale.style.transform="scale("+1.50+","+1.50+")"+"rotate(367deg)"
    }
    else{
        pscale.style.transform="scale("+.750+","+.750+")"+"rotate(367deg)"
        dscale.style.transform="scale("+.750+","+.750+")"+"rotate(367deg)"
    }
}

function builddeck()
{
    deck=[]
    for(let i=0;i<values.length;i++)
    {
        for(let j=0;j<types.length;j++)
        {
            deck.push(values[i]+"-"+types[j])
        }
    }
}


function start()
{
    if(flagStart==0)
    {
        isAlive=true;
        dealercards()
        firstCard=randomcard()
        secondCard=randomcard()
        cardArray.push(firstCard)
        cardArray.push(secondCard)
        sum = firstCard+secondCard
        flagStart=1
        rendergame()
    }
}

function rendergame()
{

    /*for(let i=0;i<(cardArray.length);i++)
    {
        cardEl.textContent +=cardArray[i]+"-"
    }*/

    if(sum<=20)
    {
        message="Do you want to draw a new card!"
    }
    else if(sum == 21)
    {
        blackJack=true
        message="You've got Blackjack"
        dealerStay()
    }
    else if(sum==22 && ((cardArray[0]==11) && (cardArray[1]==11))) //double ace case
    {
        sum=12 //considers 1 ace=1 and another ace =11
        cardArray[0]=1;
        message="Do you want to draw a new card!"


    }
    else
    {
        isAlive=false
        message="BUST, You're out of the game!"
        stayflag==1
        dscale.style.transform="scale("+1.50+","+1.50+")"+"rotate(367deg)"
        messageEl.style.transform="skewX(180deg)"+"scale("+1.50+","+1.50+")"
    }
    sumEl.textContent="Player Sum: "+sum
    cardEl.textContent="Player Cards: "
    messageEl.textContent=message

}

function newcard()
{
    if(isAlive==true && blackJack==false)
    {
        card=randomcard()
        cardArray.push(card)
        sum=sum+card
        if(sum>21) // Ace in player cards check when sum>21
            {
                for(let i=0;i<cardArray.length;i++)
                {
                    if(cardArray[i]==11)
                    {
                        cardArray[i]=1;
                        sum=sum-10 //Ace counts as 1 in this case in bust case 
                    }
                }
            }
        rendergame()
    }


}

function getvalue(card,sum11)
{
    let data=card.split("-") //data=[A,D]
    let val=data[0];
    if(isNaN(val))
    {
        if(val=="A")
        {
            if(sum11>21)
            {
                return 1;
            }
            else
            {
                return 11;
            }
        }
        else 
        {
            return 10;
        }
    }
    else
    {
        return parseInt(val);
    }
}

function randomcard()
{
    pscale.style.transform="skew(180deg,180deg)"
    let cardValues= values[Math.floor(Math.random()*12)]   //returns value between 0-12
    let cardType=types[Math.floor(Math.random()*4)] //returns value between 0 and 3
    let card1=cardValues+"-"+cardType
    let cardgen=getvalue(card1,sum)
    let cardImg=document.createElement("img")
    cardImg.src="./cards/"+card1+".png"
    cardImg.setAttribute("id",cardImg)
    document.getElementById("player-cards").append(cardImg)
    return cardgen
}

function dealerrandomcard()
{
    let d=0;
    dscale.style.transform="skew(180deg,180deg)"
    let cardValues1= values[Math.floor(Math.random()*12)]   //returns value between 0-12
    let cardType1=types[Math.floor(Math.random()*4)] //returns value between 0 and 3
    let card2=cardValues1+"-"+cardType1
    let cardgen1=getvalue(card2,dsum)
    let cardImg1=document.createElement("img")
    cardImg1.src="./cards/"+card2+".png"
    cardImg1.setAttribute("id",cardImg1)
    //(divdealer.children[d]).style.transform="translateY(200%)"
    document.getElementById("dealer-cards").append(cardImg1)
    return cardgen1
    d++;
}
