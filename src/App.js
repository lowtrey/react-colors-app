import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColors };
    this.deletePalette = this.deletePalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  };
  findPalette(id) {
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    });
  };
  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
  };
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, 
      this.syncLocalStorage
    );
  };
  syncLocalStorage() {
    // save palettes to localStorage
    window.localStorage.setItem(
      'palettes', 
      JSON.stringify(this.state.palettes)
    );
  };
  
  render() {
    return (
      <Route
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
                <Route 
                  exact path='/' 
                  render={(routeProps) => (
                    <Page>
                      <PaletteList 
                        {...routeProps} 
                        palettes={this.state.palettes} 
                        deletePalette={this.deletePalette}
                      />
                    </Page>
                  )} 
                />
                <Route 
                  exact path='/palette/new' 
                  render={(routeProps) => (
                    <Page>
                      <NewPaletteForm 
                        {...routeProps}
                        savePalette={this.savePalette} 
                        palettes={this.state.palettes}
                      />
                    </Page>
                  )} 
                />
                <Route 
                  exact path='/palette/:id' 
                  render={routeProps => (
                    <Page>
                      <Palette 
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )} 
                      />
                    </Page>
                  )} 
                />
                <Route 
                  exact path='/palette/:paletteId/:colorId'
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette 
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )} 
                      />
                    </Page>
                  )} 
                />
                <Route 
                  render={(routeProps) => (
                    <Page>
                      <PaletteList 
                        {...routeProps} 
                        palettes={this.state.palettes} 
                        deletePalette={this.deletePalette}
                      />
                    </Page>
                  )} 
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
      )} />
    );
  }
}

export default App;