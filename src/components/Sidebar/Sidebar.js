import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import OpenSidebar from '../OpenSidebar'
import './Sidebar.css'
import {
  getCurrentLanguage,
} from '../../state/selectors'

class Sidebar extends PureComponent {
  state = {
    open: false,
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { language } = this.props
    return (
        <div className="Sidebar__container">
          <CSSTransition
            in={this.state.open}
            classNames="sidebar"
            unmountOnExit
            timeout={{enter: 500, exit: 300}}
            >
              <OpenSidebar setLang={this.setLang} closeMenu={this.toggleMenu} key="open"/>
          </CSSTransition>
          <Button className="Sidebar__menuBtn" onClick={this.toggleMenu} key="button">
            {this.state.open ? <i className="icon-close Sidebar__menuBtn__icon" /> : <i className="icon-dehaze Sidebar__menuBtn__icon" />}
          </Button>
          <Button onClick={this.toggleMenu} className="Sidebar__menuBtn Sidebar__languageBtn">{language.label}</Button>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  language: getCurrentLanguage(state),
})

export default connect(mapStateToProps)(Sidebar)
