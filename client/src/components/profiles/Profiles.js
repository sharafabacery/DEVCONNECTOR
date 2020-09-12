import React,{Fragment,useEffect} from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from "./ProfileItem";
import { getProfiles } from '../../actions/profile';
const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(()=>{
        getProfiles();
    },[getProfiles])
    return (
        <Fragment>
            {
              loading ?<Spinner/>:<Fragment>
              <h1 className='Large text-primary'>Developers</h1>
              <p className='lead'>
              <i className="fab fa-connectdevelop"></i>
              Browse and connect with developers
              </p>
              <div className="profiles">
              {
                  profiles.length >0 ?(profiles.map(profile=>(
                      <ProfileItem key={profile._id} profile={profile}/>
                  ))):<h4>No profiles found...</h4>    
              }
              </div>
              </Fragment>
            }
        </Fragment>
    )
}
const mapToStateTOPRops=(state)=>({
    profile:state.profile
})
const mapDispatchToProps=(dispatch)=>({
    getProfiles:()=>dispatch(getProfiles())
})
export default connect(mapToStateTOPRops,mapDispatchToProps)( Profiles)
