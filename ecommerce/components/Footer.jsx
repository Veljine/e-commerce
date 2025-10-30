import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiOutlineFacebook, AiOutlineYoutube, AiFillApple, AiFillAndroid} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container footer-margin'>
      <p>@2022 Utopia Store All rights reserved</p>
      <p className='icons'>
        <AiOutlineTwitter />
        <AiFillInstagram />
        <AiOutlineFacebook />
        <AiOutlineYoutube />
        <AiFillApple />
        <AiFillAndroid />
      </p>
    </div>
  )
}

export default Footer