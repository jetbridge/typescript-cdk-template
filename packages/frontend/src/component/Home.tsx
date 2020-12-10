import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const useStyles = makeStyles((theme: Theme) => ({
    hero: {
        fontSize: '2.0rem',
        color: theme.palette.primary.main,
    },
}));

interface IHomeProps { }

const Home = (props: IHomeProps) => {
    const classes = useStyles();

    return <div data-cy="welcome-to-new-project" className={classes.hero}>Welcome to your sweet new project.</div>;
};

export default Home;