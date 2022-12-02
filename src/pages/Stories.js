import { useStories } from '@c2dh/react-miller'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useQueryParams } from 'use-query-params'
import { useTranslation } from 'react-i18next'
import StoryItem from '../components/Story/StoryItem'
import { QParam, SlugsParam } from '../logic/params'
import Facets from '../components/Facets'
import { BootstrapColumnLayout } from '../constants'
import SearchField from '../components/SearchField'

const Stories = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useQueryParams({
    q: QParam,
    status: SlugsParam,
    tags: SlugsParam,
  })
  const filters = {}
  if (query.status) {
    filters.status__in = query.status
  }
  if (query.tags) {
    filters.tags__slug__in = query.tags
  }

  const [
    { count: filteredStoriesCount = -1, results = [], facets: filteredStoriesFacets } = {},
    { isLoading, isSuccess },
  ] = useStories({
    params: {
      limit: 60,
      q: query.q && query.q.length ? query.q : undefined,
      facets: 'status',
      filters,
    },
  })

  const [{ count: allStoriesCount = -1, facets } = {}, { status: allStoriesStatus }] = useStories({
    params: {
      limit: 1,
      facets: 'status',
    },
  })

  console.debug('[Stories] filtered:', filteredStoriesCount)
  return (
    <div className="Docs d-flex">
      <Container className="flex-shrink-1" fluid>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <h1 className="mb-5">
              {t('pagesStoriesTitle')} <br /> {filteredStoriesCount} of {allStoriesCount}
            </h1>
            <SearchField
              defaultValue={query.q}
              className="mb-5"
              onSubmit={(e, value) => setQuery({ q: value })}
            />
          </Col>
        </Row>
        {isLoading && <p>loading</p>}
        <Row>
          {isSuccess &&
            results.map((d) => (
              <Col {...BootstrapColumnLayout} key={d.id}>
                <StoryItem story={d} className="mb-5" />
              </Col>
            ))}
        </Row>
      </Container>
      <Facets
        className="flex-grow-1 px-3"
        status={allStoriesStatus}
        query={query}
        facets={facets}
        fiteredFacets={filteredStoriesFacets}
        onSelect={setQuery}
      />
    </div>
  )
}

export default Stories
