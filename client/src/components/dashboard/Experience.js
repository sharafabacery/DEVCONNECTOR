import React,{Fragment} from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
const Experience=({experience,deleteExperience})=> {
    const experiences=experience.map(exp=>(
        <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {
            exp.to ===null ?('NOW '):(<Moment format="YYYY/MM/DD">{exp.to}</Moment> )
        }</td>
        <td>
        <button onClick={()=>deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
        </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table">
            <thead>
            <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th/>
            </tr>
            </thead>
            <tbody>{
               experiences
            }</tbody>
            </table>
        </Fragment>
    )
}
const mapDispatchToProps=(dispatch)=>(
    {

      deleteExperience:(id)=>dispatch(deleteExperience(id))
     
    }
)
export default connect(null,mapDispatchToProps)(Experience)
