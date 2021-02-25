import todos from './todos';

const defaultState = [];

it("returns the initial state when passed an empty state and action", () => {
  const result = todos(defaultState, {});
  expect(result).toHaveLength(0);
});

it("returns an array with only the new todo item when passed an empty state and ADD_TODO action", () => {
  const ADD_ACTION = {
    type: 'ADD_TODO',
    id: 1,
    text: 'sample text'
  };

  const expected = [
    { 
      id: ADD_ACTION.id,
      text: ADD_ACTION.text,
      completed: false,
    }
  ]
  const result = todos(defaultState, ADD_ACTION);

  expect(result).toEqual(expect.arrayContaining(expected));
});

it("returns toggled 'completed' value on todo item when passed todo item as state and TOGGLE_TODO action", () => {
  const TOGGLE_ACTION = {
    type: 'TOGGLE_TODO',
    id: 1
  }

  const existingItem ={
    id: 1,
    text: 'sampleText',
    completed: false
  };

  const expectedState = [
    {
      ...existingItem,
      completed: !existingItem.completed
    }
  ];

  const result = todos([existingItem], TOGGLE_ACTION);

  expect(result).toEqual(expect.arrayContaining(expectedState));
})