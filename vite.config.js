import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import url from 'url'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  process.env.RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY
  process.env.AIRTABLE_API_KEY = env.AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY
  process.env.AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID
  process.env.AIRTABLE_TABLE_NAME = env.AIRTABLE_TABLE_NAME || process.env.AIRTABLE_TABLE_NAME

  return {
    plugins: [
    react(),
    tailwindcss(),
    {
      name: 'vercel-api-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const parsedUrl = url.parse(req.url, true)
          const pathname = parsedUrl.pathname

          if (pathname === '/api/request-resume' || pathname === '/api/approve-resume') {
            try {
              const filePath = pathname === '/api/request-resume' 
                ? './api/request-resume.js' 
                : './api/approve-resume.js'
              
              const absolutePath = path.resolve(process.cwd(), filePath)
              const modulePath = url.pathToFileURL(absolutePath).href
              const { default: handler } = await import(modulePath)

              const mockRes = {
                statusCode: 200,
                headers: {},
                setHeader(name, value) {
                  this.headers[name.toLowerCase()] = value
                  res.setHeader(name, value)
                  return this
                },
                status(code) {
                  this.statusCode = code
                  res.statusCode = code
                  return this
                },
                json(data) {
                  this.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                },
                send(data) {
                  if (typeof data === 'object') {
                    this.json(data)
                  } else {
                    res.end(data)
                  }
                }
              }

              const mockReq = {
                method: req.method,
                headers: req.headers,
                query: parsedUrl.query,
                body: {}
              }

              if (req.method === 'POST') {
                const buffers = []
                for await (const chunk of req) {
                  buffers.push(chunk)
                }
                const bodyStr = Buffer.concat(buffers).toString()
                try {
                  mockReq.body = JSON.parse(bodyStr)
                } catch {
                  mockReq.body = {}
                }
              }

              await handler(mockReq, mockRes)
              return
            } catch (err) {
              console.error('Error running dev serverless API:', err)
              res.statusCode = 500
              res.end(JSON.stringify({ error: err.message }))
              return
            }
          }
          next()
        })
      }
    }
  ]
  }
})
