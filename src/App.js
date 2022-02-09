import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';

function App() {
  const [items] = useState(["item0","item1","item2","item3"]);
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
              <Draggable draggableId='item0' index={0}>
                {(provided) => <div className='item' ref= {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                  {items[0]}
                </div>}
              </Draggable>
              <Draggable draggableId='item1' index={1}>
                {(provided) => <div className='item' ref= {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                  {items[1]}
                </div>}
              </Draggable>
              <Draggable draggableId='item2' index={2}>
                {(provided) => <div className='item' ref= {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                  {items[2]}
                </div>}
              </Draggable>
              <Draggable draggableId='item3' index={3}>
                {(provided) => <div className='item' ref= {provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                  {items[3]}
                </div>}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
