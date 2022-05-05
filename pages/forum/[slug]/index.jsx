import React from 'react'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const Voidpage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/forum')
  })
  return (
    <div>Void</div>
  )
}

export default Voidpage