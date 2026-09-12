import { Injectable } from '@nestjs/common';
import { execFile } from 'child_process';

@Injectable()
export class PcControlService {
  private runWindowsCommand(
    file: string,
    args: string[] = [],
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      execFile(file, args, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  async openChrome() {
    try {
      await this.runWindowsCommand('cmd.exe', [
        '/c',
        'start',
        '',
        'chrome',
      ]);

      return {
        success: true,
        action: 'open-chrome',
        message: 'Chrome opened successfully.',
      };
    } catch {
      return {
        success: false,
        action: 'open-chrome',
        message: 'Could not open Chrome.',
      };
    }
  }

  async openNotepad() {
    try {
      await this.runWindowsCommand('notepad.exe');

      return {
        success: true,
        action: 'open-notepad',
        message: 'Notepad opened successfully.',
      };
    } catch {
      return {
        success: false,
        action: 'open-notepad',
        message: 'Could not open Notepad.',
      };
    }
  }

  async openCalculator() {
    try {
      await this.runWindowsCommand('calc.exe');

      return {
        success: true,
        action: 'open-calculator',
        message: 'Calculator opened successfully.',
      };
    } catch {
      return {
        success: false,
        action: 'open-calculator',
        message: 'Could not open Calculator.',
      };
    }
  }

  async openFileExplorer() {
    try {
      await this.runWindowsCommand('explorer.exe');

      return {
        success: true,
        action: 'open-file-explorer',
        message: 'File Explorer opened successfully.',
      };
    } catch {
      return {
        success: false,
        action: 'open-file-explorer',
        message: 'Could not open File Explorer.',
      };
    }
  }

  async lockPc() {
    try {
      await this.runWindowsCommand('rundll32.exe', [
        'user32.dll,LockWorkStation',
      ]);

      return {
        success: true,
        action: 'lock-pc',
        message: 'PC lock command executed successfully.',
      };
    } catch {
      return {
        success: false,
        action: 'lock-pc',
        message: 'Could not lock the PC.',
      };
    }
  }

  async restartPc() {
    try {
      await this.runWindowsCommand('shutdown.exe', [
        '/r',
        '/t',
        '0',
      ]);

      return {
        success: true,
        action: 'restart-pc',
        message: 'PC restart command executed.',
      };
    } catch {
      return {
        success: false,
        action: 'restart-pc',
        message: 'Could not restart the PC.',
      };
    }
  }

  async shutdownPc() {
    try {
      await this.runWindowsCommand('shutdown.exe', [
        '/s',
        '/t',
        '0',
      ]);

      return {
        success: true,
        action: 'shutdown-pc',
        message: 'PC shutdown command executed.',
      };
    } catch {
      return {
        success: false,
        action: 'shutdown-pc',
        message: 'Could not shut down the PC.',
      };
    }
  }

  async volumeControl() {
    return {
      success: false,
      action: 'volume-control',
      message:
        'Volume control requires a volume level from the frontend.',
    };
  }
}