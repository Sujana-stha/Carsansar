import React, {Component} from 'react';

class ColorsList extends Component {
  constructor() {
      super();
      this.state = {
          confirm: false,
          showItem: null
      };
  }

  deleteItem(id){
      this.setState({showItem: id})
  }
  componentDidMount() {
      this.setState({
          confirm: false
      })
  }
  hideDiv() {
      this.setState({showItem: null})
  }
  render() {
      return (
          <tbody>
              {this.props.colors.map((color) => {
                  return (
                      <tr key={color.id} className={`row-${color.id}`}>
                                          
                        <td>{color.id}</td>
                        <td>{color.color_cd}</td>
                        <td>{color.color_desc}</td>
                        <td>{color.created_by.name}</td>
                        <td>99</td>
                        <td className="action">
                              <a href="javascript:void(0);" onClick={this.props.onEditColor.bind(null, color.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                              <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(color.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                              {this.state.showItem==color.id ? (
                                  <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                      <a onClick={this.props.deleteColor.bind(null, color.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                      <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                  </span>
                              ): null}
                          </td>
                          <td>
                              <div className="switch">
                                  <label>Inactive
                                      {color.status=== 1 ? (
                                          <input onClick = {()=> this.props.colorStatus(color.id, color.status) } defaultChecked type="checkbox" value={color.status}/>

                                      ):
                                          <input onClick = {()=> this.props.colorStatus(color.id, color.status) }  type="checkbox" value={color.status}/>
                                      }
                                      <span className="lever"></span>Active
                                  </label>
                              </div>
                          </td>
                      </tr>
                  )
              })}
              
          </tbody>
      );
  }
};

export default ColorsList

