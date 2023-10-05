import { Fab, ListItem, ListItemButton } from '@mui/material';
import styled from 'styled-components';

export const ListItemSTD = styled.div`
  transition: 0.4s;

  &:hover{
    font-size: 30px;
    background-color: azure;
  }
`;

export const FabStyled = styled(Fab)`
  display: block;
  opacity: 0.5;
  border: 10;
  right: 10;
  position: fixed;

  &:hover {
    opacity:1 !important ;
  }

`;