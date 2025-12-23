import type { UserProfile, PrivacyConfig } from '../types';

export interface PublicProfile {
  id: string;
  displayName: string;
  avatar: {
    url: string | null;
    initials: string;
    backgroundColor: string;
  };
  accountStatus: 'free' | 'premium';
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

export function filterProfileByPrivacy(
  profile: UserProfile,
  privacy: PrivacyConfig
): PublicProfile | null {
  if (privacy.profileVisibility === 'private') {
    return null;
  }

  const publicProfile: PublicProfile = {
    id: profile.id,
    displayName: profile.personalInfo.displayName,
    avatar: {
      url: profile.avatar.url,
      initials: profile.avatar.initials,
      backgroundColor: profile.avatar.backgroundColor,
    },
    accountStatus: profile.accountInfo.status,
  };

  if (privacy.showEmail && profile.personalInfo.email) {
    publicProfile.email = profile.personalInfo.email;
  }

  if (privacy.showPhone && profile.personalInfo.phone) {
    publicProfile.phone = profile.personalInfo.phone;
  }

  if (privacy.showLocation && profile.additionalInfo.location) {
    publicProfile.location = profile.additionalInfo.location;
  }

  if (profile.additionalInfo.bio) {
    publicProfile.bio = profile.additionalInfo.bio;
  }

  if (profile.additionalInfo.website) {
    publicProfile.website = profile.additionalInfo.website;
  }

  if (privacy.showSocialLinks) {
    const links = profile.additionalInfo.socialLinks;
    const hasLinks = links.twitter || links.linkedin || links.github || links.instagram;
    
    if (hasLinks) {
      publicProfile.socialLinks = {};
      if (links.twitter) publicProfile.socialLinks.twitter = links.twitter;
      if (links.linkedin) publicProfile.socialLinks.linkedin = links.linkedin;
      if (links.github) publicProfile.socialLinks.github = links.github;
      if (links.instagram) publicProfile.socialLinks.instagram = links.instagram;
    }
  }

  return publicProfile;
}
