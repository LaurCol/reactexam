import React, { useState } from 'react'
import moment from "moment"



const ShowComment = ({commentaire}) => {

    const formatDate = (str) => moment(str).format('DD/MM/YYYY à  hh:mm:ss')

    return ( 
        <>
        {(commentaire) && (
  <div class=" rounded mb-3 py-3 px-3">
  <strong>{ commentaire.user.email}</strong>, le  {formatDate(commentaire.date)} a dit: 
  <br/>
                              <div className="commentblock">
                                  {commentaire.message}
                              </div>
                              <blockquote>Note : {commentaire.note} / 5</blockquote>
                              
                          </div>
        )}
  
                          
                

        </>

     );
}
 
export default ShowComment; 