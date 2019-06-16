import * as React from 'react';
import { EventDetailsStore } from './EventDetailsStore';
import { observer } from 'mobx-react';

export interface Props {
  store: EventDetailsStore;
}

@observer
export class EventDetailsView extends React.Component<Props, {}> {

  constructor(props) {
    super(props);

    this.handleSelectScore = this.handleSelectScore.bind(this);
  }

  public render() {
    const { store } = this.props;
    const event = store.event;

    return (
      <>
        {event ? (
          <>
            <div className='section-breadcrumbs'>
              <ul className='list-links'>
                <li key='1'>
                  <a href='#'>
                    {event.sport.name}
                  </a>
                </li>

                <li key='2'>
                  <a href='#'>
                    {event.name}
                  </a>
                </li>
                <li key='3'>
                  <button className='select-score' onClick={this.handleSelectScore}>{store.scoreOption ? 'decimal' : 'american'}</button>
                </li>
              </ul>
            </div>

            <section className='section section-total-goals'>
              <div className='section-head section-breadcrumbs'>
                <h2 className='section-title'>
                  {event.league.name}
                </h2>
              </div>
            </section>

            <section className='section section-match-results'>
              <div className='section-head'>
                <h2 className='section-title'>
                  Home Team Score
                </h2>
                <h2 className='section-title'>
                  Away Team Score
                </h2>
              </div>

              <div className='section-body'>
                <p className='section-content'>{store.convertScore(event.homeTeamScore)}</p>
                <p className='section-content'>{store.convertScore(event.awayTeamScore)}</p>
              </div>
            </section>

            <section className='section section-correct-score'>
              <div className='section-head'>
                <h2 className='section-title'>
                  Home Team Odds
                </h2>
                <h2 className='section-title'>
                  Home Team Odds
                </h2>
              </div>

              <div className='section-body'>
                <p className='section-content'>{store.convertScore(event.homeTeamOdds)}</p>
                <p className='section-content'>{store.convertScore(event.awayTeamOdds)}</p>
              </div>
            </section>

            <section className='section section-total-goals'>
              <div className='section-head'>
                <h2 className='section-title'>
                  Draw Odds
                </h2>
              </div>

              <div className='section-body'>
                {store.convertScore(event.drawOdds)}
              </div>
            </section>
          </>

        ) : (
            <section className='container'>
              <div className='content'>

                <p className='select-event'>
                  Select Event
              </p>
              </div>
            </section>
          )}

      </>
    );
  }

  private handleSelectScore(e: any) {
    e.preventDefault();
    this.props.store.selectScore();
  }
}