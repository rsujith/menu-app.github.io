const detailsContainer=document.querySelector('.detailsContainer')
    const nameOfFood=document.querySelector('#nameOfFood')
    const directions=document.querySelector('.directions')
    const ingredients=document.querySelector('.ingredients')
    const iframeForVideo=document.querySelector('#iframeForVideo')
    const iframeImg = document.querySelector('#iframeImg')
function sendDetailsToGetFullFood(foodArr){
    nameOfFood.innerHTML=foodArr.strMeal
    directions.innerHTML=foodArr.strInstructions
    iframeImg.setAttribute('src',foodArr.strMealThumb)
    iframeForVideo.setAttribute('src',foodArr.strYoutube)
    for(let i=1;i<=20;i++){
        const item=`${foodArr[`strIngredient${i}`]}`
        if (item!="null" && item!=''){
            console.log(item)
            const ingDets=`${foodArr[`strIngredient${i}`]} : ${foodArr[`strMeasure${i}`]}`
            const newSpan=document.createElement('span')
            newSpan.textContent=ingDets
            newSpan.classList.add('quant')
            ingredients.appendChild(newSpan)
        }
        
        
    }

}
const greetingValue = localStorage.getItem('foodItem');
 
sendDetailsToGetFullFood(JSON.parse(greetingValue))