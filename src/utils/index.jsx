import {  Spin,Typography } from 'antd'
import { Suspense } from 'react'

const {Title, Text} = Typography


export const Loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Spin  tip="Loading..." size='large' />
        </div>
    )
}

const SuspenseElement = ({children}) => {
    return (
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
    )
}


export const ContentTitle = ({children, ...props}) => {

    return (
        <Title level={1} {...props} >{children}</Title>
    )
}

export const ContentText = ({ children, ...props }) => {

    return (
        <Text level={3} {...props} >{children}</Text>
    )
}




export default SuspenseElement