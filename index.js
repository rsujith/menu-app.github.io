let arrForMenuDetails;
// getting all the elements
const searchFood = document.querySelector('.searchFood')
const suggestionBox = document.querySelector('.suggestionBox')
const mainTag = document.querySelector('.indexData')
const favData = document.querySelector('.favData')
const foodDetailsSection = document.querySelector('.card-local')
const navLink = document.querySelectorAll('.nav-link')
let favobj=[]
// fetching food data
async function fetchmedetails(foodItem) {
    const itemPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`)
    const itemResponse = await itemPromise.json()
    console.log(itemResponse.meals)
    showSugesstion(itemResponse.meals)
}

// showing suggestions based on above response
function showSugesstion(arrayOfFoodItems) {

    if (arrayOfFoodItems) {
        suggestionBox.style.display = 'flex'

        suggestionBox.innerHTML = ''
        suggestionBox.classList.add('suggestionBox')
        // looping through each item to show in suggestion box
        arrayOfFoodItems.forEach((ele) => {
            console.log(ele.strMeal)
            const span = document.createElement('span')
            span.classList.add('suggestionItems')
            span.textContent = ele.strMeal
            suggestionBox.appendChild(span)
            // adding click event to each item
            span.addEventListener('click', function () {
                getParticularFoodItem(ele.strMeal)
                suggestionBox.style.display = 'none'
            })
        })
        console.log(suggestionBox)
        // searchFood.append(suggestionBox)
    }
    else {

        console.log("no foods with this name")
    }

}

// getting food details for that particular item
async function getParticularFoodItem(nameOfFood) {
    const foodItemPromise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfFood}`)
    const foodItemResponse = await foodItemPromise.json()
    // calling function to call full details and show in the gui
    showFullFoodDetails(foodItemResponse.meals)
}
// manipulating dom to show full details of food
function showFullFoodDetails(foodItem) {
    console.log(foodItem[0])
    arrForMenuDetails = foodItem[0]
    console.log(arrForMenuDetails)
    const bodyOfFood = `
    <div class="card-local-inside">
    <h1>${arrForMenuDetails.strMeal}</h1>
    <div class="cuisine-type">
        <p>${arrForMenuDetails.strArea}</p>
        <p>${arrForMenuDetails.strCategory}</p>
        
    </div>
    <div class="food-card">
        <img src="${arrForMenuDetails.strMealThumb} " alt='food image' width="25%" height="25%" >
        <div class="description">
            <p >${arrForMenuDetails.strInstructions}</p>
            <a id='forMoreInfo' href="menuDetails.html" target="_blank">Click Here for more info</a>
        </div>
        
        
    </div>
    <div>
        <button class='addToFavs'>Add to Favorites</button>
       


    </div>
    
</div>
`

    // storing data in local storage to fetch the same in menudetails page
    localStorage.setItem('foodItem', JSON.stringify(arrForMenuDetails))
    foodDetailsSection.innerHTML = bodyOfFood
    // adding event listener to fav button
    addToFavs = document.querySelector('.addToFavs')
    
    addToFavs.addEventListener('click', function () {
        favobj.push({
            nameOfFood:arrForMenuDetails.strMeal,
            imgTag:arrForMenuDetails.strMealThumb
        })
        console.log(favobj)
        localStorage.setItem('favObj', JSON.stringify(favobj))
        alert('added to favorites')
    })

}
// adding event listener to search input
searchFood.addEventListener('keyup', function (e) {
    // check value exists in input
    if (searchFood.value) {
        fetchmedetails(searchFood.value)
    }
    else {
        suggestionBox.innerHTML = ''
    }
})
// display based on the button click fav/home
Array.from(navLink).forEach((ele) => {
    ele.addEventListener('click', function (e) {
        if (e.target.textContent === 'Home') {
            favData.style.display = 'none'
            mainTag.style.display = 'block'
        }
        else {
            mainTag.style.display = 'none'
            favData.style.display = 'block'
            const favDataAr = JSON.parse(localStorage.getItem('favObj'));
            favDataAr.forEach((ele,ind)=>{
                const cardlocalfavorites = document.querySelector('.card-local-favorites')
        const containerForImg = document.createElement('div')
        const deleteBtn=document.createElement('button')
        deleteBtn.textContent="Remove"
        deleteBtn.classList.add('deleteBtnInFav')
        containerForImg.classList.add('containerForImg')
        const heading = document.createElement('h1')
        heading.classList.add('heading')
        heading.textContent = ele.nameOfFood
        const img = document.createElement('img')
        img.classList.add('img')
        img.setAttribute('src', ele.imgTag)
        containerForImg.append(heading, img,deleteBtn)
        cardlocalfavorites.appendChild(containerForImg)
        
        deleteBtn.addEventListener('click',()=>{
            console.log(ind)
            containerForImg.remove()
            console.log(favDataAr.splice(ind,1))
            console.log(favDataAr)
            localStorage.setItem('favObj', JSON.stringify(favDataAr))
        })
            })
        }
    })
})
// localStorage.clear()