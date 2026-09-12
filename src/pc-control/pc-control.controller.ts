import { Controller, Post } from '@nestjs/common';
import { PcControlService } from './pc-control.service';

@Controller('pc-control')
export class PcControlController {
  constructor(private readonly pcControlService: PcControlService) {}

  @Post('chrome')
  openChrome() {
    return this.pcControlService.openChrome();
  }

  @Post('notepad')
  openNotepad() {
    return this.pcControlService.openNotepad();
  }

  @Post('calculator')
  openCalculator() {
    return this.pcControlService.openCalculator();
  }

  @Post('file-explorer')
  openFileExplorer() {
    return this.pcControlService.openFileExplorer();
  }

  @Post('lock')
  lockPc() {
    return this.pcControlService.lockPc();
  }

  @Post('restart')
  restartPc() {
    return this.pcControlService.restartPc();
  }

  @Post('shutdown')
  shutdownPc() {
    return this.pcControlService.shutdownPc();
  }

  @Post('volume')
  volumeControl() {
    return this.pcControlService.volumeControl();
  }
}