import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';


ReactGA.initialize('UA-144187649-2', {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123
  }
});
ReactGA.pageview(window.location.pathname + window.location.search);

const history = createBrowserHistory();

// Initialize google analytics page view tracking
// history.listen(location => {
//   ReactGA.set({ page: location.pathname }); // Update the user's current page
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });


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
      <Route history={history}
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
                <Route 
                  exact path='/' 
                  render={(routeProps) => (
                    <Page>
                      <PaletteList 
                        palettes={this.state.palettes} 
                        deletePalette={this.deletePalette}
                        {...routeProps} 
                      />
                    </Page>
                  )} 
                />
                <Route 
                  exact path='/palette/new' 
                  render={(routeProps) => (
                    <Page>
                      <NewPaletteForm 
                        savePalette={this.savePalette} 
                        palettes={this.state.palettes}
                        {...routeProps} 
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
                        palettes={this.state.palettes} 
                        deletePalette={this.deletePalette}
                        {...routeProps} 
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