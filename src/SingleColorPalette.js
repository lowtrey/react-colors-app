import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import styles from './styles/PaletteStyles';

function SingleColorPalette(props) {
  const { paletteName, emoji, id } = props.palette;
  const [format, setFormat] = useState('hex');
  const { classes } = props;

  const gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;
    for(let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    // return all shades of given color
    return shades.slice(1);
  };
  const _shades = gatherShades(props.palette, props.colorId);
  const changeFormat = val => setFormat(val);
  const colorBoxes = _shades.map(color => (
    <ColorBox 
      key={color.name} 
      name={color.name} 
      background={color[format]} 
      showingFullPalette={false} 
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar 
        handleChange={changeFormat} 
        showingAllColors={false}
      />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);