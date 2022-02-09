import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';

function App() {
  const [items] = useState([
    {id:0, text: "item0"},
    {id:1, text: "item1"},
    {id:2, text: "item2"},
    {id:3, text: "item3"}
  ]);

  const onDragEnd = (result) => {
    console.log('result', result);
    // 下記はsourceに入る対象を1つ削除するというもの
    const remove = items.splice(result.source.index, 1);
    console.log('remove', remove);
    // destinationにremoveで削除した対象を再挿入している
    items.splice(result.destination.index, 0 , remove[0]);
  };

  return (
    <div className='dragDropArea'>
      {/* この中でのみdrag-dropが可能 */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='item'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable draggableId={item.text} index={index} key={item.id}>
                  {(provided) => <div className='item' ref= {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                    {item.text}
                  </div>}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
