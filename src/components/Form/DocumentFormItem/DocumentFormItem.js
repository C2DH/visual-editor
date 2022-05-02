import React from 'react'
import { ListGroup, ListGroupItem, Button, Badge } from 'reactstrap'
import './DocumentFormItem.css'

const DocumentFormItem = ({
  title,
  type,
  slug,
  data={},
  buttons,
  onEmpty,
  onChange,
  renderExtraFields,
}) => (
  <ListGroup className="margin-top-15">
    <ListGroupItem className="DocumentFormItem__title">
      {typeof type === 'string' && (
        <Badge color="secondary" className="mr-2">
          {type}
        </Badge>
      )}
      {typeof renderExtraFields === 'function'
        ? renderExtraFields({ title })
        : title
      }
      {typeof slug === 'string' && (
        <div className="DocumentFormItem__title__slug text-monospace text-muted">
          <span>{slug}</span>
        </div>
      )}
    </ListGroupItem>

    <ListGroupItem className="DocumentFormItem__buttons-container">
      {buttons}
      {typeof onChange === 'function' && <Button className="tiny-btn margin-right-5" onClick={onChange}><i className="fa fa-file-image-o" /></Button>}
      {typeof onEmpty === 'function' && <Button className="tiny-btn" onClick={onEmpty}><i className="fa fa-trash-o" /></Button>}
    </ListGroupItem>
  </ListGroup>
)

export default DocumentFormItem
