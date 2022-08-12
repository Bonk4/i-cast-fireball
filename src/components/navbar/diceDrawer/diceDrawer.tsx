import {
  Button,
  Container,
  Divider,
  Group,
  List,
  Space,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { DiceRoller } from "../../../util/diceRoller";

const DiceDrawer = () => {
  const [d100result, updateD100] = useState(100);
  const [d20result, updateD20] = useState(20);
  const [d12result, updateD12] = useState(12);
  const [d10result, updateD10] = useState(10);
  const [d8result, updateD8] = useState(8);
  const [d6result, updateD6] = useState(6);
  const [d4result, updateD4] = useState(4);
  const [d3result, updateD3] = useState(3);
  const [d2result, updateD2] = useState(2);

  const dice = new DiceRoller();

  return (
    <>
      <Container>
        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d20"></i>}
            onClick={() => updateD100(dice.d100())}
          >
            d100
          </Button>
          <Title>{d100result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d20"></i>}
            onClick={() => updateD20(dice.d20())}
          >
            d20
          </Button>
          <Title>{d20result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d20"></i>}
            onClick={() => updateD12(dice.d12())}
          >
            d12
          </Button>
          <Title>{d12result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d20"></i>}
            onClick={() => updateD10(dice.d10())}
          >
            d10
          </Button>
          <Title>{d10result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d6"></i>}
            onClick={() => updateD8(dice.d8())}
          >
            d8
          </Button>
          <Title>{d8result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d6"></i>}
            onClick={() => updateD6(dice.d6())}
          >
            d6
          </Button>
          <Title>{d6result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d6"></i>}
            onClick={() => updateD4(dice.d4())}
          >
            d4
          </Button>
          <Title>{d4result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d6"></i>}
            onClick={() => updateD3(dice.d3())}
          >
            d3
          </Button>
          <Title>{d3result}</Title>
        </Group>

        <Space h={"md"} />
        <Divider />
        <Space h={"md"} />

        <Group position="apart" spacing={"xl"}>
          <Button
            variant={"outline"}
            radius={"lg"}
            leftIcon={<i className="fa-solid fa-dice-d6"></i>}
            onClick={() => updateD2(dice.d2())}
          >
            d2
          </Button>
          <Title>{d2result}</Title>
        </Group>
      </Container>
    </>
  );
};

export default DiceDrawer;
