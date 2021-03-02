import React, { PureComponent } from 'react'
import { isNull } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import AddButton from '../../components/AddButton'
import EducationalCard from '../../components/cards/EducationalCard'
import Spinner from '../../components/Spinner'
import {
  loadEducationals,
  unloadEducationals,
  deleteEducational,
  moveEducationalAhead,
  moveEducationalBack,
} from '../../state/actions'
import {
  getEducationals,
  areEducationalsLoading,
  makeTranslator,
  getEducationalsPerformingMoving,
} from '../../state/selectors'
import './Educationals.css'


class Educationals extends PureComponent {
  state = {
    eduToDelete: null,
  }

  componentDidMount() {
    this.props.loadEducationals()
  }

  componentWillUnmount() {
    this.props.unloadEducationals()
  }

  askDeleteEdu = theme => this.setState({ eduToDelete: theme })

  clearDeleteEduModal = () => this.setState({ eduToDelete: null })

  deleteEdu = () => {
    this.props.deleteEducational(this.state.eduToDelete.id)
    this.setState({ eduToDelete: null })
  }

  render() {
    const {
      trans,
      educationals,
      loading,
      deleting,
      performingMoving,
    } = this.props

    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Educationals">
          {/* <TopSearchInput /> */}
          {performingMoving && <Spinner noPadding x={1} />}
        </HeadingRow>

        <Row>
          <Col md="3" className="Educationals__AddButton-container">
            <AddButton label="Add educational" tag={Link} to={'/educationals/new'} />
          </Col>
          {(!educationals && loading) && (
            <Col md={9}><Spinner /></Col>
          )}
          {educationals && educationals.map((edu, i) => (
            <Col md="3" key={edu.id}>
              <Link to={`/educationals/${edu.id}`} style={deleting[edu.id] ? { pointerEvents: 'none' } : undefined}>
                <div style={deleting[edu.id] ? { opacity: 0.5 } : undefined}>
                  <EducationalCard
                    educational={edu}
                    showBackButton={i > 0}
                    showAheadButton={i < educationals.length - 1}
                    onAheadClick={e => {
                      e.preventDefault()
                      this.props.moveEducationalAhead(educationals, i, edu.id)
                    }}
                    onBackClick={e => {
                      e.preventDefault()
                      this.props.moveEducationalBack(educationals, i, edu.id)
                    }}
                    onDeleteClick={e => {
                      e.preventDefault()
                      this.askDeleteEdu(edu)
                    }}
                  />
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <Modal isOpen={!isNull(this.state.eduToDelete)} toggle={this.clearDeleteEduModal}>
          <ModalHeader>Delete educational</ModalHeader>
          <ModalBody>
            Delete educational {trans(this.state.eduToDelete, 'data.title')}?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.clearDeleteEduModal}>Undo</Button>
            <Button color="danger" onClick={this.deleteEdu}>Delete</Button>{' '}
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  educationals: getEducationals(state),
  loading: areEducationalsLoading(state),
  deleting: state.educationals.deleting,
  performingMoving: getEducationalsPerformingMoving(state),
})

export default connect(mapStateToProps, {
  loadEducationals,
  unloadEducationals,
  deleteEducational,
  moveEducationalAhead,
  moveEducationalBack,
})(Educationals)
