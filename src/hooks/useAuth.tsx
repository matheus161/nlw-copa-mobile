/**
 * O Hook é criado para não ficar repetindo o useContext
 * em toda a aplicação, uma vez que ele será utilizado com
 * frequência. Apenas iremos chamar a função que basicamente
 * busca quem é o nosso contexto
 */
import { useContext } from "react";

import { AuthContext, AuthContextDataProps } from "../contexts/AuthContext";

export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext);

  return context;
}
