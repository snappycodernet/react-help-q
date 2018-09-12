import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: []
    };
    this.handleAddTicket = this.handleAddTicket.bind(this);
  }
  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }
  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }
  handleAddTicket(newTicket) {
    const ticketListCopy = this.state.masterTicketList.slice();
    newTicket.formattedWaitTime = (newTicket.timeOpen).fromNow(true);
    ticketListCopy.push(newTicket);
    this.setState({masterTicketList: ticketListCopy});
  }
  updateTicketElapsedWaitTime() {
    console.log("check");
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach((ticket) =>
      ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    );
    this.setState({masterTicketList: newMasterTicketList})
  }
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route
            exact path='/'
            render={() => <TicketList ticketList={this.state.masterTicketList} />} />
          />
          <Route
            exact path='/newticket'
            render={() => <NewTicketControl onNewTicketCreation={this.handleAddTicket} />} />
          />
        </Switch>
      </div>
    );
  }
}

export default App;
