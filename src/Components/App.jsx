import React, { useState, useEffect } from 'react';
import './style.css';
import dark from '../images/bg-desktop-dark.jpg';
import sun from '../images/icon-sun.svg';
import cross from '../images/icon-cross.svg';


function App() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isDone, setIsDone] = useState(false);
  const [isSelected, setSelected] = useState(false);

  function handleClick() {
    setSelected(!isSelected);
    setIsDone(!isDone)
  }

  function handleFilter(filter) {
    setFilter(filter);
  }

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


  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];

    });
    setInputText('');

  }

  // function deleteItem(id) {
  //   setItems((prevItems) =>{
  //     return prevItems.filter((item, index) =>{
  //       return index !== id
  //     })
  //   })
  // }





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
            // <Container key={index} id={index} text={todoItem} />
            <div className='flex ctn1' key={index}>
              <div className='flex2'>
                <div className={isSelected ? 'selected' : 'circle'} onClick={handleClick}></div>
                <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
                  {todoItem}
                </span>
              </div>
              <img src={cross} onClick={() => {
                // props.onChecked(props.id)
              }} />
            </div>
          ))}
          <div className='flex last'>
            <div><p><span>5</span> items left</p></div>
            <div className='flex2'>
              <p onClick={() => handleFilter('All')}>All</p>
              <p onClick={() => handleFilter('Active')}>Active</p>
              <p onClick={() => handleFilter('Completed')}>Completed</p>
            </div>
            <div><p>Clear Completed</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
