import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
  getFormSyncErrors
} from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input, Col, Row } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import './ModuleVideoInterview.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import ChooseDocument from '../../Form/ChooseDocument'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import MediumEditor from '../../Form/MediumEditor'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'
import AudioPlayer from '../../AudioPlayer'
import { required } from '../../Form/validate'

import {
  getCurrentLanguage,
} from '../../../state/selectors'
import {
  DEFAULT_OVERLAY_COLOR,
} from '../../../state/consts'

// import 'video-react/dist/video-react.css'
// import { Player, BigPlayButton } from 'video-react'
import VideoStory from './VideoStory'

class ModuleFormObject extends PureComponent {

  renderBottomForm = () => {
    return (
      <div className='VideoInterview__bottomForm w-100'>
        <Row>
          <Col md={6} className='VideoInterview__col'>
            <h3>Documents</h3>
          </Col>
          <Col md={6} className='VideoInterview__col'>
            <h3>Interviewees</h3>

          </Col>
        </Row>
      </div>
    )
  }

  render() {
    const {
      handleSubmit,
      language,
      invalid,
      submitting,
      exitLink,
      change,
      formErrors,
      backgroundObject,
      backgroundImage,
      backgroundColorOverlay,
      backgroundColor,
      documentType,
      documentSize,
      documentPosition,
      docVideo,
      bbox,
    } = this.props

    const bottomForm = this.renderBottomForm()

    return (
      <VisualForm bottomForm={bottomForm} onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <h2>Video</h2>
            <div className="margin-top-15">
              <Field
                documentType={'video'}
                label="Select video"
                name="object.id"
                validate={[required]}
                component={ChooseDocument}
              />
            </div>
            {/* <div className="margin-bottom-15">
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
                    onEmptyDocument={() => change('moduleObject', 'background.object', {})}
                    clearBbox={() => this.props.change('moduleObject', 'background.object.bbox', [])}
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
                    colors={['#818A91', '#777', '#ADADAD', '#1E1E1E', '#373A3C', '#DDD']}
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
                    colors={['#818A91', '#777', '#ADADAD', '#1E1E1E', '#373A3C', '#DDD']}
                    component={ColorSelection}
                    validate={[isValidHex, required]}
                   />
                 </div>
              </div>
            )}
            <hr />
            <div className="margin-bottom-15">
              <Label for="type">Object</Label>
              <Field
                label="Document Type"
                name="type"
                component={Select}
               >
                 <option value="image">Image</option>
                 <option value="audio">Audio</option>
                 <option value="video">Video</option>
               </Field>
            </div>
            <div className="margin-bottom-15">
              <Field
                documentType={documentType}
                label="Choose Document"
                name="id"
                validate={[required]}
                component={ChooseDocument}
               />
            </div>
            {documentType !== 'audio' && (
              <div className="margin-bottom-15">
                <FormGroup>
                  <Label>Size</Label>
                  <Field
                    label="Size"
                    name="size"
                    component={Select}>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='big'>Big</option>
                   </Field>
                 </FormGroup>
              </div>
            )} */}
          </SideForm>
          <SideActions>
            {formErrors && formErrors.id && <p className="text-danger">Insert an object to save</p>}
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <Col md={9}>
          {docVideo && (
            <VideoStory
              story={{
                data: {
                  title: 'Bella RAGA'
                }
              }}
              url={docVideo.url}
            />
          )}
        </Col>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleObject')
const getSyncErrors = getFormSyncErrors('moduleObject')

const mapStateToProps = state => ({
  docVideo: selector(state, 'object.id'),
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  documentType: selector(state, 'type'),
  documentSize: selector(state, 'size'),
  documentPosition: selector(state, 'position'),
  // doc: selector(state, 'id'),
  formErrors: getSyncErrors(state),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  bbox: selector(state, 'background.object.bbox'),
})

export default reduxForm({
  form: 'moduleObject',
})(connect(mapStateToProps, {
  change,
})(ModuleFormObject))
