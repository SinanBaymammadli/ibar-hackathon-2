import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Routing } from "../core/routing";

interface IProps {
  route: string;
}

export const CreateButton: React.FC<IProps> = ({ route }: IProps) => {
  return (
    <Box py={3}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        to={Routing.generateCreateRoute(route)}
        component={Link}
      >
        Create new
      </Button>
    </Box>
  );
};
