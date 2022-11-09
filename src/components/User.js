import axios from 'axios'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { LoginRoute } from '../constants'
import { useSettingsStore, useStore } from '../store'
import LangLink from './LangLink'

const User = () => {
  const { t } = useTranslation()
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)

  const enabled = user === null && millerAuthToken !== null
  console.debug('[User] reload query:', enabled, millerAuthToken)

  const { isLoading, isSuccess } = useQuery(
    {
      queryKey: ['me', millerAuthToken?.access_token],
      queryFn: () => {
        console.debug('[User] @useQuery', millerAuthToken)
        return axios.get('/profile/me', {
          baseURL: millerApiUrl,
          headers: {
            Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
          },
        })
      },
      onSuccess: (res) => {
        console.debug('[User] @useQuery success, res:', res)
        setUser({
          username: res.data.username,
          isStaff: res.data.user.is_staff,
        })
      },
    },
    { enabled }
  )

  return (
    <div className='User'>
      {isLoading ? (
        'loading'
      ) : user !== null ? (
        <div className='border-start border-dark ps-2'>
          <b>{user.username}</b>
          <br />
          {user.isStaff ? 'staff' : 'guest'}
        </div>
      ) : (
        <LangLink to={LoginRoute.to}>{t(LoginRoute.label)}</LangLink>
      )}
    </div>
  )
}

export default User
