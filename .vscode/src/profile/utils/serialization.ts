import type { UserProfile } from '../types';

export function serializeProfile(profile: UserProfile): string {
  return JSON.stringify(profile);
}

export function deserializeProfile(json: string): UserProfile {
  const parsed = JSON.parse(json);
  
  return {
    id: parsed.id,
    personalInfo: {
      fullName: parsed.personalInfo.fullName,
      displayName: parsed.personalInfo.displayName,
      email: parsed.personalInfo.email,
      phone: parsed.personalInfo.phone ?? null,
    },
    avatar: {
      url: parsed.avatar.url ?? null,
      initials: parsed.avatar.initials,
      backgroundColor: parsed.avatar.backgroundColor,
    },
    accountInfo: {
      status: parsed.accountInfo.status,
      premiumExpiresAt: parsed.accountInfo.premiumExpiresAt ?? null,
      createdAt: parsed.accountInfo.createdAt,
      lastLoginAt: parsed.accountInfo.lastLoginAt,
    },
    preferences: {
      language: parsed.preferences.language,
      theme: parsed.preferences.theme,
      notifications: {
        email: parsed.preferences.notifications.email,
        push: parsed.preferences.notifications.push,
        sms: parsed.preferences.notifications.sms,
      },
    },
    privacy: {
      profileVisibility: parsed.privacy.profileVisibility,
      showEmail: parsed.privacy.showEmail,
      showPhone: parsed.privacy.showPhone,
      showLocation: parsed.privacy.showLocation,
      showSocialLinks: parsed.privacy.showSocialLinks,
    },
    additionalInfo: {
      bio: parsed.additionalInfo.bio ?? null,
      location: parsed.additionalInfo.location ?? null,
      website: parsed.additionalInfo.website ?? null,
      socialLinks: {
        twitter: parsed.additionalInfo.socialLinks.twitter ?? null,
        linkedin: parsed.additionalInfo.socialLinks.linkedin ?? null,
        github: parsed.additionalInfo.socialLinks.github ?? null,
        instagram: parsed.additionalInfo.socialLinks.instagram ?? null,
      },
    },
    createdAt: parsed.createdAt,
    updatedAt: parsed.updatedAt,
  };
}
