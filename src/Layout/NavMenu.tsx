import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { SbNavLink, SbNavlinkProps } from "./SbNavLink";
/*tslint:disable: no-require-imports no-var-requires */
const sbLogo = require("@sbac/sbac-ui-kit/src/images/SmarterBalanced-Logo.png");
// const sbLogo = require("../Assets/Images/");

export interface NavMenuProps {
  links?: SbNavlinkProps[];
  siteName: string;
  mainContentId: string;
  isInterimSite?: boolean;
  userName?: string;
  signoutLink?: string;
  signinLink?: string;
}

export class NavMenu extends React.Component<NavMenuProps, {}> {
  renderLinks() {
    const links = this.props.links;
    let content: JSX.Element | undefined;
    if (links) {
      const sbLinks = links.map((l, key) => <SbNavLink {...l} key={key} />);
      content = <div className="nav-linksGroup">{sbLinks}</div>;
    }

    return content;
  }

  renderLoggedInUserProfileMenu() {
    let content: JSX.Element | undefined;
    console.log(this.props.isInterimSite);
    if (
      this.props.isInterimSite !== undefined &&
      this.props.isInterimSite === true
    ) {
      content = (
        <div className="dropdown nav-linksGroup-item">
          <span>{this.props.userName}</span>
          <div className="dropdown-content">
            <a href={this.props.signoutLink}>Logout</a>
          </div>
        </div>
      );
    } else if (
      this.props.isInterimSite !== undefined &&
      this.props.isInterimSite === false
    ) {
      content = (
        <div className="nav-linksGroup-item">
          <span>
            <a target="_blank" href={this.props.signinLink}>Login</a>
          </span>
        </div>
      );
    }

    return content;
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.keyCode === 13) {
      const elem = e.target as HTMLElement;
      elem.blur();
      const body = document.getElementById("enter-item-id-bf");
      if (body) {
        body.scrollIntoView();
      }
    }
  };

  render() {
    return (
      <header role="navigation">
        <div id="skip-main">
          <NavLink
            to="/BrowseItems"
            exact
            activeClassName="active"
            className="skip-link"
            onKeyUp={this.handleKeyDown}
          >
            Skip to main content
          </NavLink>
        </div>
        <nav className="nav-container" role="navigation">
          <div className="nav-content container">
            <div className="nav-titleGroup">
              <div className="nav-titleGroup-item">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="http://www.smarterbalanced.org/"
                  title="Smarter Balanced Home"
                >
                  <img alt="Smarter Balanced Logo" src={sbLogo} />
                </a>
              </div>
              <div className="nav-titleGroup-item">
                <h1 className="application-title">{this.props.siteName}</h1>
              </div>
            </div>
            {this.renderLinks()}

            {/* check if site is interim 
                For interim site, display username with option to logout
            */}
            {this.renderLoggedInUserProfileMenu()}
          </div>
        </nav>
      </header>
    );
  }
}
