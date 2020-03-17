import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => <tr><td>{value}</td></tr>);

const SortableList = SortableContainer(({items}) => {
  return (
    <table>
    <tr><td>Name</td><td>Status</td></tr>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value}/>
      ))}
    </table>
  );
});

class RowDragger extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    console.log(this.state.items);
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default  RowDragger;
