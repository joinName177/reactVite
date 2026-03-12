import { exec } from 'child_process'
import * as crypto from 'crypto'

export function getMachineId(): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32'
      ? 'wmic csproduct get UUID'
      : process.platform === 'darwin'
        ? "ioreg -rd1 -c IOPlatformExpertDevice | grep -i 'IOPlatformUUID'"
        : 'cat /var/lib/dbus/machine-id 2>/dev/null || cat /etc/machine-id'

    exec(command, (error, stdout) => {
      if (error) {
        reject(error)
        return
      }

      const id = stdout.trim().split('\n').pop()?.trim() || ''
      const hash = crypto.createHash('sha256').update(id).digest('hex')
      resolve(hash)
    })
  })
}

export function getShortMachineId(): Promise<string> {
  return getMachineId().then(id => id.substring(0, 32))
}
