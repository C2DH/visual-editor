import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
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
        {this.state.open ? <OpenSidebar setLang={this.setLang} closeMenu={this.toggleMenu} key="opensidebar"/> : null}
        <Button className="Sidebar__menuBtn" onClick={this.toggleMenu} key="button">
          {this.state.open ? <i className="icon-close Sidebar__menuBtn__icon" /> : <i className="icon-dehaze Sidebar__menuBtn__icon" />}
        </Button>
        <Button className="Sidebar__menuBtn Sidebar__languageBtn">{language.label}</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  language: getCurrentLanguage(state),
})

export default connect(mapStateToProps)(Sidebar)
