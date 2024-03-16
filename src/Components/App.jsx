import React, { useState } from 'react';
import './style.css';
import dark from '../images/bg-desktop-dark.jpg';
import sun from '../images/icon-sun.svg';
import cross from '../images/icon-cross.svg';
 
function App() {
  // State hooks to manage input text, todo items, and filter
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
 
  // Function to handle filter selection
  function handleFilter(filter) {
    setFilter(filter);
  }
 
  // Function to handle input change
  function handleChange(event) {
    setInputText(event.target.value);
  }
 
  // Function to add a new todo item
  function addItem() {
    // Check if input is not empty
    if (inputText.trim() !== '') {
      // Add the new todo item to the list
      setItems(prevItems => [...prevItems, { text: inputText, completed: false }]);
      // Clear the input field
      setInputText('');
    }
  }
 
  // Function to toggle completion status of a todo item
  function toggleComplete(index) {
    // Create a copy of the items array
    const updatedItems = [...items];
    // Toggle the completion status of the selected item
    updatedItems[index].completed = !updatedItems[index].completed;
    // Update the state with the modified items array
    setItems(updatedItems);
  }
 
  // Function to delete a todo item
  function deleteItem(index) {
    // Filter out the item to be deleted
    const updatedItems = items.filter((_, i) => i !== index);
    // Update the state with the modified items array
    setItems(updatedItems);
  }
 
   // Function to clear completed todo items
   function clearCompleted() {
    // Filter out the completed items
    const remainingItems = items.filter(item => !item.completed);
    // Update the state with the remaining items
    setItems(remainingItems);
  }

  // Filter the items based on the selected filter
  const filteredItems = items.filter(todoItem => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Active') {
      return !todoItem.completed;
    } else if (filter === 'Completed') {
      return todoItem.completed;
    }
    return false;
  });
 
  return (
    <div className="App">
      <div className='bg'><img src={dark} alt="dark background" /></div>
      <div className='black'></div>
      <div className='box'>
        <div className='flex todo'><h1>TODO</h1><img src={sun} alt="sun icon" /></div>
        <div className='flex inp'>
          <div><input type="text" placeholder='Create a new todo...' value={inputText} onChange={handleChange} /></div>
          <button onClick={addItem}>ADD</button>
        </div>
        <div className='ctn'>
          {filteredItems.map((todoItem, index) => (
            <div className='flex ctn1' key={index}>
              <div className='flex2'>
                {/* Clicking on the circle toggles completion status */}
                <div className={todoItem.completed ? 'selected' : 'circle'} onClick={() => toggleComplete(index)}></div>
                <span style={{ textDecoration: todoItem.completed ? 'line-through' : 'none' }}>
                  {todoItem.text}
                </span>
              </div>
              {/* Clicking on the delete icon deletes the item */}
              <img src={cross} onClick={() => deleteItem(index)} alt="delete" />
            </div>
          ))}
          <div className='flex last'>
            {/* Display the number of active items */}
            <div><p><span>{items.filter(item => !item.completed).length}</span> items left</p></div>
            <div className='flex2'>
              {/* Filter buttons */}
              <p onClick={() => handleFilter('All')}>All</p>
              <p onClick={() => handleFilter('Active')}>Active</p>
              <p onClick={() => handleFilter('Completed')}>Completed</p>
            </div>
            <div><p onClick={clearCompleted}>Clear Completed</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default App;