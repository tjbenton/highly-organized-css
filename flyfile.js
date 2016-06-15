import path from 'path'
import livereload from 'livereload'
import { spawn } from 'child_process'
import to from 'to-js'
import fs from 'fs-extra-promisify'

const specificity_path = path.join(__dirname, 'css-libs', 'css-libs.json')

export async function specificity() {
  const result = {}
  let data = []
  const keys = []
  const files = await fs.readdir(path.join(__dirname, 'css-libs'))

  for (let file of files) {
    if (file.indexOf('.css') > -1) {
      keys.push(file.split('.')[0])
      data.push(fs.readFile(path.join(__dirname, 'css-libs', file)))
    }
  }

  data = await Promise.all(data)
  for (let [ i, item ] of data.entries()) {
    result[keys[i]] = item + ''
  }

  await fs.outputJson(specificity_path, result)

}

export async function jade() {
  await this
    .source(path.join('views', 'index.jade'))
    .jade({
      base: 'views',
      pretty: true,
      to,
      css_libs: await fs.readJson(specificity_path)
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
  await this.watch(path.join('css-libs', '**', '*.css'), [ 'specificity', 'jade' ])
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

  try {
    const server = livereload.createServer()
    await server.watch([
      path.join(__dirname, 'css'),
      path.join(__dirname, 'js'),
      path.join(__dirname, 'lib'),
      path.join(__dirname, 'index.html')
    ])
  } catch (e) {
    console.log(e)
  }
}