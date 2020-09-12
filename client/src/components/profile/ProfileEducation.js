import React from 'react'
import Moment from 'react-moment'
function ProfileEducation({education:{school,degree,fieldofstudy,current,to,from,description}}) {
    return (
      
        <div>
        <h3 class="text-dark">{school}</h3>
        <p>{<Moment format="YYYY/MM/DD">{from}</Moment>} - {!to ?'now':<Moment format="YYYY/MM/DD">{to}</Moment>}</p>
        <p><strong>Position: </strong>{degree}</p>
        <p><strong>fieldofstudy: </strong>{fieldofstudy}</p>
        <p>
          <strong>Description: </strong>{description}
        </p>
      </div>
        
    )
}

export default ProfileEducation
