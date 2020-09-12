import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getGithupRepos } from "../../actions/profile";
function ProfileGithub({username,getGithupRepos,repos}) {
    useEffect(()=>{
        getGithupRepos(username)
    },[getGithupRepos])
    return (
        <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
          {repos===null ?<Spinner/>:(
              repos.map((repo)=>(
                  <div key={repo._id} class="repo bg-white p-1 my-1">
            <div>
              <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
                {repo.description}
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li class="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
          
              ))
          )}
          
          </div>
    )
}
const mapDispatchToProps=(dispatch)=>(
    {
      getGithupRepos:(username)=>dispatch(getGithupRepos(username))
      
    }
  )
  const mapToStateToProps=state=>({
   repos:state.profile.repos
  })
  

export default connect(mapToStateToProps,mapDispatchToProps)(ProfileGithub)
