import * as React from 'react';

export interface Props {

}

export class FooterView extends React.Component<Props, {}> {

  public render() {
    return (
      <footer className='footer'>
        <div className='shell'>
          <div className='footer-menu-holder clear'>
            <div className='footer-menu-section'>
              <h3>General</h3>
              <ul>
                <li>
                  <a href="javascript: openHelpSection('AboutUs');">About Us</a>
                </li>
                <li>
                  <a href="javascript: openHelpSection('TermsAndConditions');">Help Centre</a>
                </li>
                <li>
                  <a href="javascript: openHelpSection('BettingRules');">Betting Rules</a>
                </li>
                <li>
                  <a href="javascript: openHelpSection('Affiliates');" target='_blank'>Affiliates</a>
                </li>
                <li>
                  <a href="javascript: openHelpSection('ContactUs');">Contact Us</a>
                </li>
              </ul>
            </div>

            <div className='footer-menu-section'>
              <h3>Trending</h3>
              <ul>
                <li>
                  <a href='/live-betting/'>Live Betting</a>
                </li>
                <li>
                  <a href='/promotions/'>Promotions</a>
                </li>
                <li>
                  <a href='/casino/'>Casino Games</a>
                </li>
                <li>
                  <a href='/results/'>Results</a>
                </li>
                <li>
                  <a href='/statistics/' target='_blank'>Statistics</a>
                </li>
              </ul>
            </div>

            <div className='footer-menu-section'>
              <h3>Privacy</h3>
              <ul>
                <li>
                  <a href="javascript: openHelpSection('TermsAndConditions');">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="javascript: openHelpSection('ResponsibleGaming');">Responsible Gaming</a>
                </li>
                <li>
                  <a href="javascript: openHelpSection('PrivacyPolicy');">Privacy &amp; Cookie Policy</a>
                </li>
                <li>
                  <a href="javascript: openHelpSection('Security');">Security</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='payment-method'>
            <ul>
              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/visa.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/master-card.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/maestro.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/neteller.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/visa-electron.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/paysafecard.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/skrill.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/mastercard-secure-code.svg' alt='' />
              </li>

              <li>
                <img src='https://d2ffi3pa1qzwhf.cloudfront.net/resp/icons/verified-by-visa.svg' alt='' />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}