import React, { useRef, useState } from 'react';
import { validateImageFile } from '../services/validation';

interface AvatarUploaderProps {
  currentAvatar: string | null;
  initials: string;
  backgroundColor: string;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
}

export function AvatarUploader({
  currentAvatar,
  initials,
  backgroundColor,
  onUpload,
  onRemove,
}: AvatarUploaderProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    setShowOptions(!showOptions);
    setError(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile({ type: file.type, size: file.size });
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError(null);

    try {
      await onUpload(file);
      setShowOptions(false);
    } catch (err) {
      setError('Erro ao fazer upload. Tente novamente.');
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    setUploading(true);
    try {
      await onRemove();
      setShowOptions(false);
    } catch (err) {
      setError('Erro ao remover avatar.');
    } finally {
      setUploading(false);
    }
  };

  const displayImage = preview || currentAvatar;

  return (
    <div className="avatar-uploader">
      <button
        type="button"
        className="avatar-button"
        onClick={handleAvatarClick}
        disabled={uploading}
        aria-label="Alterar avatar"
      >
        {displayImage ? (
          <img src={displayImage} alt="Avatar" className="avatar-image" />
        ) : (
          <div 
            className="avatar-initials" 
            style={{ backgroundColor }}
          >
            {initials}
          </div>
        )}
        <div className="avatar-overlay">
          <span>📷</span>
        </div>
      </button>

      {showOptions && (
        <div className="avatar-options">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Enviando...' : 'Fazer upload'}
          </button>
          {currentAvatar && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="btn-danger"
            >
              Remover foto
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowOptions(false)}
            className="btn-cancel"
          >
            Cancelar
          </button>
        </div>
      )}

      {error && <div className="avatar-error">{error}</div>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </div>
  );
}
