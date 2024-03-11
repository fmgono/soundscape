import React from 'react';

import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      &copy; { new Date().getFullYear() + ' '}
      <span>
        <a
          style={{ color: '#5950d6', textDecoration: 'none' }}
          href="
        https://soundscape.netlify.app
        ">
          &nbsp;Soundscape
        </a>
      </span>
      . All rights reserved.
    </footer>
  );
};

export default Footer;
