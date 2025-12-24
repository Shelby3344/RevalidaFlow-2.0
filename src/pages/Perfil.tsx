import { useState, useEffect, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell,
  Save,
  Camera,
  Crown,
  GraduationCap,
  Building2,
  Clock,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";

// Interface das preferências
interface UserPreferences {
  notificacoesEmail: boolean;
  notificacoesPush: boolean;
  lembreteEstudo: boolean;
  horarioLembrete: string;
  temaEscuro: boolean;
  mostrarRanking: boolean;
  perfilPublico: boolean;
}

const defaultPreferences: UserPreferences = {
  notificacoesEmail: true,
  notificacoesPush: true,
  lembreteEstudo: true,
  horarioLembrete: "19:00",
  temaEscuro: true,
  mostrarRanking: true,
  perfilPublico: false
};

export default function Perfil() {
  const { toast } = useToast();
  const { profile, updateProfile, saveProfile } = useUserProfile();
  const [activeTab, setActiveTab] = useState<"dados" | "preferencias" | "conta">("dados");
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler para upload de foto
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verifica tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive"
        });
        return;
      }

      // Verifica tipo
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione uma imagem.",
          variant: "destructive"
        });
        return;
      }

      // Converte para base64 e salva
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        updateProfile("avatar", base64);
        saveProfile();
        toast({
          title: "Foto atualizada!",
          description: "Sua foto de perfil foi alterada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove a foto
  const handleRemovePhoto = () => {
    updateProfile("avatar", "");
    saveProfile();
    toast({
      title: "Foto removida",
      description: "Sua foto de perfil foi removida.",
    });
  };

  // Carrega preferências do localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Salva o perfil
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await saveProfile();
    
    setIsSaving(false);
    setIsEditing(false);
    
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  // Salva as preferências
  const handleSavePreferences = async () => {
    setIsSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    
    setIsSaving(false);
    
    toast({
      title: "Preferências salvas!",
      description: "Suas configurações foram atualizadas.",
    });
  };

  // Atualiza preferência
  const updatePreference = (field: keyof UserPreferences, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header do Perfil */}
        <div className="rounded-xl card-gradient p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            {/* Avatar */}
            <div className="relative group">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt="Foto de perfil"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primary/20"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                  {profile.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              )}
              
              {/* Input hidden para upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              
              {/* Botão de câmera */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                title="Alterar foto"
              >
                <Camera className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>

              {/* Botão de remover (aparece no hover se tiver foto) */}
              {profile.avatar && (
                <button 
                  onClick={handleRemovePhoto}
                  className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remover foto"
                >
                  <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">{profile.nome}</h1>
                {profile.plano === "premium" && (
                  <span className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[10px] md:text-xs font-bold">
                    <Crown className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Membro desde {new Date(profile.dataCadastro).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
              </p>
            </div>

            {/* Ações */}
            <div className="flex gap-2 w-full sm:w-auto">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="btn-primary-gradient flex-1 sm:flex-none">
                  Editar Perfil
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none">
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="btn-primary-gradient flex-1 sm:flex-none">
                    {isSaving ? "Salvando..." : "Salvar"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 md:gap-2 border-b border-border pb-2 overflow-x-auto">
          <Button
            variant={activeTab === "dados" ? "default" : "ghost"}
            onClick={() => setActiveTab("dados")}
            className="gap-1.5 md:gap-2 text-xs md:text-sm whitespace-nowrap"
            size="sm"
          >
            <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Dados Pessoais</span>
            <span className="sm:hidden">Dados</span>
          </Button>
          <Button
            variant={activeTab === "preferencias" ? "default" : "ghost"}
            onClick={() => setActiveTab("preferencias")}
            className="gap-1.5 md:gap-2 text-xs md:text-sm whitespace-nowrap"
            size="sm"
          >
            <Bell className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Preferências</span>
            <span className="sm:hidden">Pref.</span>
          </Button>
          <Button
            variant={activeTab === "conta" ? "default" : "ghost"}
            onClick={() => setActiveTab("conta")}
            className="gap-1.5 md:gap-2 text-xs md:text-sm whitespace-nowrap"
            size="sm"
          >
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Conta
          </Button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === "dados" && (
          <div className="grid gap-6">
            {/* Informações Pessoais */}
            <div className="rounded-xl card-gradient p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informações Pessoais
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={profile.nome}
                    onChange={(e) => updateProfile("nome", e.target.value)}
                    disabled={!isEditing}
                    className="bg-secondary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile("email", e.target.value)}
                      disabled={!isEditing}
                      className="bg-secondary pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="telefone"
                      value={profile.telefone}
                      onChange={(e) => updateProfile("telefone", e.target.value)}
                      disabled={!isEditing}
                      className="bg-secondary pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={profile.dataNascimento}
                      onChange={(e) => updateProfile("dataNascimento", e.target.value)}
                      disabled={!isEditing}
                      className="bg-secondary pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="cidade"
                      value={profile.cidade}
                      onChange={(e) => updateProfile("cidade", e.target.value)}
                      disabled={!isEditing}
                      className="bg-secondary pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={profile.estado}
                    onChange={(e) => updateProfile("estado", e.target.value)}
                    disabled={!isEditing}
                    className="bg-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Informações Profissionais */}
            <div className="rounded-xl card-gradient p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Informações Profissionais
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="universidade">Universidade</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="universidade"
                      value={profile.universidade}
                      onChange={(e) => updateProfile("universidade", e.target.value)}
                      disabled={!isEditing}
                      className="bg-secondary pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="anoFormatura">Ano de Formatura</Label>
                  <Input
                    id="anoFormatura"
                    value={profile.anoFormatura}
                    onChange={(e) => updateProfile("anoFormatura", e.target.value)}
                    disabled={!isEditing}
                    className="bg-secondary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="crm">CRM</Label>
                  <Input
                    id="crm"
                    value={profile.crm}
                    onChange={(e) => updateProfile("crm", e.target.value)}
                    disabled={!isEditing}
                    className="bg-secondary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="especialidade">Especialidade</Label>
                  <Input
                    id="especialidade"
                    value={profile.especialidade}
                    onChange={(e) => updateProfile("especialidade", e.target.value)}
                    disabled={!isEditing}
                    className="bg-secondary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "preferencias" && (
          <div className="rounded-xl card-gradient p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notificações e Preferências
            </h2>

            <div className="space-y-4">
              {/* Notificações por Email */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Notificações por E-mail</p>
                  <p className="text-sm text-muted-foreground">Receba atualizações e novidades por e-mail</p>
                </div>
                <Switch
                  checked={preferences.notificacoesEmail}
                  onCheckedChange={(checked) => updatePreference("notificacoesEmail", checked)}
                />
              </div>

              {/* Notificações Push */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Notificações Push</p>
                  <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                </div>
                <Switch
                  checked={preferences.notificacoesPush}
                  onCheckedChange={(checked) => updatePreference("notificacoesPush", checked)}
                />
              </div>

              {/* Lembrete de Estudo */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Lembrete de Estudo</p>
                  <p className="text-sm text-muted-foreground">Receba lembretes diários para estudar</p>
                </div>
                <div className="flex items-center gap-3">
                  {preferences.lembreteEstudo && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <Input
                        type="time"
                        value={preferences.horarioLembrete}
                        onChange={(e) => updatePreference("horarioLembrete", e.target.value)}
                        className="w-24 bg-secondary h-8 text-sm"
                      />
                    </div>
                  )}
                  <Switch
                    checked={preferences.lembreteEstudo}
                    onCheckedChange={(checked) => updatePreference("lembreteEstudo", checked)}
                  />
                </div>
              </div>

              {/* Mostrar no Ranking */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Aparecer no Ranking</p>
                  <p className="text-sm text-muted-foreground">Seu nome aparecerá no ranking público</p>
                </div>
                <Switch
                  checked={preferences.mostrarRanking}
                  onCheckedChange={(checked) => updatePreference("mostrarRanking", checked)}
                />
              </div>

              {/* Perfil Público */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Perfil Público</p>
                  <p className="text-sm text-muted-foreground">Outros usuários podem ver seu perfil</p>
                </div>
                <Switch
                  checked={preferences.perfilPublico}
                  onCheckedChange={(checked) => updatePreference("perfilPublico", checked)}
                />
              </div>
            </div>

            <Button onClick={handleSavePreferences} disabled={isSaving} className="btn-primary-gradient w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar Preferências"}
            </Button>
          </div>
        )}

        {activeTab === "conta" && (
          <div className="space-y-6">
            {/* Status da Conta */}
            <div className="rounded-xl card-gradient p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                Status da Assinatura
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-foreground">Plano Premium</span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500 text-black text-xs font-bold">Ativo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sua assinatura expira em {profile.dataExpiracao ? new Date(profile.dataExpiracao).toLocaleDateString("pt-BR") : "N/A"}
                  </p>
                </div>
                <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                  Renovar Assinatura
                </Button>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold text-primary">630</p>
                  <p className="text-sm text-muted-foreground">Checklists disponíveis</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold text-primary">630</p>
                  <p className="text-sm text-muted-foreground">Resumos disponíveis</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold text-primary">∞</p>
                  <p className="text-sm text-muted-foreground">Treinos com IA</p>
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className="rounded-xl card-gradient p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Segurança
              </h2>

              <div className="space-y-4">
                <Button variant="outline" className="w-full sm:w-auto justify-start">
                  Alterar Senha
                </Button>
                
                <Button variant="outline" className="w-full sm:w-auto justify-start">
                  Ativar Autenticação em Duas Etapas
                </Button>
                
                <Button variant="outline" className="w-full sm:w-auto justify-start text-muted-foreground">
                  Baixar Meus Dados
                </Button>
              </div>
            </div>

            {/* Zona de Perigo */}
            <div className="rounded-xl border border-destructive/30 p-6">
              <h2 className="text-lg font-semibold text-destructive mb-4">Zona de Perigo</h2>
              
              <p className="text-sm text-muted-foreground mb-4">
                Ações irreversíveis. Tenha cuidado ao executar estas ações.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                  Desativar Conta
                </Button>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                  Excluir Conta Permanentemente
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Mente PBL | Pense Revalida
      </footer>
    </AppLayout>
  );
}
