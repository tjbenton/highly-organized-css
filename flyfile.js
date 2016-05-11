import path from 'path'
import livereload from 'livereload';
import { spawn } from 'child_process'
// import simpleserver from 'http-server'
export async function jade() {
  await this
    .source(path.join('views', 'index.jade'))
    .jade({
      base: 'views',
      pretty: true
    })
    .target('.', { depth: 2 })
}

export async function styles() {
  const root = path.join(__dirname, 'lib', 'stylus')
  await this
    .source(path.join('lib', 'stylus', 'index.styl'))
    .stylus({
      paths: [
        root,
        path.join(root, 'vendor', 'hljs'),
        path.join(root, 'vendor', 'reveal'),
      ]
    })
    .target(path.join('lib', 'css'))
}

export async function watch() {
  await this.watch(path.join('views', '**', '*.jade'), 'jade');
  await this.watch(path.join('lib', 'stylus', '**', '*.styl'), 'styles')

  const httpServer = spawn(path.join('.', 'node_modules', '.bin', 'http-server'), [])
  let should_log = true
  let i = 0
  httpServer.stdout.on('data', function(data) {
    data += ''
    if (should_log) {
      console.log('%s', data)
    }
    if (data.indexOf('Hit CTRL-C to stop the server') > -1) {
      should_log = false
    }
  })

  httpServer.stderr.on('data', function(data) {
    console.log(data + '')
  })

  httpServer.on('exit', function(code) {
    console.log('Child exited with code ' + code)
  })

  const server = livereload.createServer()
  await server.watch([
    path.join(__dirname, 'css'),
    path.join(__dirname, 'js'),
    path.join(__dirname, 'lib'),
    path.join(__dirname, 'index.html')
  ])
}