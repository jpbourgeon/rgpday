import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ViewListIcon from '@material-ui/icons/ViewList'
import MultilineChartIcon from '@material-ui/icons/MultilineChart'
import PersonIcon from '@material-ui/icons/Person'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary='Journal' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MultilineChartIcon />
      </ListItemIcon>
      <ListItemText primary='Suivi' />
    </ListItem>
  </div>
)

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary='Profil' />
    </ListItem>
  </div>
)

/*
Other Icons
import LayersIcon from '@material-ui/icons/Layers'
import LocalDiningIcon from '@material-ui/icons/LocalDining'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary='Poids' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalDiningIcon />
      </ListItemIcon>
      <ListItemText primary='Alimentation' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DirectionsRunIcon />
      </ListItemIcon>
      <ListItemText primary='Activité' />
    </ListItem>

*/
