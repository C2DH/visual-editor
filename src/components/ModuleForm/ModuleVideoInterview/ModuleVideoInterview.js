import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import memoize from 'memoize-one'
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  change,
  getFormSyncErrors
} from 'redux-form'
import find from 'lodash/find'
import { Link } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'
import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
} from '../../VisualForm'
import VideoStory from './VideoStory'
import ChooseDocument from '../../Form/ChooseDocument'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Translate from '../../Form/Translate'
import Input from '../../Form/Input'
import { required, requiredAtLeastOne } from '../../Form/validate'
import {
  getCurrentLanguage,
} from '../../../state/selectors'
import './ModuleVideoInterview.css'

const stringTimeToSeconds = str => {
  if (!str) {
    return null
  }
  const pieces = str.split(':')
  if (pieces.length !== 2) {
    return null
  }
  const [min, secs] = pieces
  return (parseInt(min, 10) * 60) + parseInt(secs, 10)
}

const betweenTime = playedSeconds => ({ secondsFrom, secondsTo }) => {
  if (secondsFrom === null || secondsTo === null) {
    return false
  }
  return playedSeconds >= secondsFrom && playedSeconds <= secondsTo
}

const listWithTime = list => {
  return list.map(a => ({
    ...a,
    secondsFrom: stringTimeToSeconds(a.from),
    secondsTo: stringTimeToSeconds(a.to),
  }))
}

const renderExtraVideoTimeFields = ({ field, title }) => (
  <div className='d-flex w-100'>
    <div className='p-2' style={{ flex: 1 }}>{title}</div>
    <div className='d-flex' style={{ width: 250 }}>
      <div className='form-group mr-2'>
        <label>Start</label>
        <Field
          component={Input}
          placeholder='00:00'
          name={`${field}.from`}
        />
      </div>
      <div className='form-group'>
        <label>End</label>
        <Field
          component={Input}
          placeholder='00:00'
          name={`${field}.to`}
        />
      </div>
    </div>
  </div>
)

class TitleMiniForm extends PureComponent {
  render() {
    const { language } = this.props
    return (
      <div className='d-flex align-items-center'>
        <Field
          name={`text.content.${language.code}`}
          component={Input}
          placeholder='Insert title'
          className='video-interview-title-input mr-2'
        />
        <Field
          name={`text.content`}
          component={Translate}
          validate={requiredAtLeastOne}
        />
      </div>
    )
  }
}
const TitleMiniFormLang = connect(state => ({
  language: getCurrentLanguage(state),
}))(TitleMiniForm)

class ModuleFormObject extends PureComponent {

  sideDocsWithTime = memoize(listWithTime)
  speakersWithTime = memoize(listWithTime)

  getSpeakerAt = memoize(speakers => playedSeconds => {
    const speaker = find(speakers, betweenTime(playedSeconds))
    if (speaker) {
      return speaker.id
    }
    return null
  })

  getSideDocAt = memoize(sideDocs => playedSeconds => {
    const sideDoc = find(sideDocs, betweenTime(playedSeconds))
    if (sideDoc) {
      return sideDoc.id
    }
    return null
  })

  renderBottomForm = () => {
    return (
      <div className='VideoInterview__bottomForm w-100'>
        <Row>
          <Col md={6} className='VideoInterview__col'>
            <h3>Documents</h3>
            <FieldArray
              name="objects"
              documentType="image"
              component={ChooseDocuments}
              renderExtraFields={renderExtraVideoTimeFields}
            />
          </Col>
          <Col md={6} className='VideoInterview__col'>
            <h3>Interviewees</h3>
            <FieldArray
              name="speakers"
              documentType="image"
              component={ChooseDocuments}
              renderExtraFields={renderExtraVideoTimeFields}
            />
          </Col>
        </Row>
      </div>
    )
  }

  renderTitle = () => <TitleMiniFormLang />

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      exitLink,
      formErrors,
      docVideo,
      speakers,
      sideDocs,
    } = this.props

    const bottomForm = this.renderBottomForm()

    const sideDocsWithTime = this.sideDocsWithTime(sideDocs)
    const speakersWithTime = this.speakersWithTime(speakers)

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
          </SideForm>
          <SideActions>
            {formErrors && formErrors.id && <p className="text-danger">Insert an object to save</p>}
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <Col md={9} className='m-0 p-0'>
          {docVideo && (
            <VideoStory
              renderTitle={this.renderTitle}
              url={docVideo.url}
              sideDocs={sideDocsWithTime}
              getSideDocAt={this.getSideDocAt(sideDocsWithTime)}
              getSpeakerAt={this.getSpeakerAt(speakersWithTime)}
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
  sideDocs: selector(state, 'objects'),
  speakers: selector(state, 'speakers'),
  language: getCurrentLanguage(state),
  formErrors: getSyncErrors(state),
})

export default reduxForm({
  form: 'moduleObject',
})(connect(mapStateToProps, {
  change,
})(ModuleFormObject))
