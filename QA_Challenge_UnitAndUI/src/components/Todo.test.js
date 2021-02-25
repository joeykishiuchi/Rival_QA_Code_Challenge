/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import Todo from './Todo';

const sampleText = "Sample Text";
const completedDefault = false;
let handleClick;

beforeEach(() => {
  handleClick = jest.fn();
});

it("renders with the text decoration style set to none by default", () => {
  const { getByText } = render(<Todo onClick={handleClick} completed={completedDefault} text={sampleText}/>);
  expect(getByText(sampleText)).toHaveStyle('text-decoration: none');
});

it("renders with text decoration style set to line-through when 'completed' prop is set to true", () => {
  const { getByText } = render(<Todo onClick={handleClick} completed text={sampleText}/>);
  expect(getByText(sampleText)).toHaveStyle('text-decoration: line-through');
});

it("renders its 'text' prop as text", () => {
  const { getByText } = render(<Todo onClick={handleClick} completed={completedDefault} text={sampleText}/>);
  expect(getByText(sampleText)).toBeInTheDocument();
});

it("renders a clickable listitem", () => {
  const { getByText } = render(<Todo onClick={handleClick} completed={completedDefault} text={sampleText}/>);
  const listitem = getByText(sampleText);
  fireEvent.click(listitem);

  expect(handleClick).toHaveBeenCalledTimes(1);
});