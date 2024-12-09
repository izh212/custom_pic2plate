import React from 'react';

function Gemini({ content }) {
  const { dish, recipe } = content;

  let parsedRecipe = recipe;
  if (typeof recipe === 'string') {
    try {
      parsedRecipe = JSON.parse(recipe);
    } catch (e) {
      console.error('Error parsing recipe:', e);
    }
  }

  return (
    <div className="mx-auto py-10 lg:w-2/4 md:w-2/3 sm:w-2/3 px-5 w-full">
      {dish && <h2 className="text-xl font-bold mb-4">Dish: {dish}</h2>}
      {parsedRecipe && (
        <>
          <h3 className="text-lg font-semibold">Recipe Title: {parsedRecipe.Title}</h3>
          <h4 className="font-semibold mt-4">Ingredients:</h4>
          <ul className="list-disc pl-5">
            {Array.isArray(parsedRecipe.Ingredients) && parsedRecipe.Ingredients.length > 0 ? (
              parsedRecipe.Ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <li>No ingredients available.</li>
            )}
          </ul>
          <h4 className="font-semibold mt-4">Method:</h4>
          <ol className="list-decimal pl-5">
            {Array.isArray(parsedRecipe.Method) && parsedRecipe.Method.length > 0 ? (
              parsedRecipe.Method.map((step, index) => (
                <li key={index}>{step}</li>
              ))
            ) : (
              <li>No method steps available.</li>
            )}
          </ol>
          <h4 className="font-semibold mt-4">Tips:</h4>
          <ul className="list-disc pl-5">
            {Array.isArray(parsedRecipe.Tips) && parsedRecipe.Tips.length > 0 ? (
              parsedRecipe.Tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))
            ) : (
              <li>No tips available.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Gemini;
