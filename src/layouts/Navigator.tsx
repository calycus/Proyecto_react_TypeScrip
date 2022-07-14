import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Send, Drafts } from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SwitchDrawer from '../router/SwitchDrawer';
import { Link, useLocation } from 'react-router-dom';

import '../css/Drawer.css'


const drawerWidth = 270;

export default function PermanentDrawerLeft() {
  const [expandedPanel, setExpandedPanel] = useState('');
  const sampleLocation = useLocation();

  let drawerComp = <div></div>;
  if (sampleLocation.pathname != "/") {
    drawerComp =
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },

        }}
        variant="permanent"
        anchor="left"
      >
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton href='/'>
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            <ListItemText primary="FACULTADES" />
          </ListItemButton>
          <Link to="/general">
            <ListItemButton>
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText primary="Dashboard General" />
            </ListItemButton>
          </Link>


          <Accordion expanded sx={{ boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Fenomesnos Academicos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link to="/tasa_retencion">
                <Accordion
                  onClick={() => setExpandedPanel('')}
                  sx={{ boxShadow: 'none' }}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <ListItemIcon>
                      <Send />
                    </ListItemIcon>
                    <Typography>Tasa de Retencion</Typography>
                  </AccordionSummary>
                </Accordion>
              </Link>
              <Accordion
                expanded={expandedPanel === 'panelTRP'}
                /* onChange={handleAccordionChange('panelTRP')} */
                onChange={(e, expanded) => setExpandedPanel(expanded ? 'panelTRP' : '')}
                sx={{ boxShadow: 'none' }}
              >

                <Link to="/tasa_repitencia">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <ListItemIcon>
                      <Send />
                    </ListItemIcon>
                    <Typography>Tasa de Repitencia</Typography>
                  </AccordionSummary>
                </Link>

                <AccordionDetails>

                  <Link to="/tasa_repitencia_por_materia">
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Por Materia" />
                    </ListItemButton>
                  </Link>

                  <Link to="/tasa_repitencia_metadata">
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="MetaData" />
                    </ListItemButton>
                  </Link>

                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedPanel === 'panelTDS'}
                /* onChange={handleAccordionChange('panelTDS')} */
                onChange={(e, expanded) => setExpandedPanel(expanded ? 'panelTDS' : '')}
                sx={{ boxShadow: 'none' }}
              >
                <Link to="/tasa_desercion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <ListItemIcon>
                      <Send />
                    </ListItemIcon>
                    <Typography>Tasa de Desercion</Typography>
                  </AccordionSummary>
                </Link>
                <AccordionDetails>
                  <Link to="/tasa_desercion_prediccion">
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Predicción" />
                    </ListItemButton>
                  </Link>

                  <Link to="/tasa_desercion_metadata">
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="MetaData" />
                    </ListItemButton>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </List>
      </Drawer >
  }
  return (
    <Box sx={{ display: 'flex' }}>
      {drawerComp}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <SwitchDrawer />
      </Box>
    </Box>
  );
}

