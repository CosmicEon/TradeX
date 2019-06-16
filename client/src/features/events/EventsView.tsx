import * as React from 'react';
import { observer } from 'mobx-react';
import { EventsStore } from './EventsStore';

export interface Props {
  store: EventsStore;
}

@observer
export class EventsView extends React.Component<Props, {}> {

  constructor(props) {
    super(props);

    this.handleSelectedEvent = this.handleSelectedEvent.bind(this);
  }

  public render() {
    const { store } = this.props;

    return (
      <div className='widget widget-list-categories'>
        <div className='widget-inner'>
          <ul className='list-categories'>
            <ul className='list-selected-match'>
              <li>
                <div className='category-item'>
                  <div className='category-head'>
                    <h4 className='category-title'>
                      <a>Events</a>
                    </h4>
                  </div>
                  <div className='category-body'>
                    {store.events.map(event => (
                      <div key={event.id} onClick={(e): any => { this.props.store.selectedEvent(event.id); }}>
                        <a>{event.name}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            {/* {Object.keys(store.groups).map((key, index) => (
              <li key={index}>
                <div className='category-item'>
                  <div className='category-head'>
                    <h4 className='category-title'>
                      <a>{key}</a>
                    </h4>
                  </div>

                  <div className='category-body'>

                  </div>
                </div>
              </li>
            ))} */}
          </ul>
        </div>
      </div >
    );
  }

  private readonly handleSelectedEvent = (id: number): any => async (): Promise<void> => {
    this.props.store.selectedEvent(id);
  }
}