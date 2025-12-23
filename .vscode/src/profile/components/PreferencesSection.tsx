import React, { useState, useEffect } from 'react';
import type { UserPreferences } from '../types';

interface PreferencesSectionProps {
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => Promise<void>;
}

const LANGUAGES = [
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'en-US', name: 'English (US)' },
  { code: 'es', name: 'Español' },
];

export function PreferencesSection({ preferences, onSave }: PreferencesSectionProps) {
  const [formData, setFormData] = useState<UserPreferences>(preferences);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(preferences);
    setHasChanges(changed);
  }, [formData, preferences]);

  const handleThemeChange = (theme: UserPreferences['theme']) => {
    setFormData(prev => ({ ...prev, theme }));
    document.documentElement.setAttribute('data-theme', theme);
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => ({ ...prev, language }));
  };

  const handleNotificationChange = (key: keyof UserPreferences['notifications'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
      setHasChanges(false);
    } catch (err) {
      console.error('Erro ao salvar preferências:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="preferences-section">
      <div className="section-header">
        <h3>Preferências</h3>
        {hasChanges && (
          <button onClick={handleSave} disabled={saving} className="btn-save">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        )}
      </div>

      <div className="preference-group">
        <h4>Idioma</h4>
        <select
          value={formData.language}
          onChange={e => handleLanguageChange(e.target.value)}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="preference-group">
        <h4>Tema</h4>
        <div className="theme-options">
          {(['light', 'dark', 'system'] as const).map(theme => (
            <button
              key={theme}
              type="button"
              className={`theme-btn ${formData.theme === theme ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme)}
            >
              {theme === 'light' && '☀️ Claro'}
              {theme === 'dark' && '🌙 Escuro'}
              {theme === 'system' && '💻 Sistema'}
            </button>
          ))}
        </div>
      </div>

      <div className="preference-group">
        <h4>Notificações</h4>
        <div className="notification-options">
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={formData.notifications.email}
              onChange={e => handleNotificationChange('email', e.target.checked)}
            />
            <span>Email</span>
          </label>
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={formData.notifications.push}
              onChange={e => handleNotificationChange('push', e.target.checked)}
            />
            <span>Push</span>
          </label>
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={formData.notifications.sms}
              onChange={e => handleNotificationChange('sms', e.target.checked)}
            />
            <span>SMS</span>
          </label>
        </div>
      </div>
    </div>
  );
}
