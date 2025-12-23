// User Profile Types

export interface UserProfile {
  id: string;
  personalInfo: PersonalInfo;
  avatar: AvatarInfo;
  accountInfo: AccountInfo;
  preferences: UserPreferences;
  privacy: PrivacyConfig;
  additionalInfo: AdditionalInfo;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  fullName: string;
  displayName: string;
  email: string;
  phone: string | null;
}

export interface AvatarInfo {
  url: string | null;
  initials: string;
  backgroundColor: string;
}

export interface AccountInfo {
  status: 'free' | 'premium';
  premiumExpiresAt: string | null;
  createdAt: string;
  lastLoginAt: string;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface PrivacyConfig {
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showSocialLinks: boolean;
}

export interface AdditionalInfo {
  bio: string | null;
  location: string | null;
  website: string | null;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
  instagram: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}
