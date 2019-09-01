import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import styles from './styles/PaletteStyles';

function Palette(props) {
  const { colors, paletteName, emoji, id } = props.palette;
  const [format, setFormat] = useState('hex');
  const [level, setLevel] = useState(500);
  const { classes } = props;

  const changeLevel = level => setLevel(level);
  const changeFormat = val => setFormat(val);
  
  const colorBoxes = colors[level].map(color => (
    <ColorBox 
      background={color[format]} 
      name={color.name} 
      key={color.id} 
      id={color.id}
      paletteId={id}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette={true}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar 
        level={level} 
        showingAllColors
        changeLevel={changeLevel} 
        handleChange={changeFormat}
      />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(Palette);