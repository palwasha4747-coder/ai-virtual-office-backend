import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SettingsEntity } from './entities/settings.entity';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
  ) {}

  async onModuleInit() {
    const count = await this.settingsRepository.count();

    if (count === 0) {
      await this.settingsRepository.save({
        fullName: 'Palwasha',
        email: 'palwasha@example.com',
        profileImage: '',
        emailNotifications: true,
        taskNotifications: true,
        mobileNotifications: false,
        twoFactorAuthentication: false,
        automaticTasks: true,
        smartSuggestions: true,
        language: 'English',
      });
    }
  }

  async getSettings() {
    const settings = await this.settingsRepository.findOne({
      where: { id: 1 },
    });

    return settings;
  }

  async updateSettings(data: Partial<SettingsEntity>) {
    let settings = await this.settingsRepository.findOne({
      where: { id: 1 },
    });

    if (!settings) {
      settings = this.settingsRepository.create({
        fullName: 'Palwasha',
        email: 'palwasha@example.com',
        profileImage: '',
        emailNotifications: true,
        taskNotifications: true,
        mobileNotifications: false,
        twoFactorAuthentication: false,
        automaticTasks: true,
        smartSuggestions: true,
        language: 'English',
      });
    }

    if (data.fullName !== undefined) {
      settings.fullName = data.fullName;
    }

    if (data.email !== undefined) {
      settings.email = data.email;
    }

    if (data.profileImage !== undefined) {
      settings.profileImage = data.profileImage;
    }

    if (data.emailNotifications !== undefined) {
      settings.emailNotifications = data.emailNotifications;
    }

    if (data.taskNotifications !== undefined) {
      settings.taskNotifications = data.taskNotifications;
    }

    if (data.mobileNotifications !== undefined) {
      settings.mobileNotifications = data.mobileNotifications;
    }

    if (data.twoFactorAuthentication !== undefined) {
      settings.twoFactorAuthentication =
        data.twoFactorAuthentication;
    }

    if (data.automaticTasks !== undefined) {
      settings.automaticTasks = data.automaticTasks;
    }

    if (data.smartSuggestions !== undefined) {
      settings.smartSuggestions = data.smartSuggestions;
    }

    if (data.language !== undefined) {
      settings.language = data.language;
    }

    const updatedSettings =
      await this.settingsRepository.save(settings);

    return {
      success: true,
      message: 'Settings updated successfully.',
      settings: updatedSettings,
    };
  }
}