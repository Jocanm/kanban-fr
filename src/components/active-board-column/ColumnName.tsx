import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { DragIndicator } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props {
  name: string;
  color: string;
  tasksLength: number;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export const ColumnName = ({
  name,
  color,
  isDragging,
  tasksLength,
  dragHandleProps,
}: Props) => {
  const [showDragIcon, setShowDragIcon] = useState(true);

  return (
    <Stack
      mb={3}
      spacing={2}
      direction="row"
      minHeight="1.5rem"
      alignItems="center"
      // onMouseEnter={() => setShowDragIcon(true)}
      // onMouseLeave={() => setShowDragIcon(false)}
    >
      <Box
        bgcolor={color}
        borderRadius="50%"
        minWidth=".9375rem"
        minHeight=".9375rem"
      />
      <Typography
        variant="body2"
        fontWeight={600}
        letterSpacing={2}
        color="customGrey.main"
        sx={{ textTransform: "uppercase", flex: 1 }}
      >
        {`${name} (${tasksLength})`}
      </Typography>
      <AnimatePresence>
        {(showDragIcon || isDragging) && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Stack
            {...dragHandleProps}
            component={motion.div}
            sx={{ cursor: "grab" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DragIndicator color="primary" />
          </Stack>
        )}
      </AnimatePresence>
    </Stack>
  );
};
