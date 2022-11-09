/*Arquivo para definir a tipagem quando for importado
 * um arquivo SVG
 */

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
