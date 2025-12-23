import React, { useState, useEffect } from 'react';
import type { PrivacyConfig } from '../types';

interface PrivacySettingsProps {
  privacySettings: PrivacyConfig;
  onSave: (settings: PrivacyConfig) => Promise<void>;
}

export function PrivacySettings({ privacySettings, onSave }: PrivacySettingsProps) {
  const [formData, setFormData] = useState<PrivacyConfig>(privacySettings);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(privacySettings);
    setHasChanges(changed);
  }, [formData, privacySettings]);

  const handleVisibilityChange = (visibility: PrivacyConfig['profileVisibility']) => {
    setFormData(prev => ({ ...prev, profileVisibility: visibility }));
  };

  const handleToggle = (key: keyof Omit<PrivacyConfig, 'profileVisibility'>, value: boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
      setHasChanges(false);
    } catch (err) {
      console.error('Erro ao salvar configurações de privacidade:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="privacy-settings">
      <div className="section-header">
        <h3>Privacidade</h3>
        {hasChanges && (
          <button onClick={handleSave} disabled={saving} className="btn-save">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        )}
      </div>

      <div className="privacy-group">
        <h4>Visibilidade do Perfil</h4>
        <div className="visibility-options">
          <label className="radio-option">
            <input
              type="radio"
              name="visibility"
              checked={formData.profileVisibility === 'public'}
              onChange={() => handleVisibilityChange('public')}
            />
            <div>
              <span>🌐 Público</span>
              <small>Qualquer pessoa pode ver seu perfil</small>
            </div>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="visibility"
              checked={formData.profileVisibility === 'private'}
              onChange={() => handleVisibilityChange('private')}
            />
            <div>
              <span>🔒 Privado</span>
              <small>Apenas você pode ver seu perfil</small>
            </div>
          </label>
        </div>
      </div>

      {formData.profileVisibility === 'public' && (
        <div className="privacy-group">
          <h4>Informações Visíveis</h4>
          <p className="hint">Escolha quais informações outros usuários podem ver</p>
          
          <div className="toggle-list">
            <label className="toggle-option">
              <input
                type="checkbox"
                checked={formData.showEmail}
                onChange={e => handleToggle('showEmail', e.target.checked)}
              />
              <span>Email</span>
            </label>
            <label className="toggle-option">
              <input
                type="checkbox"
                checked={formData.showPhone}
                onChange={e => handleToggle('showPhone', e.target.checked)}
              />
              <span>Telefone</span>
            </label>
            <label className="toggle-option">
              <input
                type="checkbox"
                checked={formData.showLocation}
                onChange={e => handleToggle('showLocation', e.target.checked)}
              />
              <span>Localização</span>
            </label>
            <label className="toggle-option">
              <input
                type="checkbox"
                checked={formData.showSocialLinks}
                onChange={e => handleToggle('showSocialLinks', e.target.checked)}
              />
              <span>Redes Sociais</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
