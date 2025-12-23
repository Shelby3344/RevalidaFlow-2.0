import React, { useState } from 'react';
import type { AdditionalInfo } from '../types';
import { validateBio, validateUrl } from '../services/validation';

interface AdditionalInfoSectionProps {
  additionalInfo: AdditionalInfo;
  onSave: (data: AdditionalInfo) => Promise<void>;
}

export function AdditionalInfoSection({ additionalInfo, onSave }: AdditionalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AdditionalInfo>(additionalInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('social.')) {
      const socialField = field.replace('social.', '') as keyof AdditionalInfo['socialLinks'];
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialField]: value || null },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value || null }));
    }
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.bio) {
      const bioResult = validateBio(formData.bio);
      if (!bioResult.isValid) newErrors.bio = bioResult.error!;
    }

    if (formData.website) {
      const urlResult = validateUrl(formData.website);
      if (!urlResult.isValid) newErrors.website = urlResult.error!;
    }

    const socialFields = ['twitter', 'linkedin', 'github', 'instagram'] as const;
    for (const field of socialFields) {
      const url = formData.socialLinks[field];
      if (url) {
        const result = validateUrl(url);
        if (!result.isValid) newErrors[`social.${field}`] = result.error!;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (err) {
      setErrors({ submit: 'Erro ao salvar. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(additionalInfo);
    setErrors({});
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="additional-info-section">
        <div className="section-header">
          <h3>Informações Adicionais</h3>
          <button onClick={() => setIsEditing(true)} className="btn-edit">Editar</button>
        </div>
        <div className="info-grid">
          <div className="info-item full-width">
            <label>Biografia</label>
            <span>{additionalInfo.bio || 'Não informado'}</span>
          </div>
          <div className="info-item">
            <label>Localização</label>
            <span>{additionalInfo.location || 'Não informado'}</span>
          </div>
          <div className="info-item">
            <label>Website</label>
            <span>{additionalInfo.website || 'Não informado'}</span>
          </div>
          <div className="info-item">
            <label>Twitter</label>
            <span>{additionalInfo.socialLinks.twitter || '-'}</span>
          </div>
          <div className="info-item">
            <label>LinkedIn</label>
            <span>{additionalInfo.socialLinks.linkedin || '-'}</span>
          </div>
          <div className="info-item">
            <label>GitHub</label>
            <span>{additionalInfo.socialLinks.github || '-'}</span>
          </div>
          <div className="info-item">
            <label>Instagram</label>
            <span>{additionalInfo.socialLinks.instagram || '-'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="additional-info-section editing">
      <div className="section-header">
        <h3>Informações Adicionais</h3>
      </div>

      <div className="form-grid">
        <div className="form-field full-width">
          <label htmlFor="bio">Biografia</label>
          <textarea
            id="bio"
            value={formData.bio || ''}
            onChange={e => handleChange('bio', e.target.value)}
            className={errors.bio ? 'error' : ''}
            rows={3}
            maxLength={500}
          />
          <small>{(formData.bio?.length || 0)}/500 caracteres</small>
          {errors.bio && <span className="error-msg">{errors.bio}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="location">Localização</label>
          <input
            id="location"
            type="text"
            value={formData.location || ''}
            onChange={e => handleChange('location', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={formData.website || ''}
            onChange={e => handleChange('website', e.target.value)}
            className={errors.website ? 'error' : ''}
            placeholder="https://"
          />
          {errors.website && <span className="error-msg">{errors.website}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="twitter">Twitter</label>
          <input
            id="twitter"
            type="url"
            value={formData.socialLinks.twitter || ''}
            onChange={e => handleChange('social.twitter', e.target.value)}
            className={errors['social.twitter'] ? 'error' : ''}
            placeholder="https://twitter.com/..."
          />
          {errors['social.twitter'] && <span className="error-msg">{errors['social.twitter']}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            id="linkedin"
            type="url"
            value={formData.socialLinks.linkedin || ''}
            onChange={e => handleChange('social.linkedin', e.target.value)}
            className={errors['social.linkedin'] ? 'error' : ''}
            placeholder="https://linkedin.com/in/..."
          />
          {errors['social.linkedin'] && <span className="error-msg">{errors['social.linkedin']}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="github">GitHub</label>
          <input
            id="github"
            type="url"
            value={formData.socialLinks.github || ''}
            onChange={e => handleChange('social.github', e.target.value)}
            className={errors['social.github'] ? 'error' : ''}
            placeholder="https://github.com/..."
          />
          {errors['social.github'] && <span className="error-msg">{errors['social.github']}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="instagram">Instagram</label>
          <input
            id="instagram"
            type="url"
            value={formData.socialLinks.instagram || ''}
            onChange={e => handleChange('social.instagram', e.target.value)}
            className={errors['social.instagram'] ? 'error' : ''}
            placeholder="https://instagram.com/..."
          />
          {errors['social.instagram'] && <span className="error-msg">{errors['social.instagram']}</span>}
        </div>
      </div>

      {errors.submit && <div className="error-banner">{errors.submit}</div>}

      <div className="form-actions">
        <button type="button" onClick={handleCancel} className="btn-cancel">Cancelar</button>
        <button type="button" onClick={handleSubmit} disabled={saving} className="btn-save">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}
