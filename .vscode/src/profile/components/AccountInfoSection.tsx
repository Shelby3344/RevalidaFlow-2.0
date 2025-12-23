import React from 'react';
import type { AccountInfo } from '../types';

interface AccountInfoSectionProps {
  accountInfo: AccountInfo;
  onUpgrade: () => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function AccountInfoSection({ accountInfo, onUpgrade }: AccountInfoSectionProps) {
  const isPremium = accountInfo.status === 'premium';

  return (
    <div className="account-info-section">
      <div className="section-header">
        <h3>Informações da Conta</h3>
      </div>

      <div className="account-status">
        <div className={`status-badge ${accountInfo.status}`}>
          {isPremium ? '⭐ Premium' : 'Free'}
        </div>
        
        {isPremium && accountInfo.premiumExpiresAt && (
          <p className="expiry-info">
            Expira em: {formatDate(accountInfo.premiumExpiresAt)}
          </p>
        )}

        {!isPremium && (
          <button onClick={onUpgrade} className="btn-upgrade">
            Upgrade para Premium
          </button>
        )}
      </div>

      <div className="info-grid">
        <div className="info-item">
          <label>Membro desde</label>
          <span>{formatDate(accountInfo.createdAt)}</span>
        </div>
        <div className="info-item">
          <label>Último acesso</label>
          <span>{formatDate(accountInfo.lastLoginAt)}</span>
        </div>
      </div>
    </div>
  );
}
