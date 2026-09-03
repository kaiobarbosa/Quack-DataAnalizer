const { app, BrowserWindow } = require('electron/main')
const { spawn } = require('child_process')
const path = require('path')

// Variável global para guardar a referência do backend
let flaskProcess = null

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 730,
  })

  // Usar path.join garante que o caminho funcione independente do SO
  win.loadFile('frontend/public/index.html')
}

app.whenReady().then(() => {
  // 1. Iniciar o servidor Flask em segundo plano
  const scriptPath = path.join(__dirname, '../app.py')
  flaskProcess = spawn('python3', [scriptPath])

  // 2. Capturar os logs do Python e mostrar no terminal do Electron (Excelente para debugar)
  flaskProcess.stdout.on('data', (data) => {
    console.log(`[Backend Flask]: ${data}`)
  })

  flaskProcess.stderr.on('data', (data) => {
    console.error(`[Backend Flask]: ${data}`)
  })

  // 3. Criar a janela visual após iniciar o backend
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 4. REGRA DE SEGURANÇA: Matar o processo do Flask quando o Electron fechar
app.on('will-quit', () => {
  if (flaskProcess) {
    flaskProcess.kill()
  }
})
