import React from "react";
import { WhatsApp } from '@mui/icons-material';
import { FabStyled } from "./styledComponents";

export default function FabWhats() {
  return (
    <FabStyled color='success'>
      <WhatsApp />
    </FabStyled>
  )
}