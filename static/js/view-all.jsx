// DISPLAY ALL MEALS 

function ShowMealComponent(props) {

    const [showDetails, setShowDetails] = React.useState(false)

    function handleShowDetails() {
        console.log('image clicked')

        setShowDetails (!showDetails) 
        
    }
    let details = null 
    if (showDetails===true) {
        details = (
        <div className="detais">
        <p><b>Ingredients: </b> { props.ingredients }</p>
        <p><b>Directions: </b>{ props.instructions }</p>
    
        <p><b>Tip!</b> { props.tips }</p>
        </div>)
    }

    return (
        <div className="meal">
        <h2>{ props.title }</h2>
        <img 
            src={ props.image } 
            width={300} 
            onClick={handleShowDetails}
        />

            <div>{ details }</div>
        </div>
        
    );

}

function FavoriteButtonComponent(props) {
    
    function addToFavorites(evt) {
        console.log('button clicked')
        evt.preventDefault();

        const favButton = document.querySelector('#fav-button');
            
            const favRecipe = {
                recipe_id: evt.target.dataset.recipeId
            }

                fetch('/add-to-favorites', {
                    method: 'POST',
                    body: JSON.stringify(favRecipe),
                    headers: {
                        'Content-Type': 'application/json',
                      },
                })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }

    return (
        <button id="fav-button" 
            data-recipe-id={ props.recipe_id } 
            onClick={ addToFavorites }>ADD TO FAVORITES</button>

    );
}


function MealContainer() {

    const [meals, setMeals] = React.useState([]);

    React.useEffect(() => {
        fetch('/view-all.json')
        .then((response) => response.json())
        .then((data) => {setMeals(data)})
        }, [])
    
    const favoriteMeals = [];
    
    for (const currentMeal of meals) {
        favoriteMeals.push(
            <div>
            <ShowMealComponent
                title={currentMeal.title}   
                image={currentMeal.image}
                ingredients={currentMeal.ingredients}  
                instructions={currentMeal.instructions}
                tips={currentMeal.tips} 
            />
            <FavoriteButtonComponent/>
            <br/><br/>
            </div>
        );
    }

    return (
        <div className="grid">{favoriteMeals}</div>
    );

    }
    
    ReactDOM.render(<MealContainer />, document.getElementById('container')); 