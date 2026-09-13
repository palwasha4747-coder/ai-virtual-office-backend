import {
  Body,
  Controller,
  Get,
  Put,
} from '@nestjs/common';

import { SettingsService } from './settings.service';
import { SettingsEntity } from './entities/settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  updateSettings(
    @Body() body: Partial<SettingsEntity>,
  ) {
    return this.settingsService.updateSettings(body);
  }
}