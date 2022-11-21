import { useDocuments } from '@c2dh/react-miller'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useQueryParams } from 'use-query-params'
import DocsFacets from '../components/Doc/DocsFacets'
import DocItem from '../components/Doc/DocItem'
import { BootstrapColumnLayout } from '../constants'
import { SlugsParam } from '../logic/params'

const Docs = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useQueryParams({
    type: SlugsParam,
    data__type: SlugsParam,
  })
  const filters = {}
  if (query.type) {
    filters.type__in = query.type
  }

  if (query.data__type) {
    filters.data__type__in = query.data__type
  }

  const [{ count: filteredDocsCount = -1, results = [] } = {}, { isLoading, isSuccess }] =
    useDocuments({
      params: {
        limit: 60,
        filters,
      },
    })

  const [{ count: allDocsCount = -1, facets } = {}, { status: allDocsStatus }] = useDocuments({
    params: {
      limit: 1,
      facets: 'data__type',
    },
  })

  console.debug(
    '[Docs] \n filteredDocsCount:',
    filteredDocsCount,
    '\n - allDocsCount:',
    allDocsCount,
    facets,
  )
  return (
    <div className="Docs d-flex">
      <Container className="flex-shrink-1" fluid>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <h1 className="mb-5">
              {t('pagesDocsTitle')} {filteredDocsCount} {allDocsCount}
            </h1>
          </Col>
        </Row>
        {isLoading && <p>loading</p>}
        <Row>
          {isSuccess &&
            results.map((d) => (
              <Col {...BootstrapColumnLayout} key={d.id}>
                <DocItem onSelect={setQuery} doc={d} className="mb-5" />
              </Col>
            ))}
        </Row>
      </Container>
      <DocsFacets
        className="flex-grow-1 px-3"
        status={allDocsStatus}
        query={query}
        facets={facets}
        onSelect={setQuery}
      />
    </div>
  )
}

export default Docs
