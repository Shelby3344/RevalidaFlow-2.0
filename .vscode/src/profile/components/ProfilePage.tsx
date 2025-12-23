import React, { useState, useEffect } from 'react';
import type { UserProfile, PersonalInfo, UserPreferences, PrivacyConfig, AdditionalInfo } from '../types';
import { ProfileService } from '../services/profile';
import { PersonalInfoSection } from './PersonalInfoSection';
import { AvatarUploader } from './AvatarUploader';
import { AccountInfoSection } from './AccountInfoSection';
import { SecuritySettings } from './SecuritySettings';
import { PreferencesSection } from './PreferencesSection';
import { PrivacySettings } from './PrivacySettings';
import { AdditionalInfoSection } from './AdditionalInfoSection';
import './ProfilePage.css';

interface ProfilePageProps {
  userId: string;
}

type TabId = 'personal' | 'account' | 'security' | 'preferences' | 'privacy' | 'additional';

const TABS: { id: TabId; label: string }[] = [
  { id: 'personal', label: 'Informações Pessoais' },
  { id: 'account', label: 'Conta' },
  { id: 'security', label: 'Segurança' },
  { id: 'preferences', label: 'Preferências' },
  { id: 'privacy', label: 'Privacidade' },
  { id: 'additional', label: 'Dados Adicionais' },
];

export function ProfilePage({ userId }: ProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasTwoFactor, setHasTwoFactor] = useState(false);

  const profileService = new ProfileService();

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      let data = await profileService.getProfile(userId);
      if (!data) {
        data = await profileService.createProfile(userId, 'Novo Usuário', 'user@email.com');
      }
      setProfile(data);
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePersonalInfo = async (data: PersonalInfo) => {
    if (!profile) return;
    const updated = await profileService.updatePersonalInfo(userId, data);
    setProfile(updated);
  };

  const handleAvatarUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    const updated = await profileService.updateAvatar(userId, url);
    setProfile(updated);
  };

  const handleAvatarRemove = async () => {
    const updated = await profileService.removeAvatar(userId);
    setProfile(updated);
  };

  const handleSavePreferences = async (prefs: UserPreferences) => {
    if (!profile) return;
    const updated = await profileService.updatePreferences(userId, prefs);
    setProfile(updated);
  };

  const handleSavePrivacy = async (settings: PrivacyConfig) => {
    if (!profile) return;
    const updated = await profileService.updatePrivacy(userId, settings);
    setProfile(updated);
  };

  const handleSaveAdditionalInfo = async (data: AdditionalInfo) => {
    if (!profile) return;
    const updated = await profileService.updateAdditionalInfo(userId, data);
    setProfile(updated);
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    console.log('Password change requested');
  };

  const handleToggleTwoFactor = async (enable: boolean) => {
    setHasTwoFactor(enable);
  };

  const handleUpgrade = () => {
    window.location.href = '/upgrade';
  };

  if (loading) {
    return <div className="profile-loading">Carregando...</div>;
  }

  if (!profile) {
    return <div className="profile-error">Erro ao carregar perfil</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <AvatarUploader
          currentAvatar={profile.avatar.url}
          initials={profile.avatar.initials}
          backgroundColor={profile.avatar.backgroundColor}
          onUpload={handleAvatarUpload}
          onRemove={handleAvatarRemove}
        />
        <div className="header-info">
          <h1>{profile.personalInfo.displayName || profile.personalInfo.fullName}</h1>
          <span className={`status-badge ${profile.accountInfo.status}`}>
            {profile.accountInfo.status === 'premium' ? '⭐ Premium' : 'Free'}
          </span>
        </div>
      </div>

      <nav className="profile-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="profile-content">
        {activeTab === 'personal' && (
          <PersonalInfoSection
            personalInfo={profile.personalInfo}
            onSave={handleSavePersonalInfo}
            isEditing={isEditingPersonal}
            onEditToggle={() => setIsEditingPersonal(!isEditingPersonal)}
          />
        )}

        {activeTab === 'account' && (
          <AccountInfoSection
            accountInfo={profile.accountInfo}
            onUpgrade={handleUpgrade}
          />
        )}

        {activeTab === 'security' && (
          <SecuritySettings
            hasTwoFactor={hasTwoFactor}
            onChangePassword={handleChangePassword}
            onToggleTwoFactor={handleToggleTwoFactor}
          />
        )}

        {activeTab === 'preferences' && (
          <PreferencesSection
            preferences={profile.preferences}
            onSave={handleSavePreferences}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacySettings
            privacySettings={profile.privacy}
            onSave={handleSavePrivacy}
          />
        )}

        {activeTab === 'additional' && (
          <AdditionalInfoSection
            additionalInfo={profile.additionalInfo}
            onSave={handleSaveAdditionalInfo}
          />
        )}
      </div>
    </div>
  );
}
