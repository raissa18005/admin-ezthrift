import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../redux/apiCalls";
import { Container } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import logo from "../../assets/images/Logo.svg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const { error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password }, history);
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={logo}
                        alt=""
                        style={{
                            margin: "10px 0",
                        }}
                    />

                    {/* <Avatar
                        sx={{ m: 1, bgcolor: "secondary.main" }}
                        style={{
                            margin: "10px 0",
                        }}
                    ></Avatar> */}
                    <Typography component="h1" variant="h5">
                        Admin Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                            onClick={handleClick}
                        >
                            Sign In
                        </Button>
                        {error && (
                            <Grid container>
                                <Grid item>
                                    <Typography
                                        style={{
                                            color: "red",
                                            padding: "10px 0",
                                        }}
                                    >
                                        Email / Username salah
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                        <Grid
                            container
                            style={{
                                margin: "10px 0",
                            }}
                        >
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </div>
    );
};

export default Login;
