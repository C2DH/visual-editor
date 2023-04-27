import { useQuery } from 'react-query'
import axios from 'axios'
import { useSettingsStore } from '../store'
import LangLink from '../components/LangLink'
import AuthorItem from '../components/Author/AuthorItem'

const Authors = () => {
  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)

  const {
    data: authors,
    isLoading,
    error,
  } = useQuery(['authors'], () =>
    axios
      .get(`/author/`, {
        baseURL: millerApiUrl,
        headers: {
          Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
        },
      })
      .then((res) => {
        console.debug('[Authors] @useQuery response status:', res.status, res)
        return res.data.results
      }),
  )

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <div>
      <h1>Authors</h1>
      {authors.map((author) => (
        <div key={author.id}>
          <pre>{JSON.stringify(author, null, 2)}</pre>
          <AuthorItem author={author} />
        </div>
      ))}
    </div>
  )
}

export default Authors
