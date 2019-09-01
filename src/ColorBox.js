import React, { useState } from 'react';
import clsx from 'clsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import styles from './styles/ColorBoxStyles';

function ColorBox(props) {
  const { name, background, moreUrl, showingFullPalette, classes } = props;
  const [copied, setCopied] = useState(false);
  const changeCopyState = () => {
    setCopied(true); 
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div 
          style={{ background }}  
          className={clsx(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
        />
        <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
          <h1>Copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColorBox);