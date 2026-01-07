import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

// Interface do perfil do usuário
export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  dataNascimento: string;
  universidade: string;
  anoFormatura: string;
  crm: string;
  especialidade: string;
  avatar: string;
  plano: "free" | "premium";
  dataExpiracao: string | null;
  dataCadastro: string;
}

// Dados iniciais mockados
const defaultProfile: UserProfile = {
  id: "1",
  nome: "Shelbinho",
  email: "",
  telefone: "",
  cidade: "",
  estado: "",
  dataNascimento: "",
  universidade: "",
  anoFormatura: "",
  crm: "",
  especialidade: "",
  avatar: "",
  plano: "free",
  dataExpiracao: null,
  dataCadastro: "2024-01-15"
};

interface UserProfileContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (field: keyof UserProfile, value: string) => void;
  saveProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfileState] = useState<UserProfile>(defaultProfile);

  // Carrega do localStorage na inicialização
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileState(JSON.parse(savedProfile));
    }
  }, []);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
  };

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfileState(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    // Salva no localStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));
    
    // Também atualiza no Supabase se o usuário estiver logado
    if (user) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: profile.nome,
            avatar_url: profile.avatar,
            email: profile.email || user.email,
            updated_at: new Date().toISOString()
          });
      } catch (error) {
        console.error('Erro ao atualizar perfil no Supabase:', error);
      }
    }
  };

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, updateProfile, saveProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
