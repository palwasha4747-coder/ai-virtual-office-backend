
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

  async volumeControl(level: number) {
    const safeLevel = Math.max(
      0,
      Math.min(100, Number(level)),
    );

    if (!Number.isFinite(safeLevel)) {
      return {
        success: false,
        action: 'volume-control',
        message: 'Invalid volume level.',
      };
    }

    const volume = Math.round(safeLevel);

    const powerShellScript = `
Add-Type @"
using System;
using System.Runtime.InteropServices;

public class AudioVolumeControl
{
    [ComImport]
    [Guid("BCDE0395-E52F-467C-8E3D-C4579291692E")]
    private class MMDeviceEnumerator
    {
    }

    [ComImport]
    [Guid("A95664D2-9614-4F35-A746-DE8DB63617E6")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IMMDeviceEnumerator
    {
        int EnumAudioEndpoints(
            int dataFlow,
            int stateMask,
            out IntPtr devices
        );

        int GetDefaultAudioEndpoint(
            int dataFlow,
            int role,
            out IMMDevice endpoint
        );
    }

    [ComImport]
    [Guid("D666063F-1587-4E43-81F1-B948E807363F")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IMMDevice
    {
        int Activate(
            ref Guid id,
            int clsCtx,
            IntPtr activationParams,
            out IAudioEndpointVolume endpoint
        );
    }

    [ComImport]
    [Guid("5CDF2C82-841E-4546-9722-0CF74078229A")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IAudioEndpointVolume
    {
        int RegisterControlChangeNotify(
            IntPtr notify
        );

        int UnregisterControlChangeNotify(
            IntPtr notify
        );

        int GetChannelCount(
            out uint count
        );

        int SetMasterVolumeLevel(
            float levelDB,
            Guid eventContext
        );

        int SetMasterVolumeLevelScalar(
            float level,
            Guid eventContext
        );

        int GetMasterVolumeLevel(
            out float levelDB
        );

        int GetMasterVolumeLevelScalar(
            out float level
        );

        int SetChannelVolumeLevel(
            uint channel,
            float levelDB,
            Guid eventContext
        );

        int SetChannelVolumeLevelScalar(
            uint channel,
            float level,
            Guid eventContext
        );
    }

    public static void SetVolume(float volume)
    {
        var enumerator =
            (IMMDeviceEnumerator)new MMDeviceEnumerator();

        IMMDevice device;

        enumerator.GetDefaultAudioEndpoint(
            0,
            1,
            out device
        );

        Guid iid =
            typeof(IAudioEndpointVolume).GUID;

        IAudioEndpointVolume endpoint;

        device.Activate(
            ref iid,
            23,
            IntPtr.Zero,
            out endpoint
        );

        endpoint.SetMasterVolumeLevelScalar(
            volume,
            Guid.Empty
        );
    }
}
"@

[AudioVolumeControl]::SetVolume($volume)
`;

    try {
      await this.runWindowsCommand('powershell.exe', [
        '-NoProfile',
        '-NonInteractive',
        '-ExecutionPolicy',
        'Bypass',
        '-Command',
        `$volume = ${volume / 100}; ${powerShellScript}`,
      ]);

      return {
        success: true,
        action: 'volume-control',
        level: volume,
        message: `System volume set to ${volume}%.`,
      };
    } catch (error) {
      console.error('Volume control error:', error);

      return {
        success: false,
        action: 'volume-control',
        level: volume,
        message:
          error instanceof Error
            ? `Could not change system volume: ${error.message}`
            : 'Could not change system volume.',
      };
    }
  }
}