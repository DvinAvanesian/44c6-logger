import { IMessage } from './types'

const formatLogString = ({ clientIP, user, url, method, message }: IMessage) =>
  `${clientIP ? `[${clientIP}] ` : ''}${url ? `[${method ? `${method} at ` : ''}${url}] ` : ''}${
    user ? `[${user}] ` : ''
  }${message}`

export default formatLogString
