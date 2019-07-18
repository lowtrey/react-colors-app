import React from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem'
  },
  colorNameInput: {
    width: '100%',
    height: '70px'
  }
};

class ColorPickerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: 'teal', newColorName: '' };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => 
       this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value => 
      this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    );
  }
  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  };
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
          <ChromePicker 
            color={currentColor} 
            className={classes.picker}
            onChangeComplete={this.updateCurrentColor} 
          />
          <ValidatorForm onSubmit={this.handleSubmit}>
            <TextValidator 
              value={newColorName} 
              name='newColorName'
              variant='filled'
              margin='normal'
              placeholder='Color Name'
              className={classes.colorNameInput}
              onChange={this.handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "Enter color name",
                "Color name must be unique", 
                "Color already used"
              ]}
            />
          <Button 
            variant='contained' 
            type='submit'
            color='primary'
            className={classes.addColor}
            disabled={paletteIsFull}
            style={{ 
              backgroundColor: paletteIsFull 
                ? 'grey'
                : currentColor 
            }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
          </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);