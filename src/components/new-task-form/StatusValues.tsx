import { Box, MenuItem } from "@mui/material";
import { getColorByIndex } from "../../helpers/getColumnColor";
import { MyInput } from "../my-input/MyInput";

interface Props {
  name: string;
  defaultValue?: string;
  status: { key: string; value: string }[];
}

export const StatusValues = ({
  name,
  status,
  defaultValue = status.length === 1 ? status[0].key : undefined,
}: Props) => {
  return (
    <MyInput select name={name} customLabel="Status" value={defaultValue}>
      {status.map((item, index) => (
        <MenuItem
          key={item.key}
          value={item.key}
          sx={{
            fontSize: 14,
            color: "customGrey.main",
            "& .status-item__color": {
              display: "block",
            },
          }}
        >
          <Box
            mr={2}
            display="none"
            borderRadius="50%"
            minWidth=".9375rem"
            minHeight=".9375rem"
            className="status-item__color"
            bgcolor={getColorByIndex(index)}
          />
          <span>{item.value}</span>
        </MenuItem>
      ))}
    </MyInput>
  );
};
