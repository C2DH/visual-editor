import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  reduxForm,
  Field,
  formValueSelector,
  arrayRemoveAll,
  getFormSyncErrors,
} from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'

import ChooseDocument from '../Form/ChooseDocument'
import Bbox from '../Form/Bbox'
import Translate from '../Form/Translate'
import ColorSelection, { isValidHex } from '../Form/ColorSelection'
import Select from '../Form/Select'
import { requiredAtLeastOne, required } from '../Form/validate'

import './ChapterForm.css'
import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../VisualForm'

import {
  getCurrentLanguage,
} from '../../state/selectors'

class ChapterForm extends PureComponent {
  render() {
    const {
      formErrors,
      handleSubmit,
      backgroundColor,
      backgroundColorOverlay,
      backgroundImage,
      backgroundType,
      language,
      color,
      invalid,
      submitting,
      exitLink,
      bbox,
    } = this.props

    const bgPreviewProps = {
      backgroundType,
      backgroundImage,
      backgroundColorOverlay,
      backgroundColor,
      bbox,
    }

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <FormGroup className="margin-bottom-15">
              <Label for="exampleSelect">Background</Label>

              <Field name="backgroundType" component={Select}>
                <option value='color'>Color</option>
                <option value='image'>Image</option>
              </Field>

            </FormGroup>

            {backgroundType === 'image' && (
              <div>
                <Field
                  name='covers[0]'
                  component={ChooseDocument}
                  onEmptyDocument={() => this.props.arrayRemoveAll('chapter', 'covers')}
                  clearBbox={() => this.props.change('chapter', 'data.background.bbox', [])}
                  buttons={(
                    <Field
                      name='data.background.bbox'
                      image={backgroundImage}
                      component={Bbox}
                    />
                  )}
                />

                <hr />
                <Field
                  label="Background overlay"
                  colors={(process.env.REACT_APP_BACKGROUND_COLORS_PALETTE || '#818A91,#777,#ADADAD,#1E1E1E,#373A3C,#DDD').split(',')}
                  name="data.background.overlay"
                  component={ColorSelection}
                  validate={[isValidHex, required]}
                 />
              </div>
            )}
            {backgroundType === 'color' && (
              <Field
                label="Background color"
                colors={
                  (process.env.REACT_APP_BACKGROUND_COLORS_PALETTE || '#818A91,#777,#ADADAD,#1E1E1E,#373A3C,#DDD')
                    .split(',')
                }
                name="data.background.backgroundColor"
                component={ColorSelection}
                validate={[isValidHex, required]}
               />
            )}

            <hr />
            <Field
              label="Text color"
              colors={(process.env.REACT_APP_BACKGROUND_COLORS_PALETTE || '#fff,#000')
                .split(',')}
              hexInput={false}
              name="data.color"
              component={ColorSelection}
             />
          </SideForm>
          <SideActions>
            {formErrors && formErrors.data && formErrors.data.title &&
              <p className='text-danger'>Insert title to save</p>}
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <PreviewContainer {...bgPreviewProps}>
          <div className="ChapterForm__Preview-inputs-cont">
            <div className="ChapterForm__Preview-input-cont">
              <Field
                name={`data.title.${language.code}`}
                className="invisible-input ChapterForm__Preview-description-input"
                autoComplete="off"
                component='input'
                placeholder="Insert chapter title"
                style={{ color }}
               />
               <Field
                 name={`data.title`}
                 validate={requiredAtLeastOne}
                 component={Translate}
               />
             </div>
            <div className="ChapterForm__Preview-input-cont">
              <Field
                name={`data.abstract.${language.code}`}
                className="invisible-input ChapterForm__Preview-description-description"
                rows={10}
                autoComplete="off"
                component='textarea'
                placeholder="Insert chapter description"
                style={{ color }}
               />
               <Field
                 name={`data.abstract`}
                 component={Translate}
               />
             </div>
         </div>
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('chapter')
const getSyncErrors = getFormSyncErrors('chapter')

const mapStateToProps = state => ({
  formErrors: getSyncErrors(state),
  backgroundType: selector(state, 'backgroundType'),
  backgroundColor: selector(state, 'data.background.backgroundColor'),
  backgroundColorOverlay: selector(state, 'data.background.overlay'),
  bbox: selector(state, 'data.background.bbox'),
  color: selector(state, 'data.color'),
  backgroundImage: selector(state, 'covers[0].attachment'),
  covers: selector(state, 'covers'),
  language: getCurrentLanguage(state),
})

export default reduxForm({
  form: 'chapter',
})(connect(mapStateToProps, {
  arrayRemoveAll,
})(ChapterForm))
