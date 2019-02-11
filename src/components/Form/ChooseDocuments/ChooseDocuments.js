import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { get } from 'lodash'
import { Field } from 'redux-form'
import { Button } from 'reactstrap'
import AddButton from '../../AddButton'
import DocumentFormItem from '../DocumentFormItem'

import {
  showWidgetFullPage,
  hideWidgetFullPage,
  selectDocuments,
} from '../../../state/actions'

import {
  getSelectedDocuments,
} from '../../../state/selectors'

const renderDoc = ({ input: { value }, ...props }) => (
  <DocumentFormItem title={value.title} {...props} />
)

class ChooseDocuments extends PureComponent {
  componentWillUnmount() {
    this.props.hideWidgetFullPage()
  }

  componentWillReceiveProps(nextProps) {
    // Handle multi selection change
    if (
      nextProps.multiSelection &&
      typeof nextProps.selectionDone !== 'undefined' &&
      nextProps.selectionDone &&
      this.props.selectionDone !== nextProps.selectionDone
    ) {

      const currentDocs = nextProps.fields.getAll().map(f => f.id)
      const { indexsToRemove, docsToAdd } = currentDocs.reduce((r, doc, index) => {
        const nextDocsAdd = r.docsToAdd.filter(d => d.id !== doc.id)
        const isDocToKeep = nextDocsAdd.length < r.docsToAdd.length

        if (isDocToKeep) {
          return {
            ...r,
            docsToAdd: nextDocsAdd,
          }
        }
        return {
          ...r,
          indexsToRemove: r.indexsToRemove.concat(index),
        }
      }, { indexsToRemove: [], docsToAdd: nextProps.selectedDocuments })

      indexsToRemove.forEach(index => nextProps.fields.remove(index))
      docsToAdd.forEach(doc => nextProps.fields.push({ id: doc }))

      nextProps.hideWidgetFullPage()
    }
    // Handle single selection change
    if (
      !nextProps.multiSelection &&
      this.props.choosedDocument !== nextProps.choosedDocument &&
      nextProps.choosedDocument
    ) {
      // Add choosed document
      nextProps.fields.push({ id: nextProps.choosedDocument })
      nextProps.hideWidgetFullPage()
    }
  }

  showDocumentChooser = () => {
    this.props.showWidgetFullPage('documentChooser', {
      documentType: this.props.documentType,
      params: this.props.params,
      withPlaceTypeFilters: this.props.withPlaceTypeFilters,
      multi: this.props.multiSelection,
    }, this.props.fields.name)
    // Chekka
    this.props.selectDocuments(this.props.fields.getAll().map(f => f.id.id))
  }

  render() {
    const { fields, renderExtraFields, label, className } = this.props
    return (
      <div className={className}>

        <AddButton label={label} onClick={this.showDocumentChooser} />
        {fields.map((field, index) => (
           <div key={index}>
             <Field
               name={`${field}.id`}
               component={renderDoc}
               buttons={
                 <span>
                   {index !== 0 && <Button className="tiny-btn" onClick={() => fields.move(index, index - 1)}><i className="fa fa-arrow-up" /></Button>}
                   <span>&nbsp;</span>
                   {index !== fields.length - 1 && <Button onClick={() => fields.move(index, index + 1)} className="tiny-btn"><i className="fa fa-arrow-down" /></Button>}
                   <span>&nbsp;</span>
                 </span>
               }
               onEmpty={() => fields.remove(index)}
               renderExtraFields={typeof renderExtraFields === 'function' ? ({ title }) => {
                 return renderExtraFields({ field, title })
               } : undefined}
              />
           </div>
        ))}
      </div>
    )
  }
}

ChooseDocuments.defaultProps = {
  className: '',
  label: 'Add document',
  // Show docs chooser widget \w UI for place type filters
  withPlaceTypeFilters: false,
  // Show docs chooser widget in multi selection (checkboxes) mode
  multiSelection: true,
}

const mapStateToProps = (state, ownProps) => {
  // State not related to current component
  if (state.ui.fullPageWidgets.namespace !== ownProps.fields.name) {
    return {}
  }
  if (ownProps.multiSelection) {
    // State for multi selection
    return {
      selectedDocuments: getSelectedDocuments(state),
      selectionDone: state.widgets.chooseDocuments.selectionDone,
    }
  } else {
    // State for single selection
    return {
      choosedDocument: state.widgets.chooseDocuments.choosedDocument,
    }
  }
}

export default connect(mapStateToProps, {
  showWidgetFullPage,
  hideWidgetFullPage,
  selectDocuments,
})(ChooseDocuments)
