/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */

'use client'

import React from 'react'

const DecriptionText = ({text} : any ) => {
  return (
    <div className="text-lg text-default-gray-700 mb-4" dangerouslySetInnerHTML={{__html: text}}/>  
  )
}

export default DecriptionText