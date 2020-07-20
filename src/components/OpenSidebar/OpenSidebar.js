import React  from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'
import './OpenSidebar.css'
import { logout, setLanguage } from '../../state/actions'
import { getLanguages } from '../../state/selectors'

const OpenSidebar = ({ closeMenu, logout, languages, setLanguage }) => (
  <div className="OpenSidebar">
    <ul className="OpenSidebar__toplist">
      <li><Link to="/" onClick={closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Home</Button></Link></li>
      <li><Link to="/themes" onClick={closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Themes</Button></Link></li>
      <li><Link to="/educationals" onClick={closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Education</Button></Link></li>
      <li><Link to="/documents" onClick={closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Documents</Button></Link></li>
    </ul>
    <ul className="OpenSidebar__bottomlist">
      <li><a href="https://github.com/C2DH/ww1-visualeditor/wiki" rel="noopener noreferrer" target="_blank" onClick={closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Help</Button></a></li>
      <li><a href="https://github.com/C2DH/ww1-visualeditor/issues" rel="noopener noreferrer" target="_blank" onClick={closeMenu}><Button className="OpenSidebar__btn" outline color="primary">Report a bug</Button></a></li>
      <li><Button onClick={logout} className="OpenSidebar__btn" outline color="primary">Logout</Button></li>
    </ul>
    <div className="OpenSidebar__Language__container">
      <h6>Language</h6>
      <div className="OpenSidebar__LanguageBtn_container">
        <ButtonGroup>
          {languages.map(language => (
            <Button key={language.code} onClick={() => setLanguage(language.code)} className="OpenSidebar__LanguageBtn">{language.label}</Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  languages: getLanguages(state),
})

export default connect(mapStateToProps, {
  setLanguage,
  logout,
})(OpenSidebar)
