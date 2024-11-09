import { Box, Typography, Button, Container, Toolbar, AppBar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function NavBar({ used_point }) {
    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button href="/">
                        <img
                            style={{ height: 50 }}
                            src="/images/BARCAMP8xl-removebg-preview.png"
                            alt="BarcampLogo"
                            href="/"
                            sx={{ display: { xs: "none", md: "flex" } }}
                        />
                    </Button>
                    <Typography fontWeight="bold" variant="h7">
                        Realtime Voting
                    </Typography>
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            textAlign: "center",
                            position: "absolute",
                            right: "0",
                        }}
                    >
                        <FavoriteIcon sx={{ color: "#ff1744" }} />
                        <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                            {used_point ? `${used_point}/10` : "-/10"}
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
