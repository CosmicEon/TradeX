import * as React from 'react';
import { BetOptionsStore } from './BetOptionsStore';
import { observer } from 'mobx-react';

export interface Props {
  store: BetOptionsStore;
}

@observer
export class BetOptionsView extends React.Component<Props, {}> {

  constructor(props) {
    super(props);

  }

  public render() {
    const { store } = this.props;
    const event = store.event;

    return event && (
      <>
        <div className='section-breadcrumbs'>
          <ul className='list-links'>
            <li>
              <a href='#'>
                {event.sport.name}
              </a>
            </li>

            <li>
              <a href='#'>
                {event.eventName}
              </a>
            </li>
          </ul>
        </div>

        <section className='section section-match-results'>
          <div className='section-head'>
            <h2 className='section-title'>
              Match results
          </h2>
          </div>

          <div className='section-body'>
            test content
        </div>
        </section>

        <section className='section section-correct-score'>
          <div className='section-head'>
            <h2 className='section-title'>
              Correct score
          </h2>
          </div>

          <div className='section-body'>
            test content
        </div>
        </section>

        <section className='section section-total-goals'>
          <div className='section-head'>
            <h2 className='section-title'>
              Total goals
          </h2>
          </div>

          <div className='section-body'>
            test content
        </div>
        </section>

        <section className='section section-penalty-in-match'>
          <div className='section-head'>
            <h2 className='section-title'>
              Penalty in match
          </h2>
          </div>

          <div className='section-body'>
            test content
        </div>
        </section>
      </>
    );
  }
}