import React,{Fragment,useState} from 'react'
import { Link,withRouter } from 'react-router-dom';
import{connect}from 'react-redux'
import { addEducation } from "../../actions/profile";
const AddEducation=( {addEducation,history} )=> {
    const[formData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        form:'',
        to:'',
        current:false,
        description:''
    })
    const[toDateDisabled,toggleDisabled]=useState(false)
    const{school,degree,fieldofstudy,from,to,current,description}=formData
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit=(e)=>{
        e.preventDefault();
        addEducation(formData,history)
    }
    return (
        <Fragment>
        <section class="container">
        <h1 class="large text-primary">
         Add Your Education
        </h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any school or bootcamp
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={e=>onSubmit(e)}>
          <div class="form-group">
            <input type="text" placeholder="* school or bootcamp" name="school" value={school} onChange={e=>onChange(e)} required />
          </div>
          <div class="form-group">
            <input type="text" placeholder="* degree" name="degree" value={degree} onChange={e=>onChange(e)}  required />
          </div>
          <div class="form-group">
            <input type="text" placeholder="fieldofstudy" value={fieldofstudy} onChange={e=>onChange(e)}  name="fieldofstudy" />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={e=>onChange(e)} />
          </div>
           <div class="form-group">
            <p><input type="checkbox" name="current" checked={current} value={current} onChange={e=>{setFormData({...formData,current:!current})
                toggleDisabled(!toDateDisabled)
        }} /> {''}Current Job</p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={to} onChange={e=>onChange(e)} disabled={toDateDisabled ?'disabled':''} />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description} onChange={e=>onChange(e)} 
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link class="btn btn-light my-1" to="dashboard">Go Back</Link>
        </form>
      </section>
        </Fragment>
    )
}

const mapDispatchToProps=(dispatch)=>(
    {

      addEducation:(formData,history)=>dispatch(addEducation(formData,history))
     
    }
)
export default connect(null,mapDispatchToProps)(withRouter(AddEducation))
