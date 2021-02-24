import { useCallback, useState } from 'react';

type hook = () => {
  name: string;
  ingredients: string[];
  directions: string[];
  description: string;
  currentIngredient: number;
  currentDirection: number;
  updateName: (name: string) => void;
  updateDescription: (description: string) => void;
  addIngredient: () => void;
  addDirection: () => void;
  updateCurrentIngredient: (ingredient: string) => void;
  updateCurrentDirection: (direction: string) => void;
  changeCurrentIngredient: (index: number) => void;
  changeCurrentDirection: (index: number) => void;
  reset: () => void;
}

const useNewRecipeForm: hook = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [directions, setDirections] = useState([]);
  const [description, setDescription] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(0);

  const addIngredient = useCallback(() => {
    setIngredients((ing) => [...ing, '']);
  }, [setIngredients]);

  const addDirection = useCallback(() => {
    setDirections((dir) => [...dir, '']);
  }, [setDirections]);

  const updateCurrentIngredient = useCallback((value) => {
    setIngredients((ing) => ing.map((ingredient, index) => {
      if (index === currentIngredient)
        return value;
      else {
        return ingredient;
      }
    }));
  }, [setIngredients]);

  const updateCurrentDirection = useCallback((value) => {
    setDirections((dir) => dir.map((direction, index) => {
      if (index === currentIngredient)
        return value;
      else {
        return direction;
      }
    }));
  }, [setDirections]);

  const reset = useCallback(() => {
    setName('');
    setDirections([]);
    setIngredients([]);
    setDescription('');
    setCurrentIngredient(0);
    setCurrentDirection(0);
  }, [setName, setDirections, setIngredients, setDirections, setCurrentDirection, setCurrentIngredient]);

  return {
    name,
    ingredients,
    directions,
    description,
    currentIngredient,
    currentDirection,
    updateName: setName,
    updateDescription: setDescription,
    addIngredient,
    addDirection,
    updateCurrentIngredient,
    updateCurrentDirection,
    changeCurrentIngredient: setCurrentIngredient,
    changeCurrentDirection: setCurrentDirection,
    reset,
  };
};

export default useNewRecipeForm;
