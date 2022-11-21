import { useTranslation } from 'react-i18next'
import '../../styles/components/Doc/DocFacets.css'

const DocFacets = ({ className = '', status, filteredDocsFacets = {}, facets = {}, onSelect }) => {
  const { t } = useTranslation()
  const hasFilteredFacets = !!Object.keys(filteredDocsFacets).length
  return (
    <div className={`DocsFacets ${className}`}>
      {Object.keys(facets).map((k) => (
        <div key={k}>
          <h2>{t(`filterBy${k.toUpperCase()}`)}</h2>
          <ul>
            {facets[k].map((d, i) =>
              d[k] === null ? null : (
                <li key={i}>
                  <button
                    className="btn btn-xs btn-transparent"
                    onClick={() => onSelect({ [k]: [d[k]] })}
                  >
                    {t(d[k] ? d[k] : 'undefined')}
                    <span className="badge rounded ms-1 px-1 border border-dark">
                      {filteredDocsFacets[k] ? filteredDocsFacets[k][i].count / d.count : d.count}
                    </span>
                  </button>
                </li>
              ),
            )}
          </ul>
          <button
            className="btn btn-xs btn-outline-dark"
            onClick={() => onSelect({ [k]: undefined })}
          >
            {t('reset')}
          </button>
        </div>
      ))}
      test {status}
    </div>
  )
}

export default DocFacets
