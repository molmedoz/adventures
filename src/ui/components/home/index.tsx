import { 
    Grid,
    Button,
    ButtonGroup
} from '@material-ui/core';
import React from 'react';
import styles from './styles.scss';

export const Home = () => {
    return <Grid className={styles.home}>
        <ButtonGroup orientation="vertical" variant="text" className={styles.buttons}>
            <Button>NEW GAME</Button>
            <Button>LOAD</Button>
            <Button>CREATE STORY</Button>
        </ButtonGroup>
    </Grid>
}
export default Home