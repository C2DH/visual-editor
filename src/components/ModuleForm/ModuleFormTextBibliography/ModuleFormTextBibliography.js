import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  reduxForm,
  Field,
  formValueSelector,
  getFormSyncErrors,
  change
} from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, Input, Label } from 'reactstrap'

import ChooseDocument from '../../Form/ChooseDocument'
import TextAlignSelection from '../../Form/TextAlignSelection'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import MediumEditor from '../../Form/MediumEditor'
import { requiredAtLeastOne, required } from '../../Form/validate'

import './ModuleFormTextBibliography.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import {
  getCurrentLanguage,
} from '../../../state/selectors'
import {
  DEFAULT_OVERLAY_COLOR,
} from '../../../state/consts'

class ModuleFormTextBibliography extends PureComponent {
  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleText', 'background.object', null)
    } else {
      this.props.change('moduleText', 'background.object', {
        id: null,
        overlay: DEFAULT_OVERLAY_COLOR,
      })
      this.props.change('moduleText', 'background.color', null)
    }
  }

  render() {
    const {
      textColor,
      textPosition,
      handleSubmit,
      language,
      invalid,
      formErrors,
      submitting,
      exitLink,
      change,
      backgroundObject,
      backgroundImage,
      backgroundColorOverlay,
      backgroundColor,
      bbox,
    } = this.props

    const backgroundType = backgroundObject ? 'image' : 'color'

    let overlayStyle = {}
    if (textPosition) {
      switch (textPosition) {
        case 'center':
          overlayStyle = { alignItems: 'center', textAlign:'center' }
          break
        case 'left':
          overlayStyle = { alignItems: 'flex-start', textAlign:'left'  }
          break
        case 'right':
          overlayStyle = { alignItems: 'flex-end', textAlign:'right'  }
          break
        default:
          overlayStyle = {}
          break
      }
    }

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <div className="margin-bottom-15">
              <Label for="backgroundType">Background</Label>
              <Input
                type="select"
                value={backgroundType}
                onChange={this.changeBackgroundType}
                name="backgroundType"
              >
                <option value="color">Color</option>
                <option value="image">Image</option>
              </Input>
            </div>
            {backgroundType === 'image' && (
              <div>
                <div className="margin-bottom-15">
                  <Field
                    name="background.object.id"
                    component={ChooseDocument}
                    onEmptyDocument={() => change('moduleText', 'background.object', {})}
                    clearBbox={() => this.props.change('moduleText', 'background.object.bbox', [])}
                    buttons={(
                      <Field
                        name='background.object.bbox'
                        image={backgroundImage}
                        component={Bbox}
                      />
                    )}
                   />
                 </div>
                <hr />
                <div>
                  <Field
                    label="Background Overlay"
                    name="background.object.overlay"
                    colors={(process.env.REACT_APP_BACKGROUND_COLORS_PALETTE || '#818A91,#777,#ADADAD,#1E1E1E,#373A3C,#DDD').split(',')}
                    component={ColorSelection}
                    validate={[isValidHex, required]}
                   />
                 </div>
              </div>
            )}
            {backgroundType === 'color' && (
              <div>
                <div>
                  <Field
                    label="Background Color"
                    name="background.color"
                    colors={(process.env.REACT_APP_BACKGROUND_COLORS_PALETTE || '#818A91,#777,#ADADAD,#1E1E1E,#373A3C,#DDD').split(',')}
                    component={ColorSelection}
                    validate={[isValidHex, required]}
                   />
                 </div>
              </div>
            )}
            <hr />
            <Field
              label="Text color"
              colors={['#fff', '#000']}
              hexInput={false}
              name="text.color"
              component={ColorSelection}
             />
            <Field
              label="Text position"
              textAligns={['left', 'center', 'right']}
              name="text.position"
              component={TextAlignSelection}
             />
          </SideForm>
          <SideActions>
            {formErrors && formErrors.text && <p className="text-danger">Insert text to save</p>}
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <PreviewContainer
          backgroundType={backgroundType}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          backgroundColorOverlay={backgroundColorOverlay}
          overlayStyle={overlayStyle}
          bbox={bbox}>
          <Field
            name={`text.content.${language.code}`}
            className="invisible-input visual-preview ModuleFormTextBibliography__Preview-content-input"
            component={MediumEditor}
            placeholder="Insert text"
            style={{ color: textColor }}
           />
           <Field
             name={`text.content`}
             component={Translate}
             validate={requiredAtLeastOne}
           />
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleText')
const getSyncErrors = getFormSyncErrors('moduleText')

const mapStateToProps = state => ({
  textColor: selector(state, 'text.color'),
  textPosition: selector(state, 'text.position'),
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  formErrors: getSyncErrors(state),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  bbox: selector(state, 'background.object.bbox'),
})

export default reduxForm({
  form: 'moduleText',
})(connect(mapStateToProps, {
  change,
})(ModuleFormTextBibliography))
