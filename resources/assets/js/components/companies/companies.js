import React from 'react';

const CompaniesList = (props) => {
    const authUser = window.Laravel.super_admin
    return (
        <tbody>
            {
                props.companies.map((company, index) => {
                    return (
                        <tr key={company.id} className={`row-${company.id}`}>
                            <td>{((props.activePage-1)*props.itemsCountPerPage)+(index+1)}</td>
                            <td>{company.company_cd == null ? '-': company.company_cd}</td>
                            <td>{company.name == null ? '': company.name}</td>
                            <td>{company.address == null ? '-' : company. address}</td>
                            <td>
                                <div className="wr-company-email">
                                    {company.email == null ? '-' : company.email}
                                    <span className="tooltipped">{company.email == null ? '-' : company.email}</span>
                                </div>
                            </td>
                            <td>{company.contact_no == null ? '-': company.contact_no}</td>
                            <td>{company.created_by.name}</td>
                            <td className="action">
                                <a href="javascript:void(0);" onClick={props.onEditCompany.bind(null, company.id)} className="tooltipped" data-position="top" data-delay="50" data-tooltip="Edit"><i className="material-icons">edit</i></a>
                                {props.userRole.name == authUser ? (
                                <a className="tooltip" href="javascript:void(0);" onClick={()=>props.showConfirmBox(company.id)} data-tooltip="Delete"><i className="material-icons">delete</i></a>
                                ): null }

                                {props.confirmText==company.id ? (
                                    <span className="confirm tooltip-text tooltip-full">Are you sure?&nbsp; 
                                        <a onClick={props.deleteCompany.bind(null, company.id)} href="javascript:void(0);">Yes</a> &nbsp;
                                        <a href="javascript:void(0);" onClick={props.hideConfirmBox.bind(null)}>No</a>
                                    </span>
                                ): null}
                            </td>
                            <td>
                                <div className="switch">
                                    <label>
                                        {company.status== 1 ? (
                                            <input onClick = {()=> props.companyStatus(company.id, company.status) } defaultChecked type="checkbox" value={company.status}/>

                                        ):
                                            <input onClick = {()=> props.companyStatus(company.id, company.status) }  type="checkbox" value={company.status}/>
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
};

export default CompaniesList;