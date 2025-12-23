import type { 
  UserProfile, 
  PersonalInfo, 
  UserPreferences, 
  PrivacyConfig, 
  AdditionalInfo 
} from '../types';
import { generateInitials, generateBackgroundColor } from '../utils/avatar';

const STORAGE_KEY = 'user_profile';

export class ProfileService {
  async getProfile(userId: string): Promise<UserProfile | null> {
    const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    if (!stored) return null;
    return JSON.parse(stored);
  }

  async updatePersonalInfo(userId: string, data: PersonalInfo): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    if (!profile) throw new Error('Profile not found');

    const updated: UserProfile = {
      ...profile,
      personalInfo: data,
      avatar: {
        ...profile.avatar,
        initials: generateInitials(data.displayName),
        backgroundColor: generateBackgroundColor(data.displayName),
      },
      updatedAt: new Date().toISOString(),
    };

    await this.saveProfile(userId, updated);
    return updated;
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    if (!profile) throw new Error('Profile not found');

    const updated: UserProfile = {
      ...profile,
      avatar: {
        ...profile.avatar,
        url: avatarUrl,
      },
      updatedAt: new Date().toISOString(),
    };

    await this.saveProfile(userId, updated);
    return updated;
  }

  async removeAvatar(userId: string): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    if (!profile) throw new Error('Profile not found');

    const updated: UserProfile = {
      ...profile,
      avatar: {
        url: null,
        initials: generateInitials(profile.personalInfo.displayName),
        backgroundColor: generateBackgroundColor(profile.personalInfo.displayName),
      },
      updatedAt: new Date().toISOString(),
    };

    await this.saveProfile(userId, updated);
    return updated;
  }

  async updatePreferences(userId: string, prefs: UserPreferences): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    if (!profile) throw new Error('Profile not found');

    const updated: UserProfile = {
      ...profile,
      preferences: prefs,
      updatedAt: new Date().toISOString(),
    };

    await this.saveProfile(userId, updated);
    return updated;
  }

  async updatePrivacy(userId: string, settings: PrivacyConfig): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    if (!profile) throw new Error('Profile not found');

    const updated: UserProfile = {
      ...profile,
      privacy: settings,
      updatedAt: new Date().toISOString(),
    };

    await this.saveProfile(userId, updated);
    return updated;
  }

  async updateAdditionalInfo(userId: string, data: AdditionalInfo): Promise<UserProfile> {
    const profile = await this.getProfile(userId);
    if (!profile) throw new Error('Profile not found');

    const updated: UserProfile = {
      ...profile,
      additionalInfo: data,
      updatedAt: new Date().toISOString(),
    };

    await this.saveProfile(userId, updated);
    return updated;
  }

  async createProfile(userId: string, displayName: string, email: string): Promise<UserProfile> {
    const now = new Date().toISOString();
    
    const profile: UserProfile = {
      id: userId,
      personalInfo: {
        fullName: displayName,
        displayName,
        email,
        phone: null,
      },
      avatar: {
        url: null,
        initials: generateInitials(displayName),
        backgroundColor: generateBackgroundColor(displayName),
      },
      accountInfo: {
        status: 'free',
        premiumExpiresAt: null,
        createdAt: now,
        lastLoginAt: now,
      },
      preferences: {
        language: 'pt-BR',
        theme: 'system',
        notifications: { email: true, push: true, sms: false },
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        showLocation: true,
        showSocialLinks: true,
      },
      additionalInfo: {
        bio: null,
        location: null,
        website: null,
        socialLinks: { twitter: null, linkedin: null, github: null, instagram: null },
      },
      createdAt: now,
      updatedAt: now,
    };

    await this.saveProfile(userId, profile);
    return profile;
  }

  private async saveProfile(userId: string, profile: UserProfile): Promise<void> {
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(profile));
  }
}

export const profileService = new ProfileService();
