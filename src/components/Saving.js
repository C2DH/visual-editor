import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'
import '../styles/components/Saving.css'

const Saving = ({ status = '', isSaving = false, success = false, error, children }) => {
  const [styles, api] = useSpring(() => ({ opacity: 0 }))
  useEffect(() => {
    if (status === 'loading') {
      api.start({ opacity: 1, delay: 0 })
    }
    if (status === 'success') {
      api.start({ opacity: 0, delay: 2500 })
    }
  }, [status])
  return (
    <animated.div style={styles} className="Saving">
      <div className="Saving__message px-3 py-2">
        {children ? <p>{children}</p> : null}
        error: {error}
        <br />
        status: {status}
        <br />
      </div>
    </animated.div>
  )
}

export default Saving
