import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useKeycloak } from "keycloak-react-web";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const ProfilePage = () => {
  const { keycloak } = useKeycloak();
  const token = JSON.parse(localStorage.getItem("keycloak_token"));
  const user = keycloak?.authenticated
    ? null
    : decodeToken(token?.access_token);

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
              First Name:
              {user?.given_name || keycloak?.tokenParsed?.given_name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Last Name:
              {user?.family_name || keycloak?.tokenParsed?.family_name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              User Name:
              {user?.preferred_username ||
                keycloak?.tokenParsed?.preferred_username}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Email: {user?.email || keycloak?.tokenParsed?.email}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
