import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

// Extendendo as tipagens que já vem com o próprio botão
interface Props extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}

// Rest siginfica qualquer outra propriedade que foi enviada implicita
export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
