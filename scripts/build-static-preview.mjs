import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const webDir = path.join(rootDir, 'apps', 'web')
const disabledDir = path.join(webDir, '.static-preview-disabled')

const movedPaths = [
  {
    from: path.join(webDir, 'src', 'app', 'api'),
    to: path.join(disabledDir, 'api'),
  },
  {
    from: path.join(webDir, 'src', 'middleware.ts'),
    to: path.join(disabledDir, 'middleware.ts'),
  },
]

function cleanBuildOutputs() {
  rmSync(path.join(webDir, '.next'), { recursive: true, force: true })
  rmSync(path.join(webDir, 'out'), { recursive: true, force: true })
}

function disableServerOnlyRoutes() {
  rmSync(disabledDir, { recursive: true, force: true })
  mkdirSync(disabledDir, { recursive: true })

  for (const item of movedPaths) {
    if (existsSync(item.from)) {
      cpSync(item.from, item.to, { recursive: true })
      rmSync(item.from, { recursive: true, force: true })
    }
  }
}

function restoreServerOnlyRoutes() {
  for (const item of movedPaths.slice().reverse()) {
    if (existsSync(item.to)) {
      mkdirSync(path.dirname(item.from), { recursive: true })
      cpSync(item.to, item.from, { recursive: true })
      rmSync(item.to, { recursive: true, force: true })
    }
  }
  rmSync(disabledDir, { recursive: true, force: true })
}

cleanBuildOutputs()

try {
  disableServerOnlyRoutes()

  const result = spawnSync('pnpm', ['exec', 'turbo', 'build', '--force'], {
    cwd: rootDir,
    env: {
      ...process.env,
      NEXT_PUBLIC_STATIC_PREVIEW: 'true',
    },
    shell: process.platform === 'win32',
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1
  }
} finally {
  restoreServerOnlyRoutes()
}
