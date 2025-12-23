import React, { useState } from 'react';
import { validatePassword } from '../services/validation';

interface SecuritySettingsProps {
  hasTwoFactor: boolean;
  onChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  onToggleTwoFactor: (enable: boolean, password?: string) => Promise<void>;
}

export function SecuritySettings({
  hasTwoFactor,
  onChangePassword,
  onToggleTwoFactor,
}: SecuritySettingsProps) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!passwords.old) newErrors.old = 'Senha atual é obrigatória';
    
    const validation = validatePassword(passwords.new);
    if (!validation.isValid) newErrors.new = validation.error!;
    
    if (passwords.new !== passwords.confirm) {
      newErrors.confirm = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      await onChangePassword(passwords.old, passwords.new);
      setShowPasswordForm(false);
      setPasswords({ old: '', new: '', confirm: '' });
      setErrors({});
    } catch (err) {
      setErrors({ submit: 'Erro ao alterar senha. Verifique a senha atual.' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    if (hasTwoFactor) {
      setShowTwoFactorModal(true);
    } else {
      setSaving(true);
      try {
        await onToggleTwoFactor(true);
        setQrCode('QR_CODE_PLACEHOLDER');
      } catch (err) {
        setErrors({ twoFactor: 'Erro ao ativar 2FA' });
      } finally {
        setSaving(false);
      }
    }
  };

  const handleDisableTwoFactor = async () => {
    if (!confirmPassword) {
      setErrors({ confirmPassword: 'Digite sua senha para confirmar' });
      return;
    }

    setSaving(true);
    try {
      await onToggleTwoFactor(false, confirmPassword);
      setShowTwoFactorModal(false);
      setConfirmPassword('');
    } catch (err) {
      setErrors({ confirmPassword: 'Senha incorreta' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="security-settings">
      <div className="section-header">
        <h3>Segurança</h3>
      </div>

      <div className="security-option">
        <div className="option-info">
          <h4>Senha</h4>
          <p>Altere sua senha regularmente para maior segurança</p>
        </div>
        <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
          Alterar senha
        </button>
      </div>

      {showPasswordForm && (
        <form className="password-form" onSubmit={handlePasswordChange}>
          <div className="form-field">
            <label htmlFor="oldPassword">Senha atual</label>
            <input
              id="oldPassword"
              type="password"
              value={passwords.old}
              onChange={e => setPasswords(p => ({ ...p, old: e.target.value }))}
              className={errors.old ? 'error' : ''}
            />
            {errors.old && <span className="error-msg">{errors.old}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="newPassword">Nova senha</label>
            <input
              id="newPassword"
              type="password"
              value={passwords.new}
              onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
              className={errors.new ? 'error' : ''}
            />
            {errors.new && <span className="error-msg">{errors.new}</span>}
            <small>Mínimo 8 caracteres, com maiúscula, minúscula e número</small>
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirmar nova senha</label>
            <input
              id="confirmPassword"
              type="password"
              value={passwords.confirm}
              onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
              className={errors.confirm ? 'error' : ''}
            />
            {errors.confirm && <span className="error-msg">{errors.confirm}</span>}
          </div>

          {errors.submit && <div className="error-banner">{errors.submit}</div>}

          <div className="form-actions">
            <button type="button" onClick={() => setShowPasswordForm(false)}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="btn-save">
              {saving ? 'Salvando...' : 'Alterar senha'}
            </button>
          </div>
        </form>
      )}

      <div className="security-option">
        <div className="option-info">
          <h4>Autenticação de dois fatores (2FA)</h4>
          <p>
            {hasTwoFactor 
              ? 'Ativada - Sua conta está mais protegida' 
              : 'Adicione uma camada extra de segurança'}
          </p>
        </div>
        <button 
          onClick={handleToggleTwoFactor}
          className={hasTwoFactor ? 'btn-danger' : 'btn-primary'}
        >
          {hasTwoFactor ? 'Desativar' : 'Ativar'}
        </button>
      </div>

      {qrCode && (
        <div className="qr-code-section">
          <p>Escaneie o QR code com seu aplicativo autenticador:</p>
          <div className="qr-placeholder">[QR Code]</div>
          <button onClick={() => setQrCode(null)}>Concluir</button>
        </div>
      )}

      {showTwoFactorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Desativar 2FA</h4>
            <p>Digite sua senha para confirmar:</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-msg">{errors.confirmPassword}</span>
            )}
            <div className="modal-actions">
              <button onClick={() => setShowTwoFactorModal(false)}>Cancelar</button>
              <button onClick={handleDisableTwoFactor} disabled={saving} className="btn-danger">
                {saving ? 'Desativando...' : 'Desativar 2FA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
