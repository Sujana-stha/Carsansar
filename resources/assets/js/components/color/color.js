import React from 'react';
//import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <tbody>
    {props.colors.map(color => {
      return (
        <tr key={color.color_id}>
               <td>{color.color_id}</td>
               <td>{color.color_cd}</td>
               <td>{color.color_desc}</td>
               <td>{color.created_by.name}</td>
               <td>99</td>
               <td>
                 <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit" href="#"><i className="material-icons">edit</i></a>
                 <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Delete" href="#"><i className="material-icons">delete</i></a>
              </td>
              <td>
                <div className="switch">
                  <label>Inactive
                    <input defaultChecked type="checkbox" />
                    <span className="lever"></span>Active
                  </label>
                </div>
              </td>
               
        </tr>           


      );
    })}
    </tbody>
  );
}

