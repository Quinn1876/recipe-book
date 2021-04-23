import { useCallback, useState } from 'react';
import api from '../../../../api';

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
  removeIngredient: (index: number) => () => void;
  addDirection: () => void;
  removeDirection: (index: number) => () => void;
  updateCurrentIngredient: (ingredient: string) => void;
  updateCurrentDirection: (direction: string) => void;
  changeCurrentIngredient: (index: number) => () => void;
  changeCurrentDirection: (index: number) => () => void;
  reset: () => void;
  onSubmit: () => Promise<void>;
}

const useNewRecipeForm: hook = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(0);

  const addIngredient = useCallback(() => {
    setIngredients((ing) => [...ing, '']);
    setCurrentIngredient(ingredients.length);
  }, [setIngredients, ingredients.length]);

  const addDirection = useCallback(() => {
    setDirections((dir) => [...dir, '']);
    setCurrentDirection(directions.length);
  }, [setDirections, directions]);

  const updateCurrentIngredient = useCallback((value) => {
    setIngredients((ing) => ing.map((ingredient, index) => {
      if (index === currentIngredient)
        return value;
      else {
        return ingredient;
      }
    }));
  }, [setIngredients, currentIngredient]);

  const updateCurrentDirection = useCallback((value) => {
    setDirections((dir) => dir.map((direction, index) => {
      if (index === currentDirection)
        return value;
      else {
        return direction;
      }
    }));
  }, [setDirections, currentDirection]);

  const changeCurrentIngredient = useCallback((index: number) => (): void => {
    setCurrentIngredient(index);
  }, [setCurrentIngredient]);

  const changeCurrentDirection = useCallback((index: number) => (): void => {
    setCurrentDirection(index);
  }, [setCurrentDirection]);

  const removeIngredient = useCallback((index: number) => (): void => {
    setIngredients(ingredients.filter((v, i) => i !== index));
    if (index < currentIngredient) {
      setCurrentIngredient(currentIngredient - 1);
    }
  }, [setIngredients, ingredients, currentIngredient, setCurrentIngredient]);


  const removeDirection = useCallback((index: number) => (): void => {
    setDirections(directions.filter((v, i) => i !== index));
    if (index < currentDirection) {
      setCurrentDirection(currentDirection - 1);
    }
  }, [setDirections, directions, currentDirection, setCurrentDirection]);

  const onSubmit = useCallback(async () => api.recipes.createRecipe({ description, directions, ingredients, name }).then(() => { return; }),
    [description, directions, ingredients, name]);

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
    removeIngredient,
    addDirection,
    removeDirection,
    updateCurrentIngredient,
    updateCurrentDirection,
    changeCurrentIngredient,
    changeCurrentDirection,
    reset,
    onSubmit,
  };
};

export default useNewRecipeForm;
