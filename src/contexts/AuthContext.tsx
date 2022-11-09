/**
 * Contextos são utilizados para gerenciar informações
 * ou lógicas com toda a aplicação, nesse caso é saber
 * se o user está autenticado
 */
import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { api } from "../services/api";

// Garantir o redirecionamento do navegador
WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>; // Retornara a autenticação
}

interface AuthProviderProps {
  children: ReactNode;
}

// Armazenar o nosso contexto
export const AuthContext = createContext({} as AuthContextDataProps);

// Compartilhar o contexto com nossa aplicação
export function AuthContextProvider({ children }: AuthProviderProps) {
  // Estado que guarda as informações do usuário autenticado
  const [user, setUser] = useState<UserProps>({} as UserProps);

  // Um estado para checar se o fluxo de autenticação está ocorrendo,
  // por padrão será falso
  const [isUserLoading, setIsUserLoading] = useState(false);

  // Configurando o redirecionamento para página web e de volta para o app
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync(); // Função que inicia o fluxo de autenticação
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true); // Feedback pro usuário

      // Fazendo a requisição de login
      const tokenResponse = await api.post("/users", {
        access_token,
      });

      // Colocando no cabeçalho das requisições
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenResponse.data.token}`;

      // Checando as informações do usuário
      const userInfoResponse = await api.get("/me");
      setUser(userInfoResponse.data.user); // Colocando no estado criado
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  // useEffect executa alguma lógica assim que o componente é renderizado
  useEffect(() => {
    // Verifico se dentro da resposta possui um type e um token
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication?.accessToken);
    }
  }, [response]); // Quando esse estado mudar o userEffect é executado novamente

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading, // Verifica em outros lugares da aplicação se o user está carregando
        user, // Estou compartilhando o estado, caso ele mude, todo o app irá saber
      }}
    >
      {/*Quando envolvemos o contexto de autenticação por algo ele toma como um filho */}
      {children}
    </AuthContext.Provider>
  );
}
