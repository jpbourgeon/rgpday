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
      <ListItemText primary='Menu A' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MultilineChartIcon />
      </ListItemIcon>
      <ListItemText primary='Menu B' />
    </ListItem>
  </div>
)

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary='Menu C' />
    </ListItem>
  </div>
)
