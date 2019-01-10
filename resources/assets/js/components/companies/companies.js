import React, {Component} from 'react';

class CompaniesList extends Component {
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
                {
                    this.props.companies.map((company) => {
                        return (
                            <tr key={company.id} className={`row-${company.id}`}>
                                            
                                <td>{company.id}</td>
                                <td>{company.company_cd}</td>
                                <td>{company.name}</td>
                                <td>{company.address}</td>
                                <td>{company.email}</td>
                                <td>{company.contact_no}</td>
                                <td>{company.created_by}</td>
                                <td className="action">
                                    <a href="javascript:void(0);" onClick={this.props.onEditCompany.bind(null, company.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                    <a className="tooltip" href="javascript:void(0);" onClick={()=>this.deleteItem(company.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                    {this.state.showItem==company.id ? (
                                        <span className="confirm tooltip-text tooltip-full">Are you sure?&nbsp; 
                                            <a onClick={this.props.deleteCompany.bind(null, company.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                            <a href="javascript:void(0);" onClick={this.hideDiv.bind(this)}>No</a>
                                        </span>
                                    ): null}
                                </td>
                                <td>
                                    <div className="switch">
                                        <label>
                                            {company.status== 1 ? (
                                                <input onClick = {()=> this.props.companyStatus(company.id, company.status) } defaultChecked type="checkbox" value={company.status}/>

                                            ):
                                                <input onClick = {()=> this.props.companyStatus(company.id, company.status) }  type="checkbox" value={company.status}/>
                                            }
                                            <span className="lever"></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        );
    }
};

export default CompaniesList;