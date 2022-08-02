import React from "react";
import { Grid } from "@material-ui/core";
import { PushToTalkButton, PushToTalkButtonContainer, BigTranscript, BigTranscriptContainer } from "@speechly/react-ui";

import useStyles from "./styles"

import Details from "./components/Details/Details.component";
import Main from "./components/Main/Main.component";

const App = () => {
  const { grid, mobile, main, last, desktop } = useStyles()
  return (
    <div>
        <Grid className={grid} container spacing={0} alignItems="center" justifyContent="center" style={{height: "100vh"}}>
          <Grid item xs={12} sm={3} className={mobile}>
            <Details title="Income"/>
          </Grid>
          <Grid item xs={12} sm={4} className={main}>
            <Main />
          </Grid>
          <Grid item xs={12} sm={3} className={desktop}>
            <Details title="Income"/>
          </Grid>
          <Grid item xs={12} sm={3} className={last}>
            <Details title="Expense" />
          </Grid>
        </Grid>
        <BigTranscriptContainer>
          <BigTranscript />
        </BigTranscriptContainer>
        <PushToTalkButtonContainer>
          <PushToTalkButton captureKey=" " />
          {/* <ErrorPanel /> */}
        </PushToTalkButtonContainer>
    </div>
  )
};

export default App;
