import React, {Component} from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import SwapiService from '../Services';
import DummySwapiService from '../Services/dummySwapiService';
import './style.css';
import ErrorBoundry from '../ErrorBoundry';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  SecretPage,
  LoginPage
} from '../Page'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { StarshipDetails, PlanetDetails} from '../SwComponents';

export default class App extends Component{

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
    
      return {
        swapiService: new Service()
      }

    })
  }

  render() {

    const {isLoggedIn} = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
                    <Header 
                      onServiceChange={this.onServiceChange}
                    />
                    <RandomPlanet />                  

                    <Switch>
                      <Route path='/' 
                        render={() => <h2>Welcome to StarDB</h2>} 
                        exact
                      />
                      <Route path='/people/:id?' exact component={PeoplePage} />

                      <Route path='/planets' exact component={PlanetsPage} />
                      <Route path='/planets/:id'
                        render={({match}) => {
                          const {id} = match.params;
                          return <PlanetDetails itemId={id} />
                        }}
                        />
                      <Route path='/starships' exact component={StarshipsPage} />
                      <Route path='/starships/:id'
                        render={({match}) => {
                          const {id} = match.params;
                          return <StarshipDetails itemId={id}/>
                        } }
                      />
                      <Route path='/login' exact render={() => <LoginPage 
                        isLoggedIn={isLoggedIn}
                        onLogin={this.onLogin}
                      />} />
                      <Route path='/secret' exact render={() => <SecretPage isLoggedIn={isLoggedIn} />} />
                      <Route render={() => <h2>Page not found</h2> } />
                    </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>  
      </ErrorBoundry>
    );
  }
}