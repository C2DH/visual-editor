import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { defaultMemoize } from 'reselect'
import { reduxForm, Field, FieldArray, formValueSelector, change } from 'redux-form'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import './ModuleFormMap.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  GenericPreviewContainer,
} from '../../VisualForm'

import MapPreview from '../../MapPreview'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Translate from '../../Form/Translate'
import MediumEditor from '../../Form/MediumEditor'
import { notAnEmptyList } from '../../Form/validate'

import {
  getCurrentLanguage,
} from '../../../state/selectors'

const mapParams = {
  filters: {
    data__coordinates__isnull: false,
  },
}

class ModuleFormMap extends PureComponent {

  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleMap', 'background.object', null)
    } else {
      this.props.change('moduleMap', 'background.object', {})
      this.props.change('moduleMap', 'background.color', null)
    }
  }

  render() {
    const {
      handleSubmit,
      language,
      invalid,
      submitting,
      exitLink,
//      change,
//      backgroundObject,
      documents
    } = this.props
//    const backgroundType = backgroundObject ? 'image' : 'color'

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            {/*
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
                    onEmptyDocument={() => change('moduleMap', 'background.object', {})}
                   />
                </div>
                <hr />
                <div>
                  <Field
                    label="Background Overlay"
                    name="background.object.overlay"
                    colors={(process.env.REACT_APP_BACKGROUND_COLORS_PALETTE || '#818A91,#777,#ADADAD,#1E1E1E,#373A3C,#DDD').split(',')}
                    component={ColorSelection}
                    validate={[isValidHex]}
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
                    validate={[isValidHex]}
                   />
                 </div>
              </div>
            )}
            <hr />
            */}
            <div className="margin-bottom-15">
              <FieldArray
                name="objects"
                params={mapParams}
                component={ChooseDocuments}
                validate={notAnEmptyList}
                withPlaceTypeFilters
              />
            </div>
          </SideForm>
          <SideActions>
            {invalid && <p>Insert at least one document to save</p>}
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <GenericPreviewContainer className='MapPreviewContainer'>

          <MapPreview
            documents={documents}
          />
          <div className="MapPreviewCaption">
              <Field
                name={`caption.${language.code}`}
                className="invisible-input"
                style={{ width: '100%' }}
                options={{
                  disableReturn: true,
                }}
                placeholder='Insert caption'
                component={MediumEditor}
              />
              <Field
                name={`caption`}
                component={Translate}
              />
          </div>
        </GenericPreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleMap')
const getDocuments = defaultMemoize(objects => objects.map(o => ({
  ...o.id,
  coordinates: get(o, 'id.data.coordinates.geometry.coordinates', [])
    .slice(0, 2)
    // For same position problem....
    // .map(x => Number(x) + Math.random() / 1000)
    .map(x => Number(x))
    .reverse()
})))

const mapStateToProps = state => ({
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  doc: selector(state, 'id'),
  documents: getDocuments(selector(state, 'objects')),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
})

export default reduxForm({
  form: 'moduleMap',
})(connect(mapStateToProps, {
  change,
})(ModuleFormMap))
