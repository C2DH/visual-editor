import { useDocuments } from '@c2dh/react-miller'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useQueryParams } from 'use-query-params'
import Facets from '../components/Facets'
import DocItem from '../components/Doc/DocItem'
import { BootstrapColumnLayout } from '../constants'
import { QParam, SlugsParam } from '../logic/params'
import SearchField from '../components/SearchField'

const Docs = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useQueryParams({
    q: QParam,
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

  const [
    { count: filteredDocsCount = -1, results = [], facets: filteredDocsFacets } = {},
    { isLoading, isSuccess },
  ] = useDocuments({
    params: {
      limit: 60,
      filters,
      q: query.q && query.q.length ? query.q : undefined,
      facets: 'data__type',
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
            <SearchField className="mb-5" onSubmit={(e, value) => setQuery({ q: value })} />
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
      <Facets
        className="flex-grow-1 px-3"
        status={allDocsStatus}
        query={query}
        facets={facets}
        fiteredFacets={filteredDocsFacets}
        onSelect={setQuery}
      />
    </div>
  )
}

export default Docs
