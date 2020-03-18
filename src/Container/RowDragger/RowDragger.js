import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Moment from 'react-moment';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value,key,index}) => {
  return(<tr style={{backgroundColor:value.content_id==null?'rgb(208, 204, 232)':'rgb(188, 210, 239)'}} id={`row_id_${value._id}`} class="table_tr">
  <td>{value._id}</td>
  <td>{value.name}</td>
  <td>{value.short_name}</td>
  <td><Moment  element="span"  format="HH:mm" add={{hours:5.5}}>{value.duration}</Moment></td>
  <td><input type="text" placeholder="00:00:00" /></td>
  <td><input type="text" placeholder="00:00:00"  /></td>
</tr>);
});

// const SortableItem = SortableElement(({value,key}) => <tr><td>{value}</td></tr>);
const SortableList = SortableContainer(({items}) => {
  return (
    <div class="table-responsive">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Short Name</th>
        <th>Duration</th>
        <th>InTime</th>
        <th>OutTime</th>
      </tr>
    </thead>
    <tbody>
      {items.length>0 && items.map((value, index) =>{
        return(
          <Root>
        <SortableItem key={`item-${value._id}`} index={index} value={value}/>
        <div class="action_buttons dropdown" id={`action-${value._id}`} >
            <a href="javascript:" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="javascript:;"><i class="fas fa-eye"></i> View</a>
                <a class="dropdown-item" href="javascript:;"><i class="fas fa-edit"></i> Edit</a>
                <a class="dropdown-item" href="javascript;;"><i class="fas fa-trash-alt"></i> Delete</a>
            </div>
        </div>
        </Root>
      )})}
    </tbody>
    </table>
    </div>
  );
});
const Root=(props)=>{
  return(props.children)
}
class RowDragger extends Component {
  state = {
    items:[]
    // items: ['ietm1','item2','item3']
  };
  onSortEnd = ({oldIndex, newIndex,collection, isKeySorting}, e) => {
    // this.setState(({items}) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
    $('#row_id_'+oldIndex).removeClass('xyz');
      console.log(collection);
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
  onSortStart=({node, index, collection, isKeySorting}, event)=>{
    $('#'+node.id).addClass('xyz')
  }
  render() {
    const {items}=this.state;
   if(items.length>0)
   {
     return(<SortableList items={items} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} transitionDuration={600}/>);
   }
else
  {
      return(<div className="norslt"><p>No Result Found</p></div>)
  }
  }
}

export default  RowDragger;
