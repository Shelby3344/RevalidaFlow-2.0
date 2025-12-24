import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
    localStorage.setItem("userProfile", JSON.stringify(profile));
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
