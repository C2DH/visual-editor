import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isNull } from 'lodash'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col ,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import ModuleCard from '../../components/cards/ModuleCard'
import AddButton from '../../components/AddButton'
import Spinner from '../../components/Spinner'
import StoryPreview from '../../components/StoryPreview'
import './ChapterDetail.css'
import {
  publishChapter,
  unpublishChapter,
  deleteModuleChapter,
  moveModuleChapterAhead,
  moveModuleChapterBack,
} from '../../state/actions'
import {
  getChapter,
  getChapterModules,
  getChapterDeleting,
  getChapterMoving,
  getTheme,
  isChapterSaving,
  makeTranslator,
  getDeletingChapterModules,
} from '../../state/selectors'

class ChapterDetail extends PureComponent {
  state = {
    moduleToDelete: null,
  }

  toggledPublished = () => {
    const { chapter } = this.props
    if (chapter.status === 'draft') {
      this.props.publishChapter(chapter.id)
    } else {
      this.props.unpublishChapter(chapter.id)
    }
  }

  askDeleteModule = m => this.setState({ moduleToDelete: m })

  clearDeleteModuleModal = () => this.setState({ moduleToDelete: null })

  deleteModule = () => {
    this.props.deleteModuleChapter(this.props.chapter, this.state.moduleToDelete)
    this.setState({ moduleToDelete: null })
  }

  render () {
    const { trans, chapter, modules, theme, saving, deletingModules, deleting, moving, authToken } = this.props
    const baseUrl = process.env.REACT_APP_FRONTEND_URL
    const previewUrl = `${baseUrl}/themes/${theme.slug}/chapters/${chapter.slug}?_t=${authToken}`

    return (
      <Container fluid className="margin-r-l-20">
        <Row className="ThemeDetail__topRow">
          <Breadcrumb>
            <BreadcrumbItem className="ThemeDetail__topRow_title">
              <Link to={`/themes/${theme.id}`}>{`${trans(theme, 'data.title')} (${theme.slug})`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem className="ThemeDetail__topRow_title" active>{`${trans(chapter, 'data.title')} (${chapter.slug})`}</BreadcrumbItem>
          </Breadcrumb>
          <div className="ThemeDetail__topRow_btnContainer">
            <Button disabled={saving} className="ThemeDetail__topRow_btn" onClick={this.toggledPublished}>
              {chapter.status === 'draft' ? 'Publish' : 'Unpublish'}
            </Button>
            <Button tag={'a'} href={previewUrl} target="_blank" className="ThemeDetail__topRow_btn button-link">Preview</Button>
          </div>
        </Row>
        <Row>
          <Col md="9" className="no-padding-left">
            <StoryPreview
              story={chapter}
              rightContent={
                <Button tag={Link} to={`/themes/${theme.id}/chapters/${chapter.id}/edit`}>
                  <i className="fa fa-pencil" />
                </Button>
              }
            />
          </Col>
          <Col md="3">
            <AddButton
              tag={Link}
              to={`/themes/${theme.id}/chapters/${chapter.id}/modules/new`}
              label="Add Module"
              style={{marginBottom: 5}}
             />
            <div className="ChapterDetial__Modules_col">
              {modules.map((mod, i) => (
                <div key={i}
                  style={typeof deletingModules[i] !== 'undefined' ? { opacity: 0.5 } : undefined}>
                  <ModuleCard
                    showLeftButton={i !== 0}
                    showRightButton={i !== modules.length - 1}
                    onMoveLeftClick={() => this.props.moveModuleChapterBack(chapter, i)}
                    onMoveRightClick={() => this.props.moveModuleChapterAhead(chapter, i)}
                    module={mod}
                    onDeleteClick={() => this.askDeleteModule(i)}
                    onEditClick={() => this.props.history.push(`/themes/${theme.id}/chapters/${chapter.id}/modules/${i + 1}/edit`)}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
          {deleting && <Spinner fullpage />}
          {moving && <Spinner fullpage />}
          <Modal isOpen={!isNull(this.state.moduleToDelete)} toggle={this.clearDeleteChapterModal}>
            <ModalHeader>Delete module</ModalHeader>
            <ModalBody>
              Delete module ?
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.clearDeleteModuleModal}>Undo</Button>
              <Button color="danger" onClick={this.deleteModule}>Delete</Button>{' '}
            </ModalFooter>
          </Modal>
        </Container>
      )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.accessToken,
  trans: makeTranslator(state),
  theme: getTheme(state),
  chapter: getChapter(state),
  modules: getChapterModules(state),
  saving: isChapterSaving(state),
  deletingModules: getDeletingChapterModules(state),
  deleting: getChapterDeleting(state),
  moving: getChapterMoving(state),
})

export default connect(mapStateToProps, {
  publishChapter,
  deleteModuleChapter,
  unpublishChapter,
  moveModuleChapterAhead,
  moveModuleChapterBack,
})(ChapterDetail)
