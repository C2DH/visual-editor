import { useTranslation } from 'react-i18next'
import '../../styles/components/Doc/DocFacets.css'

const DocFacets = ({ className = '', status, facets = {}, onSelect }) => {
  const { t } = useTranslation()
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
                    <span class="badge rounded ms-1 px-1 border border-dark">{d.count}</span>
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
