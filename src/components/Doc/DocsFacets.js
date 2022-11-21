import { useTranslation } from 'react-i18next'
import '../../styles/components/Doc/DocFacets.css'

const DocFacets = ({ className = '', status, facets = {}, onSelect }) => {
  const { t } = useTranslation()
  return (
    <div className={`DocsFacets ${className}`}>
      {Object.keys(facets).map((k) => (
        <div key={k}>
          <h2>{t(k ? k : 'undefined')}</h2>
          <ul>
            {facets[k].map((d, i) => (
              <li key={i}>
                <button
                  className="btn btn-xs btn-transparent"
                  onClick={() => onSelect({ [k]: [d[k]] })}
                >
                  {t(d[k] ? d[k] : 'undefined')} {d.count}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      test {status}
    </div>
  )
}

export default DocFacets
