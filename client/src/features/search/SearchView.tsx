import * as React from 'react';
import { observer } from 'mobx-react';
import { SearchStore } from './SearchStore';

export interface Props {
  store: SearchStore;
}

@observer
export class SearchView extends React.Component<Props, {}> {

  constructor(props) {
    super(props);

    this.handleSelectedLeague = this.handleSelectedLeague.bind(this);
    this.handleSelectedSport = this.handleSelectedSport.bind(this);
  }

  public render() {
    const { store } = this.props;

    return (
      <div className='widget widget-list-categories'>
        <div className='widget-inner'>
          <select className='group-selector' name='All League Event' onChange={this.handleSelectedLeague}>
            {store.leagueEvents.map((g, i) => (
              <option className='group-selector-item' key={i} value={g.value}>{g.name}</option>
            ))}
          </select>

          <select className='group-selector' name='All Sport Event' onChange={this.handleSelectedSport}>
            {store.sportEvents.map((g, i) => (
              <option className='group-selector-item' key={i} value={g.value}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  private handleSelectedLeague(event: any) {
    event.preventDefault();
    this.props.store.selectedLeague(event.target.value);
  }

  private handleSelectedSport(event: any) {
    event.preventDefault();
    this.props.store.selectedSport(event.target.value);
  }
}