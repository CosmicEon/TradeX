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
            {Object.keys(store.groups).map((key) => (
              <li>
                <div className='category-item'>
                  <div className='category-head'>
                    <h4 className='category-title'>
                      <a>{key}</a>
                    </h4>
                  </div>

                  <div className='category-body'>
                    <ul className='list-selected-match'>
                      {store.groups[key].map(event => (
                        <li key={event.id} onClick={(e: any) => this.handleSelectedEvent(e, event.id)}>
                          <a>{event.eventName}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  private handleSelectedEvent(e: any, id: number) {
    e.preventDefault();
    this.props.store.selectedEvent(id);
  }
}