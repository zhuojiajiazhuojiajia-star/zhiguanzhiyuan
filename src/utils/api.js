import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      config.headers['X-Session-Id'] = sessionId
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        localStorage.removeItem('sessionId')
        ElMessage.error('登录已过期，请重新登录')
      } else if (status === 403) {
        ElMessage.error('无权访问')
      } else if (status === 500) {
        ElMessage.error('服务器内部错误')
      } else {
        ElMessage.error(error.response.data?.message || '请求失败')
      }
    } else if (error.request) {
      ElMessage.error('网络异常，请检查网络连接')
    } else {
      ElMessage.error('请求配置错误')
    }
    return Promise.reject(error)
  }
)

export const chatApi = {
  sendMessage: async (message, terminal, module) => {
    try {
      const response = await api.post('/chat/completions', {
        message,
        terminal,
        module,
        stream: false
      })
      return response
    } catch (error) {
      throw error
    }
  },

  streamMessage: async (message, terminal, module, onChunk) => {
    try {
      const response = await api.post('/chat/stream', {
        message,
        terminal,
        module
      }, {
        responseType: 'stream'
      })

      const reader = response.data.getReader()
      const decoder = new TextDecoder('utf-8')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        if (onChunk && typeof onChunk === 'function') {
          onChunk(chunk)
        }
      }
    } catch (error) {
      throw error
    }
  },

  getHistory: async (terminal, module, page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/chat/history', {
        params: { terminal, module, page, pageSize }
      })
      return response
    } catch (error) {
      throw error
    }
  },

  deleteHistory: async (chatId) => {
    try {
      const response = await api.delete(`/chat/history/${chatId}`)
      return response
    } catch (error) {
      throw error
    }
  }
}

export const userApi = {
  login: async (username, password) => {
    try {
      const response = await api.post('/user/login', { username, password })
      if (response.sessionId) {
        localStorage.setItem('sessionId', response.sessionId)
      }
      return response
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      await api.post('/user/logout')
      localStorage.removeItem('sessionId')
    } catch (error) {
      throw error
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/user/profile')
      return response
    } catch (error) {
      throw error
    }
  }
}

export const systemApi = {
  getSettings: async () => {
    try {
      const response = await api.get('/system/settings')
      return response
    } catch (error) {
      throw error
    }
  },

  saveSettings: async (settings) => {
    try {
      const response = await api.post('/system/settings', settings)
      return response
    } catch (error) {
      throw error
    }
  },

  submitFeedback: async (feedback) => {
    try {
      const response = await api.post('/system/feedback', feedback)
      return response
    } catch (error) {
      throw error
    }
  }
}

export default api