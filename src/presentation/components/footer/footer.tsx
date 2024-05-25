/* eslint-disable react/jsx-no-target-blank */
import Styles from './footer-styles.scss'
import React, { memo } from 'react'

const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer}>
      <a href="https://portfolio-silas.vercel.app/" target="_blank" >projetos</a> | <a href="https://github.com/SilasPaixao" target="_blank" >github</a> | <a href="https://www.linkedin.com/in/silas-paix%C3%A3o-8a2a85205/" target="_blank">linkedin</a>
    </footer>
  )
}

export default memo(Footer)
