import React,{Fragment} from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';
const Education=({education,deleteEducation})=> {
    const educationn=education.map(edu=>(
        <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {
            edu.to ===null ?('NOW '):(<Moment format="YYYY/MM/DD">{edu.to}</Moment> )
        }</td>
        <td>
        <button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
        </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education</h2>
            <table className="table">
            <thead>
            <tr>
            <th>School</th>
            <th className="hide-sm">degree</th>
            <th className="hide-sm">Years</th>
            <th/>
            </tr>
            </thead>
            <tbody>{
                educationn
            }</tbody>
            </table>
        </Fragment>
    )
}
const mapDispatchToProps=(dispatch)=>(
    {

      deleteEducation:(id)=>dispatch(deleteEducation(id))
     
    }
)
export default connect(null,mapDispatchToProps)(Education)
