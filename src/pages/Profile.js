import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useKeycloak } from "keycloak-react-web";

const ProfilePage = () => {
  const { keycloak } = useKeycloak();
  return (
    <Grid container spacing={3} marginTop="50px" justifyContent="center">
      <Grid item>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component={AccountCircle}
            sx={{ width: "100%", height: 100 }}
            alt="Profile Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {keycloak?.tokenParsed?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {keycloak?.tokenParsed?.email}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
