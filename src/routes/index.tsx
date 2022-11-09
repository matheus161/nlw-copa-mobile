import { Box } from "native-base";
// Container para centraliar as rotas
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";

export function Routes() {
  const { user } = useAuth();

  return (
    <Box flex={1} bg="gray.900">
      {/*Quando tiver carregando terá uma box com a cor de fundo*/}
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
        {/*Checando se está autenticado*/}
      </NavigationContainer>
    </Box>
  );
}
