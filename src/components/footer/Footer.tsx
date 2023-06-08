import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Created with ❤️ by{" "}
            <a href="https://pablomadrigal.com">Pablo Madrigal</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
