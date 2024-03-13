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
            <Typography gutterBottom variant="h6" component="div">
              First Name: {keycloak?.tokenParsed?.given_name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Last Name: {keycloak?.tokenParsed?.family_name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              User Name: {keycloak?.tokenParsed?.preferred_username}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Email: {keycloak?.tokenParsed?.email}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
