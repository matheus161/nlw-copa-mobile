// Tipando nossas rotas para que eleas apareçam mais facilmente

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      new: undefined;
      pools: undefined;
      find: undefined;
      details: {
        id: string;
      };
    }
  }
}
