import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col ,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom'
import ModulePreview from '../../components/ModulePreview'
import './ChapterDetailPreview.css'
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


const ChapterDetailPreview = ({
  trans,
  theme,
  chapter,
  modules,
  saving,
  deleting,
  deletingModules,
  publishChapter,
  unpublishChapter,
  authToken
 }) => {

  const toggledPublished = () => {
    if (chapter.status === 'draft') {
      publishChapter(chapter.id)
    } else {
      unpublishChapter(chapter.id)
    }
  }

  return (
    <div className="ChapterDetail">
      <header className="ChapterDetail__header sticky-top">
        <Container fluid className="margin-r-l-20 visual-preview ">
          <Row className="ChapterDetail__topRow">
            <Breadcrumb>
              <BreadcrumbItem className="ChapterDetail__topRow_title">
                <Link to={`/themes/${theme.id}`}>{`${trans(theme, 'data.title')} (${theme.slug})`}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem className="ChapterDetail__topRow_title" active>{`${trans(chapter, 'data.title')} (${chapter.slug})`}</BreadcrumbItem>
            </Breadcrumb>
            <div className="ChapterDetail__topRow_btnContainer">
              <Button disabled={saving} className="ChapterDetail__topRow_btn" onClick={toggledPublished}>
                {chapter.status === 'draft' ? 'Publish' : 'Unpublish'}
              </Button>
            </div>
          </Row>
        </Container>
      </header>
    <Container>
      <Row >
        <Col md={{ offset:2, size:8 }}>
          <h1 >{trans(chapter, 'data.title')}</h1>
          <pre>{JSON.stringify(chapter.data.title, null, 2)}</pre>
          <Button tag={Link} to={`/themes/${theme.id}/chapters/${chapter.id}/edit`}>
            <i className="fa fa-pencil" />
          </Button>
        </Col>
      </Row>
    </Container>
    {modules.map((mod, i) => (
      <ModulePreview
        trans={trans}
        key={i}
        idx={i + 1}
        countSiblings={modules.length}
        moduleType={mod.module}
        {...mod}
      />
    ))}
    </div>
  )
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
})(ChapterDetailPreview)
