import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value,key}) => <tr style={{backgroundColor:value.content_id==null?'#c1baea':'#b2cdef'}} >
  <td>{value._id}</td>
  <td>{value.name}</td>
  <td><input type="text" placeholder="00:00:00" disabled alt="" /></td>
  <td><input type="text" placeholder="00:00:00" disabled alt="" /></td>
  <td>
    <div class="action_buttons">
      <div class="dropdown">
        <a href="javascript:" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="javascript:;"><i class="fas fa-eye"></i> View Entries</a>
            <a class="dropdown-item" href="javascript:;"><i class="fas fa-edit"></i> Edit</a>
            <a class="dropdown-item" href="javascript;;"><i class="fas fa-trash-alt"></i> Delete</a>
        </div>
      </div>
    </div>
  </td>
</tr>);

// const SortableItem = SortableElement(({value,key}) => <tr><td>{value}</td></tr>);
const SortableList = SortableContainer(({items}) => {
  return (
    <div class="table-responsive">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>InTime</th>
        <th>OutTime</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {items.length>0 && items.map((value, index) => (
        <SortableItem key={`item-${value._id}`} index={index} value={value}/>
      ))}
    </tbody>
    </table>
    </div>
  );
});

class RowDragger extends Component {
  state = {
    items:[]
    // items: ['ietm1','item2','item3']
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    // this.setState(({items}) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
    this.props.updateDrag(arrayMove(this.state.items, oldIndex, newIndex))
    // this.setState({drag:true})
  };
  componentDidMount()
  {
    this.setState({items:this.props.draggerData})
  }
  componentDidUpdate()
  {
    if(this.state.items!=this.props.draggerData)
    {
      this.setState({items:this.props.draggerData})
    }
  }
  render() {
    const {items}=this.state;
   if(items.length>0)
   {
     return(<SortableList items={items} onSortEnd={this.onSortEnd} />);
   }
else
  {
      return(<div className="norslt"><p>No Result Found</p></div>)
  }
  }
}

export default  RowDragger;
