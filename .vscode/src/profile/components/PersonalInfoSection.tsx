import React, { useState } from 'react';
import type { PersonalInfo, ValidationResult } from '../types';
import { validateDisplayName, validateEmail } from '../services/validation';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onSave: (data: PersonalInfo) => Promise<void>;
  isEditing: boolean;
  onEditToggle: () => void;
}

export function PersonalInfoSection({ 
  personalInfo, 
  onSave, 
  isEditing, 
  onEditToggle 
}: PersonalInfoSectionProps) {
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value || null }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const nameResult = validateDisplayName(formData.displayName);
    if (!nameResult.isValid) newErrors.displayName = nameResult.error!;
    
    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) newErrors.email = emailResult.error!;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSaving(true);
    try {
      await onSave(formData);
      onEditToggle();
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(personalInfo);
    setErrors({});
    onEditToggle();
  };

  if (!isEditing) {
    return (
      <div className="personal-info-section">
        <div className="section-header">
          <h3>Informações Pessoais</h3>
          <button onClick={onEditToggle} className="btn-edit">Editar</button>
        </div>
        <div className="info-grid">
          <div className="info-item">
            <label>Nome Completo</label>
            <span>{personalInfo.fullName}</span>
          </div>
          <div className="info-item">
            <label>Nome de Exibição</label>
            <span>{personalInfo.displayName}</span>
          </div>
          <div className="info-item">
            <label>Email</label>
            <span>{personalInfo.email}</span>
          </div>
          <div className="info-item">
            <label>Telefone</label>
            <span>{personalInfo.phone || 'Não informado'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="personal-info-section editing" onSubmit={handleSubmit}>
      <div className="section-header">
        <h3>Informações Pessoais</h3>
      </div>
      
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fullName">Nome Completo</label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={e => handleChange('fullName', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="displayName">Nome de Exibição</label>
          <input
            id="displayName"
            type="text"
            value={formData.displayName}
            onChange={e => handleChange('displayName', e.target.value)}
            className={errors.displayName ? 'error' : ''}
          />
          {errors.displayName && <span className="error-msg">{errors.displayName}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone || ''}
            onChange={e => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      {errors.submit && <div className="error-banner">{errors.submit}</div>}

      <div className="form-actions">
        <button type="button" onClick={handleCancel} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
