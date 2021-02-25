/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, 
  getByText, 
  fireEvent, 
  waitFor,
  screen
} from '@testing-library/react';
import TodoList from './TodoList';

const sampleTodoList = [
  {
    id: 1,
    text: 'eggs',
    completed: false
  },
  {
    id: 2,
    text: 'milk',
    completed: true
  }
];

let handleToggle;

beforeEach(() => {
  handleToggle = jest.fn();
})

it("renders 'todos' prop as a list of items", () => {
  const { container } = render(<TodoList todos={sampleTodoList} toggleTodo={handleToggle} />);

  expect(container.getElementsByTagName('li')).toHaveLength(2);
});

it("passes a 'toggleTodo' prop to child Todo component", () => {
  const { container } = render(<TodoList todos={sampleTodoList} toggleTodo={handleToggle} />);

  const listItem = getByText(container, 'eggs');

  fireEvent.click(listItem);

  expect(handleToggle).toHaveBeenCalledTimes(1);
})