import { Children, createContext, useContext } from "react"

type User = {
    id: number;
    name: string;
    token: string;
};
type AuthContextType = {
    user: string | null;
    // isLoading: boolean;
    // signIn: (username: string, password: string) => Promise<void>;
    // signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null)
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext.Provider value={{
            user: 'Ivan'

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
  };
export default AuthProvider
